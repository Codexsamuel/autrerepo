import TechnicalCapabilitiesSummary from '@/components/ui/TechnicalCapabilitiesSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Capacités Techniques Avancées | DL Solutions',
  description: 'Découvrez l\'étendue de notre expertise technologique : IA, Blockchain, Cybersécurité, Big Data, Cloud Native, et plus de 20 capacités expertes.',
  keywords: [
    'capacités techniques', 'expertise technologique', 'intelligence artificielle', 'blockchain',
    'cybersécurité', 'big data', 'cloud native', 'microservices', 'devops', 'machine learning',
    'quantum computing', 'osint', 'metaverse', 'web3', 'defi', 'nft', 'zero trust', 'gdpr'
  ],
  openGraph: {
    title: 'Capacités Techniques Avancées | DL Solutions',
    description: 'Plus de 20 capacités techniques expertes : IA, Blockchain, Cybersécurité, Big Data, Cloud Native',
    images: ['/images/technical-capabilities-og.jpg']
  }
}

export default function TechnicalCapabilitiesPage() {
  const capabilities = [
    {
      title: "Intelligence Artificielle",
      description: "Machine Learning, Deep Learning, NLP, Computer Vision",
      icon: "🤖",
      level: 95
    },
    {
      title: "Blockchain & Web3",
      description: "Smart Contracts, DeFi, NFTs, DApps",
      icon: "⛓️",
      level: 90
    },
    {
      title: "Cybersécurité",
      description: "Pentesting, Zero Trust, GDPR, Audit",
      icon: "🔒",
      level: 92
    },
    {
      title: "Big Data & Analytics",
      description: "Data Science, ETL, BI, Predictive Analytics",
      icon: "📊",
      level: 88
    },
    {
      title: "Cloud Native",
      description: "Kubernetes, Docker, Microservices, DevOps",
      icon: "☁️",
      level: 85
    },
    {
      title: "Quantum Computing",
      description: "Algorithmes quantiques, Qiskit, Cryptographie",
      icon: "⚛️",
      level: 75
    },
    {
      title: "OSINT & Investigation",
      description: "Recherche en sources ouvertes, Analyse forensique",
      icon: "🔍",
      level: 87
    },
    {
      title: "Metaverse & VR/AR",
      description: "Développement immersif, 3D, Réalité augmentée",
      icon: "🥽",
      level: 80
    },
    {
      title: "Trading Algorithmique",
      description: "Algorithmes de trading, Analyse technique",
      icon: "📈",
      level: 89
    },
    {
      title: "Scraping & Automation",
      description: "Web Scraping, RPA, Automatisation",
      icon: "🤖",
      level: 93
    },
    {
      title: "Mobile Development",
      description: "React Native, Flutter, iOS, Android",
      icon: "📱",
      level: 86
    },
    {
      title: "Full Stack Development",
      description: "React, Node.js, Python, Databases",
      icon: "💻",
      level: 94
    }
  ];

  return <TechnicalCapabilitiesSummary capabilities={capabilities} />
} 