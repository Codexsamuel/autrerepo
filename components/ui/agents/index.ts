// Agents Premium - Designs Spécialisés par Domaine
export { default as CommercialAgent } from './CommercialAgent';
export { default as ChatAgent } from './ChatAgent';
export { default as DataAnalysisAgent } from './DataAnalysisAgent';

// Types communs pour tous les agents
export interface BaseAgentProps {
  className?: string;
  initialOpen?: boolean;
}

export interface AgentMetrics {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  unit: string;
}

export interface AgentStatus {
  isOnline: boolean;
  lastActivity: Date;
  performance: number;
  errors: number;
  warnings: number;
}

// Configuration des thèmes par agent
export const AGENT_THEMES = {
  commercial: {
    primary: 'emerald',
    secondary: 'blue',
    accent: 'purple',
    background: 'from-emerald-900 via-blue-900 to-purple-900'
  },
  chat: {
    primary: 'blue',
    secondary: 'indigo',
    accent: 'purple',
    background: 'from-blue-900 via-indigo-900 to-purple-900'
  },
  dataAnalysis: {
    primary: 'slate',
    secondary: 'gray',
    accent: 'zinc',
    background: 'from-slate-900 via-gray-900 to-zinc-900'
  }
} as const;

// Métadonnées des agents
export const AGENT_METADATA = {
  commercial: {
    name: 'Agent Commercial Premium',
    description: 'Gestion commerciale intelligente & Marketing automatisé',
    icon: 'Crown',
    category: 'business',
    features: ['CRM', 'Marketing', 'Ventes', 'Analytics', 'Automatisation']
  },
  chat: {
    name: 'Agent de Chat Premium',
    description: 'Communication intelligente & Support client avancé',
    icon: 'MessageCircle',
    category: 'communication',
    features: ['Chat', 'Support', 'IA', 'Multilingue', 'Analytics']
  },
  dataAnalysis: {
    name: 'Agent d\'Analyse de Données',
    description: 'Intelligence artificielle & Analytics avancés',
    icon: 'Database',
    category: 'analytics',
    features: ['Big Data', 'ML', 'Visualisation', 'Insights', 'Prédictions']
  }
} as const; 