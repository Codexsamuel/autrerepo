import { LucideIcon } from 'lucide-react';

// Types génériques pour les fonctionnalités
export interface Feature {
  title: string;
  icon: LucideIcon;
  description: string;
}

// Type pour les insights IA
export interface AiInsights {
  websiteAnalysis: {
    industry: string;
    tone: string;
    colors: string[];
    keywords: string[];
    competitors: string[];
  };
  recommendations: {
    seo: string[];
    content: string[];
    design: string[];
    marketing: string[];
  };
  marketAnalysis: {
    trends: string[];
    opportunities: string[];
    threats: string[];
  };
}

// Type pour les activités IA
export interface AiActivity {
  id: string;
  type: string;
  action: string;
  status: string;
  timestamp?: string;
  details: string;
  platform: string;
  performance: {
    views?: number;
    likes?: number;
    shares?: number;
    roi_improvement?: number;
    budget_saved?: number;
  } | null;
}

// Type pour les campagnes
export interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: string;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  budget: number;
  spent: number;
  roi: number;
  createdBy: string;
  content: {
    type: string;
    title?: string;
    description: string;
    thumbnail: string;
  };
}

// Type pour les données de formulaire
export interface FormData {
  companyName: string;
  website: string;
  strategy: string;
  objectives: string;
  vision: string;
  mission: string;
  targetAudience: string;
  budget: string;
  platforms: string[];
}

// Configuration des icônes disponibles
export const AVAILABLE_ICONS = {
  AlertTriangle: 'AlertTriangle',
  ArrowLeft: 'ArrowLeft',
  Bot: 'Bot',
  DollarSign: 'DollarSign',
  HardHat: 'HardHat',
  Mountain: 'Mountain',
  Package: 'Package',
  Shield: 'Shield',
  TrendingUp: 'TrendingUp',
  Truck: 'Truck',
  Users: 'Users',
  Zap: 'Zap',
} as const;

// Type pour les statistiques
export interface Stats {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
} 