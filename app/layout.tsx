import { ReactNode } from "react";
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NotificationProvider } from "@/components/ui/notification-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Dave and Luce Solutions - DL Solutions | Services Intelligents & Innovation",
    template: "%s | Dave and Luce Solutions"
  },
  description: "Dave and Luce Solutions - Plateforme leader de services intelligents. Solutions IA, trading, e-commerce, CRM, formations. Dave et Luce, experts en transformation digitale et innovation technologique.",
  keywords: [
    "Dave and Luce",
    "Dave et Luce",
    "Daveandluce",
    "DL Solutions",
    "Dave Luce Solutions",
    "services intelligents",
    "intelligence artificielle",
    "trading",
    "e-commerce",
    "CRM",
    "formations",
    "développement web",
    "consulting",
    "innovation",
    "transformation digitale",
    "Dave",
    "Luce",
    "solutions digitales",
    "technologie",
    "entreprise"
  ],
  authors: [{ name: "Dave and Luce Solutions Team" }],
  creator: "Dave and Luce Solutions",
  publisher: "Dave and Luce Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dlsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://dlsolutions.com',
    title: 'Dave and Luce Solutions - DL Solutions | Services Intelligents & Innovation',
    description: 'Dave and Luce Solutions - Plateforme leader de services intelligents. Solutions IA, trading, e-commerce, CRM, formations. Dave et Luce, experts en transformation digitale.',
    siteName: 'Dave and Luce Solutions',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dave and Luce Solutions - Services Intelligents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dave and Luce Solutions - DL Solutions | Services Intelligents & Innovation',
    description: 'Dave and Luce Solutions - Plateforme leader de services intelligents. Solutions IA, trading, e-commerce, CRM, formations.',
    images: ['/images/twitter-image.jpg'],
    creator: '@daveandluce',
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dave and Luce Solutions",
            "alternateName": "DL Solutions",
            "url": "https://dlsolutions.com",
            "logo": "https://dlsolutions.com/images/dl-logo.jpg",
            "description": "Plateforme leader de services intelligents et d'innovation technologique",
            "founder": [
              {
                "@type": "Person",
                "name": "Dave"
              },
              {
                "@type": "Person", 
                "name": "Luce"
              }
            ],
            "sameAs": [
              "https://www.linkedin.com/company/daveandluce",
              "https://twitter.com/daveandluce"
            ]
          })}
        </script>
      </head>
      <body className={inter.className}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  )
}
