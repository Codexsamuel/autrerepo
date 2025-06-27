import { NextSeo } from 'next-seo'
import { Organization, Person, WebSite, BreadcrumbList } from 'schema-dts'


// ========================================
// CONFIGURATION SEO MULTILINGUE
// ========================================

export const SEO_CONFIG = {
  defaultLocale: 'fr',
  supportedLocales: ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ko'],
  
  // Mots-clés par langue et secteur d'activité
  keywords: {
    fr: [
      'trading', 'plateforme trading', 'investissement', 'finance', 'marchés financiers',
      'CRM', 'gestion relation client', 'logiciel CRM', 'automatisation',
      'assurances', 'assurance vie', 'assurance habitation', 'courtier assurance',
      'banque', 'services bancaires', 'prêt', 'épargne', 'investissement bancaire',
      'immobilier', 'investissement immobilier', 'gestion locative', 'promoteur immobilier',
      'Samuel OBAM', 'Sabine NGA Lucie', 'DAVY Trading', 'expert finance',
      'optimisation parcours client', 'relation client', 'concepteur application',
      'Yaoundé', 'Cameroun', 'Afrique', 'fintech', 'innovation technologique'
    ],
    en: [
      'trading', 'trading platform', 'investment', 'finance', 'financial markets',
      'CRM', 'customer relationship management', 'CRM software', 'automation',
      'insurance', 'life insurance', 'home insurance', 'insurance broker',
      'banking', 'banking services', 'loan', 'savings', 'banking investment',
      'real estate', 'real estate investment', 'property management', 'real estate developer',
      'Samuel OBAM', 'Sabine NGA Lucie', 'DAVY Trading', 'finance expert',
      'customer journey optimization', 'customer relationship', 'application designer',
      'Yaounde', 'Cameroon', 'Africa', 'fintech', 'technological innovation'
    ],
    es: [
      'trading', 'plataforma trading', 'inversión', 'finanzas', 'mercados financieros',
      'CRM', 'gestión de relaciones con clientes', 'software CRM', 'automatización',
      'seguros', 'seguro de vida', 'seguro de hogar', 'corredor de seguros',
      'banca', 'servicios bancarios', 'préstamo', 'ahorro', 'inversión bancaria',
      'bienes raíces', 'inversión inmobiliaria', 'gestión de propiedades', 'promotor inmobiliario',
      'Samuel OBAM', 'Sabine NGA Lucie', 'DAVY Trading', 'experto en finanzas',
      'optimización del recorrido del cliente', 'relación con el cliente', 'diseñador de aplicaciones',
      'Yaundé', 'Camerún', 'África', 'fintech', 'innovación tecnológica'
    ]
  },

  // Descriptions par langue
  descriptions: {
    fr: "DAVY Trading Platform - Plateforme innovante de trading, CRM, assurances, banque et immobilier. Dirigée par Samuel OBAM (Expert en gestion et optimisation du parcours client) et Sabine NGA Lucie (Spécialiste de la relation client). Solutions technologiques avancées pour l'investissement et la gestion d'entreprise.",
    en: "DAVY Trading Platform - Innovative platform for trading, CRM, insurance, banking and real estate. Led by Samuel OBAM (Expert in customer journey management and optimization) and Sabine NGA Lucie (Customer relationship specialist). Advanced technological solutions for investment and business management.",
    es: "DAVY Trading Platform - Plataforma innovadora de trading, CRM, seguros, banca e inmobiliaria. Dirigida por Samuel OBAM (Experto en gestión y optimización del recorrido del cliente) y Sabine NGA Lucie (Especialista en relaciones con clientes). Soluciones tecnológicas avanzadas para inversión y gestión empresarial."
  }
}

// ========================================
// SCHEMA MARKUP
// ========================================

export const generateOrganizationSchema = (locale: string = 'fr'): Organization => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://davytrading.com'
  
  return {
    '@type': 'Organization',
    '@context': 'https://schema.org',
    name: 'DAVY Trading Platform',
    alternateName: ['DAVY Trading', 'DAVY Platform'],
    url: baseUrl,
    logo: `${baseUrl}/images/dl-logo.jpg`,
    description: SEO_CONFIG.descriptions[locale as keyof typeof SEO_CONFIG.descriptions] || SEO_CONFIG.descriptions.fr,
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yaoundé',
      addressCountry: 'CM',
      addressRegion: 'Centre'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+237-XXX-XXX-XXX',
      contactType: 'customer service',
      email: 'contact@davytrading.com'
    },
    sameAs: [
      'https://linkedin.com/company/davy-trading',
      'https://facebook.com/davytrading',
      'https://twitter.com/davytrading'
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Samuel OBAM',
        jobTitle: 'Associé Gérant et Expert en Gestion et Optimisation du Parcours Client',
        description: 'Concepteur d\'applications innovantes et spécialiste de l\'optimisation du parcours client',
        url: 'https://linkedin.com/in/samuel-obam',
        email: 'samuel.obam@davytrading.com'
      },
      {
        '@type': 'Person',
        name: 'Sabine NGA Lucie',
        jobTitle: 'Associée et Spécialiste de la Relation Client',
        description: 'Experte en relation client et gestion de l\'expérience utilisateur',
        url: 'https://linkedin.com/in/sabine-nga-lucie',
        email: 'sabine.nga@davytrading.com'
      }
    ],
    serviceType: [
      'Trading Platform',
      'CRM Software',
      'Insurance Services',
      'Banking Services',
      'Real Estate Investment'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Cameroon'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services DAVY Trading',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Plateforme de Trading',
            description: 'Plateforme avancée de trading et d\'investissement'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM et Gestion Client',
            description: 'Système de gestion de la relation client'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Services d\'Assurance',
            description: 'Solutions d\'assurance personnalisées'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Services Bancaires',
            description: 'Services bancaires et financiers'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Investissement Immobilier',
            description: 'Solutions d\'investissement immobilier'
          }
        }
      ]
    }
  }
}

export const generatePersonSchema = (person: 'samuel' | 'sabine'): Person => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://davytrading.com'
  
  const personData = {
    samuel: {
      name: 'Samuel OBAM',
      jobTitle: 'Associé Gérant et Expert en Gestion et Optimisation du Parcours Client',
      description: 'Concepteur d\'applications innovantes et spécialiste de l\'optimisation du parcours client',
      url: 'https://linkedin.com/in/samuel-obam',
      email: 'samuel.obam@davytrading.com',
      image: `${baseUrl}/images/samuel-obam.jpg`,
      worksFor: {
        '@type': 'Organization',
        name: 'DAVY Trading Platform'
      },
      knowsAbout: [
        'Customer Journey Optimization',
        'Application Design',
        'Business Management',
        'Financial Technology',
        'Process Automation'
      ]
    },
    sabine: {
      name: 'Sabine NGA Lucie',
      jobTitle: 'Associée et Spécialiste de la Relation Client',
      description: 'Experte en relation client et gestion de l\'expérience utilisateur',
      url: 'https://linkedin.com/in/sabine-nga-lucie',
      email: 'sabine.nga@davytrading.com',
      image: `${baseUrl}/images/sabine-nga-lucie.jpg`,
      worksFor: {
        '@type': 'Organization',
        name: 'DAVY Trading Platform'
      },
      knowsAbout: [
        'Customer Relationship Management',
        'User Experience',
        'Client Communication',
        'Service Quality',
        'Customer Satisfaction'
      ]
    }
  }

  const data = personData[person]
  
  return {
    '@type': 'Person',
    '@context': 'https://schema.org',
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    url: data.url,
    email: data.email,
    image: data.image,
    worksFor: data.worksFor,
    knowsAbout: data.knowsAbout,
    sameAs: [
      data.url,
      `https://twitter.com/${data.name.toLowerCase().replace(/\s+/g, '')}`,
      `https://facebook.com/${data.name.toLowerCase().replace(/\s+/g, '')}`
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Université de Yaoundé'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yaoundé',
      addressCountry: 'CM'
    }
  }
}

export const generateWebsiteSchema = (): WebSite => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://davytrading.com'
  
  return {
    '@type': 'WebSite',
    '@context': 'https://schema.org',
    name: 'DAVY Trading Platform',
    url: baseUrl,
    description: 'Plateforme innovante de trading, CRM, assurances, banque et immobilier',
    inLanguage: ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ko'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'DAVY Trading Platform',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/dl-logo.jpg`
      }
    }
  }
}

// ========================================
// SEO COMPONENT GENERATOR
// ========================================

export const generateSEOProps = (
  pageTitle: string,
  pageDescription?: string,
  locale: string = 'fr',
  pageType: 'website' | 'article' | 'product' = 'website',
  image?: string,
  keywords?: string[]
) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://davytrading.com'
  const defaultImage = `${baseUrl}/images/dl-logo.jpg`
  
  const title = `${pageTitle} | DAVY Trading Platform`
  const description = pageDescription || SEO_CONFIG.descriptions[locale as keyof typeof SEO_CONFIG.descriptions] || SEO_CONFIG.descriptions.fr
  const pageKeywords = keywords || SEO_CONFIG.keywords[locale as keyof typeof SEO_CONFIG.keywords] || SEO_CONFIG.keywords.fr
  
  return {
    title,
    description,
    canonical: `${baseUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`,
    openGraph: {
      type: pageType,
      locale: locale,
      url: `${baseUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`,
      title,
      description,
      site_name: 'DAVY Trading Platform',
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      handle: '@davytrading',
      site: '@davytrading',
      cardType: 'summary_large_image'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: pageKeywords.join(', ')
      },
      {
        name: 'author',
        content: 'Samuel OBAM & Sabine NGA Lucie - DAVY Trading Platform'
      },
      {
        name: 'robots',
        content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      },
      {
        name: 'googlebot',
        content: 'index, follow'
      },
      {
        name: 'bingbot',
        content: 'index, follow'
      },
      {
        name: 'yandex',
        content: 'index, follow'
      },
      {
        name: 'geo.region',
        content: 'CM'
      },
      {
        name: 'geo.placename',
        content: 'Yaoundé'
      },
      {
        name: 'geo.position',
        content: '3.848033;11.502075'
      },
      {
        name: 'ICBM',
        content: '3.848033, 11.502075'
      }
    ],
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'alternate',
        hrefLang: 'fr',
        href: `${baseUrl}/fr`
      },
      {
        rel: 'alternate',
        hrefLang: 'en',
        href: `${baseUrl}/en`
      },
      {
        rel: 'alternate',
        hrefLang: 'es',
        href: `${baseUrl}/es`
      },
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: baseUrl
      }
    ]
  }
}

// ========================================
// BREADCRUMB GENERATOR
// ========================================

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbList => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://davytrading.com'
  
  return {
    '@type': 'BreadcrumbList',
    '@context': 'https://schema.org',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`
    }))
  }
}

// ========================================
// UTILITAIRES SEO
// ========================================

export const generateStructuredData = (schemas: Array<Organization | Person | WebSite | BreadcrumbList>) => {
  return {
    __html: JSON.stringify(schemas)
  }
}

export const getLocalizedKeywords = (locale: string, additionalKeywords: string[] = []) => {
  const baseKeywords = SEO_CONFIG.keywords[locale as keyof typeof SEO_CONFIG.keywords] || SEO_CONFIG.keywords.fr
  return [...baseKeywords, ...additionalKeywords]
}

export const getLocalizedDescription = (locale: string, customDescription?: string) => {
  return customDescription || SEO_CONFIG.descriptions[locale as keyof typeof SEO_CONFIG.descriptions] || SEO_CONFIG.descriptions.fr
} 