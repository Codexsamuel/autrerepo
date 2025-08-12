'use client';

import { useEffect } from 'react';
import Head from 'next/head';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export default function SEOMetaTags({
  title = "NovaWorld - Super App Africaine des Services Vérifiés",
  description = "Trouvez, réservez et payez des professionnels vérifiés en quelques clics. Services domestiques, artisans, experts et livraison en Afrique.",
  keywords = [
    "NovaWorld",
    "services africains",
    "prestataires vérifiés",
    "ménage nounou",
    "artisans électriciens",
    "livraison gaz",
    "super app afrique",
    "DL Solutions",
    "Cameroon",
    "Yaoundé",
    "Douala"
  ],
  ogImage = "/api/placeholder/1200/630",
  ogType = "website",
  canonicalUrl,
  structuredData
}: SEOMetaTagsProps) {
  
  useEffect(() => {
    // Ajouter les métadonnées dynamiques
    if (typeof window !== 'undefined') {
      // Mettre à jour le titre de la page
      document.title = title;
      
      // Ajouter les métadonnées Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
      
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);
      
      // Ajouter les métadonnées Twitter
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', title);
      
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', description);
      
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) twitterImage.setAttribute('content', ogImage);
    }
  }, [title, description, ogImage]);

  // Données structurées par défaut pour NovaWorld
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "NovaWorld",
    "description": "Super App Africaine des Services Vérifiés",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "XAF"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "10000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "DL Solutions SARL",
      "url": "https://dlsolutionssarl.tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DL Solutions SARL",
      "url": "https://dlsolutionssarl.tech"
    },
    "provider": {
      "@type": "Organization",
      "name": "Google Play Store",
      "url": "https://play.google.com/store/apps/details?id=com.dlsolutions.novaworld"
    },
    "featureList": [
      "Services domestiques vérifiés",
      "Artisans et techniciens",
      "Experts et cabinets",
      "Livraison et achats",
      "Urgence 24/7",
      "Paiement sécurisé",
      "Chat en temps réel",
      "Géolocalisation"
    ],
    "screenshot": [
      {
        "@type": "ImageObject",
        "url": "/screenshots/novaworld-home.png",
        "caption": "Page d'accueil NovaWorld"
      },
      {
        "@type": "ImageObject",
        "url": "/screenshots/novaworld-services.png",
        "caption": "Catalogue des services"
      }
    ],
    "downloadUrl": "https://play.google.com/store/apps/details?id=com.dlsolutions.novaworld",
    "installUrl": "https://play.google.com/store/apps/details?id=com.dlsolutions.novaworld",
    "softwareVersion": "1.0.0",
    "fileSize": "45MB",
    "releaseNotes": "Version initiale avec services domestiques, artisans, experts et livraison",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <>
      {/* Métadonnées de base */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="DL Solutions SARL" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="fr" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl || window?.location?.href} />
      <meta property="og:site_name" content="NovaWorld" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@dlsolutions" />
      <meta name="twitter:creator" content="@dlsolutions" />
      
      {/* Métadonnées mobiles */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="NovaWorld" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest-novaworld.json" />
      <link rel="apple-touch-icon" href="/icons/novaworld-192x192.png" />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
      
      {/* Métadonnées supplémentaires pour NovaWorld */}
      <meta name="application-name" content="NovaWorld" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Métadonnées de localisation */}
      <meta name="geo.region" content="CM" />
      <meta name="geo.placename" content="Yaoundé, Cameroun" />
      <meta name="geo.position" content="3.848;11.502" />
      <meta name="ICBM" content="3.848, 11.502" />
      
      {/* Métadonnées de contact */}
      <meta name="contact:email" content="contact@dlsolutionssarl.tech" />
      <meta name="contact:phone" content="+237" />
      <meta name="contact:address" content="Yaoundé, Cameroun" />
      
      {/* Métadonnées de business */}
      <meta name="business:contact_data:street_address" content="Yaoundé" />
      <meta name="business:contact_data:locality" content="Yaoundé" />
      <meta name="business:contact_data:region" content="Centre" />
      <meta name="business:contact_data:postal_code" content="00000" />
      <meta name="business:contact_data:country_name" content="Cameroun" />
      <meta name="business:contact_data:phone_number" content="+237" />
      <meta name="business:contact_data:email" content="contact@dlsolutionssarl.tech" />
    </>
  );
} 