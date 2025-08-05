import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Batobaye Marketplace - Plateforme E-commerce Complète | DL Solutions Davy & Lucie',
  description: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay. Solution marketplace moderne au Cameroun.',
  keywords: 'Batobaye, Batobaye Market, marketplace Cameroun, e-commerce Cameroun, boutique en ligne Cameroun, vente en ligne Cameroun, DL Solutions, Davy, Lucie, Dave and Luce, CinetPay, OpenAI, Sage Compta, dashboard admin, gestion produits, inventaire en ligne, analytics e-commerce, IA e-commerce',
  authors: [{ name: 'DL Solutions', url: 'https://dlsolutions.com' }],
  creator: 'DL Solutions - Davy & Lucie',
  publisher: 'DL Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dlsolutions.com'),
  alternates: {
    canonical: '/portfolio/batobaye',
  },
  openGraph: {
    title: 'Batobaye Marketplace - Plateforme E-commerce Complète',
    description: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay. Solution marketplace moderne au Cameroun.',
    url: 'https://dlsolutions.com/portfolio/batobaye',
    siteName: 'DL Solutions',
    images: [
      {
        url: '/images/batobaye-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Batobaye Marketplace - Plateforme E-commerce Complète',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batobaye Marketplace - Plateforme E-commerce Complète',
    description: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay.',
    images: ['/images/batobaye-og.jpg'],
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
};

export default function BatobayeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
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
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Client E-commerce'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Plateforme e-commerce exceptionnelle avec des fonctionnalités avancées et une interface utilisateur moderne.'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
} 