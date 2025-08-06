import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://daveandlucesolutions.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/portfolio',
          '/portfolio/batobaye',
          '/services',
          '/a-propos',
          '/contact',
          '/dl-style',
          '/novaworld',
          '/novacore',
          '/marketing-digital',
          '/e-commerce',
          '/formations',
          '/capacites-techniques',
          '/devis',
          '/rendez-vous'
        ],
        disallow: [
          '/admin',
          '/api/',
          '/_next/',
          '/private/',
          '/temp/',
          '*.json',
          '*.xml'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/portfolio',
          '/portfolio/batobaye',
          '/services',
          '/a-propos',
          '/contact',
          '/dl-style',
          '/novaworld',
          '/novacore',
          '/marketing-digital',
          '/e-commerce',
          '/formations',
          '/capacites-techniques',
          '/devis',
          '/rendez-vous'
        ],
        disallow: [
          '/admin',
          '/api/',
          '/_next/',
          '/private/',
          '/temp/'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/portfolio',
          '/portfolio/batobaye',
          '/services',
          '/a-propos',
          '/contact',
          '/dl-style',
          '/novaworld',
          '/novacore',
          '/marketing-digital',
          '/e-commerce',
          '/formations',
          '/capacites-techniques',
          '/devis',
          '/rendez-vous'
        ],
        disallow: [
          '/admin',
          '/api/',
          '/_next/',
          '/private/',
          '/temp/'
        ],
        crawlDelay: 1,
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
