import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "DL Solutions - Votre Partenaire Digital",
    template: "%s | DL Solutions",
  },
  description: "Solutions digitales innovantes pour votre entreprise. CRM, formations, e-commerce et plus encore.",
  keywords: ["CRM", "formations", "e-commerce", "solutions digitales", "NovaCore", "DL Style"],
  authors: [{ name: "DL Solutions" }],
  creator: "DL Solutions",
  publisher: "DL Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dl-solutions.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://dl-solutions.fr",
    siteName: "DL Solutions",
    title: "DL Solutions - Votre Partenaire Digital",
    description: "Solutions digitales innovantes pour votre entreprise",
    images: [
      {
        url: "/images/dl-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DL Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DL Solutions - Votre Partenaire Digital",
    description: "Solutions digitales innovantes pour votre entreprise",
    images: ["/images/dl-logo.jpg"],
    creator: "@dlsolutions",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
