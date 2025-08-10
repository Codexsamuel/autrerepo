export const defaultSEOConfig = {
  organization: {
    name: "DL Solutions",
    url: "https://dlsolutions.com",
    logo: "https://dlsolutions.com/logo.png",
    description: "Plateforme innovante de solutions technologiques et d'intelligence artificielle pour entreprises et particuliers",
    address: {
      street: "123 Rue de l'Innovation",
      city: "Paris",
      region: "Île-de-France",
      postalCode: "75001",
      country: "France"
    },
    contact: {
      phone: "+33 1 23 45 67 89",
      email: "contact@dlsolutions.com",
      fax: "+33 1 23 45 67 90"
    },
    social: {
      facebook: "https://facebook.com/dlsolutions",
      twitter: "https://twitter.com/dlsolutions",
      linkedin: "https://linkedin.com/company/dlsolutions",
      instagram: "https://instagram.com/dlsolutions",
      youtube: "https://youtube.com/dlsolutions"
    }
  },
  locale: "fr-FR",
  alternateLocales: ["en-US", "es-ES", "de-DE"],
  defaultKeywords: [
    "DL Solutions",
    "intelligence artificielle",
    "IA",
    "technologie",
    "innovation",
    "solutions digitales",
    "automatisation",
    "machine learning",
    "deep learning",
    "chatbot",
    "scraping",
    "analyse de données",
    "business intelligence",
    "transformation digitale",
    "consulting IT"
  ]
};

export const generateSEOProps = (
  title: string,
  description: string,
  keywords: string[] = [],
  path: string = "",
  ogImage: string = "/images/og-default.jpg",
  ogType: 'website' | 'article' | 'product' | 'profile' = 'website',
  article?: any,
  product?: any
) => ({
  title,
  description,
  keywords: [...defaultSEOConfig.defaultKeywords, ...keywords],
  canonicalUrl: `${defaultSEOConfig.organization.url}${path}`,
  ogImage: ogImage.startsWith('http') ? ogImage : `${defaultSEOConfig.organization.url}${ogImage}`,
  ogImageAlt: `${title} - ${defaultSEOConfig.organization.name}`,
  ogType,
  twitterCard: 'summary_large_image' as const,
  article,
  product,
  organization: defaultSEOConfig.organization,
  locale: defaultSEOConfig.locale,
  alternateLocales: defaultSEOConfig.alternateLocales
}); 