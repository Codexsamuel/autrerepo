'use client';

import { useEffect } from 'react';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'organization' | 'course' | 'event' | 'person' | 'localBusiness';
  organization?: {
    name: string;
    logo: string;
    url: string;
    description: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  product?: {
    name: string;
    description: string;
    price: string;
    currency: string;
    availability: string;
    brand: string;
    category: string;
    sku?: string;
    gtin?: string;
    mpn?: string;
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  };
  course?: {
    name: string;
    description: string;
    provider: string;
    instructor: string;
    duration: string;
    price: string;
    currency: string;
    educationalLevel?: string;
    inLanguage?: string;
    hasCourseInstance?: Array<{
      name: string;
      startDate: string;
      endDate: string;
      location: string;
    }>;
  };
  article?: {
    headline: string;
    author: string;
    datePublished: string;
    dateModified: string;
    publisher: string;
    image: string;
    articleSection?: string;
    wordCount?: number;
  };
  event?: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    organizer: string;
    price: string;
    currency: string;
  };
  person?: {
    name: string;
    jobTitle: string;
    worksFor: string;
    image: string;
    sameAs?: string[];
  };
  localBusiness?: {
    name: string;
    description: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone: string;
    email: string;
    openingHours: string;
    priceRange: string;
  };
  // Nouvelles propriétés SEO avancées
  language?: string;
  alternateLanguages?: Array<{
    hreflang: string;
    href: string;
  }>;
  noindex?: boolean;
  nofollow?: boolean;
  lastModified?: string;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  geo?: {
    latitude: number;
    longitude: number;
    region: string;
    placename: string;
  };
  video?: {
    url: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    duration: string;
    uploadDate: string;
  };
  audio?: {
    url: string;
    title: string;
    description: string;
    duration: string;
  };
  // Core Web Vitals et performance
  preload?: string[];
  prefetch?: string[];
  dnsPrefetch?: string[];
  preconnect?: string[];
}

export default function AdvancedSEO({
  title = 'DL Solutions - Solutions Digitales Innovantes',
  description = 'DL Solutions propose des solutions digitales innovantes pour entreprises : développement web, applications mobiles, e-commerce, formation, et conseil en transformation numérique.',
  keywords = 'solutions digitales, développement web, applications mobiles, e-commerce, formation, conseil, transformation numérique, DL Solutions',
  image = '/images/og-image.jpg',
  url = 'https://dlsolutions.com',
  type = 'website',
  organization = {
    name: 'DL Solutions',
    logo: '/logos/logo-dl.png',
    url: 'https://dlsolutions.com',
    description: 'Solutions digitales innovantes pour entreprises'
  },
  breadcrumbs = [],
  faq = [],
  product,
  course,
  article,
  event,
  person,
  localBusiness,
  language = 'fr',
  alternateLanguages = [],
  noindex = false,
  nofollow = false,
  lastModified,
  priority = 0.5,
  changeFreq = 'weekly',
  geo,
  video,
  audio,
  preload = [],
  prefetch = [],
  dnsPrefetch = [],
  preconnect = []
}: AdvancedSEOProps) {
  useEffect(() => {
    // Données structurées enrichies pour l'organisation
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${organization.url}#organization`,
      name: organization.name,
      url: organization.url,
      logo: {
        '@type': 'ImageObject',
        url: organization.logo || '',
        width: 512,
        height: 512
      },
      description: organization.description,
      sameAs: [
        'https://www.linkedin.com/company/dl-solutions',
        'https://www.facebook.com/dlsolutions',
        'https://twitter.com/dlsolutions',
        'https://www.instagram.com/dlsolutions',
        'https://www.youtube.com/channel/dlsolutions'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33-1-23-45-67-89',
        contactType: 'customer service',
        availableLanguage: ['French', 'English'],
        areaServed: 'FR',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Rue de l\'Innovation',
        addressLocality: 'Paris',
        postalCode: '75001',
        addressCountry: 'FR'
      },
      founder: {
        '@type': 'Person',
        name: 'Samuel OBAM',
        jobTitle: 'CEO & Fondateur',
        worksFor: organization.name
      },
      foundingDate: '2020-01-01',
      numberOfEmployees: '50-100',
      industry: 'Technology',
      knowsAbout: ['Développement Web', 'Applications Mobiles', 'E-commerce', 'Formation', 'Conseil'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services DL Solutions',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Développement Web',
              description: 'Sites web et applications web sur mesure'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Formation',
              description: 'Formations professionnelles certifiantes'
            }
          }
        ]
      }
    };

    // Données structurées pour le fil d'Ariane
    const breadcrumbSchema = breadcrumbs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    } : null;

    // Données structurées pour FAQ enrichies
    const faqSchema = faq.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    } : null;

    // Données structurées pour produit enrichies
    const productSchema = product ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${url}#product`,
      name: product.name,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      category: product.category,
      sku: product.sku,
      gtin: product.gtin,
      mpn: product.mpn,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency,
        availability: product.availability,
        url: url,
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        seller: {
          '@type': 'Organization',
          name: organization.name
        }
      },
      aggregateRating: product.aggregateRating ? {
        '@type': 'AggregateRating',
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1
      } : undefined
    } : null;

    // Données structurées pour formation enrichies
    const courseSchema = course ? {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${url}#course`,
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: course.provider,
        url: organization.url
      },
      instructor: {
        '@type': 'Person',
        name: course.instructor,
        worksFor: {
          '@type': 'Organization',
          name: course.provider
        }
      },
      timeRequired: course.duration,
      educationalLevel: course.educationalLevel || 'Professional',
      inLanguage: course.inLanguage || 'fr',
      hasCourseInstance: course.hasCourseInstance?.map(instance => ({
        '@type': 'CourseInstance',
        name: instance.name,
        startDate: instance.startDate,
        endDate: instance.endDate,
        location: {
          '@type': 'Place',
          name: instance.location
        }
      })),
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency,
        url: url,
        availability: 'https://schema.org/InStock'
      }
    } : null;

    // Données structurées pour article
    const articleSchema = article ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: article.headline,
      author: {
        '@type': 'Person',
        name: article.author
      },
      publisher: {
        '@type': 'Organization',
        name: article.publisher,
        logo: {
          '@type': 'ImageObject',
          url: organization.logo
        }
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      image: {
        '@type': 'ImageObject',
        url: article.image
      },
      articleSection: article.articleSection,
      wordCount: article.wordCount,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    } : null;

    // Données structurées pour événement
    const eventSchema = event ? {
      '@context': 'https://schema.org',
      '@type': 'Event',
      '@id': `${url}#event`,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: {
        '@type': 'Place',
        name: event.location
      },
      organizer: {
        '@type': 'Organization',
        name: event.organizer
      },
      offers: {
        '@type': 'Offer',
        price: event.price,
        priceCurrency: event.currency,
        url: url
      }
    } : null;

    // Données structurées pour personne
    const personSchema = person ? {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${url}#person`,
      name: person.name,
      jobTitle: person.jobTitle,
      worksFor: {
        '@type': 'Organization',
        name: person.worksFor
      },
      image: {
        '@type': 'ImageObject',
        url: person.image
      },
      sameAs: person.sameAs || []
    } : null;

    // Données structurées pour entreprise locale
    const localBusinessSchema = localBusiness ? {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${url}#localBusiness`,
      name: localBusiness.name,
      description: localBusiness.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: localBusiness.address.streetAddress,
        addressLocality: localBusiness.address.addressLocality,
        postalCode: localBusiness.address.postalCode,
        addressCountry: localBusiness.address.addressCountry
      },
      telephone: localBusiness.telephone,
      email: localBusiness.email,
      openingHours: localBusiness.openingHours,
      priceRange: localBusiness.priceRange
    } : null;

    // Données structurées pour vidéo
    const videoSchema = video ? {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': `${url}#video`,
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.uploadDate,
      duration: video.duration,
      contentUrl: video.url,
      embedUrl: video.url
    } : null;

    // Données structurées pour audio
    const audioSchema = audio ? {
      '@context': 'https://schema.org',
      '@type': 'AudioObject',
      '@id': `${url}#audio`,
      name: audio.title,
      description: audio.description,
      duration: audio.duration,
      contentUrl: audio.url
    } : null;

    // Données structurées pour WebSite
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${organization.url}#website`,
      name: organization.name,
      url: organization.url,
      description: organization.description,
      publisher: {
        '@id': `${organization.url}#organization`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${organization.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };

    // Données structurées pour WebPage
    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: title,
      description: description,
      url: url,
      isPartOf: {
        '@id': `${organization.url}#website`
      },
      about: {
        '@id': `${organization.url}#organization`
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image
      },
      datePublished: lastModified || new Date().toISOString(),
      dateModified: lastModified || new Date().toISOString(),
      breadcrumb: breadcrumbs.length > 0 ? {
        '@id': `${url}#breadcrumb`
      } : undefined
    };

    // Injection des données structurées
    const schemas = [
      organizationSchema,
      websiteSchema,
      webpageSchema,
      breadcrumbSchema,
      faqSchema,
      productSchema,
      courseSchema,
      articleSchema,
      eventSchema,
      personSchema,
      localBusinessSchema,
      videoSchema,
      audioSchema
    ].filter(Boolean);

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
  }, [organization, breadcrumbs, faq, product, course, article, event, person, localBusiness, video, audio, url, title, description, lastModified]);

  // Meta tags dynamiques ultra-optimisés
  useEffect(() => {
    // Mise à jour du titre
    document.title = title;

    // Robots meta tag
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
      'max-snippet:-1',
      'max-image-preview:large',
      'max-video-preview:-1'
    ].join(', ');

    // Meta tags ultra-optimisés
    const metaTags = [
      // Meta tags de base
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'DL Solutions' },
      { name: 'robots', content: robotsContent },
      { name: 'googlebot', content: robotsContent },
      { name: 'bingbot', content: robotsContent },
      
      // Open Graph avancé
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'DL Solutions' },
      { property: 'og:locale', content: language === 'fr' ? 'fr_FR' : 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      { property: 'og:image:type', content: 'image/jpeg' },
      
      // Twitter Cards avancées
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: title },
      { name: 'twitter:site', content: '@dlsolutions' },
      { name: 'twitter:creator', content: '@dlsolutions' },
      { name: 'twitter:domain', content: 'dlsolutions.com' },
      
      // Canonical et alternates
      { rel: 'canonical', href: url },
      
      // Performance et Core Web Vitals
      { name: 'theme-color', content: '#10B981' },
      { name: 'msapplication-TileColor', content: '#10B981' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'DL Solutions' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'DL Solutions' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      
      // Géolocalisation
      ...(geo ? [
        { name: 'geo.position', content: `${geo.latitude};${geo.longitude}` },
        { name: 'geo.region', content: geo.region },
        { name: 'geo.placename', content: geo.placename },
        { name: 'ICBM', content: `${geo.latitude}, ${geo.longitude}` }
      ] : []),
      
      // Vidéo et audio
      ...(video ? [
        { property: 'og:video', content: video.url },
        { property: 'og:video:type', content: 'video/mp4' },
        { property: 'og:video:width', content: '1280' },
        { property: 'og:video:height', content: '720' }
      ] : []),
      
      // Sécurité
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }
    ];

    // Mise à jour des meta tags
    metaTags.forEach(tag => {
      let element: HTMLMetaElement | HTMLLinkElement | null = null;
      
      if (tag.rel) {
        element = document.querySelector(`link[rel="${tag.rel}"]`);
      } else if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`);
      } else if (tag['http-equiv']) {
        element = document.querySelector(`meta[http-equiv="${tag['http-equiv']}"]`);
      } else {
        element = document.querySelector(`meta[name="${tag.name}"]`);
      }

      const content = tag.content ?? tag.href ?? '';

      if (element) {
        if (tag.rel) {
          element.setAttribute('href', content);
        } else {
          element.setAttribute('content', content);
        }
      } else {
        const newElement = document.createElement(tag.rel ? 'link' : 'meta');
        if (tag.rel) {
          newElement.setAttribute('rel', tag.rel);
          newElement.setAttribute('href', content);
        } else if (tag.property) {
          newElement.setAttribute('property', tag.property);
          newElement.setAttribute('content', content);
        } else if (tag['http-equiv']) {
          newElement.setAttribute('http-equiv', tag['http-equiv']);
          newElement.setAttribute('content', content);
        } else {
          newElement.setAttribute('name', tag.name);
          newElement.setAttribute('content', content);
        }
        document.head.appendChild(newElement);
      }
    });

    // Ajout des liens alternatifs pour le multilingue
    alternateLanguages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang.hreflang;
      link.href = lang.href;
      document.head.appendChild(link);
    });

    // Optimisations de performance
    preload.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = href.includes('.css') ? 'style' : href.includes('.js') ? 'script' : 'fetch';
      document.head.appendChild(link);
    });

    prefetch.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    preconnect.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });

  }, [title, description, keywords, image, url, type, language, alternateLanguages, noindex, nofollow, geo, video, preload, prefetch, dnsPrefetch, preconnect]);

  return null; // Ce composant ne rend rien visuellement
} 