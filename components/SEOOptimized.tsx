'use client';

import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: any;
  canonical?: string;
}

export default function SEOOptimized({
  title,
  description,
  keywords,
  image = '/images/logos/logo-dl.png',
  url,
  type = 'website',
  structuredData,
  canonical,
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dlsolutions.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Données structurées par défaut pour DL Solutions
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DL Solutions',
    url: siteUrl,
    logo: `${siteUrl}/images/logos/logo-dl.png`,
    description: 'Plateforme professionnelle de simulation de drones avec IA avancée',
    sameAs: [
      'https://linkedin.com/company/dl-solutions',
      'https://twitter.com/dlsolutions',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+237-XXX-XXX-XXX',
      contactType: 'customer service',
      areaServed: 'CM',
      availableLanguage: ['French', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CM',
      addressLocality: 'Douala',
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Métadonnées de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="DL Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="fr" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="DL Solutions" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dlsolutions" />
      <meta name="twitter:creator" content="@dlsolutions" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Favicon et icônes */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />

      {/* Préconnexions pour améliorer les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />

      {/* DNS Prefetch pour les domaines externes */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />

      {/* Métadonnées supplémentaires pour les moteurs de recherche */}
      <meta name="google-site-verification" content="your-verification-code" />
      <meta name="bing-site-verification" content="your-verification-code" />
      <meta name="yandex-verification" content="your-verification-code" />

      {/* Métadonnées pour les réseaux sociaux */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta name="instagram:site" content="@dlsolutions" />
      <meta name="linkedin:company" content="dl-solutions" />

      {/* Métadonnées pour les applications mobiles */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="DL Solutions" />

      {/* Métadonnées de sécurité */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
  );
} 