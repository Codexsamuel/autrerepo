'use client';

import { useEffect } from 'react';

interface FormationSEOProps {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  currency: string;
  startDate: string;
  endDate?: string;
  location: string;
  maxStudents: number;
  currentStudents: number;
  rating: number;
  reviewCount: number;
  category: string;
  level: string;
  language: string;
  certification: boolean;
  url: string;
  image: string;
  videoUrl?: string;
  syllabus?: string[];
  prerequisites?: string[];
  objectives?: string[];
  testimonials?: Array<{
    name: string;
    company: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function FormationSEO({
  title,
  description,
  instructor,
  duration,
  price,
  currency,
  startDate,
  endDate,
  location,
  maxStudents,
  currentStudents,
  rating,
  reviewCount,
  category,
  level,
  language,
  certification,
  url,
  image,
  videoUrl,
  syllabus,
  prerequisites,
  objectives,
  testimonials,
  faq
}: FormationSEOProps) {
  useEffect(() => {
    // Données structurées pour la formation (Course)
    const courseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${url}#course`,
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'DL Solutions',
        url: 'https://dlsolutions.com',
        logo: 'https://dlsolutions.com/images/logo.png',
        sameAs: [
          'https://www.linkedin.com/company/dl-solutions',
          'https://www.facebook.com/dlsolutions',
          'https://twitter.com/dlsolutions'
        ]
      },
      instructor: {
        '@type': 'Person',
        name: instructor,
        worksFor: {
          '@type': 'Organization',
          name: 'DL Solutions'
        },
        jobTitle: 'Formateur Expert',
        description: 'Expert en formation professionnelle'
      },
      timeRequired: duration,
      educationalLevel: level,
      inLanguage: language,
      educationalUse: 'Professional Development',
      audience: {
        '@type': 'Audience',
        audienceType: 'Professionals',
        educationalRole: 'Student'
      },
      coursePrerequisites: prerequisites?.join(', '),
      educationalCredentialAwarded: certification ? 'Certification Professionnelle' : undefined,
      courseCode: `DL-${category.toUpperCase()}-${new Date().getFullYear()}`,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        name: `${title} - Session ${new Date().getFullYear()}`,
        startDate: startDate,
        endDate: endDate || new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        location: {
          '@type': 'Place',
          name: location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressCountry: 'FR'
          }
        },
        maximumAttendeeCapacity: maxStudents,
        remainingAttendeeCapacity: maxStudents - currentStudents,
        offers: {
          '@type': 'Offer',
          price: price,
          priceCurrency: currency,
          availability: currentStudents < maxStudents ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: url,
          validFrom: new Date().toISOString(),
          validThrough: endDate || new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          seller: {
            '@type': 'Organization',
            name: 'DL Solutions'
          }
        }
      },
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: currency,
        availability: currentStudents < maxStudents ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: url,
        validFrom: new Date().toISOString(),
        validThrough: endDate || new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        seller: {
          '@type': 'Organization',
          name: 'DL Solutions'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewCount,
        bestRating: 5,
        worstRating: 1
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    };

    // Données structurées pour l'événement de formation
    const eventSchema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      '@id': `${url}#event`,
      name: title,
      description: description,
      startDate: startDate,
      endDate: endDate || new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      location: {
        '@type': 'Place',
        name: location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Paris',
          addressCountry: 'FR'
        }
      },
      organizer: {
        '@type': 'Organization',
        name: 'DL Solutions',
        url: 'https://dlsolutions.com'
      },
      performer: {
        '@type': 'Person',
        name: instructor
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      maximumAttendeeCapacity: maxStudents,
      remainingAttendeeCapacity: maxStudents - currentStudents,
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: currency,
        availability: currentStudents < maxStudents ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: url,
        validFrom: new Date().toISOString(),
        validThrough: endDate || new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        seller: {
          '@type': 'Organization',
          name: 'DL Solutions'
        }
      },
      image: {
        '@type': 'ImageObject',
        url: image
      },
      video: videoUrl ? {
        '@type': 'VideoObject',
        url: videoUrl,
        name: `${title} - Présentation`,
        description: `Présentation de la formation ${title}`,
        thumbnailUrl: image
      } : undefined
    };

    // Données structurées pour les avis (si disponibles)
    const reviewSchema = testimonials && testimonials.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': `${url}#reviews`,
      itemReviewed: {
        '@type': 'Course',
        name: title
      },
      review: testimonials.map(testimonial => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: testimonial.name,
          worksFor: {
            '@type': 'Organization',
            name: testimonial.company
          }
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: testimonial.rating,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: testimonial.comment,
        datePublished: testimonial.date
      }))
    } : null;

    // Données structurées pour FAQ
    const faqSchema = faq && faq.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    } : null;

    // Données structurées pour le produit (formation comme produit)
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${url}#product`,
      name: title,
      description: description,
      brand: {
        '@type': 'Brand',
        name: 'DL Solutions'
      },
      category: `Formation - ${category}`,
      image: {
        '@type': 'ImageObject',
        url: image
      },
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: currency,
        availability: currentStudents < maxStudents ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: url,
        priceValidUntil: endDate || new Date(new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        seller: {
          '@type': 'Organization',
          name: 'DL Solutions'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewCount,
        bestRating: 5,
        worstRating: 1
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Durée',
          value: duration
        },
        {
          '@type': 'PropertyValue',
          name: 'Niveau',
          value: level
        },
        {
          '@type': 'PropertyValue',
          name: 'Langue',
          value: language
        },
        {
          '@type': 'PropertyValue',
          name: 'Certification',
          value: certification ? 'Oui' : 'Non'
        },
        {
          '@type': 'PropertyValue',
          name: 'Places disponibles',
          value: maxStudents - currentStudents
        }
      ]
    };

    // Données structurées pour l'organisation
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://dlsolutions.com#organization',
      name: 'DL Solutions',
      url: 'https://dlsolutions.com',
      logo: 'https://dlsolutions.com/images/logo.png',
      description: 'Solutions digitales innovantes pour entreprises',
      sameAs: [
        'https://www.linkedin.com/company/dl-solutions',
        'https://www.facebook.com/dlsolutions',
        'https://twitter.com/dlsolutions'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33-1-23-45-67-89',
        contactType: 'customer service',
        availableLanguage: ['French', 'English'],
        areaServed: 'FR'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Rue de l\'Innovation',
        addressLocality: 'Paris',
        postalCode: '75001',
        addressCountry: 'FR'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Catalogue des formations',
        itemListElement: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: title
          }
        }
      }
    };

    // Injection des données structurées
    const schemas = [
      courseSchema,
      eventSchema,
      reviewSchema,
      faqSchema,
      productSchema,
      organizationSchema
    ].filter(Boolean);

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Meta tags spécialisés pour les formations
    const metaTags = [
      // Meta tags de base
      { name: 'description', content: description },
      { name: 'keywords', content: `formation, ${category}, ${instructor}, DL Solutions, ${level}, ${language}` },
      { name: 'author', content: instructor },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      
      // Open Graph spécialisé formation
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'course' },
      { property: 'og:site_name', content: 'DL Solutions' },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      
      // Twitter Cards spécialisées
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: title },
      { name: 'twitter:site', content: '@dlsolutions' },
      { name: 'twitter:creator', content: '@dlsolutions' },
      
      // Meta tags spécifiques aux formations
      { name: 'course:instructor', content: instructor },
      { name: 'course:duration', content: duration },
      { name: 'course:price', content: `${price} ${currency}` },
      { name: 'course:start_date', content: startDate },
      { name: 'course:location', content: location },
      { name: 'course:level', content: level },
      { name: 'course:language', content: language },
      { name: 'course:certification', content: certification ? 'true' : 'false' },
      { name: 'course:available_seats', content: (maxStudents - currentStudents).toString() },
      { name: 'course:rating', content: rating.toString() },
      { name: 'course:review_count', content: reviewCount.toString() },
      
      // Canonical
      { rel: 'canonical', href: url },
      
      // Performance
      { name: 'theme-color', content: '#10B981' },
      { name: 'msapplication-TileColor', content: '#10B981' }
    ];

    // Mise à jour des meta tags
    metaTags.forEach(tag => {
      let element: HTMLMetaElement | HTMLLinkElement | null = null;
      
      if (tag.rel) {
        element = document.querySelector(`link[rel="${tag.rel}"]`);
      } else if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`);
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
        } else {
          newElement.setAttribute('name', tag.name);
          newElement.setAttribute('content', content);
        }
        document.head.appendChild(newElement);
      }
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
  }, [title, description, instructor, duration, price, currency, startDate, endDate, location, maxStudents, currentStudents, rating, reviewCount, category, level, language, certification, url, image, videoUrl, syllabus, prerequisites, objectives, testimonials, faq]);

  return null;
} 