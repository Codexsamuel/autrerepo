import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "NovaCore CRM - DL Solutions",
    template: "%s | NovaCore CRM",
  },
  description:
    "Solution CRM intelligente avec IA pour entreprises ivoiriennes. Gestion clients, facturation, analytics et Studio IA intégré.",
  keywords: ["CRM", "Côte d'Ivoire", "Intelligence Artificielle", "Gestion Client", "Facturation", "Analytics"],
  authors: [{ name: "DL Solutions" }],
  creator: "DL Solutions",
  publisher: "DL Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dlsolutions.ci"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CI": "/fr",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://dlsolutions.ci",
    title: "NovaCore CRM - Solution intelligente pour entreprises",
    description: "CRM avec IA pour la Côte d'Ivoire. Gestion clients, facturation automatisée, analytics avancés.",
    siteName: "DL Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NovaCore CRM Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaCore CRM - DL Solutions",
    description: "Solution CRM intelligente avec IA pour entreprises ivoiriennes",
    images: ["/og-image.png"],
    creator: "@dlsolutions_ci",
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
  category: "business",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="NovaCore" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#6366f1" />
          <meta name="msapplication-tap-highlight" content="no" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
