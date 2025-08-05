export interface NovaAIService {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  credits: number;
  features: string[];
  apiEndpoint: string;
  status: 'free' | 'premium' | 'beta';
  icon: string;
  keywords: string[];
  useCases: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  processingTime: string;
  accuracy: string;
}

export const NOVA_AI_SERVICES: NovaAIService[] = [
  // Services IA Conversationnelle
  {
    id: 'chat-ia-avance',
    name: 'Chat IA Avancé',
    description: 'Assistant conversationnel intelligent avec mémoire contextuelle',
    category: 'conversation',
    subcategory: 'Chat IA',
    price: 8,
    credits: 10,
    features: [
      'Conversation naturelle',
      'Mémoire contextuelle',
      'Support multilingue',
      'Personnalisation du ton',
      'Intégration API',
      'Historique des conversations',
      'Export des dialogues',
      'Analytics de performance'
    ],
    apiEndpoint: '/api/ai/chat',
    status: 'premium',
    icon: '🤖',
    keywords: ['chat', 'conversation', 'assistant', 'dialogue', 'ia'],
    useCases: ['Support client', 'FAQ', 'Formation', 'Ventes'],
    difficulty: 'beginner',
    processingTime: '2-5 secondes',
    accuracy: '92%'
  },
  {
    id: 'assistant-emotionnel',
    name: 'Assistant Émotionnel',
    description: 'IA capable de détecter et répondre aux émotions',
    category: 'conversation',
    subcategory: 'Émotions',
    price: 12,
    credits: 15,
    features: [
      'Détection d\'émotions',
      'Réponses empathiques',
      'Analyse sentimentale',
      'Adaptation du ton',
      'Support thérapeutique',
      'Rapports émotionnels',
      'Intégration CRM',
      'Formation personnalisée'
    ],
    apiEndpoint: '/api/ai/emotional',
    status: 'premium',
    icon: '😊',
    keywords: ['émotions', 'empathie', 'sentiment', 'thérapie', 'support'],
    useCases: ['Thérapie', 'Support client', 'RH', 'Formation'],
    difficulty: 'intermediate',
    processingTime: '3-8 secondes',
    accuracy: '89%'
  },
  {
    id: 'chatbot-personnalise',
    name: 'Chatbot Personnalisé',
    description: 'Création de chatbots sur mesure pour votre business',
    category: 'conversation',
    subcategory: 'Chatbot',
    price: 15,
    credits: 20,
    features: [
      'Personnalisation complète',
      'Intégration web/app',
      'Base de connaissances',
      'Workflows automatisés',
      'Analytics détaillés',
      'Multi-canaux',
      'Formation continue',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/chatbot',
    status: 'premium',
    icon: '💬',
    keywords: ['chatbot', 'bot', 'automatisation', 'support', 'vente'],
    useCases: ['E-commerce', 'Support', 'Ventes', 'Formation'],
    difficulty: 'intermediate',
    processingTime: '5-15 secondes',
    accuracy: '94%'
  },
  {
    id: 'questions-reponses',
    name: 'Questions/Réponses IA',
    description: 'Système intelligent de questions et réponses',
    category: 'conversation',
    subcategory: 'Q&A',
    price: 6,
    credits: 8,
    features: [
      'Réponses précises',
      'Sources citées',
      'Support multilingue',
      'Base de connaissances',
      'Apprentissage continu',
      'Export des réponses',
      'Analytics d\'usage',
      'Intégration facile'
    ],
    apiEndpoint: '/api/ai/qa',
    status: 'premium',
    icon: '❓',
    keywords: ['questions', 'réponses', 'faq', 'aide', 'support'],
    useCases: ['Documentation', 'Support', 'Formation', 'Recherche'],
    difficulty: 'beginner',
    processingTime: '2-4 secondes',
    accuracy: '96%'
  },

  // Services Génération d'Images
  {
    id: 'text-to-image',
    name: 'Text-to-Image IA',
    description: 'Génération d\'images à partir de descriptions textuelles',
    category: 'images',
    subcategory: 'Génération',
    price: 10,
    credits: 12,
    features: [
      'Génération haute qualité',
      'Styles multiples',
      'Résolutions variées',
      'Personnalisation avancée',
      'Export multiples formats',
      'Historique des créations',
      'API intégrée',
      'Support commercial'
    ],
    apiEndpoint: '/api/ai/text-to-image',
    status: 'premium',
    icon: '🎨',
    keywords: ['image', 'génération', 'art', 'création', 'design'],
    useCases: ['Marketing', 'Design', 'E-commerce', 'Création'],
    difficulty: 'beginner',
    processingTime: '10-30 secondes',
    accuracy: '88%'
  },
  {
    id: 'style-ghibli',
    name: 'Style Ghibli',
    description: 'Génération d\'images dans le style Studio Ghibli',
    category: 'images',
    subcategory: 'Style Artistique',
    price: 8,
    credits: 10,
    features: [
      'Style Ghibli authentique',
      'Personnages animés',
      'Paysages magiques',
      'Résolution haute qualité',
      'Variations multiples',
      'Export PNG/JPG',
      'Usage commercial',
      'Support créatif'
    ],
    apiEndpoint: '/api/ai/ghibli',
    status: 'premium',
    icon: '🌿',
    keywords: ['ghibli', 'anime', 'style', 'artistique', 'magique'],
    useCases: ['Animation', 'Gaming', 'Marketing', 'Art'],
    difficulty: 'beginner',
    processingTime: '15-45 secondes',
    accuracy: '91%'
  },
  {
    id: 'cartoonisation',
    name: 'Cartoonisation',
    description: 'Transformation d\'images en style cartoon/bande dessinée',
    category: 'images',
    subcategory: 'Transformation',
    price: 6,
    credits: 8,
    features: [
      'Style cartoon authentique',
      'Préservation des détails',
      'Styles multiples',
      'Traitement rapide',
      'Export haute qualité',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/cartoon',
    status: 'premium',
    icon: '🎭',
    keywords: ['cartoon', 'bande dessinée', 'transformation', 'style'],
    useCases: ['Marketing', 'Social Media', 'Gaming', 'Art'],
    difficulty: 'beginner',
    processingTime: '5-15 secondes',
    accuracy: '93%'
  },
  {
    id: 'face-swap-pro',
    name: 'Face Swap Pro',
    description: 'Échange de visages professionnel avec IA avancée',
    category: 'images',
    subcategory: 'Face Swap',
    price: 12,
    credits: 15,
    features: [
      'Échange réaliste',
      'Préservation des expressions',
      'Qualité haute définition',
      'Détection automatique',
      'Ajustements manuels',
      'Export multiples formats',
      'Usage commercial',
      'Support professionnel'
    ],
    apiEndpoint: '/api/ai/faceswap',
    status: 'premium',
    icon: '🔄',
    keywords: ['face swap', 'visage', 'échange', 'réaliste', 'ia'],
    useCases: ['Cinéma', 'Marketing', 'Entertainment', 'Art'],
    difficulty: 'advanced',
    processingTime: '20-60 secondes',
    accuracy: '87%'
  },
  {
    id: 'background-removal',
    name: 'Suppression d\'Arrière-plan',
    description: 'Suppression automatique d\'arrière-plan avec IA',
    category: 'images',
    subcategory: 'Édition',
    price: 5,
    credits: 6,
    features: [
      'Suppression précise',
      'Détection automatique',
      'Arrière-plans personnalisés',
      'Traitement en lot',
      'Export PNG transparent',
      'API intégrée',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/background-removal',
    status: 'premium',
    icon: '✂️',
    keywords: ['arrière-plan', 'suppression', 'transparent', 'édition'],
    useCases: ['E-commerce', 'Marketing', 'Design', 'Photographie'],
    difficulty: 'beginner',
    processingTime: '3-8 secondes',
    accuracy: '95%'
  },

  // Services Audio & Voix
  {
    id: 'synthese-vocale',
    name: 'Synthèse Vocale Naturelle',
    description: 'Génération de voix naturelles à partir de texte',
    category: 'audio',
    subcategory: 'Synthèse',
    price: 8,
    credits: 10,
    features: [
      'Voix naturelles',
      'Langues multiples',
      'Émotions variées',
      'Vitesse ajustable',
      'Export MP3/WAV',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/tts',
    status: 'premium',
    icon: '🎤',
    keywords: ['voix', 'synthèse', 'audio', 'text-to-speech', 'naturel'],
    useCases: ['Audiobooks', 'Podcasts', 'Marketing', 'Accessibilité'],
    difficulty: 'beginner',
    processingTime: '5-15 secondes',
    accuracy: '94%'
  },
  {
    id: 'transcription-automatique',
    name: 'Transcription Automatique',
    description: 'Conversion audio/vidéo en texte avec IA',
    category: 'audio',
    subcategory: 'Transcription',
    price: 6,
    credits: 8,
    features: [
      'Précision élevée',
      'Langues multiples',
      'Sous-titres automatiques',
      'Export formats variés',
      'Traitement en lot',
      'API intégrée',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/transcription',
    status: 'premium',
    icon: '📝',
    keywords: ['transcription', 'audio', 'vidéo', 'texte', 'sous-titres'],
    useCases: ['Médias', 'Formation', 'Réunions', 'Accessibilité'],
    difficulty: 'beginner',
    processingTime: '10-30 secondes',
    accuracy: '96%'
  },
  {
    id: 'detection-emotions-vocales',
    name: 'Détection d\'Émotions Vocales',
    description: 'Analyse des émotions dans la voix',
    category: 'audio',
    subcategory: 'Analyse',
    price: 10,
    credits: 12,
    features: [
      'Détection précise',
      'Émotions multiples',
      'Analyse en temps réel',
      'Rapports détaillés',
      'API disponible',
      'Intégration CRM',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/voice-emotion',
    status: 'premium',
    icon: '🎭',
    keywords: ['émotions', 'voix', 'analyse', 'détection', 'sentiment'],
    useCases: ['Call Centers', 'Thérapie', 'Recrutement', 'Formation'],
    difficulty: 'intermediate',
    processingTime: '3-8 secondes',
    accuracy: '89%'
  },

  // Services Business Intelligence
  {
    id: 'analyse-donnees',
    name: 'Analyse de Données IA',
    description: 'Analyse intelligente de données business',
    category: 'business',
    subcategory: 'Analytics',
    price: 15,
    credits: 20,
    features: [
      'Analyse prédictive',
      'Visualisations avancées',
      'Rapports automatiques',
      'Alertes intelligentes',
      'Intégration bases de données',
      'API complète',
      'Support expert',
      'Formation incluse'
    ],
    apiEndpoint: '/api/ai/data-analysis',
    status: 'premium',
    icon: '📊',
    keywords: ['analyse', 'données', 'business', 'prédictif', 'analytics'],
    useCases: ['Finance', 'Marketing', 'Ventes', 'Opérations'],
    difficulty: 'advanced',
    processingTime: '30-90 secondes',
    accuracy: '93%'
  },
  {
    id: 'scraping-intelligent',
    name: 'Scraping Intelligent',
    description: 'Extraction automatique de données web',
    category: 'business',
    subcategory: 'Scraping',
    price: 12,
    credits: 15,
    features: [
      'Extraction précise',
      'Sites multiples',
      'Données structurées',
      'Mise à jour automatique',
      'Export formats variés',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/scraping',
    status: 'premium',
    icon: '🕷️',
    keywords: ['scraping', 'extraction', 'données', 'web', 'automatique'],
    useCases: ['E-commerce', 'Recherche', 'Veille', 'Marketing'],
    difficulty: 'intermediate',
    processingTime: '20-60 secondes',
    accuracy: '91%'
  },
  {
    id: 'recherche-avancee',
    name: 'Recherche Avancée IA',
    description: 'Recherche intelligente et sémantique',
    category: 'business',
    subcategory: 'Recherche',
    price: 8,
    credits: 10,
    features: [
      'Recherche sémantique',
      'Résultats pertinents',
      'Sources multiples',
      'Filtres avancés',
      'Historique des recherches',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/search',
    status: 'premium',
    icon: '🔍',
    keywords: ['recherche', 'sémantique', 'intelligente', 'pertinence'],
    useCases: ['E-commerce', 'Documentation', 'Recherche', 'Support'],
    difficulty: 'intermediate',
    processingTime: '2-5 secondes',
    accuracy: '94%'
  },
  {
    id: 'resume-automatique',
    name: 'Résumé Automatique',
    description: 'Génération automatique de résumés intelligents',
    category: 'business',
    subcategory: 'Résumé',
    price: 6,
    credits: 8,
    features: [
      'Résumés intelligents',
      'Longueurs variables',
      'Préservation du sens',
      'Support multilingue',
      'Export formats variés',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/summarize',
    status: 'premium',
    icon: '📋',
    keywords: ['résumé', 'automatique', 'intelligent', 'synthèse'],
    useCases: ['Médias', 'Recherche', 'Formation', 'Business'],
    difficulty: 'beginner',
    processingTime: '5-15 secondes',
    accuracy: '92%'
  },

  // Services Marketing & Contenu
  {
    id: 'generation-contenu-marketing',
    name: 'Génération Contenu Marketing',
    description: 'Création automatique de contenu marketing optimisé',
    category: 'marketing',
    subcategory: 'Contenu',
    price: 10,
    credits: 12,
    features: [
      'Contenu optimisé SEO',
      'Tons personnalisables',
      'Formats multiples',
      'Mots-clés intégrés',
      'Export formats variés',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/marketing-content',
    status: 'premium',
    icon: '📝',
    keywords: ['marketing', 'contenu', 'seo', 'optimisation', 'création'],
    useCases: ['Marketing', 'SEO', 'Social Media', 'Blog'],
    difficulty: 'intermediate',
    processingTime: '10-30 secondes',
    accuracy: '90%'
  },
  {
    id: 'detection-contenu-ia',
    name: 'Détection Contenu IA',
    description: 'Détection de contenu généré par IA',
    category: 'marketing',
    subcategory: 'Détection',
    price: 8,
    credits: 10,
    features: [
      'Détection précise',
      'Scores de confiance',
      'Analyse détaillée',
      'Rapports complets',
      'API disponible',
      'Usage commercial',
      'Support technique',
      'Formation incluse'
    ],
    apiEndpoint: '/api/ai/content-detection',
    status: 'premium',
    icon: '🔍',
    keywords: ['détection', 'ia', 'contenu', 'authenticité', 'vérification'],
    useCases: ['Éducation', 'Médias', 'Recrutement', 'Content Moderation'],
    difficulty: 'intermediate',
    processingTime: '3-8 secondes',
    accuracy: '95%'
  },
  {
    id: 'traduction-multilingue',
    name: 'Traduction Multilingue',
    description: 'Traduction automatique de haute qualité',
    category: 'marketing',
    subcategory: 'Traduction',
    price: 6,
    credits: 8,
    features: [
      'Traduction précise',
      'Langues multiples',
      'Préservation du style',
      'Traduction en lot',
      'Export formats variés',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/translation',
    status: 'premium',
    icon: '🌍',
    keywords: ['traduction', 'multilingue', 'langues', 'international'],
    useCases: ['E-commerce', 'Marketing', 'Documentation', 'Support'],
    difficulty: 'beginner',
    processingTime: '5-15 secondes',
    accuracy: '93%'
  },

  // Services E-commerce
  {
    id: 'analyse-concurrents-ecommerce',
    name: 'Analyse Concurrents E-commerce',
    description: 'Analyse intelligente de la concurrence e-commerce',
    category: 'ecommerce',
    subcategory: 'Analyse',
    price: 20,
    credits: 25,
    features: [
      'Surveillance concurrentielle',
      'Analyse des prix',
      'Tendances produits',
      'Rapports détaillés',
      'Alertes automatiques',
      'API complète',
      'Support expert',
      'Formation incluse'
    ],
    apiEndpoint: '/api/ai/ecommerce-analysis',
    status: 'premium',
    icon: '📈',
    keywords: ['e-commerce', 'concurrence', 'analyse', 'prix', 'tendances'],
    useCases: ['E-commerce', 'Retail', 'Marketing', 'Stratégie'],
    difficulty: 'advanced',
    processingTime: '45-120 secondes',
    accuracy: '91%'
  },
  {
    id: 'generation-descriptions-produits',
    name: 'Génération Descriptions Produits',
    description: 'Création automatique de descriptions produits optimisées',
    category: 'ecommerce',
    subcategory: 'Produits',
    price: 8,
    credits: 10,
    features: [
      'Descriptions optimisées SEO',
      'Mots-clés intégrés',
      'Tons personnalisables',
      'Génération en lot',
      'Export formats variés',
      'API disponible',
      'Usage commercial',
      'Support technique'
    ],
    apiEndpoint: '/api/ai/product-descriptions',
    status: 'premium',
    icon: '📦',
    keywords: ['produits', 'descriptions', 'e-commerce', 'seo', 'optimisation'],
    useCases: ['E-commerce', 'Marketplace', 'Retail', 'Marketing'],
    difficulty: 'intermediate',
    processingTime: '10-25 secondes',
    accuracy: '89%'
  },

  // Services Automatisation
  {
    id: 'automatisation-processus',
    name: 'Automatisation Processus',
    description: 'Automatisation intelligente de processus business',
    category: 'automation',
    subcategory: 'Processus',
    price: 25,
    credits: 30,
    features: [
      'Workflows intelligents',
      'Intégration API',
      'Déclencheurs automatiques',
      'Monitoring temps réel',
      'Rapports détaillés',
      'Support expert',
      'Formation complète',
      'Maintenance incluse'
    ],
    apiEndpoint: '/api/ai/automation',
    status: 'premium',
    icon: '⚙️',
    keywords: ['automatisation', 'processus', 'workflow', 'efficacité'],
    useCases: ['Opérations', 'RH', 'Finance', 'Marketing'],
    difficulty: 'advanced',
    processingTime: '60-180 secondes',
    accuracy: '95%'
  },

  // Services Documents Commerciaux
  {
    id: 'generateur-documents-commerciaux',
    name: 'Générateur Documents Commerciaux',
    description: 'Création automatique de documents commerciaux professionnels',
    category: 'business',
    subcategory: 'Documents',
    price: 15,
    credits: 20,
    features: [
      'Propositions commerciales',
      'Présentations business',
      'Rapports détaillés',
      'Budgets personnalisés',
      'Planning de projet',
      'KPIs automatiques',
      'Export PDF/Word/PPT',
      'Support professionnel'
    ],
    apiEndpoint: '/api/ai/commercial-documents',
    status: 'premium',
    icon: '📄',
    keywords: ['documents', 'commerciaux', 'proposition', 'business', 'rapport'],
    useCases: ['Ventes', 'Consulting', 'Marketing', 'Business Development'],
    difficulty: 'advanced',
    processingTime: '30-90 secondes',
    accuracy: '94%'
  },

  // Services IA Avancée (Nouvelles APIs)
  {
    id: 'ai-query-advanced',
    name: 'AI Query Avancé',
    description: 'Requêtes IA avancées pour analyse et génération',
    category: 'advanced',
    subcategory: 'Query',
    price: 12,
    credits: 15,
    features: [
      'Requêtes complexes',
      'Analyse de données',
      'Génération de contenu',
      'Recherche intelligente',
      'API complète',
      'Documentation détaillée',
      'Support technique',
      'Exemples inclus'
    ],
    apiEndpoint: '/api/ai/query2',
    status: 'premium',
    icon: '🔬',
    keywords: ['query', 'requête', 'analyse', 'génération', 'avancé'],
    useCases: ['Recherche', 'Analyse', 'Développement', 'Business'],
    difficulty: 'advanced',
    processingTime: '15-45 secondes',
    accuracy: '93%'
  },
  {
    id: 'deepfake-faceswap-pro',
    name: 'Deepfake Face Swap Pro',
    description: 'Échange de visages ultra-réaliste avec IA avancée',
    category: 'advanced',
    subcategory: 'Deepfake',
    price: 18,
    credits: 25,
    features: [
      'Échange ultra-réaliste',
      'Préservation des expressions',
      'Qualité cinématographique',
      'Détection automatique',
      'Ajustements avancés',
      'Export haute définition',
      'Usage commercial',
      'Support professionnel'
    ],
    apiEndpoint: '/api/ai/deepfake-faceswap',
    status: 'premium',
    icon: '🎭',
    keywords: ['deepfake', 'face swap', 'réaliste', 'cinématographique'],
    useCases: ['Cinéma', 'Entertainment', 'Marketing', 'Art'],
    difficulty: 'advanced',
    processingTime: '30-90 secondes',
    accuracy: '87%'
  }
];

export const getServiceById = (id: string): NovaAIService | undefined => {
  return NOVA_AI_SERVICES.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): NovaAIService[] => {
  return NOVA_AI_SERVICES.filter(service => service.category === category);
};

export const searchServices = (query: string): NovaAIService[] => {
  const lowercaseQuery = query.toLowerCase();
  return NOVA_AI_SERVICES.filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    service.useCases.some(useCase => useCase.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecommendedServices = (userNeeds: string): NovaAIService[] => {
  const needs = userNeeds.toLowerCase();
  const recommendations: { service: NovaAIService; score: number }[] = [];

  NOVA_AI_SERVICES.forEach(service => {
    let score = 0;
    
    // Score basé sur les mots-clés
    service.keywords.forEach(keyword => {
      if (needs.includes(keyword.toLowerCase())) {
        score += 2;
      }
    });

    // Score basé sur les cas d'usage
    service.useCases.forEach(useCase => {
      if (needs.includes(useCase.toLowerCase())) {
        score += 1.5;
      }
    });

    // Score basé sur la description
    if (service.description.toLowerCase().includes(needs)) {
      score += 1;
    }

    if (score > 0) {
      recommendations.push({ service, score });
    }
  });

  // Trier par score décroissant et retourner les 6 meilleurs
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(item => item.service);
}; 