
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { themeprovider as Themeprovider } from "@/components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAVY Trading Platform",
  description: "Plateforme de trading avancée avec IA",
  keywords: ["trading", "ai", "finance", "investissement", "algorithmes"],
  authors: [{ name: "DAVY Trading Team" }],
  creator: "DAVY Trading Team",
  publisher: "DAVY Trading",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://davy-trading.com",
    title: "DAVY Trading Platform",
    description: "Plateforme de trading avancée avec IA",
    siteName: "DAVY Trading Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAVY Trading Platform",
    description: "Plateforme de trading avancée avec IA",
    creator: "@davytrading",
  },
  verification: {
    google: "Yscfg62X5Ck6I19r0YrpRhHW_jIuJZvacv9JQq0bdcc"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <head>
          <meta name="msvalidate.01" content="C236FBA72D7A305CAF1A05F7904E8122" />
        </head>
        <body className={inter.className}>
          <Themeprovider>
            {children}
            <Toaster />
          </Themeprovider>
        </body>
      </html>
    </ClerkProvider>
  );
} 