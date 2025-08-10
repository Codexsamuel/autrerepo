import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout NovaCore - Paiement Sécurisé | Plans Starter, Professional, Enterprise | DL Solutions',
  description: 'Finalisez votre abonnement NovaCore en toute sécurité. Paiement sécurisé pour les plans Starter, Professional et Enterprise. CRM et ERP au Cameroun.',
  keywords: [
    'checkout novacore',
    'paiement novacore',
    'abonnement novacore',
    'paiement crm cameroun',
    'paiement erp cameroun',
    'paiement sécurisé novacore',
    'finaliser abonnement novacore',
    'commander novacore',
    'souscrire novacore',
    'paiement mensuel novacore',
    'paiement annuel novacore',
    'essai gratuit novacore',
    'plan starter novacore',
    'plan professional novacore',
    'plan enterprise novacore',
    'carte bancaire novacore',
    'paiement en ligne novacore',
    'facturation novacore',
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
    canonical: '/novacore/checkout',
  },
  openGraph: {
    title: 'Checkout NovaCore - Paiement Sécurisé | DL Solutions',
    description: 'Finalisez votre abonnement NovaCore en toute sécurité. Plans Starter, Professional et Enterprise.',
    url: 'https://dlsolutionssarl.tech/novacore/checkout',
    siteName: 'DL Solutions',
    images: [
      {
        url: '/images/og-novacore-checkout.jpg',
        width: 1200,
        height: 630,
        alt: 'Checkout NovaCore - Paiement Sécurisé',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checkout NovaCore - Paiement Sécurisé | DL Solutions',
    description: 'Finalisez votre abonnement NovaCore en toute sécurité. Plans Starter, Professional et Enterprise.',
    images: ['/images/og-novacore-checkout.jpg'],
    creator: '@dlsolutions',
    site: '@dlsolutions',
  },
  robots: {
    index: false, // Page de checkout non indexée pour la sécurité
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function NovaCoreCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Données structurées Schema.org pour la page de checkout */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Checkout NovaCore - Paiement Sécurisé",
            "description": "Finalisez votre abonnement NovaCore en toute sécurité",
            "url": "https://dlsolutionssarl.tech/novacore/checkout",
            "mainEntity": {
              "@type": "CheckoutPage",
              "name": "Checkout NovaCore",
              "description": "Page de finalisation et de paiement pour les abonnements NovaCore",
              "provider": {
                "@type": "Organization",
                "name": "DL Solutions",
                "url": "https://dlsolutionssarl.tech"
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
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Checkout",
                    "item": "https://dlsolutionssarl.tech/novacore/checkout"
                  }
                ]
              }
            }
          })
        }}
      />
      {children}
    </>
  );
} 