"use client";

import { useEffect } from 'react';
import Head from 'next/head';

interface CheckoutPageSEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  productName: string;
  productDescription: string;
  pricingPlan: {
    name: string;
    price: number;
    currency: string;
    billingPeriod: string;
    features: string[];
  };
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
  };
  securityFeatures: string[];
}

export default function CheckoutPageSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  productName,
  productDescription,
  pricingPlan,
  organization,
  securityFeatures
}: CheckoutPageSEOProps) {
  
  useEffect(() => {
    // Mise à jour dynamique des meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('canonical', canonicalUrl);
    
    // Open Graph
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('og:image', ogImage);
    
    // Twitter Cards
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Ajout des données structurées
    addStructuredData();
    
    // Ajout des meta tags de sécurité
    addSecurityMetaTags();
  }, [title, description, keywords, canonicalUrl, ogImage]);

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

  const addSecurityMetaTags = () => {
    // Meta tags de sécurité pour les pages de checkout
    const securityTags = [
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'googlebot', content: 'noindex, nofollow' },
      { name: 'bingbot', content: 'noindex, nofollow' },
      { name: 'yandex', content: 'noindex, nofollow' },
      { name: 'security', content: 'HTTPS' },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'x-frame-options', content: 'DENY' },
      { name: 'x-content-type-options', content: 'nosniff' },
      { name: 'x-xss-protection', content: '1; mode=block' },
      { name: 'strict-transport-security', content: 'max-age=31536000; includeSubDomains' }
    ];

    securityTags.forEach(tag => {
      updateMetaTag(tag.name, tag.content);
    });
  };

  const addStructuredData = () => {
    // Supprimer les anciennes données structurées
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Données structurées pour la page de checkout
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "CheckoutPage",
        "name": `Checkout ${productName}`,
        "description": `Page de finalisation et de paiement pour ${productName}`,
        "provider": {
          "@type": "Organization",
          "name": organization.name,
          "url": organization.url,
          "logo": organization.logo,
          "description": organization.description
        },
        "offers": {
          "@type": "Offer",
          "name": pricingPlan.name,
          "price": pricingPlan.price.toString(),
          "priceCurrency": pricingPlan.currency,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": pricingPlan.price.toString(),
            "priceCurrency": pricingPlan.currency,
            "billingIncrement": pricingPlan.billingPeriod === 'monthly' ? "P1M" : "P1Y"
          },
          "description": `${pricingPlan.name} - ${pricingPlan.price}${pricingPlan.currency}/${pricingPlan.billingPeriod}`,
          "availability": "https://schema.org/InStock",
          "category": "Software Application",
          "seller": {
            "@type": "Organization",
            "name": organization.name,
            "url": organization.url
          }
        },
        "breadcrumb": {
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
              "name": productName,
              "item": `${organization.url}/${productName.toLowerCase()}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Tarifs",
              "item": `${organization.url}/${productName.toLowerCase()}/pricing`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Checkout",
              "item": canonicalUrl
            }
          ]
        }
      },
      "provider": {
        "@type": "Organization",
        "name": organization.name,
        "url": organization.url,
        "logo": organization.logo,
        "description": organization.description,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CM",
          "addressLocality": "Yaoundé"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["French", "English"]
        }
      }
    };

    // Données structurées pour la sécurité
    const securityData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `Checkout Sécurisé ${productName}`,
      "description": `Page de paiement sécurisé avec ${securityFeatures.join(', ')}`,
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "SecurityFeature",
        "name": "Sécurité du Checkout",
        "description": `Fonctionnalités de sécurité: ${securityFeatures.join(', ')}`,
        "category": "Payment Security"
      }
    };

    // Ajouter les deux scripts de données structurées
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(securityData);
    document.head.appendChild(script2);
  };

  return (
    <Head>
      {/* Meta tags de base - Sécurité renforcée */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={organization.name} />
      
      {/* Meta tags de sécurité pour checkout */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <meta name="bingbot" content="noindex, nofollow" />
      <meta name="yandex" content="noindex, nofollow" />
      
      {/* Meta tags de sécurité HTTP */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
      
      {/* Autres meta tags */}
      <meta name="language" content="fr" />
      <meta name="distribution" content="private" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph - Sécurité */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={organization.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Cards - Sécurité */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dlsolutions" />
      <meta name="twitter:creator" content="@dlsolutions" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Meta tags spécifiques au checkout */}
      <meta name="checkout:secure" content="true" />
      <meta name="checkout:ssl" content="true" />
      <meta name="checkout:encryption" content="AES-256" />
      <meta name="checkout:compliance" content="PCI-DSS, GDPR" />
      
      {/* Préchargement des ressources critiques */}
      <link rel="preload" href={ogImage} as="image" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Favicon et icônes */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
} 