// Fonctions de structured data pour le SEO - Utilisables côté serveur

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DL Solutions",
    "alternateName": "Dave and Luce Solutions",
    "url": "https://dlsolutions.com",
    "logo": "https://dlsolutions.com/images/logo.png",
    "description": "Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.",
    "foundingDate": "2024",
    "founder": [
      {
        "@type": "Person",
        "name": "Davy",
        "jobTitle": "Co-fondateur"
      },
      {
        "@type": "Person",
        "name": "Lucie",
        "jobTitle": "Co-fondatrice"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CM",
      "addressLocality": "Yaoundé",
      "addressRegion": "Centre"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/dlsolutions",
      "https://twitter.com/dlsolutions",
      "https://facebook.com/dlsolutions"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services DL Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketplace Batobaye",
            "description": "Plateforme e-commerce complète"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Digital",
            "description": "Stratégies marketing digital"
          }
        }
      ]
    }
  };
}

export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DL Solutions",
    "url": "https://dlsolutions.com",
    "description": "Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital",
    "publisher": {
      "@type": "Organization",
      "name": "DL Solutions"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dlsolutions.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateBatobayeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Batobaye Marketplace",
    "description": "Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay. Solution marketplace moderne au Cameroun.",
    "url": "https://dlsolutions.com/portfolio/batobaye",
    "applicationCategory": "E-commerce",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "XAF",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "DL Solutions",
      "url": "https://dlsolutions.com"
    },
    "featureList": [
      "Dashboard admin VIP",
      "IA intégrée",
      "Paiement CinetPay",
      "Gestion produits",
      "Analytics e-commerce",
      "Inventaire en ligne"
    ],
    "screenshot": "https://dlsolutions.com/images/batobaye-screenshot.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };
} 