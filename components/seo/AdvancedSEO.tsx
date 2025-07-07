"use client";

import Script from 'next/script';
import { useEffect } from 'react';

interface AdvancedSEOProps {
  pageType?: 'website' | 'article' | 'product' | 'organization';
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  pageImage?: string;
  organizationName?: string;
  organizationLogo?: string;
  organizationAddress?: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
  };
  organizationContact?: {
    phone: string;
    email: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export function AdvancedSEO({
  pageType = 'website',
  pageTitle = 'DL Solutions - Écosystème Digital Complet',
  pageDescription = 'DL Solutions - Écosystème digital complet avec CRM, ERP, boutique internationale, formations professionnelles, et solutions sectorielles. Services premium avec livraison au Cameroun.',
  pageUrl = 'https://dlsolutions.com',
  pageImage = 'https://dlsolutions.com/images/og-dl-solutions.jpg',
  organizationName = 'DL Solutions',
  organizationLogo = 'https://dlsolutions.com/images/icon-192x192.svg',
  organizationAddress = {
    street: 'École de Police',
    city: 'Yaoundé',
    region: 'Centre',
    country: 'Cameroun',
    postalCode: '00000'
  },
  organizationContact = {
    phone: '+237-XXX-XXX-XXX',
    email: 'contact@dlsolutions.com'
  },
  breadcrumbs = []
}: AdvancedSEOProps) {
  
  // Structured Data pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "alternateName": ["DL Solutions", "DL"],
    "url": pageUrl,
    "logo": {
      "@type": "ImageObject",
      "url": organizationLogo,
      "width": 192,
      "height": 192
    },
    "description": pageDescription,
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": organizationAddress.street,
      "addressLocality": organizationAddress.city,
      "addressRegion": organizationAddress.region,
      "addressCountry": organizationAddress.country,
      "postalCode": organizationAddress.postalCode
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": organizationContact.phone,
      "contactType": "customer service",
      "email": organizationContact.email,
      "availableLanguage": ["French", "English"]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 3.848033,
      "longitude": 11.502075
    },
    "sameAs": [
      "https://linkedin.com/company/dl-solutions",
      "https://facebook.com/dlsolutions",
      "https://twitter.com/dlsolutions"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services DL Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Solutions",
            "description": "Solutions de gestion de la relation client"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formations Professionnelles",
            "description": "Formations certifiantes en technologies digitales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Boutique Internationale",
            "description": "Boutique en ligne avec produits du monde entier"
          }
        }
      ]
    }
  };

  // Structured Data pour le site web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": organizationName,
    "url": pageUrl,
    "description": pageDescription,
    "inLanguage": ["fr", "en", "es"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${pageUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": organizationName,
      "logo": {
        "@type": "ImageObject",
        "url": organizationLogo
      }
    }
  };

  // Structured Data pour les breadcrumbs
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // Structured Data pour la page
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": pageType === 'article' ? 'Article' : pageType === 'product' ? 'Product' : 'WebPage',
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "image": pageImage,
    "publisher": {
      "@type": "Organization",
      "name": organizationName,
      "logo": {
        "@type": "ImageObject",
        "url": organizationLogo
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": organizationName
    }
  };

  useEffect(() => {
    // Ajouter les meta tags dynamiques
    const addMetaTags = () => {
      // Meta tags pour les réseaux sociaux
      const metaTags = [
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:url', content: pageUrl },
        { property: 'og:image', content: pageImage },
        { property: 'og:type', content: pageType },
        { property: 'og:site_name', content: organizationName },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: pageImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'author', content: organizationName },
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'geo.region', content: 'CM' },
        { name: 'geo.placename', content: 'Yaoundé, Cameroun' },
        { name: 'geo.position', content: '3.848033;11.502075' },
        { name: 'ICBM', content: '3.848033, 11.502075' }
      ];

      metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        if (tag.property) {
          meta.setAttribute('property', tag.property);
        }
        if (tag.name) {
          meta.setAttribute('name', tag.name);
        }
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      });
    };

    addMetaTags();
  }, [pageTitle, pageDescription, pageUrl, pageImage, pageType, organizationName]);

  return (
    <>
      {/* Structured Data JSON-LD */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      
      <Script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema)
        }}
      />
      
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      )}

      {/* Google Analytics Enhanced Ecommerce */}
      <Script
        id="ga-enhanced-ecommerce"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof gtag !== 'undefined') {
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: '${pageTitle}',
                page_location: '${pageUrl}',
                custom_map: {
                  'custom_dimension1': 'page_type',
                  'custom_dimension2': 'organization'
                }
              });
              
              gtag('event', 'page_view', {
                page_title: '${pageTitle}',
                page_location: '${pageUrl}',
                custom_dimension1: '${pageType}',
                custom_dimension2: '${organizationName}'
              });
            }
          `
        }}
      />
    </>
  );
} 