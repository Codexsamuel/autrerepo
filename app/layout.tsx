import PerformanceMonitor from '@/components/PerformanceMonitor'
import ModernNavigation from '@/components/layout/ModernNavigation'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './fonts.css'
import './globals.css'
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from '../lib/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
    template: '%s | DL Solutions Davy & Lucie'
  },
  description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.',
  keywords: 'DL Solutions, Batobaye, marketplace, e-commerce, Cameroun, Davy, Lucie, Dave and Luce, marketing digital, vente en ligne, boutique en ligne, CRM, ERP, IA, OpenAI, CinetPay, Sage Compta',
  authors: [{ name: 'DL Solutions - Davy & Lucie' }],
  creator: 'DL Solutions - Davy & Lucie',
  publisher: 'DL Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dlsolutions.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://dlsolutions.com',
    title: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.',
    siteName: 'DL Solutions',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'DL Solutions - Écosystème Digital Complet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital.',
    images: ['/images/og-home.jpg'],
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
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    yahoo: 'YOUR_YAHOO_VERIFICATION_CODE',
  },
  category: 'technology',
  classification: 'Business Software',
  other: {
    'geo.region': 'CM',
    'geo.placename': 'Yaoundé',
    'geo.position': '3.848033;11.502075',
    'ICBM': '3.848033, 11.502075',
    'DC.title': 'DL Solutions - Écosystème Digital Complet',
    'DC.creator': 'Davy & Lucie',
    'DC.subject': 'E-commerce, Marketplace, Marketing Digital, CRM, ERP',
    'DC.description': 'Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital',
    'DC.publisher': 'DL Solutions',
    'DC.contributor': 'Davy, Lucie',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Software',
    'DC.format': 'text/html',
    'DC.identifier': 'https://dlsolutions.com',
    'DC.language': 'fr',
    'DC.coverage': 'Cameroun',
    'DC.rights': '© 2024 DL Solutions - Tous droits réservés',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebSiteStructuredData();

  return (
    <html lang="fr">
      <head>
        {/* Balises meta supplémentaires pour SEO */}
        <meta name="application-name" content="DL Solutions" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DL Solutions" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Balises pour les réseaux sociaux */}
        <meta property="og:site_name" content="DL Solutions" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DL Solutions - Écosystème Digital Complet | Davy & Lucie" />
        <meta property="og:description" content="DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun." />
        <meta property="og:url" content="https://dlsolutions.com" />
        <meta property="og:image" content="https://dlsolutions.com/images/og-home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DL Solutions - Écosystème Digital Complet" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dlsolutions" />
        <meta name="twitter:creator" content="@dlsolutions" />
        <meta name="twitter:title" content="DL Solutions - Écosystème Digital Complet | Davy & Lucie" />
        <meta name="twitter:description" content="DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital." />
        <meta name="twitter:image" content="https://dlsolutions.com/images/og-home.jpg" />
        <meta name="twitter:image:alt" content="DL Solutions - Écosystème Digital Complet" />
        
        {/* Balises géographiques */}
        <meta name="geo.region" content="CM" />
        <meta name="geo.placename" content="Yaoundé" />
        <meta name="geo.position" content="3.848033;11.502075" />
        <meta name="ICBM" content="3.848033, 11.502075" />
        
        {/* Balises pour les moteurs de recherche */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
        
        {/* Balises pour les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteData),
          }}
        />
        
        {/* Balises pour les performances et SEO */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://dlsolutions.com" />
        
        {/* Balises pour les mots-clés cibles */}
        <meta name="keywords" content="Batobaye, Batobaye Market, marketplace Cameroun, e-commerce Cameroun, boutique en ligne Cameroun, vente en ligne Cameroun, DL Solutions, Davy, Lucie, Dave and Luce, CinetPay, OpenAI, Sage Compta, dashboard admin, gestion produits, inventaire en ligne, analytics e-commerce, IA e-commerce, marketing digital Cameroun, développement web Cameroun, solutions digitales Cameroun" />
        
        {/* Balises pour les réseaux sociaux spécifiques */}
        <meta property="og:image:secure_url" content="https://dlsolutions.com/images/og-home.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Balises pour LinkedIn */}
        <meta property="og:image" content="https://dlsolutions.com/images/og-home.jpg" />
        <meta property="og:title" content="DL Solutions - Écosystème Digital Complet | Davy & Lucie" />
        <meta property="og:description" content="DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun." />
        <meta property="og:url" content="https://dlsolutions.com" />
        <meta property="og:site_name" content="DL Solutions" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        
        {/* Balises pour Facebook */}
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        <meta property="fb:admins" content="YOUR_FACEBOOK_ADMIN_ID" />
        
        {/* Balises pour Pinterest */}
        <meta name="pinterest-rich-pin" content="true" />
        
        {/* Balises pour WhatsApp */}
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        
        {/* Balises pour les performances */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/og-home.jpg" as="image" />
        
        {/* Balises pour la sécurité */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Balises pour l'accessibilité */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Balises pour les moteurs de recherche locaux */}
        <meta name="geo.region" content="CM" />
        <meta name="geo.placename" content="Yaoundé, Cameroun" />
        <meta name="geo.position" content="3.848033;11.502075" />
        <meta name="ICBM" content="3.848033, 11.502075" />
        
        {/* Balises pour les mots-clés long-tail */}
        <meta name="keywords" content="Batobaye marketplace Cameroun, Batobaye e-commerce Cameroun, DL Solutions marketplace, Davy Lucie e-commerce, marketplace Cameroun, vente en ligne Cameroun, marketing digital Cameroun, développement web Cameroun, solutions digitales Cameroun, boutique en ligne Cameroun, plateforme e-commerce Cameroun, système de paiement Cameroun, CinetPay Cameroun, OpenAI Cameroun, Sage Compta Cameroun, dashboard admin Cameroun, gestion produits Cameroun, inventaire en ligne Cameroun, analytics e-commerce Cameroun, IA e-commerce Cameroun" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
