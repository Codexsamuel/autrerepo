import type { MetadataRoute } from "next"

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
