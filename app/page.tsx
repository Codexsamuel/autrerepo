import type { Metadata } from "next"
import ClientHomepage from "@/components/client-homepage"

export const metadata: Metadata = {
  title: "DL Solutions - Votre Partenaire Digital",
  description: "Solutions digitales innovantes pour votre entreprise. CRM, formations, e-commerce et plus encore.",
  keywords: "CRM, formations, e-commerce, solutions digitales, NovaCore, DL Style",
  openGraph: {
    title: "DL Solutions - Votre Partenaire Digital",
    description: "Solutions digitales innovantes pour votre entreprise",
    url: "https://dl-solutions.fr",
    siteName: "DL Solutions",
    images: [
      {
        url: "/images/dl-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DL Solutions Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DL Solutions - Votre Partenaire Digital",
    description: "Solutions digitales innovantes pour votre entreprise",
    images: ["/images/dl-logo.jpg"],
  },
}

export default function HomePage() {
  return <ClientHomepage />
}
