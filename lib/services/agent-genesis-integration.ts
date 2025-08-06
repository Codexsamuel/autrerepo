// AgentGenesis Integration Service
// Intégration avec https://github.com/DeadmanAbir/AgentGenesis

export interface AgentGenesisAgent {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'automation' | 'ai-assistant' | 'coding' | 'content' | 'security' | 'trading' | 'analysis';
  githubUrl?: string;
  demoUrl?: string;
  documentation?: string;
  tags: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  pricing: 'free' | 'freemium' | 'paid' | 'enterprise';
  integrationType: 'api' | 'sdk' | 'iframe' | 'webhook' | 'direct';
  novaiaCompatible: boolean;
  africaOptimized: boolean;
}

export interface AgentGenesisCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  agents: AgentGenesisAgent[];
}

// Agents populaires d'AgentGenesis adaptés pour l'Afrique
export const AGENT_GENESIS_AGENTS: AgentGenesisAgent[] = [
  {
    id: 'zapier-agents',
    name: 'Zapier Agents',
    description: 'Automatisation de workflows no-code pour connecter WhatsApp, email, CRM, Google Sheets',
    category: 'automation',
    tags: ['no-code', 'workflow', 'integration', 'africa'],
    complexity: 'beginner',
    pricing: 'freemium',
    integrationType: 'api',
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: 'sitegpt',
    name: 'SiteGPT',
    description: 'Chatbot IA connecté à votre site web avec support multilingue',
    category: 'ai-assistant',
    tags: ['chatbot', 'customer-support', 'multilingual'],
    complexity: 'beginner',
    pricing: 'paid',
    integrationType: 'iframe',
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: '3commas',
    name: '3Commas',
    description: 'Agent de trading crypto automatique avec bots intégrés',
    category: 'trading',
    tags: ['crypto', 'trading', 'automation', 'binance'],
    complexity: 'intermediate',
    pricing: 'paid',
    integrationType: 'api',
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'IDE IA collaboratif pour développement avec assistance IA',
    category: 'coding',
    tags: ['ide', 'development', 'collaboration', 'ai-assistant'],
    complexity: 'intermediate',
    pricing: 'freemium',
    integrationType: 'sdk',
    novaiaCompatible: true,
    africaOptimized: false
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'Génération vidéo IA pour publicités et clips promotionnels',
    category: 'content',
    tags: ['video-generation', 'marketing', 'advertising'],
    complexity: 'intermediate',
    pricing: 'paid',
    integrationType: 'api',
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: 'guardrails-ai',
    name: 'Guardrails AI',
    description: 'Sécurité et gouvernance IA pour prévenir les dérives',
    category: 'security',
    tags: ['security', 'governance', 'ai-safety'],
    complexity: 'advanced',
    pricing: 'enterprise',
    integrationType: 'api',
    novaiaCompatible: true,
    africaOptimized: false
  }
];

export class AgentGenesisService {
  private agents: AgentGenesisAgent[] = AGENT_GENESIS_AGENTS;

  // Récupérer tous les agents
  getAllAgents(): AgentGenesisAgent[] {
    return this.agents;
  }

  // Filtrer par catégorie
  getAgentsByCategory(category: string): AgentGenesisAgent[] {
    return this.agents.filter(agent => agent.category === category);
  }

  // Filtrer par complexité
  getAgentsByComplexity(complexity: string): AgentGenesisAgent[] {
    return this.agents.filter(agent => agent.complexity === complexity);
  }

  // Filtrer par prix
  getAgentsByPricing(pricing: string): AgentGenesisAgent[] {
    return this.agents.filter(agent => agent.pricing === pricing);
  }

  // Agents optimisés pour l'Afrique
  getAfricaOptimizedAgents(): AgentGenesisAgent[] {
    return this.agents.filter(agent => agent.africaOptimized);
  }

  // Agents compatibles NovaIA
  getNovaiaCompatibleAgents(): AgentGenesisAgent[] {
    return this.agents.filter(agent => agent.novaiaCompatible);
  }

  // Recherche d'agents
  searchAgents(query: string): AgentGenesisAgent[] {
    const lowerQuery = query.toLowerCase();
    return this.agents.filter(agent => 
      agent.name.toLowerCase().includes(lowerQuery) ||
      agent.description.toLowerCase().includes(lowerQuery) ||
      agent.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Obtenir les statistiques
  getStats() {
    return {
      totalAgents: this.agents.length,
      categories: [...new Set(this.agents.map(a => a.category))].length,
      freeAgents: this.agents.filter(a => a.pricing === 'free').length,
      africaOptimized: this.agents.filter(a => a.africaOptimized).length,
      novaiaCompatible: this.agents.filter(a => a.novaiaCompatible).length
    };
  }

  // Recommandations basées sur le profil utilisateur
  getRecommendations(userProfile: {
    experience: 'beginner' | 'intermediate' | 'advanced';
    budget: 'free' | 'low' | 'medium' | 'high';
    region: 'africa' | 'global';
    needs: string[];
  }): AgentGenesisAgent[] {
    let recommendations = this.agents;

    // Filtrer par expérience
    if (userProfile.experience === 'beginner') {
      recommendations = recommendations.filter(a => a.complexity === 'beginner');
    }

    // Filtrer par budget
    if (userProfile.budget === 'free') {
      recommendations = recommendations.filter(a => a.pricing === 'free');
    }

    // Filtrer par région
    if (userProfile.region === 'africa') {
      recommendations = recommendations.filter(a => a.africaOptimized);
    }

    // Filtrer par besoins
    if (userProfile.needs.length > 0) {
      recommendations = recommendations.filter(agent =>
        userProfile.needs.some(need =>
          agent.tags.some(tag => tag.toLowerCase().includes(need.toLowerCase()))
        )
      );
    }

    return recommendations.slice(0, 5); // Top 5 recommandations
  }

  // Intégration avec NovaIA
  async integrateWithNovaia(agentId: string, novaiaConfig: any): Promise<boolean> {
    const agent = this.agents.find(a => a.id === agentId);
    if (!agent || !agent.novaiaCompatible) {
      return false;
    }

    // Simulation d'intégration
    console.log(`Intégration de ${agent.name} avec NovaIA...`);
    
    // Ici, vous ajouteriez la logique d'intégration réelle
    // - Configuration API
    // - Tests de connectivité
    // - Ajout au catalogue NovaIA
    
    return true;
  }
}

// Instance singleton
export const agentGenesisService = new AgentGenesisService();

// Catégories organisées
export const AGENT_GENESIS_CATEGORIES: AgentGenesisCategory[] = [
  {
    id: 'productivity',
    name: 'Productivité & Automatisation',
    description: 'Agents pour automatiser vos workflows et booster votre productivité',
    icon: '⚙️',
    agents: agentGenesisService.getAgentsByCategory('productivity')
  },
  {
    id: 'ai-assistant',
    name: 'Assistants IA',
    description: 'Chatbots et assistants intelligents pour votre business',
    icon: '🤖',
    agents: agentGenesisService.getAgentsByCategory('ai-assistant')
  },
  {
    id: 'trading',
    name: 'Trading & Finance',
    description: 'Agents spécialisés dans le trading crypto et l\'analyse financière',
    icon: '📈',
    agents: agentGenesisService.getAgentsByCategory('trading')
  },
  {
    id: 'coding',
    name: 'Développement',
    description: 'Outils IA pour les développeurs et la création de code',
    icon: '💻',
    agents: agentGenesisService.getAgentsByCategory('coding')
  },
  {
    id: 'content',
    name: 'Création de Contenu',
    description: 'Agents pour générer du contenu vidéo, texte et visuel',
    icon: '🎨',
    agents: agentGenesisService.getAgentsByCategory('content')
  },
  {
    id: 'security',
    name: 'Sécurité & Gouvernance',
    description: 'Solutions de sécurité IA et gouvernance des systèmes',
    icon: '🛡️',
    agents: agentGenesisService.getAgentsByCategory('security')
  }
]; 