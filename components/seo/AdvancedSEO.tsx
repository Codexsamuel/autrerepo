"use client";

import { useEffect } from 'react';
import Head from 'next/head';

interface AdvancedSEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: 'website' | 'article' | 'product' | 'profile';
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    section: string;
    tags: string[];
  };
  product?: {
    name: string;
    description: string;
    price: number;
    currency: string;
    availability: 'in stock' | 'out of stock' | 'preorder';
    brand: string;
    category: string;
    images: string[];
  };
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
    contact: {
      phone: string;
      email: string;
      fax?: string;
    };
    social: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      youtube?: string;
    };
  };
  locale: string;
  alternateLocales?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
  maxSnippet?: number;
}

export default function AdvancedSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogImageAlt,
  ogType,
  twitterCard,
  article,
  product,
  organization,
  locale,
  alternateLocales,
  noindex = false,
  nofollow = false,
  noarchive = false,
  nosnippet = false,
  maxImagePreview = 'large',
  maxVideoPreview = -1,
  maxSnippet = -1
}: AdvancedSEOProps) {
  
  useEffect(() => {
    // Mise à jour dynamique des meta tags
    updateMetaTags();
    
    // Ajout des données structurées
    addStructuredData();
    
    // Ajout des meta tags de performance
    addPerformanceMetaTags();
    
    // Ajout des meta tags d'accessibilité
    addAccessibilityMetaTags();
    
    // Ajout des meta tags de sécurité
    addSecurityMetaTags();
    
  }, [title, description, keywords, canonicalUrl, ogImage]);

  const updateMetaTags = () => {
    // Meta tags de base
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', organization.name);
    updateMetaTag('canonical', canonicalUrl);
    
    // Meta tags de contrôle des robots
    const robots = [];
    if (noindex) robots.push('noindex');
    if (nofollow) robots.push('nofollow');
    if (noarchive) robots.push('noarchive');
    if (nosnippet) robots.push('nosnippet');
    if (robots.length === 0) robots.push('index', 'follow');
    
    updateMetaTag('robots', robots.join(', '));
    updateMetaTag('googlebot', robots.join(', '));
    updateMetaTag('bingbot', robots.join(', '));
    
    // Meta tags de performance
    updateMetaTag('max-image-preview', maxImagePreview);
    if (maxVideoPreview >= 0) updateMetaTag('max-video-preview', maxVideoPreview.toString());
    if (maxSnippet >= 0) updateMetaTag('max-snippet', maxSnippet.toString());
    
    // Open Graph
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:image:alt', ogImageAlt);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:site_name', organization.name);
    updateMetaTag('og:locale', locale);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    
    // Twitter Cards
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:site', organization.social.twitter || '@dlsolutions');
    updateMetaTag('twitter:creator', organization.social.twitter || '@dlsolutions');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', ogImageAlt);
    
    // Locales alternatives
    if (alternateLocales && alternateLocales.length > 0) {
      alternateLocales.forEach(altLocale => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = altLocale;
        link.href = canonicalUrl.replace(locale, altLocale);
        document.head.appendChild(link);
      });
    }
  };

  const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
    
    if (element) {
      element.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else if (name.startsWith('twitter:')) {
        meta.setAttribute('name', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };

  const addPerformanceMetaTags = () => {
    const performanceTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'theme-color', content: '#2563eb' },
      { name: 'msapplication-TileColor', content: '#2563eb' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: organization.name },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: organization.name }
    ];

    performanceTags.forEach(tag => {
      updateMetaTag(tag.name, tag.content);
    });
  };

  const addAccessibilityMetaTags = () => {
    const accessibilityTags = [
      { name: 'language', content: locale },
      { name: 'distribution', content: 'global' },
      { name: 'rating', content: 'general' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'generator', content: 'Next.js' },
      { name: 'creator', content: organization.name },
      { name: 'publisher', content: organization.name }
    ];

    accessibilityTags.forEach(tag => {
      updateMetaTag(tag.name, tag.content);
    });
  };

  const addSecurityMetaTags = () => {
    const securityTags = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'x-frame-options', content: 'SAMEORIGIN' },
      { name: 'x-content-type-options', content: 'nosniff' },
      { name: 'x-xss-protection', content: '1; mode=block' },
      { name: 'permissions-policy', content: 'camera=(), microphone=(), geolocation=()' }
    ];

    securityTags.forEach(tag => {
      updateMetaTag(tag.name, tag.content);
    });
  };

  const addStructuredData = () => {
    // Supprimer les anciennes données structurées
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Données structurées de base
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "inLanguage": locale,
      "isPartOf": {
        "@type": "WebSite",
        "name": organization.name,
        "url": organization.url,
        "description": organization.description
      },
      "about": {
        "@type": "Organization",
        "name": organization.name,
        "url": organization.url,
        "logo": organization.logo,
        "description": organization.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": organization.address.street,
          "addressLocality": organization.address.city,
          "addressRegion": organization.address.region,
          "postalCode": organization.address.postalCode,
          "addressCountry": organization.address.country
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": organization.contact.phone,
          "email": organization.contact.email,
          "contactType": "customer service",
          "availableLanguage": ["French", "English"]
        },
        "sameAs": Object.values(organization.social).filter(Boolean)
      }
    };

    // Ajouter les données d'article si disponibles
    if (article) {
      baseData["@type"] = "Article";
      baseData["datePublished"] = article.publishedTime;
      baseData["dateModified"] = article.modifiedTime;
      baseData["author"] = {
        "@type": "Person",
        "name": article.author
      };
      baseData["articleSection"] = article.section;
      baseData["keywords"] = article.tags.join(', ');
    }

    // Ajouter les données de produit si disponibles
    if (product) {
      baseData["mainEntity"] = {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "category": product.category,
        "offers": {
          "@type": "Offer",
          "price": product.price.toString(),
          "priceCurrency": product.currency,
          "availability": `https://schema.org/${product.availability.replace(' ', '')}`,
          "seller": {
            "@type": "Organization",
            "name": organization.name,
            "url": organization.url
          }
        },
        "image": product.images
      };
    }

    // Ajouter les données de navigation
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": organization.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": canonicalUrl
        }
      ]
    };

    // Ajouter les deux scripts de données structurées
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(baseData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script2);
  };

  return (
    <Head>
      {/* Meta tags de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={organization.name} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Locale */}
      <link rel="alternate" hrefLang={locale} href={canonicalUrl} />
      
      {/* Préchargement des ressources critiques */}
      <link rel="preload" href={ogImage} as="image" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Favicon et icônes */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      
      {/* PWA */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={organization.name} />
      
      {/* Performance */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Accessibilité */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="generator" content="Next.js" />
      <meta name="creator" content={organization.name} />
      <meta name="publisher" content={organization.name} />
    </Head>
  );
}
