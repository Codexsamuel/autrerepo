import { generateWebSiteStructuredData } from '@/lib/structured-data';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dlsolutionssarl.tech'),
  title: 'DL Solutions - Écosystème Digital Ultra-Avancé | IA Souveraine & Solutions Innovantes | Davy & Lucie',
  description: 'DL Solutions par Davy et Lucie - Écosystème digital ultra-avancé avec IA souveraine Sentinel Zero, NovaIA, marketplace Batobaye, e-commerce, CRM, ERP, marketing digital IA, et solutions de transformation numérique au Cameroun. Technologies de pointe et IA militaire.',
  keywords: [
    'DL Solutions',
    'Davy et Lucie Solutions',
    'Dave and Luce Solutions',
    'IA Souveraine',
    'Sentinel Zero',
    'NovaIA',
    'NovaCore',
    'Intelligence Artificielle Avancée',
    'IA Militaire',
    'Super Agent IA',
    'Agent Genesis',
    'Batobaye',
    'Marketplace',
    'E-commerce Avancé',
    'CRM Avancé',
    'ERP Intégré',
    'Marketing Digital IA',
    'Cameroun',
    'Yaoundé',
    'Afrique',
    'Transformation Numérique',
    'Solutions Innovantes',
    'Technologies de Pointe',
    'LangChain',
    'OpenAI GPT-4',
    'GPT-4 Turbo',
    'Claude AI',
    'Gemini AI',
    'Vector Database',
    'Supabase',
    'Next.js 15',
    'React 18',
    'TypeScript',
    'Vercel',
    'Docker',
    'Kubernetes',
    'Cloud Souverain',
    'Sécurité Numérique',
    'Cybersécurité',
    'OSINT',
    'Surveillance IA',
    'Infiltration IA',
    'Mémoire Vectorielle',
    'Auto-apprentissage',
    'Réseau d\'Agents Distribués',
    'Guerre Asymétrique Numérique',
    'IA Gouvernementale',
    'IA Défense Nationale',
    'IA Sécurité Infrastructures Critiques',
    'CinetPay',
    'Sage Compta',
    'Stripe',
    'Web3',
    'Blockchain',
    'Smart Contracts',
    'Metaverse',
    'VR/AR',
    'IoT',
    '5G',
    'Edge Computing',
    'Quantum Computing'
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
    title: 'DL Solutions - Écosystème Digital Ultra-Avancé | IA Souveraine & Solutions Innovantes',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital ultra-avancé avec IA souveraine Sentinel Zero, NovaIA, marketplace Batobaye, e-commerce, CRM, ERP, marketing digital IA, et solutions de transformation numérique au Cameroun.',
    url: 'https://dlsolutionssarl.tech',
    siteName: 'DL Solutions',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://dlsolutionssarl.tech/images/og-dl-solutions-ultra-advanced.jpg',
        width: 1200,
        height: 630,
        alt: 'DL Solutions - Écosystème Digital Ultra-Avancé avec IA Souveraine',
        type: 'image/jpeg',
      },
      {
        url: 'https://dlsolutionssarl.tech/images/og-novaia-sentinel-zero.jpg',
        width: 1200,
        height: 630,
        alt: 'NovaIA & Sentinel Zero - IA Militaire Souveraine',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dlsolutions',
    creator: '@dlsolutions',
    title: 'DL Solutions - Écosystème Digital Ultra-Avancé | IA Souveraine & Solutions Innovantes',
    description: 'DL Solutions par Davy et Lucie - Écosystème digital ultra-avancé avec IA souveraine Sentinel Zero, NovaIA, marketplace Batobaye, e-commerce, CRM, ERP, marketing digital IA.',
    images: [
      'https://dlsolutionssarl.tech/images/twitter-dl-solutions-ultra.jpg',
      'https://dlsolutionssarl.tech/images/twitter-novaia-sentinel.jpg'
    ],
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
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
