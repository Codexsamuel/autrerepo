import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs NovaCore - Plans CRM & ERP | Starter 99€, Professional 299€, Enterprise Sur Mesure | DL Solutions',
  description: 'Découvrez nos tarifs NovaCore : Plan Starter à 99€/mois, Professional à 299€/mois avec essai gratuit, et Enterprise sur mesure. CRM, ERP et solutions d\'entreprise au Cameroun.',
  keywords: [
    'tarifs novacore',
    'prix crm cameroun',
    'prix erp cameroun',
    'abonnement novacore',
    'plan starter 99€',
    'plan professional 299€',
    'plan enterprise sur mesure',
    'crm cameroun prix',
    'erp cameroun prix',
    'logiciel gestion entreprise cameroun',
    'solutions crm cameroun',
    'solutions erp cameroun',
    'essai gratuit novacore',
    'formation crm incluse',
    'support prioritaire crm',
    'api crm cameroun',
    'intégration crm sur mesure',
    'sla garanti crm',
    'stockage illimité crm',
    'utilisateurs illimités crm',
    'DL Solutions',
    'NovaCore',
    'Cameroun'
  ],
  authors: [{ name: 'DL Solutions' }],
  creator: 'DL Solutions',
  publisher: 'DL Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dlsolutionssarl.tech'),
  alternates: {
    canonical: '/novacore/pricing',
  },
  openGraph: {
    title: 'Tarifs NovaCore - Plans CRM & ERP | DL Solutions',
    description: 'Plans Starter 99€, Professional 299€ avec essai gratuit, Enterprise sur mesure. CRM et ERP au Cameroun.',
    url: 'https://dlsolutionssarl.tech/novacore/pricing',
    siteName: 'DL Solutions',
    images: [
      {
        url: '/images/og-novacore-pricing.jpg',
        width: 1200,
        height: 630,
        alt: 'Tarifs NovaCore - Plans CRM & ERP',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs NovaCore - Plans CRM & ERP | DL Solutions',
    description: 'Plans Starter 99€, Professional 299€ avec essai gratuit, Enterprise sur mesure.',
    images: ['/images/og-novacore-pricing.jpg'],
    creator: '@dlsolutions',
    site: '@dlsolutions',
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

export default function NovaCorePricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Données structurées Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Tarifs NovaCore - Plans CRM & ERP",
            "description": "Découvrez nos tarifs NovaCore : Plan Starter à 99€/mois, Professional à 299€/mois avec essai gratuit, et Enterprise sur mesure.",
            "url": "https://dlsolutionssarl.tech/novacore/pricing",
            "mainEntity": {
              "@type": "Product",
              "name": "NovaCore CRM & ERP",
              "description": "Solution complète de gestion d'entreprise avec CRM et ERP",
              "brand": {
                "@type": "Brand",
                "name": "DL Solutions"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Plan Starter",
                  "price": "99",
                  "priceCurrency": "EUR",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "99",
                    "priceCurrency": "EUR",
                    "billingIncrement": "P1M"
                  },
                  "description": "Parfait pour les petites entreprises",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "Plan Professional",
                  "price": "299",
                  "priceCurrency": "EUR",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "299",
                    "priceCurrency": "EUR",
                    "billingIncrement": "P1M"
                  },
                  "description": "Idéal pour les entreprises en croissance",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "Plan Enterprise",
                  "price": "0",
                  "priceCurrency": "EUR",
                  "description": "Solution complète sur mesure pour grandes entreprises",
                  "availability": "https://schema.org/InStock"
                }
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": "https://dlsolutionssarl.tech"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "NovaCore",
                  "item": "https://dlsolutionssarl.tech/novacore"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Tarifs",
                  "item": "https://dlsolutionssarl.tech/novacore/pricing"
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
} 