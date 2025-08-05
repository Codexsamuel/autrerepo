export interface MCPContext {
  sessionId: string;
  userId: string;
  contextData: Record<string, any>;
  metadata: {
    createdAt: Date;
    lastUpdated: Date;
    version: string;
    tags: string[];
  };
  conversationHistory: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;
  preferences: {
    language: string;
    tone: string;
    expertise: string[];
    customSettings: Record<string, any>;
  };
  performance: {
    totalInteractions: number;
    averageResponseTime: number;
    successRate: number;
    lastActivity: Date;
  };
}

export interface MCPRequest {
  sessionId: string;
  action: 'get' | 'set' | 'update' | 'delete' | 'clear' | 'analyze';
  key?: string;
  value?: any;
  metadata?: Record<string, any>;
}

export interface MCPResponse {
  success: boolean;
  data?: any;
  error?: string;
  sessionId: string;
  timestamp: Date;
  processingTime: number;
}

export class MCPProtocol {
  private contexts: Map<string, MCPContext> = new Map();
  private sessionTimeout: number = 30 * 60 * 1000; // 30 minutes
  private maxContextSize: number = 10000; // Taille maximale du contexte

  constructor() {
    this.startCleanupInterval();
  }

  // Créer une nouvelle session MCP
  createSession(userId: string, initialData?: Record<string, any>): MCPContext {
    const sessionId = this.generateSessionId();
    
    const context: MCPContext = {
      sessionId,
      userId,
      contextData: initialData || {},
      metadata: {
        createdAt: new Date(),
        lastUpdated: new Date(),
        version: '1.0.0',
        tags: []
      },
      conversationHistory: [],
      preferences: {
        language: 'fr',
        tone: 'professional',
        expertise: [],
        customSettings: {}
      },
      performance: {
        totalInteractions: 0,
        averageResponseTime: 0,
        successRate: 100,
        lastActivity: new Date()
      }
    };

    this.contexts.set(sessionId, context);
    console.log(`Session MCP créée: ${sessionId} pour l'utilisateur: ${userId}`);
    
    return context;
  }

  // Obtenir le contexte d'une session
  getContext(sessionId: string): MCPContext | undefined {
    const context = this.contexts.get(sessionId);
    if (context) {
      context.performance.lastActivity = new Date();
      context.metadata.lastUpdated = new Date();
    }
    return context;
  }

  // Traiter une requête MCP
  async processRequest(request: MCPRequest): Promise<MCPResponse> {
    const startTime = Date.now();
    
    try {
      const context = this.getContext(request.sessionId);
      if (!context) {
        throw new Error(`Session ${request.sessionId} non trouvée`);
      }

      let data: any;

      switch (request.action) {
        case 'get':
          data = this.getContextData(context, request.key);
          break;
        case 'set':
          data = this.setContextData(context, request.key!, request.value);
          break;
        case 'update':
          data = this.updateContextData(context, request.key!, request.value);
          break;
        case 'delete':
          data = this.deleteContextData(context, request.key!);
          break;
        case 'clear':
          data = this.clearContextData(context);
          break;
        case 'analyze':
          data = this.analyzeContext(context);
          break;
        default:
          throw new Error(`Action ${request.action} non supportée`);
      }

      // Mettre à jour les métriques de performance
      this.updatePerformanceMetrics(context, Date.now() - startTime, true);

      return {
        success: true,
        data,
        sessionId: request.sessionId,
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        sessionId: request.sessionId,
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };
    }
  }

  // Ajouter un message à l'historique de conversation
  addConversationMessage(sessionId: string, role: 'user' | 'assistant' | 'system', content: string, metadata?: Record<string, any>): void {
    const context = this.getContext(sessionId);
    if (!context) return;

    context.conversationHistory.push({
      role,
      content,
      timestamp: new Date(),
      metadata
    });

    // Limiter la taille de l'historique
    if (context.conversationHistory.length > 100) {
      context.conversationHistory = context.conversationHistory.slice(-50);
    }

    context.metadata.lastUpdated = new Date();
    context.performance.totalInteractions++;
  }

  // Obtenir le résumé du contexte
  getContextSummary(sessionId: string): any {
    const context = this.getContext(sessionId);
    if (!context) return null;

    return {
      sessionId: context.sessionId,
      userId: context.userId,
      dataKeys: Object.keys(context.contextData),
      conversationLength: context.conversationHistory.length,
      preferences: context.preferences,
      performance: context.performance,
      metadata: context.metadata
    };
  }

  // Analyser le contexte
  private analyzeContext(context: MCPContext): any {
    const analysis = {
      sessionDuration: Date.now() - context.metadata.createdAt.getTime(),
      dataSize: JSON.stringify(context.contextData).length,
      conversationTopics: this.extractTopics(context.conversationHistory),
      userPreferences: context.preferences,
      performanceMetrics: context.performance,
      recommendations: this.generateRecommendations(context)
    };

    return analysis;
  }

  // Extraire les sujets de conversation
  private extractTopics(conversationHistory: MCPContext['conversationHistory']): string[] {
    const topics = new Set<string>();
    
    conversationHistory.forEach(message => {
      const words = message.content.toLowerCase().split(' ');
      const commonTopics = ['ia', 'intelligence', 'artificielle', 'données', 'analyse', 'marketing', 'ecommerce', 'contenu'];
      
      commonTopics.forEach(topic => {
        if (words.some(word => word.includes(topic))) {
          topics.add(topic);
        }
      });
    });

    return Array.from(topics);
  }

  // Générer des recommandations
  private generateRecommendations(context: MCPContext): string[] {
    const recommendations: string[] = [];

    if (context.conversationHistory.length < 5) {
      recommendations.push('Continuez à interagir pour améliorer la personnalisation');
    }

    if (context.performance.averageResponseTime > 2000) {
      recommendations.push('Considérez optimiser les requêtes pour de meilleures performances');
    }

    if (Object.keys(context.contextData).length === 0) {
      recommendations.push('Ajoutez des données de contexte pour des réponses plus pertinentes');
    }

    return recommendations;
  }

  // Opérations sur les données de contexte
  private getContextData(context: MCPContext, key?: string): any {
    if (key) {
      return context.contextData[key];
    }
    return context.contextData;
  }

  private setContextData(context: MCPContext, key: string, value: any): any {
    context.contextData[key] = value;
    context.metadata.lastUpdated = new Date();
    return { key, value };
  }

  private updateContextData(context: MCPContext, key: string, value: any): any {
    if (typeof context.contextData[key] === 'object' && typeof value === 'object') {
      context.contextData[key] = { ...context.contextData[key], ...value };
    } else {
      context.contextData[key] = value;
    }
    context.metadata.lastUpdated = new Date();
    return { key, value: context.contextData[key] };
  }

  private deleteContextData(context: MCPContext, key: string): any {
    const deleted = context.contextData[key];
    delete context.contextData[key];
    context.metadata.lastUpdated = new Date();
    return { key, deleted };
  }

  private clearContextData(context: MCPContext): any {
    const cleared = { ...context.contextData };
    context.contextData = {};
    context.metadata.lastUpdated = new Date();
    return { cleared };
  }

  // Mettre à jour les métriques de performance
  private updatePerformanceMetrics(context: MCPContext, responseTime: number, success: boolean): void {
    const perf = context.performance;
    
    perf.totalInteractions++;
    perf.lastActivity = new Date();
    
    // Calculer le temps de réponse moyen
    perf.averageResponseTime = (perf.averageResponseTime * (perf.totalInteractions - 1) + responseTime) / perf.totalInteractions;
    
    // Calculer le taux de succès
    if (!success) {
      const successCount = Math.floor(perf.successRate * perf.totalInteractions / 100);
      perf.successRate = (successCount / perf.totalInteractions) * 100;
    }
  }

  // Nettoyer les sessions expirées
  private cleanupExpiredSessions(): void {
    const now = Date.now();
    const expiredSessions: string[] = [];

    this.contexts.forEach((context, sessionId) => {
      const lastActivity = context.performance.lastActivity.getTime();
      if (now - lastActivity > this.sessionTimeout) {
        expiredSessions.push(sessionId);
      }
    });

    expiredSessions.forEach(sessionId => {
      this.contexts.delete(sessionId);
      console.log(`Session MCP expirée supprimée: ${sessionId}`);
    });
  }

  // Démarrer l'intervalle de nettoyage
  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, 5 * 60 * 1000); // Toutes les 5 minutes
  }

  // Générer un ID de session unique
  private generateSessionId(): string {
    return `mcp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Obtenir les statistiques du protocole
  getStats(): any {
    const sessions = Array.from(this.contexts.values());
    
    return {
      totalSessions: sessions.length,
      activeSessions: sessions.filter(s => 
        Date.now() - s.performance.lastActivity.getTime() < this.sessionTimeout
      ).length,
      averageSessionDuration: sessions.reduce((acc, s) => 
        acc + (Date.now() - s.metadata.createdAt.getTime()), 0
      ) / sessions.length,
      totalInteractions: sessions.reduce((acc, s) => 
        acc + s.performance.totalInteractions, 0
      ),
      averageResponseTime: sessions.reduce((acc, s) => 
        acc + s.performance.averageResponseTime, 0
      ) / sessions.length
    };
  }

  // Supprimer une session
  deleteSession(sessionId: string): boolean {
    return this.contexts.delete(sessionId);
  }

  // Lister toutes les sessions
  getAllSessions(): Array<{sessionId: string, userId: string, lastActivity: Date}> {
    return Array.from(this.contexts.values()).map(context => ({
      sessionId: context.sessionId,
      userId: context.userId,
      lastActivity: context.performance.lastActivity
    }));
  }
}

// Instance globale du protocole MCP
export const mcpProtocol = new MCPProtocol(); 