import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: "NovaCore CRM - DL Solutions",
    template: "%s | NovaCore CRM",
  },
  description: "CRM d'entreprise avec IA intégrée pour la transformation digitale en Côte d'Ivoire",
  keywords: ["CRM", "IA", "Côte d'Ivoire", "DL Solutions", "NovaCore", "Business", "Entreprise"],
  authors: [{ name: "DL Solutions", url: "https://dlsolutions.ci" }],
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
    title: "NovaCore CRM - DL Solutions",
    description: "CRM d'entreprise avec IA intégrée pour la transformation digitale",
    siteName: "NovaCore CRM",
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
    description: "CRM d'entreprise avec IA intégrée",
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
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1b4b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NovaCore" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
