import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Viewport } from "next"

export const metadata = {
  title: {
    default: "DL Solutions SARL - Transformation Digitale & IA | Yaoundé, Cameroun",
    template: "%s | DL Solutions SARL",
  },
  description:
    "DL Solutions SARL - Leader en solutions CRM, Intelligence Artificielle, formations digitales et créations visuelles. Basé à Yaoundé, Cameroun. Transformez votre entreprise avec nos technologies innovantes.",
  keywords: [
    "DL Solutions SARL",
    "CRM Cameroun",
    "Intelligence Artificielle Yaoundé",
    "IA entreprise",
    "formations digitales",
    "création visuelle",
    "transformation digitale",
    "NovaCore",
    "NovaWorld",
    "DL Style",
    "DL Travel",
    "DL Bookmaker",
    "Yaoundé",
    "Cameroun",
    "Samuel OBAM",
    "développement web",
    "solutions sur mesure",
    "DevOps",
    "consultation IT",
  ],
  authors: [{ name: "Samuel OBAM", url: "https://www.daveandlucesolutions.com" }],
  creator: "Samuel OBAM - DL Solutions SARL",
  publisher: "DL Solutions SARL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.daveandlucesolutions.com"),
  alternates: {
    canonical: "https://www.daveandlucesolutions.com",
    languages: {
      "fr-FR": "https://www.daveandlucesolutions.com",
      "en-US": "https://www.daveandlucesolutions.com/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.daveandlucesolutions.com",
    siteName: "DL Solutions SARL",
    title: "DL Solutions SARL - Transformation Digitale & IA",
    description:
      "Leader en solutions CRM, Intelligence Artificielle et formations digitales au Cameroun. Transformez votre entreprise avec nos technologies innovantes.",
    images: [
      {
        url: "/images/dl-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DL Solutions SARL - Transformation Digitale & IA",
        type: "image/jpeg",
      },
      {
        url: "/images/dl-logo.jpg",
        width: 800,
        height: 600,
        alt: "DL Solutions SARL Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dlsolutions",
    creator: "@samuelobam",
    title: "DL Solutions SARL - Transformation Digitale & IA",
    description: "Leader en solutions CRM, Intelligence Artificielle et formations digitales au Cameroun.",
    images: ["/images/dl-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0f766e",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#0f766e",
    "theme-color": "#ffffff",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DL Solutions SARL",
              alternateName: ["DL Solutions", "Dave and Luce Solutions"],
              url: "https://www.daveandlucesolutions.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.daveandlucesolutions.com/images/dl-logo.jpg",
                width: 400,
                height: 400,
              },
              description:
                "Leader en solutions CRM, Intelligence Artificielle, formations digitales et créations visuelles au Cameroun.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2 rue École de Police",
                addressLocality: "Yaoundé",
                addressRegion: "Centre",
                postalCode: "00000",
                addressCountry: "CM",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+237-694-341-586",
                  contactType: "customer service",
                  email: "sobam@daveandlucesolutions.com",
                  availableLanguage: ["French", "English"],
                  areaServed: "CM",
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+237-694-341-586",
                  contactType: "technical support",
                  email: "support@daveandlucesolutions.com",
                  availableLanguage: ["French", "English"],
                  areaServed: "CM",
                },
              ],
              founder: {
                "@type": "Person",
                name: "Samuel OBAM",
                jobTitle: "CEO & Founder",
                email: "sobam@daveandlucesolutions.com",
              },
              foundingDate: "2020",
              numberOfEmployees: "10-50",
              industry: "Information Technology",
              services: [
                "Intelligence Artificielle",
                "Développement CRM",
                "Formations digitales",
                "Création visuelle",
                "Transformation digitale",
                "Solutions sur mesure",
              ],
              sameAs: [
                "https://www.linkedin.com/company/107208022",
                "https://twitter.com/dlsolutions",
                "https://www.facebook.com/dlsolutions",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services DL Solutions",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "NovaCore - Solution CRM IA",
                      description: "Plateforme CRM avec intelligence artificielle intégrée",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "NovaWorld - Réseau Social B2B",
                      description: "Réseau social professionnel avec IA",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "DL Style - E-commerce",
                      description: "Boutique en ligne premium",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "DL Travel - Plateforme de voyage",
                      description: "Plateforme de réservation de vols et hôtels",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.daveandlucesolutions.com/#business",
              name: "DL Solutions SARL",
              image: "https://www.daveandlucesolutions.com/images/dl-logo.jpg",
              telephone: "+237-694-341-586",
              email: "sobam@daveandlucesolutions.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2 rue École de Police",
                addressLocality: "Yaoundé",
                addressRegion: "Centre",
                addressCountry: "CM",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 3.848,
                longitude: 11.502,
              },
              url: "https://www.daveandlucesolutions.com",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
              currenciesAccepted: "XAF",
              paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
              areaServed: {
                "@type": "Country",
                name: "Cameroon",
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.daveandlucesolutions.com/#website",
              url: "https://www.daveandlucesolutions.com",
              name: "DL Solutions SARL",
              description: "Site officiel de DL Solutions SARL - Transformation digitale et IA au Cameroun",
              publisher: {
                "@id": "https://www.daveandlucesolutions.com/#business",
              },
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://www.daveandlucesolutions.com/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              ],
              inLanguage: "fr-FR",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
