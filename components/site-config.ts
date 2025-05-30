export const siteConfig = {
  name: "DL Solutions",
  description: "Digital solutions for your business",
  url: "https://dl-solutions.fr",
  ogImage: "/images/dl-logo.jpg",
  links: {
    twitter: "https://twitter.com/dlsolutions",
    github: "https://github.com/dlsolutions",
    linkedin: "https://linkedin.com/company/dlsolutions",
  },
  contact: {
    email: "contact@dl-solutions.fr",
    phone: "+33 1 23 45 67 89",
    address: "123 Avenue des Champs-Elysees, 75008 Paris, France",
  },
  services: [
    {
      id: "novacore",
      name: "NovaCore CRM",
      description: "Solution CRM complete avec IA integree",
      icon: "database",
      url: "/novacore",
    },
    {
      id: "formations",
      name: "Formations",
      description: "Formations professionnelles certifiantes",
      icon: "graduation-cap",
      url: "/formations",
    },
    {
      id: "dl-style",
      name: "DL Style",
      description: "Plateforme e-commerce moderne",
      icon: "shopping-cart",
      url: "/dl-style",
    },
    {
      id: "dl-travel",
      name: "DL Travel",
      description: "Agence de voyage en ligne",
      icon: "plane",
      url: "/dl-travel",
    },
  ],
  navigation: [
    {
      title: "Accueil",
      href: "/",
    },
    {
      title: "A propos",
      href: "/a-propos",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Formations",
      href: "/formations",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
}

export type SiteConfig = typeof siteConfig
