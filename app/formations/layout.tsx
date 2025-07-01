import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formations Professionnelles DL Solutions | CRM, IA, Marketing, E-commerce',
  description: 'Formations professionnelles certifiantes en CRM, Intelligence Artificielle, Marketing Digital, E-commerce, Création Visuelle, Télévente. Formations en ligne avec certificats reconnus. DL Solutions Cameroun.',
  keywords: [
    'formations professionnelles', 'CRM formation', 'intelligence artificielle formation',
    'marketing digital formation', 'e-commerce formation', 'création visuelle formation',
    'télévente formation', 'certification en ligne', 'DL Solutions formations',
    'formations Cameroun', 'formation gestion client', 'formation IA entreprises'
  ],
  openGraph: {
    title: 'Formations Professionnelles DL Solutions',
    description: 'Formations certifiantes en CRM, IA, Marketing Digital, E-commerce. Certificats reconnus.',
    images: [
      {
        url: '/images/formations-dl-solutions.jpg',
        width: 1200,
        height: 630,
        alt: 'Formations Professionnelles DL Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formations Professionnelles DL Solutions',
    description: 'Formations certifiantes en CRM, IA, Marketing Digital, E-commerce.',
    images: ['/images/formations-dl-solutions.jpg'],
  },
  alternates: {
    canonical: '/formations',
  },
}

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for Educational Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "DL Solutions - Centre de Formation",
            "description": "Centre de formation professionnelle en technologies digitales",
            "url": "https://dlsolutions.com/formations",
            "image": "https://dlsolutions.com/images/formations-dl-solutions.jpg",
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
            "telephone": "+237-XXX-XXX-XXX",
            "email": "formations@dlsolutions.com",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Catalogue de Formations",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "CRM & Gestion Client",
                    "description": "Formation complète en gestion de la relation client"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Intelligence Artificielle pour Entreprises",
                    "description": "Formation en IA appliquée aux entreprises"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Marketing Digital & Réseaux Sociaux",
                    "description": "Formation en marketing digital et réseaux sociaux"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "E-commerce & Vente en Ligne",
                    "description": "Formation en commerce électronique"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Création Visuelle & Design",
                    "description": "Formation en design et création visuelle"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Télévente & Prospection",
                    "description": "Formation en techniques de vente et prospection"
                  }
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  )
} 