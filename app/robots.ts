import { MetadataRoute } from 'next';

// Configuration pour l'export statique
export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '*.json',
          '*.xml'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/'
        ]
      }
    ],
    sitemap: 'https://dlsolutions.com/sitemap.xml',
    host: 'https://dlsolutions.com'
  }
}
