'use client';

import { useEffect } from 'react';

interface SEOOptimizedHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'organization';
  structuredData?: any;
}

export default function SEOOptimizedHead({
  title = 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
  description = 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.',
  keywords = 'DL Solutions, Batobaye, marketplace, e-commerce, Cameroun, Davy, Lucie, Dave and Luce, marketing digital, vente en ligne, boutique en ligne',
  image = '/images/og-home.jpg',
  url = 'https://dlsolutions.com',
  type = 'website',
  structuredData
}: SEOOptimizedHeadProps) {
  
  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = title;
    
    // Mettre à jour les meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'DL Solutions - Davy & Lucie');
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'DL Solutions');
    updateMetaTag('og:locale', 'fr_FR');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@dlsolutions');
    
    // Canonical URL
    updateCanonicalUrl(url);
    
    // Structured Data
    if (structuredData) {
      addStructuredData(structuredData);
    }
    
    // Google Analytics (si configuré)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: title,
        page_location: url,
      });
    }
    
  }, [title, description, keywords, image, url, type, structuredData]);

  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateCanonicalUrl = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  };

  const addStructuredData = (data: any) => {
    // Supprimer les anciens structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Ajouter le nouveau structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  return null; // Ce composant ne rend rien visuellement
}

// Fonction utilitaire pour générer des structured data
export function generateBatobayeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Batobaye Marketplace',
    description: 'Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay',
    url: 'https://dlsolutions.com/portfolio/batobaye',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: 'DL Solutions',
      url: 'https://dlsolutions.com',
      sameAs: [
        'https://github.com/Codexsamuel/batobaye',
        'https://batobaye.vercel.app'
      ]
    },
    creator: {
      '@type': 'Person',
      name: 'Davy & Lucie',
      url: 'https://dlsolutions.com'
    },
    datePublished: '2024-12-01',
    dateModified: new Date().toISOString().split('T')[0],
    softwareVersion: '2.0.0',
    downloadUrl: 'https://github.com/Codexsamuel/batobaye',
    installUrl: 'https://dlsolutions.com/portfolio/batobaye',
    screenshot: 'https://dlsolutions.com/images/batobaye-screenshot.jpg',
    featureList: [
      'Catalogue produits avec filtres avancés',
      'Panier d\'achat persistant',
      'Checkout sécurisé CinetPay',
      'Dashboard admin VIP',
      'Intégration IA OpenAI',
      'Analytics en temps réel',
      'Gestion des commandes',
      'Intégration Sage Compta'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DL Solutions',
    url: 'https://dlsolutions.com',
    logo: 'https://dlsolutions.com/images/logo.png',
    description: 'Écosystème digital complet avec marketplace, e-commerce, CRM, ERP, marketing digital',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CM',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@dlsolutions.com'
    },
    sameAs: [
      'https://github.com/dl-solutions',
      'https://linkedin.com/company/dl-solutions',
      'https://twitter.com/dlsolutions'
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Davy',
        url: 'https://dlsolutions.com'
      },
      {
        '@type': 'Person',
        name: 'Lucie',
        url: 'https://dlsolutions.com'
      }
    ]
  };
}

export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DL Solutions',
    url: 'https://dlsolutions.com',
    description: 'Écosystème digital complet avec marketplace, e-commerce, CRM, ERP, marketing digital',
    publisher: {
      '@type': 'Organization',
      name: 'DL Solutions',
      url: 'https://dlsolutions.com'
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
} 