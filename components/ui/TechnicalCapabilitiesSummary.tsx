'use client'

import { motion } from 'framer-motion'
import {
    ArrowRight,
    Atom,
    Award,
    BarChart3,
    Bot,
    Brain,
    Building2,
    CheckCircle,
    Cloud,
    Code,
    Crown,
    Globe,
    Lock,
    Rocket,
    Search,
    Server,
    Shield,
    ShoppingCart,
    Sparkles,
    Star,
    TrendingUp,
    Trophy,
    Users,
    Zap
} from 'lucide-react'
import { useState } from 'react'

interface Capability {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: string
  level: 'basic' | 'advanced' | 'expert' | 'cutting-edge'
  tech: string[]
  features: string[]
  benefits: string[]
}

const capabilities: Capability[] = [
  // AI & Machine Learning
  {
    id: 'ultra-ai',
    name: 'Ultra AI Chatbot',
    description: 'IA conversationnelle multi-dimensionnelle avec apprentissage automatique',
    icon: Brain,
    category: 'Intelligence Artificielle',
    level: 'cutting-edge',
    tech: ['GPT-4', 'Claude', 'Gemini', 'Deep Learning', 'NLP'],
    features: ['Conversation naturelle', 'Apprentissage continu', 'Multi-langues', 'Contexte persistant'],
    benefits: ['Support client 24/7', 'Réponses instantanées', 'Réduction des coûts', 'Satisfaction client']
  },
  {
    id: 'quantum-intelligence',
    name: 'Intelligence Quantique',
    description: 'Analyse prédictive basée sur la simulation quantique',
    icon: Atom,
    category: 'Intelligence Artificielle',
    level: 'cutting-edge',
    tech: ['Quantum Computing', 'Predictive Analytics', 'AI Models'],
    features: ['Simulation quantique', 'Prédictions avancées', 'Analyse de risques', 'Optimisation'],
    benefits: ['Décisions éclairées', 'Anticipation des tendances', 'Réduction des risques', 'Avantage concurrentiel']
  },
  {
    id: 'osint-advanced',
    name: 'OSINT Avancé',
    description: 'Recherche d\'intelligence en sources ouvertes multi-sources',
    icon: Search,
    category: 'Cybersécurité',
    level: 'expert',
    tech: ['OSINT', 'Web Scraping', 'Data Mining', 'Sentiment Analysis'],
    features: ['Recherche multi-sources', 'Analyse de sentiment', 'Veille concurrentielle', 'Détection de menaces'],
    benefits: ['Intelligence business', 'Sécurité proactive', 'Veille stratégique', 'Conformité']
  },
  {
    id: 'metaverse-blockchain',
    name: 'Métaverse & Blockchain',
    description: 'Analyse complète des écosystèmes Web3 et DeFi',
    icon: Globe,
    category: 'Blockchain',
    level: 'expert',
    tech: ['Blockchain', 'DeFi', 'NFT', 'Web3', 'Smart Contracts'],
    features: ['Analyse DeFi', 'Tracking NFT', 'Smart contracts', 'Web3 integration'],
    benefits: ['Innovation technologique', 'Nouveaux marchés', 'Transparence', 'Efficacité']
  },
  {
    id: 'dl-bot-advanced',
    name: 'DL Bot Avancé',
    description: 'Analyseur de code et extraction de données complexes',
    icon: Bot,
    category: 'Développement',
    level: 'expert',
    tech: ['Code Analysis', 'Git Integration', 'Data Extraction', 'AI'],
    features: ['Analyse de code', 'Extraction Git', 'Détection de patterns', 'Documentation auto'],
    benefits: ['Qualité de code', 'Productivité dev', 'Maintenance facilitée', 'Standards élevés']
  },

  // Infrastructure & Performance
  {
    id: 'real-time-processing',
    name: 'Traitement Temps Réel',
    description: 'Analyse et traitement de données en temps réel',
    icon: Zap,
    category: 'Performance',
    level: 'advanced',
    tech: ['Real-time', 'WebSockets', 'Event Streaming', 'Redis'],
    features: ['Streaming temps réel', 'Notifications push', 'Mise à jour live', 'Synchronisation'],
    benefits: ['Réactivité maximale', 'Expérience utilisateur', 'Décisions instantanées', 'Efficacité opérationnelle']
  },
  {
    id: 'microservices',
    name: 'Architecture Microservices',
    description: 'Services modulaires et scalables',
    icon: Server,
    category: 'Architecture',
    level: 'advanced',
    tech: ['Microservices', 'Docker', 'Kubernetes', 'API Gateway'],
    features: ['Services indépendants', 'Scalabilité horizontale', 'Déploiement isolé', 'Résilience'],
    benefits: ['Flexibilité', 'Maintenance facilitée', 'Performance optimale', 'Évolutivité']
  },
  {
    id: 'cloud-native',
    name: 'Cloud Native',
    description: 'Application native cloud avec haute disponibilité',
    icon: Cloud,
    category: 'Infrastructure',
    level: 'advanced',
    tech: ['AWS', 'Azure', 'GCP', 'Serverless', 'CDN'],
    features: ['Haute disponibilité', 'Auto-scaling', 'Backup automatique', 'CDN global'],
    benefits: ['Fiabilité maximale', 'Coûts optimisés', 'Performance globale', 'Sécurité renforcée']
  },

  // Security & Compliance
  {
    id: 'zero-trust',
    name: 'Sécurité Zero Trust',
    description: 'Architecture de sécurité sans confiance a priori',
    icon: Shield,
    category: 'Sécurité',
    level: 'expert',
    tech: ['Zero Trust', 'MFA', 'IAM', 'Encryption', 'Audit'],
    features: ['Authentification multi-facteurs', 'Chiffrement end-to-end', 'Audit continu', 'Contrôle d\'accès'],
    benefits: ['Sécurité maximale', 'Conformité réglementaire', 'Protection des données', 'Confiance client']
  },
  {
    id: 'gdpr-compliance',
    name: 'Conformité RGPD',
    description: 'Protection des données personnelles complète',
    icon: Lock,
    category: 'Conformité',
    level: 'advanced',
    tech: ['GDPR', 'Data Protection', 'Privacy', 'Consent Management'],
    features: ['Gestion du consentement', 'Portabilité des données', 'Droit à l\'oubli', 'Audit de conformité'],
    benefits: ['Conformité légale', 'Confiance utilisateur', 'Réputation', 'Évite les sanctions']
  },

  // Data & Analytics
  {
    id: 'big-data',
    name: 'Big Data Analytics',
    description: 'Analyse de données massives en temps réel',
    icon: BarChart3,
    category: 'Analytics',
    level: 'advanced',
    tech: ['Big Data', 'Hadoop', 'Spark', 'Kafka', 'Elasticsearch'],
    features: ['Traitement massif', 'Analyse temps réel', 'Recherche avancée', 'Visualisation'],
    benefits: ['Insights précieux', 'Décisions data-driven', 'Optimisation business', 'Avantage concurrentiel']
  },
  {
    id: 'predictive-analytics',
    name: 'Analytics Prédictif',
    description: 'Prédictions basées sur l\'IA et le machine learning',
    icon: TrendingUp,
    category: 'Analytics',
    level: 'expert',
    tech: ['Predictive Analytics', 'ML Models', 'Statistical Analysis'],
    features: ['Modèles prédictifs', 'Forecasting', 'Détection d\'anomalies', 'Optimisation'],
    benefits: ['Anticipation', 'Réduction des risques', 'Optimisation des ressources', 'ROI amélioré']
  },

  // Business Solutions
  {
    id: 'crm-enterprise',
    name: 'CRM Entreprise',
    description: 'Gestion de la relation client complète',
    icon: Users,
    category: 'Business',
    level: 'advanced',
    tech: ['CRM', 'Salesforce', 'HubSpot', 'Customer Analytics'],
    features: ['Gestion clients', 'Pipeline ventes', 'Marketing automation', 'Analytics client'],
    benefits: ['Fidélisation client', 'Augmentation ventes', 'Efficacité commerciale', 'ROI marketing']
  },
  {
    id: 'ecommerce-platform',
    name: 'Plateforme E-commerce',
    description: 'Boutique en ligne multi-marchés',
    icon: ShoppingCart,
    category: 'E-commerce',
    level: 'advanced',
    tech: ['E-commerce', 'Payment Gateway', 'Inventory Management', 'Multi-market'],
    features: ['Multi-devises', 'Multi-langues', 'Gestion stocks', 'Paiements sécurisés'],
    benefits: ['Reach global', 'Conversion optimisée', 'Gestion simplifiée', 'Croissance business']
  },

  // Development & DevOps
  {
    id: 'ci-cd',
    name: 'CI/CD Pipeline',
    description: 'Intégration et déploiement continu',
    icon: Rocket,
    category: 'DevOps',
    level: 'advanced',
    tech: ['CI/CD', 'Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes'],
    features: ['Déploiement automatique', 'Tests automatisés', 'Rollback rapide', 'Monitoring'],
    benefits: ['Time-to-market réduit', 'Qualité améliorée', 'Risques minimisés', 'Productivité équipe']
  }
]

const levelColors = {
  basic: 'bg-green-100 text-green-800 border-green-200',
  advanced: 'bg-blue-100 text-blue-800 border-blue-200',
  expert: 'bg-purple-100 text-purple-800 border-purple-200',
  'cutting-edge': 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200'
}

const levelIcons = {
  basic: Star,
  advanced: Award,
  expert: Trophy,
  'cutting-edge': Crown
}

const categories = [
  { id: 'ai', name: 'Intelligence Artificielle', icon: Brain, color: 'from-purple-500 to-pink-500' },
  { id: 'security', name: 'Sécurité & Conformité', icon: Shield, color: 'from-red-500 to-orange-500' },
  { id: 'infrastructure', name: 'Infrastructure', icon: Server, color: 'from-blue-500 to-cyan-500' },
  { id: 'analytics', name: 'Analytics & Data', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
  { id: 'business', name: 'Solutions Business', icon: Building2, color: 'from-indigo-500 to-purple-500' },
  { id: 'devops', name: 'DevOps & Développement', icon: Code, color: 'from-gray-500 to-slate-500' }
]

export default function TechnicalCapabilitiesSummary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null)

  const filteredCapabilities = selectedCategory === 'all' 
    ? capabilities 
    : capabilities.filter(cap => {
        const category = categories.find(cat => cat.id === selectedCategory)
        return category && cap.category.includes(category.name.split(' ')[0])
      })

  const stats = {
    total: capabilities.length,
    cuttingEdge: capabilities.filter(c => c.level === 'cutting-edge').length,
    expert: capabilities.filter(c => c.level === 'expert').length,
    advanced: capabilities.filter(c => c.level === 'advanced').length,
    technologies: [...new Set(capabilities.flatMap(c => c.tech))].length
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Capacités Techniques Avancées
            </h1>
          </motion.div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez l'étendue de notre expertise technologique et de nos capacités de développement
          </p>
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-300">Capacités</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-red-400">{stats.cuttingEdge}</div>
            <div className="text-sm text-gray-300">Cutting-Edge</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-purple-400">{stats.expert}</div>
            <div className="text-sm text-gray-300">Expert</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-green-400">{stats.advanced}</div>
            <div className="text-sm text-gray-300">Avancé</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-cyan-400">{stats.technologies}</div>
            <div className="text-sm text-gray-300">Technologies</div>
          </div>
        </motion.div>

        {/* Filtres par catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Toutes ({stats.total})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Grille des capacités */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCapabilities.map((capability, index) => {
            const LevelIcon = levelIcons[capability.level]
            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-blue-500/50 transition-all cursor-pointer group"
                onClick={() => setSelectedCapability(capability)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <capability.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${levelColors[capability.level]}`}>
                    <LevelIcon className="w-3 h-3 inline mr-1" />
                    {capability.level.replace('-', ' ')}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {capability.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {capability.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {capability.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-500/20 rounded text-xs border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {capability.tech.length > 3 && (
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs border border-purple-500/30">
                      +{capability.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Modal de détail */}
      {selectedCapability && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCapability(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <selectedCapability.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCapability.name}</h2>
                  <p className="text-gray-300">{selectedCapability.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCapability(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Technologies</h3>
                <div className="space-y-2">
                  {selectedCapability.tech.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-400">Fonctionnalités</h3>
                <div className="space-y-2">
                  {selectedCapability.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bénéfices */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-400">Bénéfices</h3>
                <div className="space-y-2">
                  {selectedCapability.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 