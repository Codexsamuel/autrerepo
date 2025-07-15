'use client';

import { SEOConfig, getFormationSEOConfig, getSEOConfig } from '@/config/seo-config';
import { useEffect } from 'react';

interface SEOOptimizedProps {
  pageKey?: string;
  formationKey?: string;
  customConfig?: Partial<SEOConfig>;
  faq?: Array<{ question: string; answer: string }>;
  product?: {
    name: string;
    description: string;
    price: string;
    currency: string;
    availability: string;
    brand: string;
    category: string;
  };
  course?: {
    name: string;
    description: string;
    provider: string;
    instructor: string;
    duration: string;
    price: string;
    currency: string;
  };
}

export default function SEOOptimized({
  pageKey = 'home',
  formationKey,
  customConfig = {},
  faq = [],
  product,
  course
}: SEOOptimizedProps) {
  
  // Obtenir la configuration SEO de base
  const baseConfig = formationKey 
    ? getFormationSEOConfig(formationKey)
    : getSEOConfig(pageKey);
  
  // Fusionner avec la configuration personnalisée
  const config: SEOConfig = {
    ...baseConfig,
    ...customConfig,
    faq: customConfig.faq || faq || baseConfig.faq
  };

  useEffect(() => {
    // Mise à jour du titre
    document.title = config.title;

    // Robots meta tag optimisé
    const robotsContent = [
      'index',
      'follow',
      'max-snippet:-1',
      'max-image-preview:large',
      'max-video-preview:-1'
    ].join(', ');

    // Meta tags ultra-optimisés pour DL Solutions
    const metaTags = [
      // Meta tags de base
      { name: 'description', content: config.description },
      { name: 'keywords', content: config.keywords },
      { name: 'author', content: 'DL Solutions - Davy & Lucie' },
      { name: 'robots', content: robotsContent },
      { name: 'googlebot', content: robotsContent },
      { name: 'bingbot', content: robotsContent },
      
      // Open Graph avancé
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:image', content: config.image },
      { property: 'og:url', content: config.url },
      { property: 'og:type', content: config.type },
      { property: 'og:site_name', content: 'DL Solutions' },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: config.title },
      { property: 'og:image:type', content: 'image/jpeg' },
      
      // Twitter Cards avancées
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image },
      { name: 'twitter:image:alt', content: config.title },
      { name: 'twitter:site', content: '@dlsolutions' },
      { name: 'twitter:creator', content: '@dlsolutions' },
      { name: 'twitter:domain', content: 'dlsolutions.com' },
      
      // Canonical et alternates
      { rel: 'canonical', href: config.url || 'https://dlsolutions.com' },
      
      // Géolocalisation pour le Cameroun
      { name: 'geo.region', content: 'CM' },
      { name: 'geo.placename', content: 'Yaoundé, Cameroun' },
      { name: 'geo.position', content: '3.848033;11.502075' },
      { name: 'ICBM', content: '3.848033, 11.502075' },
      
      // Mots-clés spécifiques DL Solutions
      { name: 'application-name', content: 'DL Solutions' },
      { name: 'apple-mobile-web-app-title', content: 'DL Solutions' },
      { name: 'msapplication-TileColor', content: '#2563eb' },
      { name: 'theme-color', content: '#2563eb' }
    ];

    // Supprimer les anciens meta tags
    const existingMetaTags = document.querySelectorAll('meta[name="description"], meta[name="keywords"], meta[property^="og:"], meta[name^="twitter:"]');
    existingMetaTags.forEach(tag => tag.remove());

    // Ajouter les nouveaux meta tags
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) {
        meta.setAttribute('property', tag.property);
      }
      if (tag.name) {
        meta.setAttribute('name', tag.name);
      }
      if (tag.rel) {
        meta.setAttribute('rel', tag.rel);
      }
      meta.setAttribute('content', tag.content || '');
      document.head.appendChild(meta);
    });

    // Données structurées pour l'organisation DL Solutions
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://dlsolutions.com/#organization',
      name: 'DL Solutions',
      alternateName: ['Dave and Luce Solutions', 'Davy & Lucie Solutions'],
      url: 'https://dlsolutions.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dlsolutions.com/images/logo.png',
        width: 192,
        height: 192
      },
      description: 'Solutions digitales innovantes par Davy et Lucie au Cameroun',
      foundingDate: '2024',
      founders: [
        {
          '@type': 'Person',
          name: 'Davy',
          jobTitle: 'Co-fondateur',
          worksFor: {
            '@type': 'Organization',
            name: 'DL Solutions'
          }
        },
        {
          '@type': 'Person',
          name: 'Lucie',
          jobTitle: 'Co-fondatrice',
          worksFor: {
            '@type': 'Organization',
            name: 'DL Solutions'
          }
        }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'École de Police',
        addressLocality: 'Yaoundé',
        addressRegion: 'Centre',
        addressCountry: 'CM',
        postalCode: '00000'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+237-694-341-586',
        contactType: 'customer service',
        email: 'contact@dlsolutions.com',
        availableLanguage: ['French', 'English']
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 3.848033,
        longitude: 11.502075
      },
      sameAs: [
        'https://www.facebook.com/dlsolutions',
        'https://www.linkedin.com/company/dlsolutions',
        'https://twitter.com/dlsolutions'
      ]
    };

    // Données structurées pour le site web
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://dlsolutions.com/#website',
      name: 'DL Solutions',
      url: 'https://dlsolutions.com',
      description: 'Écosystème digital complet par Davy et Lucie',
      publisher: {
        '@id': 'https://dlsolutions.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://dlsolutions.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    };

    // Données structurées pour la page
    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${config.url}#webpage`,
      name: config.title,
      description: config.description,
      url: config.url,
      isPartOf: {
        '@id': 'https://dlsolutions.com/#website'
      },
      about: {
        '@id': 'https://dlsolutions.com/#organization'
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: config.image
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      breadcrumb: config.breadcrumbs.length > 0 ? {
        '@id': `${config.url}#breadcrumb`
      } : undefined
    };

    // Données structurées pour les breadcrumbs
    const breadcrumbSchema = config.breadcrumbs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${config.url}#breadcrumb`,
      itemListElement: config.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    } : null;

    // Données structurées pour FAQ
    const faqSchema = config.faq && config.faq.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${config.url}#faq`,
      mainEntity: config.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    } : null;

    // Données structurées pour produit (si applicable)
    const productSchema = product ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${config.url}#product`,
      name: product.name,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      category: product.category,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency,
        availability: `https://schema.org/${product.availability}`,
        url: config.url
      }
    } : null;

    // Données structurées pour formation (si applicable)
    const courseSchema = course ? {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${config.url}#course`,
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: course.provider,
        url: 'https://dlsolutions.com'
      },
      instructor: {
        '@type': 'Person',
        name: course.instructor,
        worksFor: {
          '@type': 'Organization',
          name: 'DL Solutions'
        }
      },
      timeRequired: course.duration,
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency,
        url: config.url,
        availability: 'https://schema.org/InStock'
      }
    } : null;

    // Injection des données structurées
    const schemas = [
      organizationSchema,
      websiteSchema,
      webpageSchema,
      breadcrumbSchema,
      faqSchema,
      productSchema,
      courseSchema
    ].filter(Boolean);

    // Supprimer les anciens scripts JSON-LD
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Ajouter les nouveaux scripts JSON-LD
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Nettoyage lors du démontage
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent && schemas.some(schema => 
          schema && script.textContent?.includes(schema['@type'] as string)
        )) {
          script.remove();
        }
      });
    };
  }, [config, product, course]);

  return null; // Ce composant ne rend rien visuellement
} 