// Configuration SEO centralisée pour DL Solutions
// Optimisation pour les mots-clés : DL Solutions, Davy, Lucie

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
  'Yaoundé'
];

// Mots-clés secondaires par secteur
const SECTOR_KEYWORDS = {
  crm: ['CRM', 'gestion client', 'relation client', 'automatisation'],
  erp: ['ERP', 'gestion entreprise', 'planification ressources', 'système intégré'],
  ecommerce: ['e-commerce', 'boutique en ligne', 'vente en ligne', 'DL Style'],
  formation: ['formation', 'formation professionnelle', 'certification', 'apprentissage'],
  ia: ['intelligence artificielle', 'IA', 'machine learning', 'automatisation'],
  web: ['développement web', 'site web', 'application web', 'programmation'],
  mobile: ['application mobile', 'app mobile', 'développement mobile', 'iOS', 'Android'],
  marketing: ['marketing digital', 'SEO', 'réseaux sociaux', 'publicité en ligne'],
  trading: ['trading', 'investissement', 'finance', 'marchés financiers'],
  novaworld: ['NovaWorld', 'réseau social', 'networking', 'collaboration'],
  novacore: ['NovaCore', 'plateforme', 'écosystème', 'intégration']
};

// Configuration SEO par page
export const SEO_CONFIGS: Record<string, SEOConfig> = {
  // Page d'accueil
  home: {
    title: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie Solutions',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec CRM, ERP, boutique internationale, formations professionnelles. Solutions innovantes au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, écosystème digital, CRM, ERP, boutique, formations, Cameroun, Yaoundé, Davy, Lucie, Dave and Luce`,
    image: 'https://dlsolutions.com/images/og-home.jpg',
    url: 'https://dlsolutions.com',
    type: 'website',
    breadcrumbs: [{ name: 'Accueil', url: 'https://dlsolutions.com' }],
    priority: 1.0,
    changeFreq: 'daily',
    favicon: '/favicon-circular.svg',
    logo: '/favicon-circular.svg'
  },

  // DL Style - Boutique
  'dl-style': {
    title: 'DL Style - Boutique en Ligne Premium | Davy & Lucie Solutions',
    description: 'DL Style par Davy et Lucie - Boutique en ligne premium avec électronique, mode, maison. Livraison gratuite, garantie 2 ans, paiement sécurisé au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.ecommerce.join(', ')}, boutique premium, livraison gratuite, garantie, Cameroun`,
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

  // NovaCore
  novacore: {
    title: 'NovaCore - Plateforme d\'Intégration | DL Solutions Davy & Lucie',
    description: 'NovaCore par DL Solutions - Plateforme d\'intégration complète pour CRM, ERP, e-commerce. Écosystème digital unifié par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.novacore.join(', ')}, plateforme intégrée, écosystème, CRM, ERP`,
    image: 'https://dlsolutions.com/images/novacore-og.jpg',
    url: 'https://dlsolutions.com/novacore',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'NovaCore', url: 'https://dlsolutions.com/novacore' }
    ],
    priority: 0.8,
    changeFreq: 'weekly'
  },

  // Formations
  formations: {
    title: 'Formations Professionnelles | DL Solutions Davy & Lucie',
    description: 'Formations professionnelles certifiantes par DL Solutions - Télévente, marketing digital, e-commerce, IA, CRM. Développez vos compétences avec Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.formation.join(', ')}, certification, apprentissage, Cameroun`,
    image: 'https://dlsolutions.com/images/formations-og.jpg',
    url: 'https://dlsolutions.com/formations',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Formations', url: 'https://dlsolutions.com/formations' }
    ],
    priority: 0.8,
    changeFreq: 'weekly'
  },

  // Services
  services: {
    title: 'Services Digitales | DL Solutions Davy & Lucie',
    description: 'Services digitales complets par DL Solutions - Développement web, applications mobiles, e-commerce, IA, marketing digital. Solutions sur-mesure par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, services digitales, développement web, applications mobiles, e-commerce, IA, marketing, Cameroun`,
    image: 'https://dlsolutions.com/images/services-og.jpg',
    url: 'https://dlsolutions.com/services',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Services', url: 'https://dlsolutions.com/services' }
    ],
    priority: 0.8,
    changeFreq: 'weekly'
  },

  // Trading
  trading: {
    title: 'Trading & Investissement | DL Solutions Davy & Lucie',
    description: 'Plateforme de trading avancée par DL Solutions - Marchés financiers, crypto-monnaies, forex. Solutions d\'investissement innovantes par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.trading.join(', ')}, investissement, marchés financiers, crypto, forex`,
    image: 'https://dlsolutions.com/images/trading-og.jpg',
    url: 'https://dlsolutions.com/trading',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Trading', url: 'https://dlsolutions.com/trading' }
    ],
    priority: 0.7,
    changeFreq: 'daily'
  },

  // IA & Intelligence
  'advanced-intelligence': {
    title: 'Intelligence Artificielle Avancée | DL Solutions Davy & Lucie',
    description: 'Solutions d\'intelligence artificielle avancées par DL Solutions - OSINT, analyse prédictive, automatisation. Technologies IA innovantes par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, ${SECTOR_KEYWORDS.ia.join(', ')}, OSINT, analyse prédictive, automatisation, Cameroun`,
    image: 'https://dlsolutions.com/images/ai-og.jpg',
    url: 'https://dlsolutions.com/advanced-intelligence',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Intelligence Avancée', url: 'https://dlsolutions.com/advanced-intelligence' }
    ],
    priority: 0.7,
    changeFreq: 'weekly'
  },

  // Contact
  contact: {
    title: 'Contact | DL Solutions Davy & Lucie - Cameroun',
    description: 'Contactez DL Solutions - Davy et Lucie à Yaoundé, Cameroun. Solutions digitales, formations, services. Téléphone, email, adresse.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, contact, Yaoundé, Cameroun, téléphone, email, adresse, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/contact-og.jpg',
    url: 'https://dlsolutions.com/contact',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Contact', url: 'https://dlsolutions.com/contact' }
    ],
    priority: 0.6,
    changeFreq: 'monthly'
  },

  // À propos
  'a-propos': {
    title: 'À Propos | DL Solutions - Davy & Lucie Solutions',
    description: 'Découvrez DL Solutions - L\'histoire de Davy et Lucie, fondateurs de solutions digitales innovantes au Cameroun. Notre mission et nos valeurs.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, à propos, histoire, mission, valeurs, fondateurs, Davy, Lucie, Cameroun`,
    image: 'https://dlsolutions.com/images/about-og.jpg',
    url: 'https://dlsolutions.com/a-propos',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'À Propos', url: 'https://dlsolutions.com/a-propos' }
    ],
    priority: 0.6,
    changeFreq: 'monthly'
  },

  // Dashboard
  dashboard: {
    title: 'Dashboard | DL Solutions Davy & Lucie',
    description: 'Dashboard personnalisé DL Solutions - Tableau de bord intégré pour CRM, ERP, analytics. Gestion centralisée par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, dashboard, tableau de bord, analytics, gestion, CRM, ERP`,
    image: 'https://dlsolutions.com/images/dashboard-og.jpg',
    url: 'https://dlsolutions.com/dashboard',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Dashboard', url: 'https://dlsolutions.com/dashboard' }
    ],
    priority: 0.7,
    changeFreq: 'daily'
  },

  // Ultra AI
  'ultra-ai': {
    title: 'Ultra AI - Intelligence Artificielle Avancée | DL Solutions',
    description: 'Ultra AI par DL Solutions - Intelligence artificielle de pointe avec traitement du langage naturel, vision par ordinateur, apprentissage profond.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, Ultra AI, intelligence artificielle, NLP, vision par ordinateur, deep learning, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/ultra-ai-og.jpg',
    url: 'https://dlsolutions.com/ultra-ai',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Ultra AI', url: 'https://dlsolutions.com/ultra-ai' }
    ],
    priority: 0.7,
    changeFreq: 'weekly'
  },

  // Quantum Intelligence
  'quantum-intelligence': {
    title: 'Quantum Intelligence | DL Solutions Davy & Lucie',
    description: 'Quantum Intelligence par DL Solutions - Technologies quantiques pour l\'intelligence artificielle. Solutions révolutionnaires par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, quantum intelligence, technologies quantiques, IA quantique, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/quantum-og.jpg',
    url: 'https://dlsolutions.com/quantum-intelligence',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Quantum Intelligence', url: 'https://dlsolutions.com/quantum-intelligence' }
    ],
    priority: 0.6,
    changeFreq: 'weekly'
  },

  // Metaverse & Blockchain
  'metaverse-blockchain': {
    title: 'Metaverse & Blockchain | DL Solutions Davy & Lucie',
    description: 'Solutions Metaverse et Blockchain par DL Solutions - Technologies Web3, NFT, réalité virtuelle. Innovation par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, metaverse, blockchain, Web3, NFT, réalité virtuelle, Davy, Lucie`,
    image: 'https://dlsolutions.com/images/metaverse-og.jpg',
    url: 'https://dlsolutions.com/metaverse-blockchain',
    type: 'website',
    breadcrumbs: [
      { name: 'Accueil', url: 'https://dlsolutions.com' },
      { name: 'Metaverse & Blockchain', url: 'https://dlsolutions.com/metaverse-blockchain' }
    ],
    priority: 0.6,
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
  baseUrl: 'https://dlsolutions.com',
  pages: Object.keys(SEO_CONFIGS),
  formations: Object.keys(FORMATION_SEO_CONFIGS),
  priority: {
    home: 1.0,
    'dl-style': 0.9,
    novaworld: 0.9,
    novacore: 0.8,
    formations: 0.8,
    services: 0.8,
    trading: 0.7,
    'advanced-intelligence': 0.7,
    contact: 0.6,
    'a-propos': 0.6
  },
  changeFreq: {
    home: 'daily',
    'dl-style': 'daily',
    novaworld: 'daily',
    novacore: 'weekly',
    formations: 'weekly',
    services: 'weekly',
    trading: 'daily',
    'advanced-intelligence': 'weekly',
    contact: 'monthly',
    'a-propos': 'monthly'
  }
}; 