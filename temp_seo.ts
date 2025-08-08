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
];
