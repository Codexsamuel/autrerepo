export interface NovaAIService {
  id: string;
  name: string;
  description: string;
  category: 'conversation' | 'images' | 'voice' | 'business' | 'marketing' | 'ecommerce' | 'analysis' | 'automation';
  price: number;
  credits: number;
  accuracy: number;
  executionTime: string;
  features: string[];
  protocols: ('A2A' | 'MCP' | 'API')[];
  eloRating?: number;
  battleScore?: number;
  isProduction?: boolean;
}

export interface AgentContext {
  sessionId: string;
  userId: string;
  conversationHistory: Array<{role: string, content: string, timestamp: Date}>;
  preferences: Record<string, any>;
  performance: {
    totalRequests: number;
    successRate: number;
    averageResponseTime: number;
  };
}

export interface A2AMessage {
  from: string;
  to: string;
  action: string;
  payload: any;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface MCPContext {
  sessionId: string;
  contextData: Record<string, any>;
  metadata: {
    createdAt: Date;
    lastUpdated: Date;
    version: string;
  };
}

// Catalogue des agents IA avancés
export const novaAIServices: NovaAIService[] = [
  // Agents de Conversation Avancés
  {
    id: 'chat-ia-advanced',
    name: 'Chat IA Avancé',
    description: 'Agent conversationnel avec mémoire contextuelle et apprentissage adaptatif',
    category: 'conversation',
    price: 8,
    credits: 2,
    accuracy: 94,
    executionTime: '2-5 secondes',
    features: [
      'Mémoire conversationnelle',
      'Apprentissage adaptatif',
      'Analyse émotionnelle',
      'Support multilingue',
      'Intégration A2A'
    ],
    protocols: ['A2A', 'MCP'],
    eloRating: 1850,
    battleScore: 92,
    isProduction: true
  },
  {
    id: 'emotional-assistant',
    name: 'Assistant Émotionnel',
    description: 'Agent spécialisé dans l\'analyse et la gestion des émotions',
    category: 'conversation',
    price: 12,
    credits: 3,
    accuracy: 91,
    executionTime: '3-7 secondes',
    features: [
      'Détection émotionnelle',
      'Réponses empathiques',
      'Gestion du stress',
      'Support psychologique',
      'Rapports émotionnels'
    ],
    protocols: ['MCP'],
    eloRating: 1780,
    battleScore: 88,
    isProduction: true
  },

  // Agents de Génération d'Images
  {
    id: 'text-to-image-pro',
    name: 'Générateur d\'Images Pro',
    description: 'Agent de génération d\'images avec styles multiples et haute résolution',
    category: 'images',
    price: 15,
    credits: 3,
    accuracy: 91,
    executionTime: '5-15 secondes',
    features: [
      'Styles multiples',
      'Haute résolution',
      'Édition intelligente',
      'Optimisation SEO',
      'Batch processing'
    ],
    protocols: ['API'],
    eloRating: 1920,
    battleScore: 95,
    isProduction: true
  },
  {
    id: 'ghibli-style-generator',
    name: 'Générateur Style Ghibli',
    description: 'Agent spécialisé dans la génération d\'images style Studio Ghibli',
    category: 'images',
    price: 18,
    credits: 4,
    accuracy: 89,
    executionTime: '8-20 secondes',
    features: [
      'Style Ghibli authentique',
      'Personnages animés',
      'Paysages magiques',
      'Émotions artistiques',
      'Export haute qualité'
    ],
    protocols: ['API'],
    eloRating: 1890,
    battleScore: 93,
    isProduction: true
  },

  // Agents Audio et Voix
  {
    id: 'voice-synthesis-pro',
    name: 'Synthèse Vocale Pro',
    description: 'Agent de synthèse vocale naturelle avec émotions',
    category: 'voice',
    price: 10,
    credits: 2,
    accuracy: 93,
    executionTime: '3-8 secondes',
    features: [
      'Voix naturelles',
      'Émotions vocales',
      'Support multilingue',
      'Export haute qualité',
      'Personnalisation'
    ],
    protocols: ['API'],
    eloRating: 1810,
    battleScore: 90,
    isProduction: true
  },

  // Agents Business Intelligence
  {
    id: 'data-analysis-pro',
    name: 'Analyse de Données Pro',
    description: 'Agent d\'analyse de données avec insights business',
    category: 'analysis',
    price: 20,
    credits: 5,
    accuracy: 96,
    executionTime: '10-30 secondes',
    features: [
      'Analyse prédictive',
      'Visualisations',
      'Insights business',
      'Rapports automatiques',
      'Intégration CRM'
    ],
    protocols: ['A2A', 'MCP'],
    eloRating: 1950,
    battleScore: 97,
    isProduction: true
  },
  {
    id: 'scraping-intelligent',
    name: 'Scraping Intelligent',
    description: 'Agent de collecte de données web intelligent',
    category: 'analysis',
    price: 12,
    credits: 3,
    accuracy: 91,
    executionTime: '5-15 secondes',
    features: [
      'Collecte automatisée',
      'Nettoyage des données',
      'Analyse en temps réel',
      'Export structuré',
      'Respect RGPD'
    ],
    protocols: ['A2A'],
    eloRating: 1870,
    battleScore: 91,
    isProduction: true
  },

  // Agents Marketing
  {
    id: 'content-generation-pro',
    name: 'Génération de Contenu Pro',
    description: 'Agent de création de contenu marketing optimisé',
    category: 'marketing',
    price: 12,
    credits: 3,
    accuracy: 89,
    executionTime: '5-12 secondes',
    features: [
      'Contenu SEO optimisé',
      'Personnalisation',
      'A/B testing',
      'Analytics intégrés',
      'Multi-formats'
    ],
    protocols: ['MCP'],
    eloRating: 1830,
    battleScore: 89,
    isProduction: true
  },
  {
    id: 'seo-optimizer',
    name: 'Optimiseur SEO',
    description: 'Agent d\'optimisation SEO et référencement',
    category: 'marketing',
    price: 15,
    credits: 4,
    accuracy: 92,
    executionTime: '8-20 secondes',
    features: [
      'Analyse SEO complète',
      'Recommandations',
      'Suivi des positions',
      'Rapports détaillés',
      'Optimisation automatique'
    ],
    protocols: ['A2A', 'MCP'],
    eloRating: 1900,
    battleScore: 94,
    isProduction: true
  },

  // Agents E-commerce
  {
    id: 'ecommerce-analysis',
    name: 'Analyse E-commerce',
    description: 'Agent d\'analyse e-commerce et optimisation',
    category: 'ecommerce',
    price: 18,
    credits: 4,
    accuracy: 94,
    executionTime: '10-25 secondes',
    features: [
      'Analyse concurrentielle',
      'Optimisation conversion',
      'Pricing intelligent',
      'Gestion catalogue',
      'Rapports business'
    ],
    protocols: ['A2A', 'MCP'],
    eloRating: 1930,
    battleScore: 96,
    isProduction: true
  },

  // Agents d'Automatisation
  {
    id: 'workflow-automation',
    name: 'Automatisation Workflow',
    description: 'Agent d\'automatisation de processus métier',
    category: 'automation',
    price: 25,
    credits: 6,
    accuracy: 95,
    executionTime: '15-45 secondes',
    features: [
      'Automatisation complète',
      'Intégration API',
      'Monitoring temps réel',
      'Alertes intelligentes',
      'Optimisation continue'
    ],
    protocols: ['A2A', 'MCP'],
    eloRating: 1980,
    battleScore: 98,
    isProduction: true
  }
];

// Système de recommandation intelligent
export function getRecommendedServices(userInput: string): NovaAIService[] {
  const input = userInput.toLowerCase();
  const recommendations: Array<{service: NovaAIService, score: number}> = [];

  for (const service of novaAIServices) {
    let score = 0;

    // Analyse sémantique basique
    const keywords = {
      'chat': ['conversation', 'discussion', 'dialogue', 'parler', 'communiquer'],
      'image': ['image', 'photo', 'visuel', 'dessin', 'créer', 'générer'],
      'voix': ['voix', 'audio', 'son', 'parler', 'synthèse'],
      'analyse': ['analyser', 'données', 'statistiques', 'rapport', 'étude'],
      'marketing': ['marketing', 'publicité', 'promotion', 'vente', 'commercial'],
      'ecommerce': ['e-commerce', 'boutique', 'vente', 'produit', 'commerce'],
      'automatisation': ['automatiser', 'processus', 'workflow', 'efficacité']
    };

    // Calcul du score
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => input.includes(word))) {
        score += 10;
      }
    }

    // Bonus pour les services en production
    if (service.isProduction) score += 5;

    // Bonus pour l'ELO rating
    score += (service.eloRating || 0) / 100;

    // Bonus pour le battle score
    score += (service.battleScore || 0) / 10;

    if (score > 0) {
      recommendations.push({ service, score });
    }
  }

  // Tri par score décroissant et retour des 3 meilleurs
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(r => r.service);
}

// Système de gestion des agents
export class AgentManager {
  private agents: Map<string, NovaAIService> = new Map();
  private contexts: Map<string, AgentContext> = new Map();
  private a2aMessages: A2AMessage[] = [];
  private mcpContexts: Map<string, MCPContext> = new Map();

  constructor() {
    // Initialiser tous les agents
    novaAIServices.forEach(service => {
      this.agents.set(service.id, service);
    });
  }

  // Gestion des contextes
  createContext(userId: string): AgentContext {
    const context: AgentContext = {
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      conversationHistory: [],
      preferences: {},
      performance: {
        totalRequests: 0,
        successRate: 100,
        averageResponseTime: 0
      }
    };
    this.contexts.set(context.sessionId, context);
    return context;
  }

  getContext(sessionId: string): AgentContext | undefined {
    return this.contexts.get(sessionId);
  }

  updateContext(sessionId: string, updates: Partial<AgentContext>): void {
    const context = this.contexts.get(sessionId);
    if (context) {
      Object.assign(context, updates);
    }
  }

  // Communication A2A
  sendA2AMessage(message: A2AMessage): void {
    this.a2aMessages.push(message);
    // Traitement des messages A2A
    this.processA2AMessage(message);
  }

  private processA2AMessage(message: A2AMessage): void {
    // Logique de traitement des messages A2A
    console.log(`A2A Message: ${message.from} -> ${message.to}: ${message.action}`);
  }

  // Gestion MCP
  createMCPContext(sessionId: string): MCPContext {
    const context: MCPContext = {
      sessionId,
      contextData: {},
      metadata: {
        createdAt: new Date(),
        lastUpdated: new Date(),
        version: '1.0.0'
      }
    };
    this.mcpContexts.set(sessionId, context);
    return context;
  }

  updateMCPContext(sessionId: string, data: Record<string, any>): void {
    const context = this.mcpContexts.get(sessionId);
    if (context) {
      context.contextData = { ...context.contextData, ...data };
      context.metadata.lastUpdated = new Date();
    }
  }

  // Battle System (inspiré d'AArena)
  async battleAgents(agent1Id: string, agent2Id: string, task: string): Promise<{
    winner: string;
    scores: { [key: string]: number };
    details: any;
  }> {
    const agent1 = this.agents.get(agent1Id);
    const agent2 = this.agents.get(agent2Id);

    if (!agent1 || !agent2) {
      throw new Error('Agents non trouvés');
    }

    // Simulation d'un battle
    const score1 = (agent1.eloRating || 0) + Math.random() * 100;
    const score2 = (agent2.eloRating || 0) + Math.random() * 100;

    return {
      winner: score1 > score2 ? agent1Id : agent2Id,
      scores: {
        [agent1Id]: Math.round(score1),
        [agent2Id]: Math.round(score2)
      },
      details: {
        task,
        executionTime: Date.now(),
        metrics: {
          accuracy: Math.max(agent1.accuracy, agent2.accuracy),
          efficiency: Math.min(agent1.price, agent2.price)
        }
      }
    };
  }

  // Performance tracking
  trackPerformance(agentId: string, success: boolean, responseTime: number): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      // Mise à jour des métriques de performance
      console.log(`Performance tracked for ${agentId}: success=${success}, time=${responseTime}ms`);
    }
  }

  // Get agent rankings (ELO system)
  getAgentRankings(): Array<{id: string, name: string, eloRating: number, battleScore: number}> {
    return Array.from(this.agents.values())
      .map(agent => ({
        id: agent.id,
        name: agent.name,
        eloRating: agent.eloRating || 0,
        battleScore: agent.battleScore || 0
      }))
      .sort((a, b) => b.eloRating - a.eloRating);
  }
}

// Instance globale du gestionnaire d'agents
export const agentManager = new AgentManager(); 