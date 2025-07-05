import GoogleAutoAds from '@/components/ads/GoogleAutoAds'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import TradingNavigation from '@/components/layout/TradingNavigation'
import OnboardingProvider from '@/components/onboarding/OnboardingProvider'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { SessionTimer } from '@/components/ui/SessionTimer'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'DL Solutions - Écosystème Digital Complet | CRM, ERP, Boutique, Formations',
    template: '%s | DL Solutions'
  },
  description: 'DL Solutions - Écosystème digital complet avec CRM, ERP, boutique internationale, formations professionnelles, et solutions sectorielles (banque, assurance, immobilier, santé, hôtellerie). Services premium avec livraison au Cameroun.',
  keywords: [
    'DL Solutions', 'CRM', 'ERP', 'boutique internationale', 'formations professionnelles',
    'solutions bancaires', 'assurance', 'immobilier', 'santé', 'hôtellerie', 'Cameroun',
    'livraison Cameroun', 'école de police', 'bureaux Cameroun', 'e-commerce',
    'gestion client', 'trading', 'paris sportifs', 'community management'
  ],
  authors: [{ name: 'DL Solutions Team' }],
  creator: 'DL Solutions',
  publisher: 'DL Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://daveandlucesolutions.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr': '/fr',
      'en': '/en',
      'es': '/es',
      'ar': '/ar',
    },
  },
  other: {
    'geo.region': 'CM',
    'geo.placename': 'Cameroun',
    'geo.position': '3.848033;11.502075',
    'ICBM': '3.848033, 11.502075',
    // Hreflang pour l'internationalisation
    'hreflang-fr': 'https://daveandlucesolutions.com/fr',
    'hreflang-en': 'https://daveandlucesolutions.com/en',
    'hreflang-es': 'https://daveandlucesolutions.com/es',
    'hreflang-ar': 'https://daveandlucesolutions.com/ar',
    'hreflang-x-default': 'https://daveandlucesolutions.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://daveandlucesolutions.com',
    siteName: 'DL Solutions',
    title: 'DL Solutions - Écosystème Digital Complet',
    description: 'CRM, ERP, boutique internationale, formations professionnelles. Livraison au Cameroun - École de Police, bureaux disponibles.',
    images: [
      {
        url: '/images/og-dl-solutions.jpg',
        width: 1200,
        height: 630,
        alt: 'DL Solutions - Écosystème Digital Complet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DL Solutions - Écosystème Digital Complet',
    description: 'CRM, ERP, boutique internationale, formations professionnelles. Livraison au Cameroun.',
    images: ['/images/twitter-dl-solutions.jpg'],
    creator: '@dlsolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business Software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
              "name": "DL Solutions",
            "url": "https://daveandlucesolutions.com",
              "logo": "https://daveandlucesolutions.com/images/dl-logo.jpg",
              "description": "Écosystème digital complet avec CRM, ERP, boutique internationale, formations professionnelles",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "École de Police",
                "addressLocality": "Yaoundé",
                "addressRegion": "Centre",
                "addressCountry": "CM",
                "postalCode": "00000"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+237-XXX-XXX-XXX",
                "contactType": "customer service",
                "areaServed": "CM",
                "availableLanguage": ["French", "English", "Spanish", "Arabic"]
              },
              "sameAs": [
                "https://facebook.com/dlsolutions",
                "https://twitter.com/dlsolutions",
                "https://linkedin.com/company/dlsolutions"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services DL Solutions",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "CRM & Gestion Client",
                      "description": "Solutions CRM complètes pour la gestion client"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Boutique Internationale",
                      "description": "Boutique en ligne avec produits du monde entier"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Formations Professionnelles",
                      "description": "Formations certifiantes en ligne"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "DL Solutions - Bureaux Cameroun",
              "image": "https://daveandlucesolutions.com/images/dl-logo.jpg",
              "description": "Bureaux DL Solutions au Cameroun - École de Police, Yaoundé",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "École de Police",
                "addressLocality": "Yaoundé",
                "addressRegion": "Centre",
                "addressCountry": "CM"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 3.848033,
                "longitude": 11.502075
              },
              "url": "https://daveandlucesolutions.com",
              "telephone": "+237-XXX-XXX-XXX",
              "openingHours": "Mo-Fr 08:00-18:00",
              "priceRange": "€€",
              "servesCuisine": "Services Digitaux",
              "hasMenu": "https://daveandlucesolutions.com/services"
            })
          }}
        />

        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "DL Solutions",
              "url": "https://daveandlucesolutions.com",
              "description": "Écosystème digital complet avec CRM, ERP, boutique internationale",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://daveandlucesolutions.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta tags for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DL Solutions" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="DL Solutions Team" />
        <meta name="copyright" content="DL Solutions" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="French" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Social Media Meta Tags */}
        <meta property="og:site_name" content="DL Solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="es_ES" />
        <meta property="og:locale:alternate" content="ar_SA" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:site" content="@dlsolutions" />
        <meta name="twitter:creator" content="@dlsolutions" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:street_address" content="École de Police" />
        <meta name="business:contact_data:locality" content="Yaoundé" />
        <meta name="business:contact_data:region" content="Centre" />
        <meta name="business:contact_data:postal_code" content="00000" />
        <meta name="business:contact_data:country_name" content="Cameroun" />
        <meta name="business:contact_data:phone_number" content="+237-XXX-XXX-XXX" />
        
        {/* Geo Meta Tags */}
        <meta name="geo.region" content="CM" />
        <meta name="geo.placename" content="Yaoundé, Cameroun" />
        <meta name="geo.position" content="3.848033;11.502075" />
        <meta name="ICBM" content="3.848033, 11.502075" />
        
        {/* Service Worker for PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <SessionTimer />
          <GoogleAnalytics />
          <GoogleAutoAds />
          <OnboardingProvider>
            <TradingNavigation />
            {children}
            <Toaster />
          </OnboardingProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
