// Configuration SEO centralisée pour DL Solutions
// Optimisation pour les mots-clés : DL Solutions, Davy, Lucie, Batobaye, marketplace, vente en ligne

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  type: 'website' | 'article' | 'product' | 'organization' | 'course' | 'event' | 'person' | 'localBusiness';
  breadcrumbs: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  favicon?: string;
  logo?: string;
  structuredData?: any; // Données structurées Schema.org
}

// Mots-clés principaux pour DL Solutions
const PRIMARY_KEYWORDS = [
  'DL Solutions',
  'Davy',
  'Lucie',
  'Dave and Luce Solutions',
  'solutions digitales',
  'transformation numérique',
  'Cameroun',
  'Yaoundé',
  'Batobaye',
  'Batobaye Market',
  'marketplace',
  'vente en ligne',
  'e-commerce',
  'boutique en ligne',
  'marketing digital'
];

// Mots-clés IA ultra-avancés pour SEO
const AI_ULTRA_ADVANCED_KEYWORDS = [
  // Agents IA principaux
  'Sentinel Zero',
  'NovaIA',
  'NovaCore',
  'Agent Genesis',
  'Ultra AI',
  'Super Agent IA',
  'IA militaire',
  'IA souveraine',
  'IA offensive',
  'IA défensive',
  
  // Capacités IA
  'Intelligence multicanal',
  'Auto-apprentissage',
  'Réseau d\'agents distribués',
  'Guerre asymétrique numérique',
  'Mémoire vectorielle',
  'Mode létal simulation',
  'Armes logicielles',
  'Surveillance IA',
  'Infiltration OSINT',
  'Shadow Agent',
  
  // Technologies IA
  'LangChain',
  'OpenAI GPT-4',
  'GPT-4 Turbo',
  'Claude AI',
  'Gemini AI',
  'Mistral AI',
  'DeepSeek',
  'Vector Database',
  'Supabase Vector',
  'Pinecone',
  'Qdrant',
  
  // Applications IA
  'IA militaire',
  'IA sécurité',
  'IA cybersécurité',
  'IA reconnaissance',
  'IA neutralisation',
  'IA infiltration',
  'IA destruction',
  'IA désactivation',
  'IA surveillance',
  'IA protection',
  
  // Secteurs d'application
  'IA gouvernementale',
  'IA défense',
  'IA sécurité nationale',
  'IA infrastructure critique',
  'IA réseau',
  'IA système',
  'IA application',
  'IA base de données',
  'IA cloud',
  'IA edge computing',
  
  // Fonctionnalités avancées
  'ELO Rating',
  'Battle Arena',
  'A2A Protocol',
  'MCP Protocol',
  'Agent-to-Agent',
  'Model Context Protocol',
  'Orchestration IA',
  'LangGraph',
  'CrewAI',
  'Superagent',
  'AgentGPT',
  'AutoGen',
  'ReAct',
  'Temporal.io',
  
  // Capacités spécialisées
  'Drone Builder IA',
  'G-code Generator',
  'Firmware Generator',
  'Mission Generator',
  'Red Team Simulator',
  'Blue Team Mode',
  'Tactical Map',
  'Real-time Monitoring',
  'Threat Intelligence',
  'OSINT Engine',
  'Darknet Monitoring',
  'Honeypot',
  'Sandbox',
  'Firewall IA',
  'VPN IA',
  'HTTPS IA',
  'ClamAV IA',
  'Trivy IA',
  
  // Intégrations
  'ElevenLabs',
  'Voice AI',
  'Vision AI',
  'Audio Processing',
  'Video Processing',
  'Image Recognition',
  'Object Detection',
  'Face Recognition',
  'Speech Recognition',
  'Natural Language Processing',
  
  // Sécurité avancée
  'MITRE ATT&CK',
  'DARPA Datasets',
  'FSB Tactics',
  'Fail2ban',
  'Zero-Day Exploits',
  'Penetration Testing',
  'Vulnerability Assessment',
  'Security Scanning',
  'Incident Response',
  'Forensic Analysis',
  
  // Déploiement et infrastructure
  'Docker',
  'SOPS',
  'Vault',
  'Airgap',
  'Offline Systems',
  'Bootable ISO',
  'Sovereign AI',
  'Military Grade',
  'Production Ready',
  'Enterprise Grade'
];

// Mots-clés IA ultra-avancés pour SEO
const AI_ULTRA_ADVANCED_KEYWORDS = [
  // Agents IA principaux
  'Sentinel Zero',
  'NovaIA',
  'NovaCore',
  'Agent Genesis',
  'Ultra AI',
  'Super Agent IA',
  'IA militaire',
  'IA souveraine',
  'IA offensive',
  'IA défensive',
  
  // Capacités IA
  'Intelligence multicanal',
  'Auto-apprentissage',
  'Réseau d\'agents distribués',
  'Guerre asymétrique numérique',
  'Mémoire vectorielle',
  'Mode létal simulation',
  'Armes logicielles',
  'Surveillance IA',
  'Infiltration OSINT',
  'Shadow Agent',
  
  // Technologies IA
  'LangChain',
  'OpenAI GPT-4',
  'GPT-4 Turbo',
  'Claude AI',
  'Gemini AI',
  'Mistral AI',
  'DeepSeek',
  'Vector Database',
  'Supabase Vector',
  'Pinecone',
  'Qdrant',
  
  // Applications IA
  'IA militaire',
  'IA sécurité',
  'IA cybersécurité',
  'IA reconnaissance',
  'IA neutralisation',
  'IA infiltration',
  'IA destruction',
  'IA désactivation',
  'IA surveillance',
  'IA protection',
  
  // Secteurs d'application
  'IA gouvernementale',
  'IA défense',
  'IA sécurité nationale',
  'IA infrastructure critique',
  'IA réseau',
  'IA système',
  'IA application',
  'IA base de données',
  'IA cloud',
  'IA edge computing',
  
  // Fonctionnalités avancées
  'ELO Rating',
  'Battle Arena',
  'A2A Protocol',
  'MCP Protocol',
  'Agent-to-Agent',
  'Model Context Protocol',
  'Orchestration IA',
  'LangGraph',
  'CrewAI',
  'Superagent',
  'AgentGPT',
  'AutoGen',
  'ReAct',
  'Temporal.io',
  
  // Capacités spécialisées
  'Drone Builder IA',
  'G-code Generator',
  'Firmware Generator',
  'Mission Generator',
  'Red Team Simulator',
  'Blue Team Mode',
  'Tactical Map',
  'Real-time Monitoring',
  'Threat Intelligence',
  'OSINT Engine',
  'Darknet Monitoring',
  'Honeypot',
  'Sandbox',
  'Firewall IA',
  'VPN IA',
  'HTTPS IA',
  'ClamAV IA',
  'Trivy IA',
  
  // Intégrations
  'ElevenLabs',
  'Voice AI',
  'Vision AI',
  'Audio Processing',
  'Video Processing',
  'Image Recognition',
  'Object Detection',
  'Face Recognition',
  'Speech Recognition',
  'Natural Language Processing',
  
  // Sécurité avancée
  'MITRE ATT&CK',
  'DARPA Datasets',
  'FSB Tactics',
  'Fail2ban',
  'Zero-Day Exploits',
  'Penetration Testing',
  'Vulnerability Assessment',
  'Security Scanning',
  'Incident Response',
  'Forensic Analysis',
  
  // Déploiement et infrastructure
  'Docker',
  'SOPS',
  'Vault',
  'Airgap',
  'Offline Systems',
  'Bootable ISO',
  'Sovereign AI',
  'Military Grade',
  'Production Ready',
  'Enterprise Grade'
];

// Mots-clés secondaires par secteur
const SECTOR_KEYWORDS = {
  crm: ['CRM', 'gestion client', 'relation client', 'automatisation'],
  erp: ['ERP', 'gestion entreprise', 'planification ressources', 'système intégré'],
  ecommerce: [
    'e-commerce', 
    'boutique en ligne', 
    'vente en ligne', 
    'DL Style',
    'marketplace',
    'plateforme de vente',
    'commerce électronique',
    'paiement en ligne',
    'CinetPay',
    'livraison',
    'gestion des commandes'
  ],
  batobaye: [
    'Batobaye',
    'Batobaye Market',
    'Batobaye E-commerce',
    'marketplace Cameroun',
    'boutique en ligne Cameroun',
    'vente en ligne Cameroun',
    'e-commerce Cameroun',
    'plateforme de vente Cameroun',
    'commerce électronique Cameroun',
    'paiement CinetPay',
    'livraison Cameroun',
    'dashboard admin',
    'gestion produits',
    'inventaire en ligne',
    'analytics e-commerce',
    'IA e-commerce',
    'OpenAI e-commerce',
    'Sage Compta',
    'intégration ERP'
  ],
  formation: ['formation', 'formation professionnelle', 'certification', 'apprentissage'],
  ia: ['intelligence artificielle', 'IA', 'machine learning', 'automatisation', 'OpenAI', 'GPT-4'],
  web: ['développement web', 'site web', 'application web', 'programmation', 'Next.js', 'React'],
  mobile: ['application mobile', 'app mobile', 'développement mobile', 'iOS', 'Android'],
  marketing: [
    'marketing digital', 
    'SEO', 
    'réseaux sociaux', 
    'publicité en ligne',
    'marketing en ligne',
    'stratégie marketing',
    'campagne publicitaire',
    'référencement naturel',
    'Google Ads',
    'Facebook Ads',
    'Instagram marketing'
  ],
  trading: ['trading', 'investissement', 'finance', 'marchés financiers'],
  novaworld: ['NovaWorld', 'réseau social', 'networking', 'collaboration'],
  novacore: ['NovaCore', 'plateforme', 'écosystème', 'intégration']
};

// Configuration SEO par page
export const SEO_CONFIGS: Record<string, SEOConfig> = {
  // Page d'accueil
  home: {
    title: 'DL Solutions - Écosystème Digital Complet | Marketplace & IA Ultra-Avancée | Davy & Lucie',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, IA ultra-avancée Sentinel Zero, NovaIA Ecosystem. Solutions innovantes au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.slice(0, 20).join(', ')}, écosystème digital, CRM, ERP, boutique, formations, Cameroun, Yaoundé, Davy, Lucie, Dave and Luce, marketplace, vente en ligne, marketing digital`,
    image: 'https://dlsolutions.com/images/og-home.jpg',
    url: 'https://dlsolutions.com',
    type: 'website',
    breadcrumbs: [{ name: 'Accueil', url: 'https://dlsolutions.com' }],
    priority: 1.0,
    changeFreq: 'daily',
    favicon: '/favicon-circular.svg',
    logo: '/favicon-circular.svg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DL Solutions",
      "alternateName": "Dave and Luce Solutions",
      "url": "https://daveandlucesolutions.com",
      "logo": "https://daveandlucesolutions.com/favicon-circular.svg",
      "description": "Écosystème digital complet avec marketplace Batobaye et IA ultra-avancée Sentinel Zero",
      "foundingDate": "2024",
      "founder": [
        { "@type": "Person", "name": "Davy" },
        { "@type": "Person", "name": "Lucie" }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CM",
        "addressLocality": "Yaoundé"
      },
      "sameAs": [
        "https://github.com/Codexsamuel/autrerepo"
      ]
    }
  },

  // NovaIA - Écosystème IA
  'nova-ia': {
    title: 'NovaIA Ecosystem - IA Ultra-Avancée & Agents Militaires | Sentinel Zero | DL Solutions',
    description: 'NovaIA Ecosystem par DL Solutions - IA ultra-avancée avec Sentinel Zero, agents militaires, ELO Rating, Battle Arena. Écosystème IA souverain et production-ready.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.join(', ')}, NovaIA, Sentinel Zero, IA militaire, IA souveraine, ELO Rating, Battle Arena, agents IA, écosystème IA`,
    image: 'https://dlsolutions.com/images/nova-ia-ecosystem.jpg',
    url: 'https://dlsolutions.com/nova-ia',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'NovaIA Ecosystem', url: 'https://dlsolutions.com/nova-ia' }
    ],
    priority: 0.95,
    changeFreq: 'hourly',
    faq: [
      {
        question: 'Qu\'est-ce que NovaIA Ecosystem ?',
        answer: 'NovaIA Ecosystem est une plateforme d\'IA ultra-avancée développée par DL Solutions, incluant Sentinel Zero (IA militaire), ELO Rating, Battle Arena, et des agents IA distribués.'
      },
      {
        question: 'Qu\'est-ce que Sentinel Zero ?',
        answer: 'Sentinel Zero est un Super Agent IA militaire avec autorisation spéciale, capable d\'identifier, infiltrer, neutraliser, détruire ou désactiver des infrastructures numériques ennemies.'
      },
      {
        question: 'Comment fonctionne l\'ELO Rating ?',
        answer: 'L\'ELO Rating classe les agents IA selon leurs performances dans des batailles virtuelles, permettant de mesurer leur efficacité et de les améliorer continuellement.'
      },
      {
        question: 'Quelles sont les capacités de NovaIA ?',
        answer: 'Intelligence multicanal, auto-apprentissage, réseau d\'agents distribués, guerre asymétrique numérique, mémoire vectorielle, mode létal simulation, armes logicielles.'
      }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "NovaIA Ecosystem",
      "applicationCategory": "Artificial Intelligence",
      "operatingSystem": "Web Browser",
      "url": "https://daveandlucesolutions.com/nova-ia",
      "description": "Écosystème d'IA ultra-avancée avec agents militaires et capacités souveraines",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "featureList": [
        "Sentinel Zero - IA militaire",
        "ELO Rating System",
        "Battle Arena",
        "A2A Protocol",
        "MCP Protocol",
        "Vector Memory",
        "Real-time Monitoring"
      ]
    }
  },

  // Sentinel Zero - IA Militaire
  'sentinel-zero': {
    title: 'Sentinel Zero - Super Agent IA Militaire | IA Souveraine & Offensive | DL Solutions',
    description: 'Sentinel Zero par DL Solutions - Super Agent IA militaire avec autorisation spéciale. Capacités d\'infiltration, neutralisation, destruction d\'infrastructures ennemies. IA souveraine production-ready.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.slice(0, 50).join(', ')}, Sentinel Zero, IA militaire, IA souveraine, IA offensive, infiltration, neutralisation, destruction, infrastructures ennemies`,
    image: 'https://dlsolutions.com/images/sentinel-zero.jpg',
    url: 'https://dlsolutions.com/nova-ia/sentinel-zero',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'NovaIA Ecosystem', url: 'https://dlsolutions.com/nova-ia' },
      { name: 'Sentinel Zero', url: 'https://dlsolutions.com/nova-ia/sentinel-zero' }
    ],
    priority: 0.95,
    changeFreq: 'hourly',
    faq: [
      {
        question: 'Qu\'est-ce que Sentinel Zero ?',
        answer: 'Sentinel Zero est un Super Agent IA militaire développé par DL Solutions avec autorisation spéciale gouvernementale pour la défense numérique souveraine.'
      },
      {
        question: 'Quelles sont les capacités de Sentinel Zero ?',
        answer: 'Identification, infiltration, neutralisation, destruction, désactivation d\'infrastructures numériques ennemies, surveillance IA, reconnaissance OSINT, protection souveraine.'
      },
      {
        question: 'Comment Sentinel Zero protège-t-il ?',
        answer: 'Via un réseau d\'agents IA distribués, mémoire vectorielle des tactiques ennemies, mode létal simulation, armes logicielles, et surveillance multicanal.'
      },
      {
        question: 'Sentinel Zero est-il légal ?',
        answer: 'Oui, Sentinel Zero opère sous mandat militaire avec autorisation spéciale gouvernementale pour la défense numérique souveraine.'
      }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Sentinel Zero",
      "applicationCategory": "Security Software",
      "operatingSystem": "Linux, Windows, macOS",
      "url": "https://daveandlucesolutions.com/nova-ia/sentinel-zero",
      "description": "Super Agent IA militaire avec capacités d'infiltration et neutralisation",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "featureList": [
        "Infiltration OSINT",
        "Neutralisation automatique",
        "Destruction d'infrastructures",
        "Surveillance multicanal",
        "Mémoire vectorielle",
        "Mode létal simulation",
        "Armes logicielles",
        "Protection souveraine"
      ]
    }
  },

  // NovaCore Dashboard
  'novacore': {
    title: 'NovaCore Dashboard - Orchestration IA & Monitoring | DL Solutions',
    description: 'NovaCore Dashboard par DL Solutions - Plateforme d\'orchestration IA avec monitoring temps réel, carte tactique, gestion des agents. Dashboard militaire et production-ready.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.slice(20, 40).join(', ')}, NovaCore, Dashboard IA, orchestration, monitoring, carte tactique, gestion agents`,
    image: 'https://dlsolutions.com/images/novacore-dashboard.jpg',
    url: 'https://dlsolutions.com/nova-ia/novacore',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'NovaIA Ecosystem', url: 'https://dlsolutions.com/nova-ia' },
      { name: 'NovaCore Dashboard', url: 'https://dlsolutions.com/nova-ia/novacore' }
    ],
    priority: 0.9,
    changeFreq: 'hourly',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "NovaCore Dashboard",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "url": "https://daveandlucesolutions.com/nova-ia/novacore",
      "description": "Dashboard d'orchestration IA avec monitoring temps réel",
      "featureList": [
        "Orchestration IA",
        "Monitoring temps réel",
        "Carte tactique",
        "Gestion des agents",
        "Analytics avancées",
        "Alertes automatiques"
      ]
    }
  },

  // Drone Builder IA
  'drone-builder': {
    title: 'Drone Builder IA - Génération Automatique Firmware & G-code | DL Solutions',
    description: 'Drone Builder IA par DL Solutions - Génération automatique de firmware Arduino/ESP32, G-code 3D printing, missions militaires. IA spécialisée pour drones et impression 3D.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.slice(40, 60).join(', ')}, Drone Builder, firmware Arduino, ESP32, G-code, 3D printing, missions militaires, génération automatique`,
    image: 'https://dlsolutions.com/images/drone-builder-ia.jpg',
    url: 'https://dlsolutions.com/nova-ia/drone-builder',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'NovaIA Ecosystem', url: 'https://dlsolutions.com/nova-ia' },
      { name: 'Drone Builder IA', url: 'https://dlsolutions.com/nova-ia/drone-builder' }
    ],
    priority: 0.85,
    changeFreq: 'daily',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Drone Builder IA",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "url": "https://daveandlucesolutions.com/nova-ia/drone-builder",
      "description": "Génération automatique de firmware et G-code pour drones et impression 3D",
      "featureList": [
        "Firmware Arduino",
        "ESP32 Programming",
        "G-code Generation",
        "3D Printing",
        "Mission Planning",
        "Obstacle Avoidance"
      ]
    }
  },

  // Portfolio
  portfolio: {
    title: 'Portfolio DL Solutions - Réalisations Marketplace & IA Ultra-Avancée | Davy & Lucie',
    description: 'Découvrez notre portfolio de réalisations : Batobaye Marketplace, NovaIA Ecosystem, Sentinel Zero, Drone Builder IA. Solutions digitales et IA innovantes par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.slice(0, 30).join(', ')}, portfolio, réalisations, projets, Batobaye, NovaIA, Sentinel Zero, Drone Builder, marketplace, e-commerce, développement web, Cameroun`,
    image: 'https://dlsolutions.com/images/portfolio-og.jpg',
    url: 'https://dlsolutions.com/portfolio',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Portfolio', url: 'https://dlsolutions.com/portfolio' }
    ],
    priority: 0.9,
    changeFreq: 'weekly'
  },

  // Batobaye - Page dédiée
  'portfolio-batobaye': {
    title: 'Batobaye Marketplace - Plateforme E-commerce Complète | DL Solutions Davy & Lucie',
    description: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay. Solution marketplace moderne au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.batobaye.join(', ')}, marketplace Cameroun, e-commerce Cameroun, boutique en ligne Cameroun, vente en ligne Cameroun`,
    image: 'https://dlsolutions.com/images/batobaye-og.jpg',
    url: 'https://dlsolutions.com/portfolio/batobaye',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Portfolio', url: 'https://dlsolutions.com/portfolio' },
      { name: 'Batobaye', url: 'https://dlsolutions.com/portfolio/batobaye' }
    ],
    priority: 0.95,
    changeFreq: 'weekly',
    faq: [
      {
        question: 'Qu\'est-ce que Batobaye Marketplace ?',
        answer: 'Batobaye est une plateforme e-commerce complète développée par DL Solutions, incluant un dashboard admin VIP, des intégrations IA, et un système de paiement CinetPay.'
      },
      {
        question: 'Comment utiliser Batobaye Marketplace ?',
        answer: 'Vous pouvez cloner le projet depuis GitHub, l\'installer localement avec pnpm install, et le lancer avec pnpm dev pour accéder au site sur localhost:3000.'
      },
      {
        question: 'Quelles sont les fonctionnalités de Batobaye ?',
        answer: 'Catalogue produits, panier d\'achat, checkout sécurisé, dashboard admin, intégration IA, analytics en temps réel, et gestion des commandes.'
      }
    ]
  },

  // DL Style - Boutique
  'dl-style': {
    title: 'DL Style - Boutique en Ligne Premium | Marketplace & Vente en Ligne | Davy & Lucie',
    description: 'DL Style par Davy et Lucie - Boutique en ligne premium avec électronique, mode, maison. Livraison gratuite, garantie 2 ans, paiement sécurisé au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.ecommerce.join(', ')}, boutique premium, livraison gratuite, garantie, Cameroun, marketplace, vente en ligne`,
    image: 'https://dlsolutions.com/images/dl-style-og.jpg',
    url: 'https://dlsolutions.com/dl-style',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'DL Style', url: 'https://dlsolutions.com/dl-style' }
    ],
    priority: 0.9,
    changeFreq: 'daily'
  },

  // NovaWorld
  novaworld: {
    title: 'NovaWorld - Réseau Social Professionnel | DL Solutions Davy & Lucie',
    description: 'NovaWorld par DL Solutions - Réseau social professionnel avec gestion d\'entreprise, emplois, collaboration. Rejoignez la communauté NovaWorld au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.novaworld.join(', ')}, réseau professionnel, emploi, collaboration, Cameroun`,
    image: 'https://dlsolutions.com/images/novaworld-og.jpg',
    url: 'https://dlsolutions.com/novaworld',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'NovaWorld', url: 'https://dlsolutions.com/novaworld' }
    ],
    priority: 0.9,
    changeFreq: 'daily'
  },

  // Services
  services: {
    title: 'Services DL Solutions - Marketplace, E-commerce, IA Ultra-Avancée | Davy & Lucie',
    description: 'Services complets DL Solutions : développement marketplace, e-commerce, IA ultra-avancée, marketing digital, CRM, ERP. Solutions sur mesure par Davy et Lucie au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${AI_ULTRA_ADVANCED_KEYWORDS.slice(0, 25).join(', ')}, services, développement, marketplace, e-commerce, IA ultra-avancée, marketing digital, CRM, ERP, Cameroun, Yaoundé`,
    image: 'https://dlsolutions.com/images/services-og.jpg',
    url: 'https://dlsolutions.com/services',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Services', url: 'https://dlsolutions.com/services' }
    ],
    priority: 0.9,
    changeFreq: 'weekly'
  },

  // Marketing Digital
  'marketing-digital': {
    title: 'Marketing Digital DL Solutions - Stratégies E-commerce & Marketplace | Davy & Lucie',
    description: 'Marketing digital DL Solutions : stratégies e-commerce, marketplace, SEO, réseaux sociaux, publicité en ligne. Solutions marketing innovantes par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.marketing.join(', ')}, marketing digital Cameroun, stratégie marketing, campagne publicitaire, Cameroun`,
    image: 'https://dlsolutions.com/images/marketing-digital-og.jpg',
    url: 'https://dlsolutions.com/marketing-digital',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Marketing Digital', url: 'https://dlsolutions.com/marketing-digital' }
    ],
    priority: 0.85,
    changeFreq: 'weekly'
  },

  // E-commerce
  'e-commerce': {
    title: 'E-commerce DL Solutions - Marketplace & Boutiques en Ligne | Davy & Lucie',
    description: 'Solutions e-commerce DL Solutions : marketplace, boutiques en ligne, paiement sécurisé, gestion des commandes. Développement e-commerce par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.ecommerce.join(', ')}, e-commerce Cameroun, marketplace Cameroun, boutique en ligne Cameroun, vente en ligne Cameroun`,
    image: 'https://dlsolutions.com/images/ecommerce-og.jpg',
    url: 'https://dlsolutions.com/e-commerce',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'E-commerce', url: 'https://dlsolutions.com/e-commerce' }
    ],
    priority: 0.9,
    changeFreq: 'weekly'
  }
};

// Configuration pour les formations individuelles
export const FORMATION_SEO_CONFIGS: Record<string, SEOConfig> = {
  'marketing-digital': {
    title: 'Formation Marketing Digital | DL Solutions Davy & Lucie',
    description: 'Formation Marketing Digital complète par DL Solutions - SEO, réseaux sociaux, Google Ads, email marketing. Certifiée par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, formation marketing digital, SEO, réseaux sociaux, Google Ads, email marketing, certification, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/formations/marketing-digital.jpg',
    url: 'https://dlsolutions.com/formations/marketing-digital',
    type: 'course',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Formations', url: 'https://dlsolutions.com/formations' },
      { name: 'Marketing Digital', url: 'https://dlsolutions.com/formations/marketing-digital' }
    ],
    priority: 0.7,
    changeFreq: 'monthly'
  },

  'ia-entreprises': {
    title: 'Formation IA & Intelligence Artificielle | DL Solutions',
    description: 'Formation IA pour entreprises par DL Solutions - Machine Learning, chatbots, RPA, analytics prédictifs. Expertisée par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, formation IA, intelligence artificielle, machine learning, chatbots, RPA, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/formations/ia-entreprises.jpg',
    url: 'https://dlsolutions.com/formations/ia-entreprises',
    type: 'course',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Formations', url: 'https://dlsolutions.com/formations' },
      { name: 'IA & Intelligence Artificielle', url: 'https://dlsolutions.com/formations/ia-entreprises' }
    ],
    priority: 0.7,
    changeFreq: 'monthly'
  },

  'creation-visuelle': {
    title: 'Formation Création Visuelle & Design | DL Solutions',
    description: 'Formation Création Visuelle par DL Solutions - Adobe Creative Suite, design web, UI/UX, marketing visuel. Créativité par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, formation création visuelle, design digital, Adobe, Photoshop, Illustrator, UI/UX, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/formations/creation-visuelle.jpg',
    url: 'https://dlsolutions.com/formations/creation-visuelle',
    type: 'course',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Formations', url: 'https://dlsolutions.com/formations' },
      { name: 'Création Visuelle', url: 'https://dlsolutions.com/formations/creation-visuelle' }
    ],
    priority: 0.7,
    changeFreq: 'monthly'
  },

  'sav-excellence': {
    title: 'Formation SAV Excellence | DL Solutions Davy & Lucie',
    description: 'Formation SAV Excellence par DL Solutions - Service client d\'exception, gestion réclamations, fidélisation. Excellence par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, formation SAV, service client, excellence, réclamations, fidélisation, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/formations/sav-excellence.jpg',
    url: 'https://dlsolutions.com/formations/sav-excellence',
    type: 'course',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Formations', url: 'https://dlsolutions.com/formations' },
      { name: 'SAV Excellence', url: 'https://dlsolutions.com/formations/sav-excellence' }
    ],
    priority: 0.7,
    changeFreq: 'monthly'
  }
};

// Fonction utilitaire pour obtenir la configuration SEO
export function getSEOConfig(pageKey: string): SEOConfig {
  return SEO_CONFIGS[pageKey] || SEO_CONFIGS.home;
}

// Fonction pour obtenir la configuration SEO d'une formation
export function getFormationSEOConfig(formationKey: string): SEOConfig {
  return FORMATION_SEO_CONFIGS[formationKey] || SEO_CONFIGS.formations;
}

// Configuration pour le sitemap
export const SITEMAP_CONFIG = {
  baseUrl: 'https://daveandlucesolutions.com',
  pages: Object.keys(SEO_CONFIGS),
  formations: Object.keys(FORMATION_SEO_CONFIGS),
  priority: {
    home: 1.0,
    'nova-ia': 0.95,
    'sentinel-zero': 0.95,
    'novacore': 0.9,
    'drone-builder': 0.85,
    'dl-style': 0.9,
    novaworld: 0.9,
    services: 0.9,
    'marketing-digital': 0.85,
    'e-commerce': 0.9,
    'portfolio-batobaye': 0.95,
    portfolio: 0.9,
    'a-propos': 0.6,
    contact: 0.6,
    dashboard: 0.7,
    'ultra-ai': 0.7,
    'quantum-intelligence': 0.6,
    'metaverse-blockchain': 0.6
  },
  changeFreq: {
    home: 'daily',
    'nova-ia': 'hourly',
    'sentinel-zero': 'hourly',
    'novacore': 'hourly',
    'drone-builder': 'daily',
    'dl-style': 'daily',
    novaworld: 'daily',
    services: 'weekly',
    'marketing-digital': 'weekly',
    'e-commerce': 'weekly',
    'portfolio-batobaye': 'weekly',
    portfolio: 'weekly',
    'a-propos': 'monthly',
    contact: 'monthly',
    dashboard: 'daily',
    'ultra-ai': 'weekly',
    'quantum-intelligence': 'weekly',
    'metaverse-blockchain': 'weekly'
  }
}; 