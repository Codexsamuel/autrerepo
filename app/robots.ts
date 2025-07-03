import type { MetadataRoute } from "next"

// Configuration pour l'export statique
export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/api/"],
    },
    sitemap: "https://www.daveandlucesolutions.com/sitemap.xml",
    host: "https://www.daveandlucesolutions.com",
  }
}
