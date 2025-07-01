import { Metadata } from 'next'

export interface SEOPageConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    images: string[];
  };
  twitter: {
    title: string;
    description: string;
    images: string[];
  };
  structuredData?: any;
}

export const SEO_CONFIG: Record<string, SEOPageConfig> = {
  // Page d'accueil
  home: {
    title: 'DL Solutions - Écosystème Digital Complet | CRM, ERP, Boutique, Formations',
    description: 'DL Solutions - Écosystème digital complet avec CRM, ERP, boutique internationale, formations professionnelles, et solutions sectorielles (banque, assurance, immobilier, santé, hôtellerie). Services premium avec livraison au Cameroun.',
    keywords: [
      'DL Solutions', 'CRM', 'ERP', 'boutique internationale', 'formations professionnelles',
      'solutions bancaires', 'assurance', 'immobilier', 'santé', 'hôtellerie', 'Cameroun',
      'livraison Cameroun', 'école de police', 'bureaux Cameroun', 'e-commerce',
      'gestion client', 'trading', 'paris sportifs', 'community management'
    ],
    openGraph: {
      title: 'DL Solutions - Écosystème Digital Complet',
      description: 'CRM, ERP, boutique internationale, formations professionnelles. Livraison au Cameroun - École de Police, bureaux disponibles.',
      images: ['/images/og-dl-solutions.jpg']
    },
    twitter: {
      title: 'DL Solutions - Écosystème Digital Complet',
      description: 'CRM, ERP, boutique internationale, formations professionnelles. Livraison au Cameroun.',
      images: ['/images/twitter-dl-solutions.jpg']
    }
  },

  // Boutique DL Style
  'dl-style': {
    title: 'Boutique Internationale DL Style | Produits du Monde Entier | Livraison Cameroun',
    description: 'Boutique internationale DL Style - Produits premium de Chine, Dubaï, Turquie et Cameroun. Véhicules, électronique, mode, accessoires. Livraison au Cameroun - École de Police, Yaoundé. Paiement sécurisé, devises multiples (EUR, USD, FCFA).',
    keywords: [
      'boutique internationale', 'DL Style', 'produits Chine', 'produits Dubaï', 'produits Turquie',
      'véhicules Cameroun', 'livraison Cameroun', 'école de police Yaoundé', 'e-commerce Cameroun',
      'produits premium', 'paiement sécurisé', 'devises multiples', 'EUR USD FCFA',
      'véhicules électriques', 'smartphones', 'mode', 'accessoires', 'électronique'
    ],
    openGraph: {
      title: 'Boutique Internationale DL Style | Produits du Monde Entier',
      description: 'Découvrez notre sélection de produits premium du monde entier. Livraison au Cameroun - École de Police, Yaoundé.',
      images: ['/images/boutique-dl-style.jpg']
    },
    twitter: {
      title: 'Boutique Internationale DL Style | Produits du Monde Entier',
      description: 'Produits premium de Chine, Dubaï, Turquie et Cameroun. Livraison au Cameroun.',
      images: ['/images/boutique-dl-style.jpg']
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "DL Style - Boutique Internationale",
      "description": "Boutique internationale avec produits premium du monde entier",
      "url": "https://dlsolutions.com/novacore/dl-style",
      "image": "https://dlsolutions.com/images/boutique-dl-style.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "École de Police",
        "addressLocality": "Yaoundé",
        "addressRegion": "Centre",
        "addressCountry": "CM"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 3.848033,
        "longitude": 11.502075
      },
      "telephone": "+237-XXX-XXX-XXX",
      "openingHours": "Mo-Fr 08:00-18:00",
      "priceRange": "€€€",
      "paymentAccepted": ["Cash", "Credit Card", "Mobile Money"],
      "currenciesAccepted": ["EUR", "USD", "XAF"],
      "deliveryMethod": [
        {
          "@type": "DeliveryMethod",
          "name": "Livraison à domicile",
          "description": "Livraison à votre adresse au Cameroun"
        },
        {
          "@type": "DeliveryMethod",
          "name": "Point relais",
          "description": "Retrait à l'École de Police, Yaoundé"
        }
      ]
    }
  },

  // Formations
  formations: {
    title: 'Formations Professionnelles DL Solutions | CRM, IA, Marketing, E-commerce',
    description: 'Formations professionnelles certifiantes en CRM, Intelligence Artificielle, Marketing Digital, E-commerce, Création Visuelle, Télévente. Formations en ligne avec certificats reconnus. DL Solutions Cameroun.',
    keywords: [
      'formations professionnelles', 'CRM formation', 'intelligence artificielle formation',
      'marketing digital formation', 'e-commerce formation', 'création visuelle formation',
      'télévente formation', 'certification en ligne', 'DL Solutions formations',
      'formations Cameroun', 'formation gestion client', 'formation IA entreprises'
    ],
    openGraph: {
      title: 'Formations Professionnelles DL Solutions',
      description: 'Formations certifiantes en CRM, IA, Marketing Digital, E-commerce. Certificats reconnus.',
      images: ['/images/formations-dl-solutions.jpg']
    },
    twitter: {
      title: 'Formations Professionnelles DL Solutions',
      description: 'Formations certifiantes en CRM, IA, Marketing Digital, E-commerce.',
      images: ['/images/formations-dl-solutions.jpg']
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "DL Solutions - Centre de Formation",
      "description": "Centre de formation professionnelle en technologies digitales",
      "url": "https://dlsolutions.com/formations",
      "image": "https://dlsolutions.com/images/formations-dl-solutions.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "École de Police",
        "addressLocality": "Yaoundé",
        "addressRegion": "Centre",
        "addressCountry": "CM"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 3.848033,
        "longitude": 11.502075
      },
      "telephone": "+237-XXX-XXX-XXX",
      "email": "formations@dlsolutions.com"
    }
  },

  // Solutions sectorielles
  'solutions-banque': {
    title: 'Solutions Bancaires DL Solutions | CRM Banque, Gestion Client, Trading',
    description: 'Solutions bancaires complètes avec CRM spécialisé, gestion client, trading, paris sportifs. Solutions adaptées aux banques camerounaises. DL Solutions - Expert en solutions financières.',
    keywords: [
      'solutions bancaires', 'CRM banque', 'gestion client banque', 'trading Cameroun',
      'paris sportifs', 'solutions financières', 'banque Cameroun', 'DL Solutions banque'
    ],
    openGraph: {
      title: 'Solutions Bancaires DL Solutions',
      description: 'CRM spécialisé banque, trading, paris sportifs. Solutions financières complètes.',
      images: ['/images/solutions-banque.jpg']
    },
    twitter: {
      title: 'Solutions Bancaires DL Solutions',
      description: 'CRM spécialisé banque, trading, paris sportifs.',
      images: ['/images/solutions-banque.jpg']
    }
  },

  'solutions-assurance': {
    title: 'Solutions Assurance DL Solutions | CRM Assurance, Gestion Sinistres',
    description: 'Solutions assurance complètes avec CRM spécialisé, gestion des sinistres, souscription. Solutions adaptées aux assureurs camerounais. DL Solutions - Expert en solutions d\'assurance.',
    keywords: [
      'solutions assurance', 'CRM assurance', 'gestion sinistres', 'souscription assurance',
      'assurance Cameroun', 'DL Solutions assurance', 'solutions d\'assurance'
    ],
    openGraph: {
      title: 'Solutions Assurance DL Solutions',
      description: 'CRM spécialisé assurance, gestion sinistres, souscription. Solutions d\'assurance complètes.',
      images: ['/images/solutions-assurance.jpg']
    },
    twitter: {
      title: 'Solutions Assurance DL Solutions',
      description: 'CRM spécialisé assurance, gestion sinistres.',
      images: ['/images/solutions-assurance.jpg']
    }
  },

  'solutions-immobilier': {
    title: 'Solutions Immobilières DL Solutions | CRM Immobilier, Gestion Biens',
    description: 'Solutions immobilières complètes avec CRM spécialisé, gestion des biens, visites virtuelles. Solutions adaptées aux agences immobilières camerounaises. DL Solutions - Expert en solutions immobilières.',
    keywords: [
      'solutions immobilières', 'CRM immobilier', 'gestion biens', 'visites virtuelles',
      'immobilier Cameroun', 'DL Solutions immobilier', 'agence immobilière'
    ],
    openGraph: {
      title: 'Solutions Immobilières DL Solutions',
      description: 'CRM spécialisé immobilier, gestion biens, visites virtuelles. Solutions immobilières complètes.',
      images: ['/images/solutions-immobilier.jpg']
    },
    twitter: {
      title: 'Solutions Immobilières DL Solutions',
      description: 'CRM spécialisé immobilier, gestion biens.',
      images: ['/images/solutions-immobilier.jpg']
    }
  },

  'solutions-hospitalier': {
    title: 'Solutions Hospitalières DL Solutions | CRM Santé, Gestion Patients',
    description: 'Solutions hospitalières complètes avec CRM spécialisé santé, gestion des patients, rendez-vous. Solutions adaptées aux hôpitaux camerounais. DL Solutions - Expert en solutions de santé.',
    keywords: [
      'solutions hospitalières', 'CRM santé', 'gestion patients', 'hôpital Cameroun',
      'solutions de santé', 'DL Solutions santé', 'gestion médicale'
    ],
    openGraph: {
      title: 'Solutions Hospitalières DL Solutions',
      description: 'CRM spécialisé santé, gestion patients, rendez-vous. Solutions hospitalières complètes.',
      images: ['/images/solutions-hospitalier.jpg']
    },
    twitter: {
      title: 'Solutions Hospitalières DL Solutions',
      description: 'CRM spécialisé santé, gestion patients.',
      images: ['/images/solutions-hospitalier.jpg']
    }
  },

  'solutions-hospitality': {
    title: 'Solutions Hôtellerie DL Solutions | CRM Hôtel, Gestion Réservations',
    description: 'Solutions hôtellerie complètes avec CRM spécialisé, gestion des réservations, check-in/check-out. Solutions adaptées aux hôtels camerounais. DL Solutions - Expert en solutions hôtelières.',
    keywords: [
      'solutions hôtellerie', 'CRM hôtel', 'gestion réservations', 'hôtel Cameroun',
      'solutions hôtelières', 'DL Solutions hôtellerie', 'gestion hôtelière'
    ],
    openGraph: {
      title: 'Solutions Hôtellerie DL Solutions',
      description: 'CRM spécialisé hôtel, gestion réservations, check-in/check-out. Solutions hôtelières complètes.',
      images: ['/images/solutions-hospitality.jpg']
    },
    twitter: {
      title: 'Solutions Hôtellerie DL Solutions',
      description: 'CRM spécialisé hôtel, gestion réservations.',
      images: ['/images/solutions-hospitality.jpg']
    }
  },

  // Contact
  contact: {
    title: 'Contact DL Solutions | École de Police, Yaoundé, Cameroun',
    description: 'Contactez DL Solutions - École de Police, Yaoundé, Cameroun. Support client, devis, rendez-vous. Téléphone, email, adresse. Service client disponible 7j/7.',
    keywords: [
      'contact DL Solutions', 'DL Solutions Cameroun', 'école de police Yaoundé',
      'support client', 'devis DL Solutions', 'rendez-vous DL Solutions'
    ],
    openGraph: {
      title: 'Contact DL Solutions | École de Police, Yaoundé',
      description: 'Contactez-nous - École de Police, Yaoundé, Cameroun. Support client disponible 7j/7.',
      images: ['/images/contact-dl-solutions.jpg']
    },
    twitter: {
      title: 'Contact DL Solutions | École de Police, Yaoundé',
      description: 'Contactez-nous - École de Police, Yaoundé, Cameroun.',
      images: ['/images/contact-dl-solutions.jpg']
    }
  },

  // À propos
  'a-propos': {
    title: 'À Propos DL Solutions | Écosystème Digital Complet Cameroun',
    description: 'Découvrez DL Solutions - Écosystème digital complet au Cameroun. CRM, ERP, boutique internationale, formations. École de Police, Yaoundé. Innovation technologique et excellence.',
    keywords: [
      'à propos DL Solutions', 'DL Solutions Cameroun', 'histoire DL Solutions',
      'équipe DL Solutions', 'mission DL Solutions', 'innovation technologique'
    ],
    openGraph: {
      title: 'À Propos DL Solutions | Écosystème Digital Complet',
      description: 'Découvrez DL Solutions - Écosystème digital complet au Cameroun. Innovation et excellence.',
      images: ['/images/about-dl-solutions.jpg']
    },
    twitter: {
      title: 'À Propos DL Solutions | Écosystème Digital Complet',
      description: 'Découvrez DL Solutions - Écosystème digital complet au Cameroun.',
      images: ['/images/about-dl-solutions.jpg']
    }
  }
};

export function generateMetadata(pageKey: string): Metadata {
  const config = SEO_CONFIG[pageKey];
  if (!config) {
    return SEO_CONFIG.home;
  }

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.openGraph.title,
      description: config.openGraph.description,
      images: config.openGraph.images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: config.openGraph.title,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.twitter.title,
      description: config.twitter.description,
      images: config.twitter.images,
    },
    alternates: {
      canonical: `https://dlsolutions.com/${pageKey}`,
    },
  };
}

export function generateStructuredData(pageKey: string) {
  const config = SEO_CONFIG[pageKey];
  return config?.structuredData || null;
} 