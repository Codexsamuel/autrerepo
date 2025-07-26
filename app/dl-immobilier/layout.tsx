import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DL-Immobilier - Location, Vente, Gestion Immobilière au Cameroun | Appartements, Maisons, Villas, Bureaux, Terrains',
  description: 'DL-Immobilier, la plateforme immobilière de référence au Cameroun. Location et vente d\'appartements, maisons, villas, bureaux, terrains. Gestion locative, investissement immobilier. Biens meublés et non meublés. Recherche immobilière avancée.',
  keywords: [
    'immobilier cameroun',
    'location appartement douala',
    'location maison cameroun',
    'vente villa cameroun',
    'bureau à louer douala',
    'terrain constructible cameroun',
    'appartement meublé douala',
    'maison à louer yaoundé',
    'gestion locative cameroun',
    'investissement immobilier cameroun',
    'location courte durée cameroun',
    'location longue durée cameroun',
    'terrain titré cameroun',
    'terrain non titré cameroun',
    'appartement T1 T2 T3 T4',
    'villa de standing cameroun',
    'local commercial douala',
    'entrepôt location cameroun',
    'immobilier neuf cameroun',
    'immobilier ancien cameroun',
    'agence immobilière cameroun',
    'promoteur immobilier cameroun',
    'syndic cameroun',
    'notaire immobilier cameroun',
    'expertise immobilière cameroun',
    'estimation immobilière cameroun',
    'visite virtuelle appartement',
    'photographie immobilière cameroun',
    'DL-Immobilier',
    'plateforme immobilière cameroun'
  ],
  authors: [{ name: 'DL-Immobilier' }],
  creator: 'DL-Immobilier',
  publisher: 'DL-Immobilier',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dl-immobilier.cm'),
  alternates: {
    canonical: '/dl-immobilier',
  },
  openGraph: {
    title: 'DL-Immobilier - Plateforme Immobilière de Référence au Cameroun',
    description: 'Location et vente d\'appartements, maisons, villas, bureaux, terrains au Cameroun. Gestion locative complète. Biens meublés et non meublés.',
    url: 'https://dl-immobilier.cm',
    siteName: 'DL-Immobilier',
    images: [
      {
        url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg',
        width: 1200,
        height: 630,
        alt: 'DL-Immobilier - Plateforme Immobilière Cameroun',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DL-Immobilier - Plateforme Immobilière de Référence au Cameroun',
    description: 'Location et vente d\'appartements, maisons, villas, bureaux, terrains au Cameroun. Gestion locative complète.',
    images: ['https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg'],
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

export default function DLImmobilierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "DL-Immobilier",
            "description": "Plateforme immobilière de référence au Cameroun spécialisée dans la location et vente d'appartements, maisons, villas, bureaux et terrains",
            "url": "https://dl-immobilier.cm",
            "logo": "https://dl-immobilier.cm/logo.png",
            "image": "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Douala",
              "addressCountry": "CM",
              "addressRegion": "Littoral"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+237-XXX-XXX-XXX",
              "contactType": "customer service",
              "availableLanguage": ["French", "English"]
            },
            "areaServed": {
              "@type": "Country",
              "name": "Cameroun"
            },
            "serviceType": [
              "Location immobilière",
              "Vente immobilière", 
              "Gestion locative",
              "Investissement immobilier",
              "Expertise immobilière"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Catalogue Immobilier",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Appartements à louer",
                    "description": "Appartements meublés et non meublés de T1 à T4+"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Maisons et Villas",
                    "description": "Maisons individuelles et villas de standing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product", 
                    "name": "Bureaux et Locaux",
                    "description": "Bureaux équipés et locaux commerciaux"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Terrains",
                    "description": "Terrains constructibles titrés et non titrés"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1250"
            }
          })
        }}
      />
      {children}
    </>
  );
} 