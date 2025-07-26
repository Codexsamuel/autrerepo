import PerformanceMonitor from '@/components/PerformanceMonitor'
import ModernNavigation from '@/components/layout/ModernNavigation'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './fonts.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DL Solutions - Plateforme de Simulation de Drones',
  description: 'Plateforme professionnelle de simulation de drones avec IA avancée, réalité virtuelle et analytics en temps réel. Solutions innovantes pour entreprises et investisseurs.',
  keywords: 'simulation drones, IA, réalité virtuelle, analytics, investisseurs, DL Solutions, Cameroun',
  authors: [{ name: 'DL Solutions' }],
  creator: 'DL Solutions',
  publisher: 'DL Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dlsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DL Solutions - Plateforme de Simulation de Drones',
    description: 'Plateforme professionnelle de simulation de drones avec IA avancée',
    url: 'https://dlsolutions.com',
    siteName: 'DL Solutions',
    images: [
      {
        url: '/images/logos/logo-dl.png',
        width: 1200,
        height: 630,
        alt: 'DL Solutions - Simulation de Drones',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DL Solutions - Plateforme de Simulation de Drones',
    description: 'Plateforme professionnelle de simulation de drones avec IA avancée',
    images: ['/images/logos/logo-dl.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Préconnexions pour améliorer les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Favicon et icônes */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Métadonnées de sécurité */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DL Solutions" />
        
        {/* Données structurées pour l'organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DL Solutions',
              url: 'https://dlsolutions.com',
              logo: 'https://dlsolutions.com/images/logos/logo-dl.png',
              description: 'Plateforme professionnelle de simulation de drones avec IA avancée',
              foundingDate: '2024',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'CM',
                addressLocality: 'Douala',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                areaServed: 'CM',
                availableLanguage: ['French', 'English'],
              },
              sameAs: [
                'https://linkedin.com/company/dl-solutions',
                'https://twitter.com/dlsolutions',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white antialiased`}>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        
        <div className="min-h-screen flex flex-col">
          <ModernNavigation />
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        {/* Composants de qualité */}
        <PerformanceMonitor />
        <Toaster />
      </body>
    </html>
  )
}
