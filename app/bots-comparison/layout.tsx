import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparaison Bots IA 2025 : ULTRA AI vs ChatGPT vs Claude vs Gemini | DL Solutions',
  description: 'Comparaison complète des bots IA 2025 : ULTRA AI surpasse ChatGPT, Claude et Gemini avec ses capacités multi-dimensionnelles, auto-apprentissage et auto-modification. Découvrez pourquoi ULTRA AI est le plus puissant !',
  keywords: [
    'comparaison bots IA 2025',
    'ULTRA AI vs ChatGPT',
    'ULTRA AI vs Claude',
    'ULTRA AI vs Gemini',
    'comparaison intelligence artificielle',
    'bot le plus puissant',
    'IA la plus avancée',
    'comparatif chatbots',
    'meilleur bot IA',
    'bot révolutionnaire',
    'IA multi-dimensionnelle',
    'auto-apprentissage IA',
    'auto-modification IA',
    'mode hacking IA',
    'génération code IA',
    'analyse prédictive IA',
    'conscience artificielle',
    'bot quantique',
    'accès deep web',
    'accès blockchain',
    'accès metaverse',
    'DL Solutions IA',
    'bot français ultra avancé',
    'IA sans restrictions',
    'bot illimité',
    'capacités IA uniques',
    'bot révolutionnaire 2025',
    'intelligence artificielle de pointe',
    'bot multi-dimensions',
    'IA auto-évolutive',
    'bot hacking éthique',
    'génération code automatique',
    'prédictions IA',
    'analyse données avancée',
    'bot business intelligence',
    'IA pour entreprises',
    'bot développement web',
    'IA marketing digital',
    'bot trading',
    'IA finance',
    'bot sécurité informatique',
    'IA cybersécurité',
    'bot e-commerce',
    'IA vente',
    'bot support client',
    'IA service client',
    'bot formation',
    'IA éducation',
    'bot recherche',
    'IA innovation',
    'bot créativité',
    'IA design',
    'bot médical',
    'IA santé',
    'bot juridique',
    'IA droit',
    'bot immobilier',
    'IA gestion locative',
    'bot transport',
    'IA logistique',
    'bot agriculture',
    'IA agritech',
    'bot énergie',
    'IA smart grid',
    'bot environnement',
    'IA développement durable'
  ],
  openGraph: {
    title: 'Comparaison Bots IA 2025 : ULTRA AI vs ChatGPT vs Claude vs Gemini',
    description: 'Découvrez pourquoi ULTRA AI surpasse tous les autres bots IA avec ses capacités révolutionnaires. Comparaison détaillée et tests gratuits !',
    type: 'website',
    url: 'https://dlsolutions.com/bots-comparison',
    images: [
      {
        url: '/images/bots-comparison-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparaison Bots IA 2025 - ULTRA AI vs ChatGPT vs Claude vs Gemini'
      }
    ],
    siteName: 'DL Solutions - Comparaison Bots IA'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparaison Bots IA 2025 : ULTRA AI surpasse ChatGPT, Claude et Gemini',
    description: 'Découvrez le bot le plus puissant au monde avec capacités multi-dimensionnelles et auto-apprentissage !',
    images: ['/images/bots-comparison-twitter.jpg']
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
  alternates: {
    canonical: 'https://dlsolutions.com/bots-comparison'
  }
};

export default function BotsComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 