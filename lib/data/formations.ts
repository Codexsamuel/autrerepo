export interface Formation {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  language: string;
  certificate: boolean;
  liveSupport: boolean;
  lifetimeAccess: boolean;
  image: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    experience: string;
    companies: string[];
    description: string;
  };
  objectives: string[];
  prerequisites: string[];
  program: {
    day: number;
    title: string;
    duration: string;
    modules: {
      title: string;
      duration: string;
      type: 'Théorie' | 'Pratique' | 'Workshop';
      content: string;
    }[];
  }[];
  includes: string[];
  testimonials: {
    name: string;
    company: string;
    rating: number;
    comment: string;
  }[];
  nextSessions: {
    date: string;
    location: string;
    seats: number;
    price: number;
  }[];
  features: string[];
  icon: string;
  color: string;
  status: 'active' | 'coming-soon';
}

export const formations: Formation[] = [
  {
    slug: "crm-gestion-client",
    title: "CRM & Gestion Client",
    subtitle: "Maîtrisez la relation client et optimisez vos ventes",
    description: "Formation complète pour maîtriser les outils CRM et développer une stratégie client performante. Apprenez à automatiser vos processus, analyser vos données clients et augmenter votre taux de conversion.",
    duration: "3 jours",
    level: "Intermédiaire",
    price: 750,
    originalPrice: 950,
    rating: 4.6,
    students: 134,
    language: "Français",
    certificate: true,
    liveSupport: true,
    lifetimeAccess: true,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1751241419/CRM_Gestion_Client_heehvk.png",
    instructor: {
      name: "Marie Dubois",
      title: "Experte CRM & Relation Client",
      avatar: "/images/avatars/instructor-crm.jpg",
      experience: "8 ans d'expérience",
      companies: ["Salesforce", "HubSpot", "Microsoft"],
      description: "Spécialiste en CRM avec plus de 8 ans d'expérience dans l'optimisation des processus de vente et la gestion de la relation client."
    },
    objectives: [
      "Comprendre les enjeux de la relation client",
      "Maîtriser les outils CRM modernes",
      "Automatiser vos processus de vente",
      "Analyser et optimiser vos performances",
      "Développer une stratégie client centrée"
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Expérience en vente ou gestion client appréciée",
      "Ordinateur avec connexion internet"
    ],
    program: [
      {
        day: 1,
        title: "Fondamentaux CRM",
        duration: "6h",
        modules: [
          {
            title: "Introduction aux CRM",
            duration: "1h30",
            type: "Théorie",
            content: "Définition, enjeux, bénéfices"
          },
          {
            title: "Panorama des solutions",
            duration: "2h",
            type: "Pratique",
            content: "Salesforce, HubSpot, Pipedrive, etc."
          },
          {
            title: "Stratégie d'implémentation",
            duration: "2h30",
            type: "Workshop",
            content: "Planification et mise en place"
          }
        ]
      },
      {
        day: 2,
        title: "Automatisation & Processus",
        duration: "6h",
        modules: [
          {
            title: "Workflows d'automatisation",
            duration: "2h",
            type: "Pratique",
            content: "Création de workflows"
          },
          {
            title: "Gestion des leads",
            duration: "2h",
            type: "Workshop",
            content: "Qualification et scoring"
          },
          {
            title: "Pipeline de vente",
            duration: "2h",
            type: "Pratique",
            content: "Optimisation des étapes"
          }
        ]
      },
      {
        day: 3,
        title: "Analytics & Optimisation",
        duration: "6h",
        modules: [
          {
            title: "Tableaux de bord",
            duration: "2h",
            type: "Pratique",
            content: "KPIs et métriques"
          },
          {
            title: "Analyse des performances",
            duration: "2h",
            type: "Workshop",
            content: "Reporting et insights"
          },
          {
            title: "Optimisation continue",
            duration: "2h",
            type: "Théorie",
            content: "Amélioration des processus"
          }
        ]
      }
    ],
    includes: [
      "18h de formation en présentiel",
      "Support de cours complet",
      "Accès à la plateforme en ligne",
      "Certificat de formation",
      "Support post-formation (3 mois)",
      "Réseau alumni",
      "Mise à jour gratuite (1 an)"
    ],
    testimonials: [
      {
        name: "Thomas Martin",
        company: "Directeur Commercial, TechCorp",
        rating: 5,
        comment: "Formation excellente qui m'a permis d'optimiser mes processus de vente. +40% de conversion en 3 mois !"
      },
      {
        name: "Sophie Bernard",
        company: "Responsable Marketing, StartupXYZ",
        rating: 5,
        comment: "Marie est une formatrice exceptionnelle. J'ai pu implémenter un CRM efficace dès la fin de la formation."
      },
      {
        name: "Lucas Moreau",
        company: "Chef de projet, DigitalAgency",
        rating: 4,
        comment: "Contenu très pratique et applicable immédiatement. Formation de qualité professionnelle."
      }
    ],
    nextSessions: [
      {
        date: "15-17 Janvier 2024",
        location: "Paris",
        seats: 8,
        price: 750
      },
      {
        date: "22-24 Février 2024",
        location: "Lyon",
        seats: 12,
        price: 750
      },
      {
        date: "7-9 Mars 2024",
        location: "Paris",
        seats: 10,
        price: 750
      }
    ],
    features: [
      "Stratégies CRM",
      "Automatisation",
      "Analytics client",
      "Intégrations",
      "Best practices"
    ],
    icon: "Users",
    color: "from-orange-500 to-red-500",
    status: "active"
  },
  {
    slug: "intelligence-artificielle-entreprises",
    title: "Intelligence Artificielle pour Entreprises",
    subtitle: "Maîtrisez l'IA pour transformer votre entreprise",
    description: "Formation complète pour comprendre et implémenter l'IA dans votre entreprise. Découvrez les outils, les stratégies et les bonnes pratiques pour automatiser vos processus et créer de la valeur.",
    duration: "5 jours",
    level: "Intermédiaire",
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    students: 156,
    language: "Français",
    certificate: true,
    liveSupport: true,
    lifetimeAccess: true,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1751241419/Intelligence_Artificielle_pour_Entreprises_d2qj3e.png",
    instructor: {
      name: "Dr. Alexandre Chen",
      title: "Expert IA & Machine Learning",
      avatar: "/images/avatars/instructor-ai.jpg",
      experience: "12 ans d'expérience",
      companies: ["Google", "OpenAI", "Microsoft"],
      description: "Docteur en Intelligence Artificielle avec plus de 12 ans d'expérience dans l'implémentation de solutions IA en entreprise."
    },
    objectives: [
      "Comprendre les fondamentaux de l'IA",
      "Identifier les opportunités d'IA dans votre secteur",
      "Implémenter des solutions IA concrètes",
      "Gérer les aspects éthiques et légaux",
      "Mesurer le ROI de vos projets IA"
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Curiosité pour les nouvelles technologies",
      "Ordinateur avec connexion internet"
    ],
    program: [
      {
        day: 1,
        title: "Fondamentaux de l'IA",
        duration: "6h",
        modules: [
          {
            title: "Introduction à l'IA",
            duration: "2h",
            type: "Théorie",
            content: "Définitions, concepts clés, applications"
          },
          {
            title: "Types d'IA et leurs usages",
            duration: "2h",
            type: "Pratique",
            content: "Machine Learning, Deep Learning, NLP"
          },
          {
            title: "Cas d'usage par secteur",
            duration: "2h",
            type: "Workshop",
            content: "Analyse de cas concrets"
          }
        ]
      },
      {
        day: 2,
        title: "Outils et Technologies",
        duration: "6h",
        modules: [
          {
            title: "Panorama des outils IA",
            duration: "2h",
            type: "Pratique",
            content: "ChatGPT, Claude, Midjourney, etc."
          },
          {
            title: "Intégration API",
            duration: "2h",
            type: "Pratique",
            content: "Connexion et utilisation"
          },
          {
            title: "Automatisation des processus",
            duration: "2h",
            type: "Workshop",
            content: "Workflows intelligents"
          }
        ]
      },
      {
        day: 3,
        title: "Stratégie et Implémentation",
        duration: "6h",
        modules: [
          {
            title: "Roadmap d'implémentation",
            duration: "2h",
            type: "Théorie",
            content: "Planification stratégique"
          },
          {
            title: "Gestion de projet IA",
            duration: "2h",
            type: "Workshop",
            content: "Méthodologies agiles"
          },
          {
            title: "Mesure et optimisation",
            duration: "2h",
            type: "Pratique",
            content: "KPIs et métriques"
          }
        ]
      },
      {
        day: 4,
        title: "Aspects Légaux et Éthiques",
        duration: "6h",
        modules: [
          {
            title: "Réglementation IA",
            duration: "2h",
            type: "Théorie",
            content: "GDPR, AI Act, etc."
          },
          {
            title: "Éthique et responsabilité",
            duration: "2h",
            type: "Workshop",
            content: "Bonnes pratiques"
          },
          {
            title: "Sécurité et confidentialité",
            duration: "2h",
            type: "Pratique",
            content: "Protection des données"
          }
        ]
      },
      {
        day: 5,
        title: "Projet Final et Certification",
        duration: "6h",
        modules: [
          {
            title: "Projet personnel",
            duration: "3h",
            type: "Workshop",
            content: "Développement d'un projet IA"
          },
          {
            title: "Présentation et feedback",
            duration: "2h",
            type: "Pratique",
            content: "Démonstration des projets"
          },
          {
            title: "Certification et suite",
            duration: "1h",
            type: "Théorie",
            content: "Remise des certificats"
          }
        ]
      }
    ],
    includes: [
      "30h de formation en présentiel",
      "Support de cours complet",
      "Accès à la plateforme en ligne",
      "Certificat de formation",
      "Support post-formation (6 mois)",
      "Réseau alumni",
      "Mise à jour gratuite (2 ans)",
      "Accès aux outils IA premium"
    ],
    testimonials: [
      {
        name: "Emma Rodriguez",
        company: "Directrice Innovation, FinTech",
        rating: 5,
        comment: "Formation révolutionnaire ! J'ai pu implémenter 3 projets IA qui ont généré +2M€ de valeur ajoutée."
      },
      {
        name: "Pierre Dubois",
        company: "CTO, StartupTech",
        rating: 5,
        comment: "Alexandre est un expert exceptionnel. La formation a transformé notre approche de l'IA."
      },
      {
        name: "Sarah Johnson",
        company: "Responsable Digital, RetailCorp",
        rating: 4,
        comment: "Contenu très complet et pratique. J'ai pu lancer notre premier chatbot IA dès la fin de la formation."
      }
    ],
    nextSessions: [
      {
        date: "20-24 Janvier 2024",
        location: "Paris",
        seats: 6,
        price: 1200
      },
      {
        date: "17-21 Février 2024",
        location: "Lyon",
        seats: 8,
        price: 1200
      },
      {
        date: "16-20 Mars 2024",
        location: "Paris",
        seats: 6,
        price: 1200
      }
    ],
    features: [
      "Chatbots IA",
      "Machine Learning",
      "Automatisation",
      "Analyse prédictive",
      "Intégration API"
    ],
    icon: "Brain",
    color: "from-purple-500 to-pink-500",
    status: "active"
  },
  {
    slug: "marketing-digital-reseaux-sociaux",
    title: "Marketing Digital & Réseaux Sociaux",
    subtitle: "Développez votre présence en ligne et maîtrisez les stratégies digitales",
    description: "Formation complète pour maîtriser le marketing digital et les réseaux sociaux. Apprenez à créer des stratégies performantes, gérer vos communautés et optimiser vos campagnes publicitaires.",
    duration: "4 jours",
    level: "Débutant",
    price: 950,
    originalPrice: 1200,
    rating: 4.7,
    students: 203,
    language: "Français",
    certificate: true,
    liveSupport: true,
    lifetimeAccess: true,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1751241419/Marketing_Digital_Re%CC%81seaux_Sociaux_prh2o3.jpg",
    instructor: {
      name: "Julie Moreau",
      title: "Experte Marketing Digital",
      avatar: "/images/avatars/instructor-marketing.jpg",
      experience: "10 ans d'expérience",
      companies: ["Meta", "Google", "TikTok"],
      description: "Spécialiste en marketing digital avec plus de 10 ans d'expérience dans la gestion de campagnes multi-plateformes."
    },
    objectives: [
      "Maîtriser les fondamentaux du marketing digital",
      "Créer une stratégie de présence en ligne",
      "Gérer efficacement les réseaux sociaux",
      "Optimiser les campagnes publicitaires",
      "Mesurer et analyser les performances"
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Intérêt pour le digital",
      "Ordinateur avec connexion internet"
    ],
    program: [
      {
        day: 1,
        title: "Fondamentaux Marketing Digital",
        duration: "6h",
        modules: [
          {
            title: "Introduction au marketing digital",
            duration: "2h",
            type: "Théorie",
            content: "Concepts, tendances, enjeux"
          },
          {
            title: "Stratégie de présence en ligne",
            duration: "2h",
            type: "Workshop",
            content: "Définition d'objectifs et KPIs"
          },
          {
            title: "Persona et parcours client",
            duration: "2h",
            type: "Pratique",
            content: "Création de personas"
          }
        ]
      },
      {
        day: 2,
        title: "Réseaux Sociaux",
        duration: "6h",
        modules: [
          {
            title: "Panorama des plateformes",
            duration: "2h",
            type: "Pratique",
            content: "Facebook, Instagram, LinkedIn, TikTok"
          },
          {
            title: "Création de contenu",
            duration: "2h",
            type: "Workshop",
            content: "Calendrier éditorial"
          },
          {
            title: "Gestion de communauté",
            duration: "2h",
            type: "Pratique",
            content: "Modération et engagement"
          }
        ]
      },
      {
        day: 3,
        title: "Publicité en Ligne",
        duration: "6h",
        modules: [
          {
            title: "Google Ads",
            duration: "2h",
            type: "Pratique",
            content: "Création de campagnes"
          },
          {
            title: "Publicité sociale",
            duration: "2h",
            type: "Pratique",
            content: "Facebook Ads, Instagram Ads"
          },
          {
            title: "Optimisation des campagnes",
            duration: "2h",
            type: "Workshop",
            content: "A/B testing et optimisation"
          }
        ]
      },
      {
        day: 4,
        title: "Analytics et Optimisation",
        duration: "6h",
        modules: [
          {
            title: "Google Analytics",
            duration: "2h",
            type: "Pratique",
            content: "Suivi des performances"
          },
          {
            title: "Outils de mesure",
            duration: "2h",
            type: "Pratique",
            content: "Outils spécialisés"
          },
          {
            title: "Reporting et optimisation",
            duration: "2h",
            type: "Workshop",
            content: "Création de rapports"
          }
        ]
      }
    ],
    includes: [
      "24h de formation en présentiel",
      "Support de cours complet",
      "Accès à la plateforme en ligne",
      "Certificat de formation",
      "Support post-formation (3 mois)",
      "Réseau alumni",
      "Mise à jour gratuite (1 an)",
      "Templates et outils"
    ],
    testimonials: [
      {
        name: "Camille Leroy",
        company: "Fondatrice, BeautyBrand",
        rating: 5,
        comment: "Formation exceptionnelle ! J'ai doublé mes ventes en ligne en 2 mois grâce aux techniques apprises."
      },
      {
        name: "Marc Durand",
        company: "Responsable Marketing, Restaurant",
        rating: 5,
        comment: "Julie est une formatrice passionnée. J'ai pu créer une stratégie digitale complète pour mon restaurant."
      },
      {
        name: "Ana Silva",
        company: "Freelance Marketing",
        rating: 4,
        comment: "Contenu très pratique et à jour. J'ai pu développer mes compétences et trouver de nouveaux clients."
      }
    ],
    nextSessions: [
      {
        date: "18-21 Janvier 2024",
        location: "Paris",
        seats: 10,
        price: 950
      },
      {
        date: "15-18 Février 2024",
        location: "Lyon",
        seats: 12,
        price: 950
      },
      {
        date: "14-17 Mars 2024",
        location: "Paris",
        seats: 8,
        price: 950
      }
    ],
    features: [
      "Stratégies digitales",
      "Gestion réseaux sociaux",
      "Publicité en ligne",
      "Analytics",
      "Content marketing"
    ],
    icon: "Target",
    color: "from-blue-500 to-cyan-500",
    status: "active"
  },
  {
    slug: "ecommerce-vente-ligne",
    title: "E-commerce & Vente en Ligne",
    subtitle: "Créez et gérez votre boutique en ligne de A à Z",
    description: "Formation complète pour créer, lancer et optimiser votre boutique en ligne. Apprenez à gérer les paiements, la logistique, le marketing e-commerce et l'analyse des performances.",
    duration: "6 jours",
    level: "Tous niveaux",
    price: 1400,
    originalPrice: 1800,
    rating: 4.9,
    students: 89,
    language: "Français",
    certificate: true,
    liveSupport: true,
    lifetimeAccess: true,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1751241419/E-commerce_Vente_en_Ligne_ugujdc.jpg",
    instructor: {
      name: "David Laurent",
      title: "Expert E-commerce & Entrepreneur",
      avatar: "/images/avatars/instructor-ecommerce.jpg",
      experience: "15 ans d'expérience",
      companies: ["Shopify", "Amazon", "WooCommerce"],
      description: "Entrepreneur e-commerce avec plus de 15 ans d'expérience dans la création et la gestion de boutiques en ligne."
    },
    objectives: [
      "Créer une boutique en ligne performante",
      "Maîtriser les plateformes e-commerce",
      "Optimiser la conversion et les ventes",
      "Gérer la logistique et les paiements",
      "Analyser et optimiser les performances"
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Esprit entrepreneurial",
      "Ordinateur avec connexion internet"
    ],
    program: [
      {
        day: 1,
        title: "Fondamentaux E-commerce",
        duration: "6h",
        modules: [
          {
            title: "Introduction à l'e-commerce",
            duration: "2h",
            type: "Théorie",
            content: "Tendances, enjeux, opportunités"
          },
          {
            title: "Choix de la plateforme",
            duration: "2h",
            type: "Pratique",
            content: "Shopify, WooCommerce, PrestaShop"
          },
          {
            title: "Stratégie de lancement",
            duration: "2h",
            type: "Workshop",
            content: "Planification du projet"
          }
        ]
      },
      {
        day: 2,
        title: "Création de la Boutique",
        duration: "6h",
        modules: [
          {
            title: "Design et UX",
            duration: "2h",
            type: "Pratique",
            content: "Interface utilisateur"
          },
          {
            title: "Catalogue produits",
            duration: "2h",
            type: "Pratique",
            content: "Gestion des produits"
          },
          {
            title: "Configuration technique",
            duration: "2h",
            type: "Workshop",
            content: "Paramétrage avancé"
          }
        ]
      },
      {
        day: 3,
        title: "Paiements et Sécurité",
        duration: "6h",
        modules: [
          {
            title: "Solutions de paiement",
            duration: "2h",
            type: "Pratique",
            content: "Stripe, PayPal, etc."
          },
          {
            title: "Sécurité et conformité",
            duration: "2h",
            type: "Théorie",
            content: "RGPD, sécurité des données"
          },
          {
            title: "Gestion des commandes",
            duration: "2h",
            type: "Pratique",
            content: "Workflow de commande"
          }
        ]
      },
      {
        day: 4,
        title: "Logistique et Livraison",
        duration: "6h",
        modules: [
          {
            title: "Gestion des stocks",
            duration: "2h",
            type: "Pratique",
            content: "Inventaire et alertes"
          },
          {
            title: "Solutions de livraison",
            duration: "2h",
            type: "Pratique",
            content: "Transporteurs, tracking"
          },
          {
            title: "Service client",
            duration: "2h",
            type: "Workshop",
            content: "Support et SAV"
          }
        ]
      },
      {
        day: 5,
        title: "Marketing E-commerce",
        duration: "6h",
        modules: [
          {
            title: "SEO et référencement",
            duration: "2h",
            type: "Pratique",
            content: "Optimisation pour les moteurs"
          },
          {
            title: "Email marketing",
            duration: "2h",
            type: "Pratique",
            content: "Campagnes d'email"
          },
          {
            title: "Publicité ciblée",
            duration: "2h",
            type: "Workshop",
            content: "Google Shopping, Facebook Ads"
          }
        ]
      },
      {
        day: 6,
        title: "Analytics et Optimisation",
        duration: "6h",
        modules: [
          {
            title: "Outils d'analyse",
            duration: "2h",
            type: "Pratique",
            content: "Google Analytics, outils e-commerce"
          },
          {
            title: "Optimisation conversion",
            duration: "2h",
            type: "Workshop",
            content: "A/B testing, CRO"
          },
          {
            title: "Projet final",
            duration: "2h",
            type: "Pratique",
            content: "Présentation des projets"
          }
        ]
      }
    ],
    includes: [
      "36h de formation en présentiel",
      "Support de cours complet",
      "Accès à la plateforme en ligne",
      "Certificat de formation",
      "Support post-formation (6 mois)",
      "Réseau alumni",
      "Mise à jour gratuite (2 ans)",
      "Templates et ressources"
    ],
    testimonials: [
      {
        name: "Sophie Martin",
        company: "Fondatrice, FashionBoutique",
        rating: 5,
        comment: "Formation exceptionnelle ! J'ai lancé ma boutique et généré 50k€ de CA en 6 mois."
      },
      {
        name: "Thomas Bernard",
        company: "Entrepreneur, TechStartup",
        rating: 5,
        comment: "David est un expert passionné. J'ai pu créer une boutique complète et professionnelle."
      },
      {
        name: "Marie Dubois",
        company: "Artisan, HandmadeShop",
        rating: 4,
        comment: "Contenu très pratique. J'ai pu digitaliser mon activité artisanale avec succès."
      }
    ],
    nextSessions: [
      {
        date: "22-27 Janvier 2024",
        location: "Paris",
        seats: 6,
        price: 1400
      },
      {
        date: "19-24 Février 2024",
        location: "Lyon",
        seats: 8,
        price: 1400
      },
      {
        date: "18-23 Mars 2024",
        location: "Paris",
        seats: 6,
        price: 1400
      }
    ],
    features: [
      "Création boutique",
      "Gestion des paiements",
      "Logistique",
      "Marketing e-commerce",
      "Analytics ventes"
    ],
    icon: "ShoppingCart",
    color: "from-green-500 to-emerald-500",
    status: "active"
  },
  {
    slug: "creation-visuelle-design",
    title: "Création Visuelle & Design",
    subtitle: "Créez des visuels professionnels pour vos supports marketing",
    description: "Formation complète pour maîtriser les outils de création visuelle et créer des designs professionnels. Apprenez à utiliser les logiciels, créer une identité visuelle et produire des supports marketing impactants.",
    duration: "4 jours",
    level: "Débutant",
    price: 850,
    originalPrice: 1100,
    rating: 4.5,
    students: 167,
    language: "Français",
    certificate: true,
    liveSupport: true,
    lifetimeAccess: true,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1751241420/Cre%CC%81ation_Visuelle_Design_ulwtou.avif",
    instructor: {
      name: "Léa Rodriguez",
      title: "Designer Graphique & Directrice Artistique",
      avatar: "/images/avatars/instructor-design.jpg",
      experience: "12 ans d'expérience",
      companies: ["Adobe", "Canva", "Freelance"],
      description: "Designer graphique passionnée avec plus de 12 ans d'expérience dans la création d'identités visuelles et de supports marketing."
    },
    objectives: [
      "Maîtriser les outils de création visuelle",
      "Créer une identité visuelle cohérente",
      "Produire des supports marketing impactants",
      "Comprendre les principes du design",
      "Optimiser les visuels pour le digital"
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Sensibilité artistique",
      "Ordinateur avec connexion internet"
    ],
    program: [
      {
        day: 1,
        title: "Fondamentaux du Design",
        duration: "6h",
        modules: [
          {
            title: "Principes du design",
            duration: "2h",
            type: "Théorie",
            content: "Couleurs, typographie, composition"
          },
          {
            title: "Outils de création",
            duration: "2h",
            type: "Pratique",
            content: "Canva, Figma, Adobe Creative Suite"
          },
          {
            title: "Identité visuelle",
            duration: "2h",
            type: "Workshop",
            content: "Création de logo et charte graphique"
          }
        ]
      },
      {
        day: 2,
        title: "Supports Marketing",
        duration: "6h",
        modules: [
          {
            title: "Design print",
            duration: "2h",
            type: "Pratique",
            content: "Flyers, brochures, affiches"
          },
          {
            title: "Design digital",
            duration: "2h",
            type: "Pratique",
            content: "Bannières, posts réseaux sociaux"
          },
          {
            title: "Templates et maquettes",
            duration: "2h",
            type: "Workshop",
            content: "Création de templates réutilisables"
          }
        ]
      },
      {
        day: 3,
        title: "Photos et Illustrations",
        duration: "6h",
        modules: [
          {
            title: "Édition photo",
            duration: "2h",
            type: "Pratique",
            content: "Retouche et optimisation"
          },
          {
            title: "Illustrations vectorielles",
            duration: "2h",
            type: "Pratique",
            content: "Création d'icônes et illustrations"
          },
          {
            title: "Banques d'images",
            duration: "2h",
            type: "Workshop",
            content: "Sélection et utilisation"
          }
        ]
      },
      {
        day: 4,
        title: "Optimisation et Export",
        duration: "6h",
        modules: [
          {
            title: "Optimisation web",
            duration: "2h",
            type: "Pratique",
            content: "Formats, compression, responsive"
          },
          {
            title: "Workflow de production",
            duration: "2h",
            type: "Workshop",
            content: "Organisation et efficacité"
          },
          {
            title: "Projet final",
            duration: "2h",
            type: "Pratique",
            content: "Création d'un kit complet"
          }
        ]
      }
    ],
    includes: [
      "24h de formation en présentiel",
      "Support de cours complet",
      "Accès à la plateforme en ligne",
      "Certificat de formation",
      "Support post-formation (3 mois)",
      "Réseau alumni",
      "Mise à jour gratuite (1 an)",
      "Templates et ressources"
    ],
    testimonials: [
      {
        name: "Emma Dubois",
        company: "Fondatrice, EventAgency",
        rating: 4,
        comment: "Formation très pratique ! J'ai pu créer tous les visuels pour mes événements."
      },
      {
        name: "Pierre Moreau",
        company: "Responsable Marketing, Startup",
        rating: 5,
        comment: "Léa est une formatrice exceptionnelle. J'ai pu créer une identité visuelle complète."
      },
      {
        name: "Ana Silva",
        company: "Freelance Designer",
        rating: 4,
        comment: "Contenu très complet et à jour. J'ai pu développer mes compétences techniques."
      }
    ],
    nextSessions: [
      {
        date: "25-28 Janvier 2024",
        location: "Paris",
        seats: 10,
        price: 850
      },
      {
        date: "22-25 Février 2024",
        location: "Lyon",
        seats: 12,
        price: 850
      },
      {
        date: "21-24 Mars 2024",
        location: "Paris",
        seats: 8,
        price: 850
      }
    ],
    features: [
      "Design graphique",
      "Outils créatifs",
      "Branding",
      "Supports marketing",
      "Templates"
    ],
    icon: "Camera",
    color: "from-yellow-500 to-orange-500",
    status: "active"
  },
  {
    slug: "televente-prospection",
    title: "Télévente & Prospection",
    subtitle: "Développez vos compétences commerciales et techniques de vente",
    description: "Formation complète pour maîtriser les techniques de vente et de prospection. Apprenez à gérer les objections, fermer des ventes et développer votre pipeline commercial.",
    duration: "3 jours",
    level: "Tous niveaux",
    price: 650,
    originalPrice: 850,
    rating: 4.7,
    students: 98,
    language: "Français",
    certificate: true,
    liveSupport: true,
    lifetimeAccess: true,
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1751241407/Te%CC%81le%CC%81vente_Prospection_luz9i1.png",
    instructor: {
      name: "Marc Durand",
      title: "Expert en Vente & Prospection",
      avatar: "/images/avatars/instructor-sales.jpg",
      experience: "20 ans d'expérience",
      companies: ["Oracle", "Salesforce", "Microsoft"],
      description: "Expert en vente avec plus de 20 ans d'expérience dans la formation de commerciaux et la gestion d'équipes de vente."
    },
    objectives: [
      "Maîtriser les techniques de prospection",
      "Gérer efficacement les objections",
      "Fermer des ventes avec succès",
      "Développer un pipeline commercial",
      "Optimiser les performances de vente"
    ],
    prerequisites: [
      "Aucun prérequis technique",
      "Goût pour la relation client",
      "Ordinateur avec connexion internet"
    ],
    program: [
      {
        day: 1,
        title: "Fondamentaux de la Vente",
        duration: "6h",
        modules: [
          {
            title: "Psychologie de la vente",
            duration: "2h",
            type: "Théorie",
            content: "Comportements d'achat, motivations"
          },
          {
            title: "Processus de vente",
            duration: "2h",
            type: "Pratique",
            content: "Étapes du cycle de vente"
          },
          {
            title: "Qualification des prospects",
            duration: "2h",
            type: "Workshop",
            content: "Techniques de qualification"
          }
        ]
      },
      {
        day: 2,
        title: "Prospection et Communication",
        duration: "6h",
        modules: [
          {
            title: "Techniques de prospection",
            duration: "2h",
            type: "Pratique",
            content: "Cold calling, emailing, réseaux"
          },
          {
            title: "Communication persuasive",
            duration: "2h",
            type: "Workshop",
            content: "Argumentation et présentation"
          },
          {
            title: "Gestion des objections",
            duration: "2h",
            type: "Pratique",
            content: "Techniques de réponse"
          }
        ]
      },
      {
        day: 3,
        title: "Closing et Suivi",
        duration: "6h",
        modules: [
          {
            title: "Techniques de closing",
            duration: "2h",
            type: "Pratique",
            content: "Fermeture de vente"
          },
          {
            title: "Négociation commerciale",
            duration: "2h",
            type: "Workshop",
            content: "Stratégies de négociation"
          },
          {
            title: "Suivi client",
            duration: "2h",
            type: "Pratique",
            content: "Fidélisation et développement"
          }
        ]
      }
    ],
    includes: [
      "18h de formation en présentiel",
      "Support de cours complet",
      "Accès à la plateforme en ligne",
      "Certificat de formation",
      "Support post-formation (3 mois)",
      "Réseau alumni",
      "Mise à jour gratuite (1 an)",
      "Scripts et templates"
    ],
    testimonials: [
      {
        name: "Thomas Martin",
        company: "Commercial Senior, TechCorp",
        rating: 5,
        comment: "Formation excellente ! J'ai augmenté mes ventes de 60% en 3 mois."
      },
      {
        name: "Sophie Bernard",
        company: "Responsable Commerciale, Startup",
        rating: 5,
        comment: "Marc est un expert passionné. J'ai pu former mon équipe avec ses techniques."
      },
      {
        name: "Lucas Moreau",
        company: "Freelance Commercial",
        rating: 4,
        comment: "Contenu très pratique et applicable immédiatement."
      }
    ],
    nextSessions: [
      {
        date: "29-31 Janvier 2024",
        location: "Paris",
        seats: 12,
        price: 650
      },
      {
        date: "26-28 Février 2024",
        location: "Lyon",
        seats: 15,
        price: 650
      },
      {
        date: "25-27 Mars 2024",
        location: "Paris",
        seats: 10,
        price: 650
      }
    ],
    features: [
      "Techniques de vente",
      "Prospection",
      "Gestion objections",
      "Closing",
      "Suivi client"
    ],
    icon: "MessageSquare",
    color: "from-red-500 to-pink-500",
    status: "active"
  }
];

export function getFormationBySlug(slug: string): Formation | undefined {
  // Décoder l'URL et normaliser le slug
  const decodedSlug = decodeURIComponent(slug);
  
  // Essayer de trouver la formation avec le slug exact
  let formation = formations.find(f => f.slug === decodedSlug);
  
  // Si pas trouvé, essayer avec des variations
  if (!formation) {
    // Remplacer les caractères spéciaux par des tirets
    const normalizedSlug = decodedSlug
      .toLowerCase()
      .replace(/[&]/g, '-')
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ûüù]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    formation = formations.find(f => f.slug === normalizedSlug);
  }
  
  return formation;
}

export function getAllFormations(): Formation[] {
  return formations;
} 