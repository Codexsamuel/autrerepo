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
    title: 'DL Solutions - Écosystème Digital Complet | Marketplace & Vente en Ligne | Davy & Lucie',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, écosystème digital, CRM, ERP, boutique, formations, Cameroun, Yaoundé, Davy, Lucie, Dave and Luce, marketplace, vente en ligne, marketing digital`,
    image: 'https://dlsolutions.com/images/og-home.jpg',
    url: 'https://dlsolutions.com',
    type: 'website',
    breadcrumbs: [{ name: 'Accueil', url: 'https://dlsolutions.com' }],
    priority: 1.0,
    changeFreq: 'daily',
    favicon: '/favicon-circular.svg',
    logo: '/favicon-circular.svg'
  },

  // Portfolio
  portfolio: {
    title: 'Portfolio DL Solutions - Réalisations Marketplace & E-commerce | Davy & Lucie',
    description: 'Découvrez notre portfolio de réalisations : Batobaye Marketplace, DL Style E-commerce, NovaWorld, NovaCore. Solutions digitales innovantes par Davy et Lucie.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, portfolio, réalisations, projets, Batobaye, DL Style, NovaWorld, NovaCore, marketplace, e-commerce, développement web, Cameroun`,
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
    priority: 0.9,
    changeFreq: 'weekly'
  },

  // Services
  services: {
    title: 'Services DL Solutions - Marketplace, E-commerce, Marketing Digital | Davy & Lucie',
    description: 'Services complets DL Solutions : développement marketplace, e-commerce, marketing digital, CRM, ERP. Solutions sur mesure par Davy et Lucie au Cameroun.',
    keywords: `${PRIMARY_KEYWORDS.join(', ')}, services, développement, marketplace, e-commerce, marketing digital, CRM, ERP, Cameroun, Yaoundé`,
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
    'dl-style': 0.9,
    novaworld: 0.9,
    novacore: 0.9,
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
    'dl-style': 'daily',
    novaworld: 'daily',
    novacore: 'weekly',
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