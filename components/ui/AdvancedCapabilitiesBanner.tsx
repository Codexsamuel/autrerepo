'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
    Atom,
    Award,
    BarChart3,
    Bot,
    Brain,
    Building2,
    Cloud,
    Code,
    Crown,
    Globe,
    Lock,
    Monitor,
    Network,
    Palette,
    Rocket,
    Search,
    Server,
    Shield,
    ShoppingCart,
    Smartphone,
    Sparkles,
    Star as StarIcon,
    Target,
    TrendingUp,
    Trophy,
    Users,
    Zap
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface Capability {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: string
  level: 'basic' | 'advanced' | 'expert' | 'cutting-edge'
  tech: string[]
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
    tech: ['GPT-4', 'Claude', 'Gemini', 'Deep Learning', 'NLP']
  },
  {
    id: 'quantum-intelligence',
    name: 'Intelligence Quantique',
    description: 'Analyse prédictive basée sur la simulation quantique',
    icon: Atom,
    category: 'Intelligence Artificielle',
    level: 'cutting-edge',
    tech: ['Quantum Computing', 'Predictive Analytics', 'AI Models']
  },
  {
    id: 'osint-advanced',
    name: 'OSINT Avancé',
    description: 'Recherche d\'intelligence en sources ouvertes multi-sources',
    icon: Search,
    category: 'Cybersécurité',
    level: 'expert',
    tech: ['OSINT', 'Web Scraping', 'Data Mining', 'Sentiment Analysis']
  },
  {
    id: 'metaverse-blockchain',
    name: 'Métaverse & Blockchain',
    description: 'Analyse complète des écosystèmes Web3 et DeFi',
    icon: Globe,
    category: 'Blockchain',
    level: 'expert',
    tech: ['Blockchain', 'DeFi', 'NFT', 'Web3', 'Smart Contracts']
  },
  {
    id: 'dl-bot-advanced',
    name: 'DL Bot Avancé',
    description: 'Analyseur de code et extraction de données complexes',
    icon: Bot,
    category: 'Développement',
    level: 'expert',
    tech: ['Code Analysis', 'Git Integration', 'Data Extraction', 'AI']
  },

  // Infrastructure & Performance
  {
    id: 'real-time-processing',
    name: 'Traitement Temps Réel',
    description: 'Analyse et traitement de données en temps réel',
    icon: Zap,
    category: 'Performance',
    level: 'advanced',
    tech: ['Real-time', 'WebSockets', 'Event Streaming', 'Redis']
  },
  {
    id: 'microservices',
    name: 'Architecture Microservices',
    description: 'Services modulaires et scalables',
    icon: Server,
    category: 'Architecture',
    level: 'advanced',
    tech: ['Microservices', 'Docker', 'Kubernetes', 'API Gateway']
  },
  {
    id: 'cloud-native',
    name: 'Cloud Native',
    description: 'Application native cloud avec haute disponibilité',
    icon: Cloud,
    category: 'Infrastructure',
    level: 'advanced',
    tech: ['AWS', 'Azure', 'GCP', 'Serverless', 'CDN']
  },

  // Security & Compliance
  {
    id: 'zero-trust',
    name: 'Sécurité Zero Trust',
    description: 'Architecture de sécurité sans confiance a priori',
    icon: Shield,
    category: 'Sécurité',
    level: 'expert',
    tech: ['Zero Trust', 'MFA', 'IAM', 'Encryption', 'Audit']
  },
  {
    id: 'gdpr-compliance',
    name: 'Conformité RGPD',
    description: 'Protection des données personnelles complète',
    icon: Lock,
    category: 'Conformité',
    level: 'advanced',
    tech: ['GDPR', 'Data Protection', 'Privacy', 'Consent Management']
  },
  {
    id: 'penetration-testing',
    name: 'Tests de Pénétration',
    description: 'Audit de sécurité automatisé et manuel',
    icon: Target,
    category: 'Sécurité',
    level: 'expert',
    tech: ['Penetration Testing', 'Vulnerability Assessment', 'Security Audit']
  },

  // Data & Analytics
  {
    id: 'big-data',
    name: 'Big Data Analytics',
    description: 'Analyse de données massives en temps réel',
    icon: BarChart3,
    category: 'Analytics',
    level: 'advanced',
    tech: ['Big Data', 'Hadoop', 'Spark', 'Kafka', 'Elasticsearch']
  },
  {
    id: 'predictive-analytics',
    name: 'Analytics Prédictif',
    description: 'Prédictions basées sur l\'IA et le machine learning',
    icon: TrendingUp,
    category: 'Analytics',
    level: 'expert',
    tech: ['Predictive Analytics', 'ML Models', 'Statistical Analysis']
  },
  {
    id: 'data-visualization',
    name: 'Visualisation Avancée',
    description: 'Tableaux de bord interactifs et dynamiques',
    icon: Palette,
    category: 'Analytics',
    level: 'advanced',
    tech: ['D3.js', 'Chart.js', 'Interactive Dashboards', 'Real-time Charts']
  },

  // Business Solutions
  {
    id: 'crm-enterprise',
    name: 'CRM Entreprise',
    description: 'Gestion de la relation client complète',
    icon: Users,
    category: 'Business',
    level: 'advanced',
    tech: ['CRM', 'Salesforce', 'HubSpot', 'Customer Analytics']
  },
  {
    id: 'erp-integration',
    name: 'Intégration ERP',
    description: 'Système de gestion intégré des ressources',
    icon: Building2,
    category: 'Business',
    level: 'advanced',
    tech: ['ERP', 'SAP', 'Oracle', 'Business Intelligence']
  },
  {
    id: 'ecommerce-platform',
    name: 'Plateforme E-commerce',
    description: 'Boutique en ligne multi-marchés',
    icon: ShoppingCart,
    category: 'E-commerce',
    level: 'advanced',
    tech: ['E-commerce', 'Payment Gateway', 'Inventory Management', 'Multi-market']
  },

  // Development & DevOps
  {
    id: 'ci-cd',
    name: 'CI/CD Pipeline',
    description: 'Intégration et déploiement continu',
    icon: Rocket,
    category: 'DevOps',
    level: 'advanced',
    tech: ['CI/CD', 'Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes']
  },
  {
    id: 'code-quality',
    name: 'Qualité de Code',
    description: 'Standards de développement élevés',
    icon: Code,
    category: 'Développement',
    level: 'advanced',
    tech: ['Code Quality', 'Testing', 'Code Review', 'Static Analysis']
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    description: 'Gestion centralisée des APIs',
    icon: Network,
    category: 'Architecture',
    level: 'advanced',
    tech: ['API Gateway', 'Rate Limiting', 'Authentication', 'Load Balancing']
  },

  // Mobile & Cross-platform
  {
    id: 'progressive-web-app',
    name: 'Progressive Web App',
    description: 'Application web progressive avec fonctionnalités natives',
    icon: Smartphone,
    category: 'Mobile',
    level: 'advanced',
    tech: ['PWA', 'Service Workers', 'Offline Support', 'Push Notifications']
  },
  {
    id: 'responsive-design',
    name: 'Design Responsive',
    description: 'Interface adaptative multi-appareils',
    icon: Monitor,
    category: 'UI/UX',
    level: 'advanced',
    tech: ['Responsive Design', 'Mobile First', 'Cross-browser', 'Accessibility']
  },

  // Advanced Features
  {
    id: 'real-time-collaboration',
    name: 'Collaboration Temps Réel',
    description: 'Travail collaboratif en temps réel',
    icon: Users,
    category: 'Collaboration',
    level: 'advanced',
    tech: ['WebRTC', 'WebSockets', 'Real-time Collaboration', 'Document Sharing']
  },
  {
    id: 'workflow-automation',
    name: 'Automatisation des Processus',
    description: 'Automatisation intelligente des workflows',
    icon: Zap,
    category: 'Automatisation',
    level: 'advanced',
    tech: ['Workflow Automation', 'RPA', 'Business Process Management']
  },
  {
    id: 'multi-language',
    name: 'Support Multi-langues',
    description: 'Interface en 4 langues avec localisation',
    icon: Globe,
    category: 'Internationalisation',
    level: 'advanced',
    tech: ['i18n', 'Localization', 'RTL Support', 'Cultural Adaptation']
  }
]

const levelColors = {
  basic: 'bg-green-100 text-green-800 border-green-200',
  advanced: 'bg-blue-100 text-blue-800 border-blue-200',
  expert: 'bg-purple-100 text-purple-800 border-purple-200',
  'cutting-edge': 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200'
}

const levelIcons = {
  basic: StarIcon,
  advanced: Award,
  expert: Trophy,
  'cutting-edge': Crown
}

export default function AdvancedCapabilitiesBanner() {
  const [currentCapability, setCurrentCapability] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCapability((prev) => (prev + 1) % capabilities.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const current = capabilities[currentCapability]
  const LevelIcon = levelIcons[current.level]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white shadow-2xl border-b border-blue-500/30"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo et titre */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DL Solutions
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
                  <span>•</span>
                  <span>Plateforme Technologique Avancée</span>
                  <span>•</span>
                  <span>{capabilities.length} Capacités Expertes</span>
                </div>
              </div>

              {/* Capacité actuelle */}
              <div className="flex-1 mx-8">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <current.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-semibold text-sm">{current.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${levelColors[current.level]}`}>
                          <LevelIcon className="w-3 h-3 inline mr-1" />
                          {current.level.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 max-w-md truncate">{current.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Technologies */}
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-xs text-gray-400">Tech:</span>
                <div className="flex space-x-1">
                  {current.tech.slice(0, 3).map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-2 py-1 bg-blue-500/20 rounded text-xs border border-blue-500/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {current.tech.length > 3 && (
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs border border-purple-500/30">
                      +{current.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bouton fermer */}
              <button
                onClick={() => setIsVisible(false)}
                className="ml-4 p-1 hover:bg-white/10 rounded transition-colors"
              >
                <span className="text-gray-400 hover:text-white">×</span>
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "linear" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
} 