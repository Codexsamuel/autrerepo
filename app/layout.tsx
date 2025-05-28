import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "DL Solutions SARL - Transformation Digitale & IA | Yaoundé, Cameroun",
  description:
    "DL Solutions SARL - Solutions CRM, Intelligence Artificielle, formations et créations visuelles. Basé à Yaoundé, Cameroun. Votre partenaire digital de confiance.",
  keywords:
    "DL Solutions SARL, CRM, Intelligence Artificielle, IA, formations, création visuelle, transformation digitale, NovaCore, Yaoundé, Cameroun, Samuel OBAM",
  authors: [{ name: "Dave and Luce Solutions" }],
  creator: "Dave and Luce Solutions",
  publisher: "Dave and Luce Solutions",
  metadataBase: new URL("https://www.daveandlucesolutions.com"),
  alternates: {
    canonical: "https://www.daveandlucesolutions.com",
  },
  openGraph: {
    title: "DL Solutions - Transformation Digitale & IA",
    description:
      "Solutions CRM, Intelligence Artificielle, formations et créations visuelles pour propulser votre business vers le succès.",
    url: "https://www.daveandlucesolutions.com",
    siteName: "Dave and Luce Solutions",
    images: [
      {
        url: "/images/dl-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DL Solutions - Dave and Luce Solutions",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DL Solutions - Transformation Digitale & IA",
    description:
      "Solutions CRM, Intelligence Artificielle, formations et créations visuelles pour propulser votre business vers le succès.",
    images: ["/images/dl-logo.jpg"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.daveandlucesolutions.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/dl-logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f766e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DL Solutions SARL",
              alternateName: "DL Solutions",
              url: "https://www.daveandlucesolutions.com",
              logo: "https://www.daveandlucesolutions.com/images/dl-logo.jpg",
              description:
                "Solutions CRM, Intelligence Artificielle, formations et créations visuelles pour propulser votre business vers le succès.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2 rue École de Police",
                addressLocality: "Yaoundé",
                addressRegion: "Centre",
                addressCountry: "CM",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+237-694-341-586",
                contactType: "customer service",
                email: "sobam@daveandlucesolutions.com",
              },
              sameAs: ["https://www.daveandlucesolutions.com"],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
