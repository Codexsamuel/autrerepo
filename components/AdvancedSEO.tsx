'use client';

import { useEffect } from 'react';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'organization' | 'course';
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

export default function AdvancedSEO({
  title = 'DL Solutions - Solutions Digitales Innovantes',
  description = 'DL Solutions propose des solutions digitales innovantes pour entreprises : développement web, applications mobiles, e-commerce, formation, et conseil en transformation numérique.',
  keywords = 'solutions digitales, développement web, applications mobiles, e-commerce, formation, conseil, transformation numérique, DL Solutions',
  image = '/images/og-image.jpg',
  url = 'https://dlsolutions.com',
  type = 'website',
  organization = {
    name: 'DL Solutions',
    logo: 'https://dlsolutions.com/images/logo.png',
    url: 'https://dlsolutions.com',
    description: 'Solutions digitales innovantes pour entreprises'
  },
  breadcrumbs = [],
  faq = [],
  product,
  course
}: AdvancedSEOProps) {
  useEffect(() => {
    // Données structurées pour l'organisation
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organization.name,
      url: organization.url,
      logo: organization.logo,
      description: organization.description,
      sameAs: [
        'https://www.linkedin.com/company/dl-solutions',
        'https://www.facebook.com/dlsolutions',
        'https://twitter.com/dlsolutions'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33-1-23-45-67-89',
        contactType: 'customer service',
        availableLanguage: ['French', 'English']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Rue de l\'Innovation',
        addressLocality: 'Paris',
        postalCode: '75001',
        addressCountry: 'FR'
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

    // Données structurées pour FAQ
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

    // Données structurées pour produit
    const productSchema = product ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
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
        availability: product.availability,
        url: url
      }
    } : null;

    // Données structurées pour formation
    const courseSchema = course ? {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: course.provider,
        url: organization.url
      },
      instructor: {
        '@type': 'Person',
        name: course.instructor
      },
      timeRequired: course.duration,
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency,
        url: url
      }
    } : null;

    // Injection des données structurées
    const schemas = [
      organizationSchema,
      breadcrumbSchema,
      faqSchema,
      productSchema,
      courseSchema
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
  }, [organization, breadcrumbs, faq, product, course, url]);

  // Meta tags dynamiques
  useEffect(() => {
    // Mise à jour du titre
    document.title = title;

    // Mise à jour des meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'DL Solutions' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'DL Solutions' },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: '@dlsolutions' },
      { name: 'twitter:creator', content: '@dlsolutions' },
      { name: 'canonical', content: url },
      { name: 'theme-color', content: '#10B981' },
      { name: 'msapplication-TileColor', content: '#10B981' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'DL Solutions' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'DL Solutions' },
      { name: 'msapplication-config', content: '/browserconfig.xml' }
    ];

    metaTags.forEach(tag => {
      let element: HTMLMetaElement | null = null;
      
      if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`);
      } else {
        element = document.querySelector(`meta[name="${tag.name}"]`);
      }

      const content = tag.content ?? '';

      if (element) {
        element.setAttribute('content', content);
      } else {
        const newElement = document.createElement('meta');
        if (tag.property) {
          newElement.setAttribute('property', tag.property ?? '');
        } else {
          newElement.setAttribute('name', tag.name ?? '');
        }
        newElement.setAttribute('content', content);
        document.head.appendChild(newElement);
      }
    });
  }, [title, description, keywords, image, url, type]);

  return null; // Ce composant ne rend rien visuellement
} 