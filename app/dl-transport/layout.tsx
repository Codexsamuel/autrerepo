import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DL-Transport | Service de Transport Premium Personnel | Peugeot",
  description: "DL-Transport, votre service de transport premium personnel avec des véhicules Peugeot de qualité. Chauffeurs expérimentés, suivi GPS en temps réel, tarifs transparents. Téléchargez l'application maintenant !",
  keywords: [
    "DL-Transport",
    "transport premium",
    "service de transport personnel",
    "Peugeot 3008",
    "Peugeot 508", 
    "Peugeot 208",
    "chauffeur professionnel",
    "suivi GPS temps réel",
    "transport Douala",
    "application transport",
    "réservation transport",
    "transport VIP",
    "service de chauffeur",
    "transport de luxe"
  ],
  authors: [{ name: "DL Solutions" }],
  creator: "DL Solutions",
  publisher: "DL Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://daveandlucesolutions.com"),
  alternates: {
    canonical: "/dl-transport",
  },
  openGraph: {
    title: "DL-Transport | Service de Transport Premium Personnel",
    description: "Votre service de transport premium personnel avec des véhicules Peugeot de qualité. Chauffeurs expérimentés, suivi GPS en temps réel.",
    url: "https://daveandlucesolutions.com/dl-transport",
    siteName: "DL-Transport",
    images: [
      {
        url: "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
        width: 1200,
        height: 630,
        alt: "DL-Transport - Service de Transport Premium avec Peugeot 3008",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DL-Transport | Service de Transport Premium Personnel",
    description: "Votre service de transport premium personnel avec des véhicules Peugeot de qualité.",
    images: ["https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Transport",
};

export default function DLTransportLayout({
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
            "@type": "LocalBusiness",
            "name": "DL-Transport",
            "description": "Service de transport premium personnel avec des véhicules Peugeot de qualité",
            "url": "https://daveandlucesolutions.com/dl-transport",
            "logo": "https://daveandlucesolutions.com/images/logos/logo-dl.png",
            "image": "https://res.cloudinary.com/dko5sommz/image/upload/v1753565358/Peugeot_3008_Mk2_GT_line_2016_360_720_50-1_jfoogx.jpg",
            "telephone": "+237-XXX-XXX-XXX",
            "email": "contact@dl-transport.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Douala",
              "addressCountry": "CM",
              "addressRegion": "Littoral"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 3.8667,
              "longitude": 11.5167
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "12000-18000 FCFA",
            "serviceType": "Transport de personnes",
            "areaServed": "Douala, Cameroun",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de Transport",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transport Standard",
                    "description": "Transport avec Peugeot 208"
                  },
                  "price": "12000",
                  "priceCurrency": "XAF"
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transport Premium",
                    "description": "Transport avec Peugeot 3008"
                  },
                  "price": "15000",
                  "priceCurrency": "XAF"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Transport Luxe",
                    "description": "Transport avec Peugeot 508"
                  },
                  "price": "18000",
                  "priceCurrency": "XAF"
                }
              ]
            },
            "sameAs": [
              "https://facebook.com/dl-transport",
              "https://twitter.com/dl-transport",
              "https://instagram.com/dl-transport"
            ]
          })
        }}
      />
      {children}
    </>
  );
} 