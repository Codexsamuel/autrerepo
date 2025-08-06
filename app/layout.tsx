import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateWebSiteStructuredData } from '@/lib/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
  description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.',
  keywords: [
    'DL Solutions',
    'Batobaye',
    'marketplace',
    'e-commerce',
    'Cameroun',
    'Davy',
    'Lucie',
    'Dave and Luce',
    'marketing digital',
    'vente en ligne',
    'boutique en ligne',
    'CRM',
    'ERP',
    'IA',
    'OpenAI',
    'CinetPay',
    'Sage Compta'
  ],
  authors: [{ name: 'DL Solutions - Davy & Lucie' }],
  creator: 'DL Solutions - Davy & Lucie',
  publisher: 'DL Solutions',
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
  category: 'technology',
  classification: 'Business Software',
  openGraph: {
    title: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital. Solutions innovantes au Cameroun.',
    url: 'https://dlsolutions.com',
    siteName: 'DL Solutions',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://dlsolutions.com/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'DL Solutions - Écosystème Digital Complet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dlsolutions',
    creator: '@dlsolutions',
    title: 'DL Solutions - Écosystème Digital Complet | Davy & Lucie',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital.',
    images: ['https://dlsolutions.com/images/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://dlsolutions.com',
    languages: {
      'fr-FR': 'https://dlsolutions.com/fr',
      'en-US': 'https://dlsolutions.com/en',
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    yahoo: 'YOUR_YAHOO_VERIFICATION_CODE',
  },
  other: {
    'format-detection': 'telephone=no, address=no, email=no',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateWebSiteStructuredData();

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DL Solutions',
              url: 'https://dlsolutions.com',
              description: 'Écosystème digital complet avec marketplace Batobaye, boutique en ligne, CRM, ERP, marketing digital',
              publisher: {
                '@type': 'Organization',
                name: 'DL Solutions',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://dlsolutions.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
