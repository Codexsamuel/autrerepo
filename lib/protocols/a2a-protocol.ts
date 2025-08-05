export interface A2AMessage {
  id: string;
  from: string;
  to: string | 'broadcast';
  action: string;
  payload: any;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  metadata?: {
    sessionId?: string;
    userId?: string;
    correlationId?: string;
  };
}

export interface A2AResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
  processingTime: number;
}

export interface AgentCapability {
  name: string;
  description: string;
  actions: string[];
  parameters?: Record<string, any>;
}

export class A2AProtocol {
  private agents: Map<string, AgentCapability> = new Map();
  private messageQueue: A2AMessage[] = [];
  private messageHistory: A2AMessage[] = [];
  private listeners: Map<string, (message: A2AMessage) => Promise<A2AResponse>> = new Map();

  constructor() {
    this.initializeDefaultAgents();
  }

  private initializeDefaultAgents() {
    // Agents par défaut avec leurs capacités
    const defaultAgents: AgentCapability[] = [
      {
        name: 'chat-ia-advanced',
        description: 'Agent conversationnel avancé',
        actions: ['chat', 'analyze', 'summarize', 'translate'],
        parameters: {
          maxTokens: 2000,
          temperature: 0.7,
          languages: ['fr', 'en', 'es']
        }
      },
      {
        name: 'data-analysis-pro',
        description: 'Agent d\'analyse de données',
        actions: ['analyze', 'visualize', 'predict', 'report'],
        parameters: {
          algorithms: ['regression', 'classification', 'clustering'],
          visualizationTypes: ['chart', 'graph', 'dashboard']
        }
      },
      {
        name: 'content-generation-pro',
        description: 'Agent de génération de contenu',
        actions: ['generate', 'optimize', 'rewrite', 'translate'],
        parameters: {
          contentTypes: ['article', 'social', 'email', 'seo'],
          tones: ['professional', 'casual', 'formal', 'creative']
        }
      },
      {
        name: 'ecommerce-analysis',
        description: 'Agent d\'analyse e-commerce',
        actions: ['analyze', 'optimize', 'recommend', 'forecast'],
        parameters: {
          metrics: ['conversion', 'revenue', 'traffic', 'engagement'],
          platforms: ['shopify', 'woocommerce', 'magento']
        }
      }
    ];

    defaultAgents.forEach(agent => {
      this.agents.set(agent.name, agent);
    });
  }

  // Enregistrer un agent
  registerAgent(agentId: string, capability: AgentCapability): void {
    this.agents.set(agentId, capability);
    console.log(`Agent ${agentId} enregistré avec succès`);
  }

  // Envoyer un message A2A
  async sendMessage(message: Omit<A2AMessage, 'id' | 'timestamp'>): Promise<A2AResponse> {
    const fullMessage: A2AMessage = {
      ...message,
      id: this.generateMessageId(),
      timestamp: new Date()
    };

    this.messageQueue.push(fullMessage);
    this.messageHistory.push(fullMessage);

    // Traitement du message
    return await this.processMessage(fullMessage);
  }

  // Traitement des messages
  private async processMessage(message: A2AMessage): Promise<A2AResponse> {
    const startTime = Date.now();

    try {
      if (message.to === 'broadcast') {
        // Broadcast à tous les agents
        const responses = await Promise.all(
          Array.from(this.agents.keys()).map(agentId =>
            this.executeAction(agentId, message.action, message.payload)
          )
        );

        return {
          success: true,
          data: responses,
          timestamp: new Date(),
          processingTime: Date.now() - startTime
        };
      } else {
        // Message direct à un agent spécifique
        const response = await this.executeAction(message.to, message.action, message.payload);
        
        return {
          success: true,
          data: response,
          timestamp: new Date(),
          processingTime: Date.now() - startTime
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };
    }
  }

  // Exécuter une action sur un agent
  private async executeAction(agentId: string, action: string, payload: any): Promise<any> {
    const agent = this.agents.get(agentId);
    
    if (!agent) {
      throw new Error(`Agent ${agentId} non trouvé`);
    }

    if (!agent.actions.includes(action)) {
      throw new Error(`Action ${action} non supportée par l'agent ${agentId}`);
    }

    // Simulation d'exécution d'action
    return await this.simulateActionExecution(agentId, action, payload);
  }

  // Simulation d'exécution d'action
  private async simulateActionExecution(agentId: string, action: string, payload: any): Promise<any> {
    // Délai de simulation
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 500));

    switch (action) {
      case 'chat':
        return {
          response: `Réponse de ${agentId} à votre message: "${payload.message}"`,
          confidence: 0.9 + Math.random() * 0.1,
          metadata: {
            agentId,
            action,
            timestamp: new Date()
          }
        };

      case 'analyze':
        return {
          analysis: `Analyse effectuée par ${agentId} sur: ${payload.data}`,
          insights: [
            'Insight 1 basé sur l\'analyse',
            'Insight 2 avec recommandations',
            'Insight 3 pour optimisation'
          ],
          confidence: 0.85 + Math.random() * 0.15
        };

      case 'generate':
        return {
          content: `Contenu généré par ${agentId} selon les spécifications`,
          wordCount: Math.floor(Math.random() * 500) + 100,
          seoScore: Math.floor(Math.random() * 20) + 80,
          metadata: {
            type: payload.contentType || 'article',
            tone: payload.tone || 'professional'
          }
        };

      case 'optimize':
        return {
          optimized: `Contenu optimisé par ${agentId}`,
          improvements: [
            'Amélioration SEO appliquée',
            'Optimisation du contenu',
            'Recommandations d\'amélioration'
          ],
          score: Math.floor(Math.random() * 20) + 80
        };

      default:
        return {
          result: `Action ${action} exécutée par ${agentId}`,
          payload,
          success: true
        };
    }
  }

  // Broadcast message
  async broadcastMessage(message: string, tags?: string[]): Promise<A2AResponse[]> {
    const broadcastMessage: A2AMessage = {
      id: this.generateMessageId(),
      from: 'system',
      to: 'broadcast',
      action: 'broadcast',
      payload: { message, tags },
      timestamp: new Date(),
      priority: 'medium'
    };

    const responses = await Promise.all(
      Array.from(this.agents.keys()).map(async (agentId) => {
        try {
          return await this.executeAction(agentId, 'process_broadcast', { message, tags });
        } catch (error) {
          return {
            agentId,
            success: false,
            error: error instanceof Error ? error.message : 'Erreur de traitement'
          };
        }
      })
    );

    return responses.map(response => ({
      success: true,
      data: response,
      timestamp: new Date(),
      processingTime: 0
    }));
  }

  // Requête entre agents
  async requestAgentAction(fromAgent: string, toAgent: string, action: string, params: any): Promise<A2AResponse> {
    const message: A2AMessage = {
      id: this.generateMessageId(),
      from: fromAgent,
      to: toAgent,
      action,
      payload: params,
      timestamp: new Date(),
      priority: 'high'
    };

    return await this.processMessage(message);
  }

  // Obtenir les capacités d'un agent
  getAgentCapabilities(agentId: string): AgentCapability | undefined {
    return this.agents.get(agentId);
  }

  // Lister tous les agents
  getAllAgents(): Array<{id: string, capability: AgentCapability}> {
    return Array.from(this.agents.entries()).map(([id, capability]) => ({
      id,
      capability
    }));
  }

  // Obtenir l'historique des messages
  getMessageHistory(limit: number = 50): A2AMessage[] {
    return this.messageHistory.slice(-limit);
  }

  // Obtenir les messages en attente
  getPendingMessages(): A2AMessage[] {
    return this.messageQueue;
  }

  // Nettoyer l'historique
  clearHistory(): void {
    this.messageHistory = [];
    this.messageQueue = [];
  }

  // Générer un ID de message unique
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Statistiques du protocole
  getStats() {
    return {
      totalAgents: this.agents.size,
      totalMessages: this.messageHistory.length,
      pendingMessages: this.messageQueue.length,
      agents: Array.from(this.agents.keys()),
      messageTypes: this.getUniqueMessageTypes()
    };
  }

  private getUniqueMessageTypes(): string[] {
    const types = new Set(this.messageHistory.map(msg => msg.action));
    return Array.from(types);
  }
}

// Instance globale du protocole A2A
export const a2aProtocol = new A2AProtocol(); 