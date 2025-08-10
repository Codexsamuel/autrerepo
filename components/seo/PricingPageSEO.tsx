"use client";

import Head from 'next/head';
import { useEffect } from 'react';

interface PricingPageSEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  productName: string;
  productDescription: string;
  pricingPlans: Array<{
    name: string;
    price: number;
    currency: string;
    billingPeriod: string;
    features: string[];
    popular?: boolean;
  }>;
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
  };
}

export default function PricingPageSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  productName,
  productDescription,
  pricingPlans,
  organization
}: PricingPageSEOProps) {
  
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

  const addStructuredData = () => {
    // Supprimer les anciennes données structurées
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Données structurées pour la page de tarification
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "Product",
        "name": productName,
        "description": productDescription,
        "brand": {
          "@type": "Brand",
          "name": organization.name,
          "url": organization.url,
          "logo": organization.logo,
          "description": organization.description
        },
        "offers": pricingPlans.map(plan => ({
          "@type": "Offer",
          "name": plan.name,
          "price": plan.price.toString(),
          "priceCurrency": plan.currency,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": plan.price.toString(),
            "priceCurrency": plan.currency,
            "billingIncrement": plan.billingPeriod === 'monthly' ? "P1M" : "P1Y"
          },
          "description": `${plan.name} - ${plan.price}${plan.currency}/${plan.billingPeriod}`,
          "availability": "https://schema.org/InStock",
          "category": "Software Application",
          "seller": {
            "@type": "Organization",
            "name": organization.name,
            "url": organization.url
          }
        })),
        "category": "Software Application",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": Math.min(...pricingPlans.map(p => p.price)).toString(),
          "highPrice": Math.max(...pricingPlans.map(p => p.price)).toString(),
          "offerCount": pricingPlans.length,
          "offers": pricingPlans.map(plan => ({
            "@type": "Offer",
            "name": plan.name,
            "price": plan.price.toString(),
            "priceCurrency": plan.currency,
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": plan.price.toString(),
              "priceCurrency": plan.currency,
              "billingIncrement": plan.billingPeriod === 'monthly' ? "P1M" : "P1Y"
            },
            "availability": "https://schema.org/InStock"
          }))
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
            "item": canonicalUrl
          }
        ]
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

    // Ajouter les données structurées FAQ si disponibles
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quels sont les modes de paiement acceptés ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et les virements bancaires pour les entreprises."
          }
        },
        {
          "@type": "Question",
          "name": "Puis-je changer de plan à tout moment ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, vous pouvez changer de plan à tout moment. Le changement prendra effet au début du prochain cycle de facturation."
          }
        },
        {
          "@type": "Question",
          "name": "Y a-t-il des frais de résiliation ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aucun frais de résiliation. Vous pouvez annuler votre abonnement à tout moment sans pénalité."
          }
        },
        {
          "@type": "Question",
          "name": "Le support technique est-il inclus ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, tous nos plans incluent le support technique. Le plan Professional et Enterprise bénéficient d'un support prioritaire."
          }
        },
        {
          "@type": "Question",
          "name": "Puis-je essayer avant d'acheter ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, le plan Professional inclut un essai gratuit de 14 jours. Le plan Enterprise propose une démonstration personnalisée."
          }
        }
      ]
    };

    // Ajouter les deux scripts de données structurées
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(faqData);
    document.head.appendChild(script2);
  };

  return (
    <Head>
      {/* Meta tags de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={organization.name} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="fr" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
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
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dlsolutions" />
      <meta name="twitter:creator" content="@dlsolutions" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Meta tags spécifiques aux prix */}
      <meta name="price:amount" content={Math.min(...pricingPlans.map(p => p.price)).toString()} />
      <meta name="price:currency" content="EUR" />
      <meta name="product:price:amount" content={Math.min(...pricingPlans.map(p => p.price)).toString()} />
      <meta name="product:price:currency" content="EUR" />
      
      {/* Préchargement des ressources critiques */}
      <link rel="preload" href={ogImage} as="image" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Head>
  );
} 