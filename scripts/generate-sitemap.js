#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// ========================================
// CONFIGURATION SITEMAP
// ========================================

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://davytrading.com'
const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ko']

// Pages principales
const MAIN_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
]

// Pages de services
const SERVICE_PAGES = [
  { path: '/services/trading', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/crm', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/assurances', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/banque', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/immobilier', priority: '0.9', changefreq: 'weekly' },
]

// Pages NovaCore
const NOVACORE_PAGES = [
  { path: '/novacore', priority: '0.8', changefreq: 'weekly' },
  { path: '/novacore/formations', priority: '0.7', changefreq: 'weekly' },
  { path: '/novacore/rh', priority: '0.7', changefreq: 'weekly' },
  { path: '/novacore/admin', priority: '0.6', changefreq: 'daily' },
  { path: '/novacore/messagerie', priority: '0.7', changefreq: 'daily' },
  { path: '/novacore/calendrier', priority: '0.7', changefreq: 'daily' },
  { path: '/novacore/documents', priority: '0.7', changefreq: 'weekly' },
  { path: '/novacore/analytics', priority: '0.8', changefreq: 'daily' },
]

// Pages DL Style
const DL_STYLE_PAGES = [
  { path: '/dl-style', priority: '0.9', changefreq: 'daily' },
  { path: '/dl-style/products', priority: '0.8', changefreq: 'daily' },
  { path: '/dl-style/categories', priority: '0.7', changefreq: 'weekly' },
  { path: '/dl-style/brands', priority: '0.7', changefreq: 'weekly' },
  { path: '/dl-style/deals', priority: '0.8', changefreq: 'daily' },
]

// Pages dirigeants
const LEADERSHIP_PAGES = [
  { path: '/team/samuel-obam', priority: '0.8', changefreq: 'monthly' },
  { path: '/team/sabine-nga-lucie', priority: '0.8', changefreq: 'monthly' },
]

// Pages légales
const LEGAL_PAGES = [
  { path: '/legal/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/cookies', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/security', priority: '0.4', changefreq: 'yearly' },
]

// ========================================
// GÉNÉRATION SITEMAP
// ========================================

function generateSitemapXML() {
  const allPages = [
    ...MAIN_PAGES,
    ...SERVICE_PAGES,
    ...NOVACORE_PAGES,
    ...DL_STYLE_PAGES,
    ...LEADERSHIP_PAGES,
    ...LEGAL_PAGES
  ]

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`

  // Générer les URLs pour chaque langue
  SUPPORTED_LOCALES.forEach(locale => {
    allPages.forEach(page => {
      const url = locale === 'fr' ? page.path : `/${locale}${page.path}`
      const fullUrl = `${BASE_URL}${url}`
      
      sitemap += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`

      // Ajouter les alternatives linguistiques
      SUPPORTED_LOCALES.forEach(altLocale => {
        const altUrl = altLocale === 'fr' ? page.path : `/${altLocale}${page.path}`
        const altFullUrl = `${BASE_URL}${altUrl}`
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altFullUrl}"/>`
      })

      sitemap += `
  </url>`
    })
  })

  sitemap += `
</urlset>`

  return sitemap
}

// ========================================
// GÉNÉRATION SITEMAP IMAGES
// ========================================

function generateImageSitemap() {
  const images = [
    {
      url: `${BASE_URL}/images/dl-logo.jpg`,
      title: 'DAVY Trading Platform Logo',
      caption: 'Logo officiel de DAVY Trading Platform',
      geoLocation: 'Yaoundé, Cameroun',
      license: 'https://davytrading.com/legal/license'
    },
    {
      url: `${BASE_URL}/images/samuel-obam.jpg`,
      title: 'Samuel OBAM - Associé Gérant',
      caption: 'Samuel OBAM, Associé Gérant et Expert en Gestion et Optimisation du Parcours Client',
      geoLocation: 'Yaoundé, Cameroun'
    },
    {
      url: `${BASE_URL}/images/sabine-nga-lucie.jpg`,
      title: 'Sabine NGA Lucie - Associée',
      caption: 'Sabine NGA Lucie, Associée et Spécialiste de la Relation Client',
      geoLocation: 'Yaoundé, Cameroun'
    }
  ]

  let imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`

  images.forEach(image => {
    imageSitemap += `
  <url>
    <loc>${BASE_URL}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>`
    
    if (image.geoLocation) {
      imageSitemap += `
      <image:geo_location>${image.geoLocation}</image:geo_location>`
    }
    
    if (image.license) {
      imageSitemap += `
      <image:license>${image.license}</image:license>`
    }
    
    imageSitemap += `
    </image:image>
  </url>`
  })

  imageSitemap += `
</urlset>`

  return imageSitemap
}

// ========================================
// GÉNÉRATION SITEMAP NEWS
// ========================================

function generateNewsSitemap() {
  const news = [
    {
      title: 'DAVY Trading Platform Lancement Officiel',
      publication: {
        name: 'DAVY Trading Platform',
        language: 'fr'
      },
      publicationDate: '2025-01-01T00:00:00+00:00',
      title: 'Lancement officiel de la plateforme DAVY Trading',
      keywords: 'trading, plateforme, lancement, innovation, finance',
      stockTickers: 'DAVY'
    }
  ]

  let newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`

  news.forEach(item => {
    newsSitemap += `
  <url>
    <loc>${BASE_URL}/news/${item.title.toLowerCase().replace(/\s+/g, '-')}</loc>
    <news:news>
      <news:publication>
        <news:name>${item.publication.name}</news:name>
        <news:language>${item.publication.language}</news:language>
      </news:publication>
      <news:publication_date>${item.publicationDate}</news:publication_date>
      <news:title>${item.title}</news:title>
      <news:keywords>${item.keywords}</news:keywords>
      <news:stock_tickers>${item.stockTickers}</news:stock_tickers>
    </news:news>
  </url>`
  })

  newsSitemap += `
</urlset>`

  return newsSitemap
}

// ========================================
// GÉNÉRATION ROBOTS.TXT
// ========================================

function generateRobotsTxt() {
  return `# Robots.txt pour DAVY Trading Platform
# Généré automatiquement le ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-images.xml
Sitemap: ${BASE_URL}/sitemap-news.xml

# Pages sensibles à ne pas indexer
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Disallow: /temp/

# Autoriser les moteurs de recherche principaux
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Crawl-delay pour éviter de surcharger le serveur
Crawl-delay: 1

# Contact pour les questions sur le robots.txt
# Contact: webmaster@davytrading.com`
}

// ========================================
// ÉCRITURE DES FICHIERS
// ========================================

function writeFiles() {
  const publicDir = path.join(process.cwd(), 'public')
  
  // Créer le dossier public s'il n'existe pas
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Écrire sitemap.xml
  const sitemapXML = generateSitemapXML()
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML)
  console.log('✅ sitemap.xml généré')

  // Écrire sitemap-images.xml
  const imageSitemap = generateImageSitemap()
  fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), imageSitemap)
  console.log('✅ sitemap-images.xml généré')

  // Écrire sitemap-news.xml
  const newsSitemap = generateNewsSitemap()
  fs.writeFileSync(path.join(publicDir, 'sitemap-news.xml'), newsSitemap)
  console.log('✅ sitemap-news.xml généré')

  // Écrire robots.txt
  const robotsTxt = generateRobotsTxt()
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt)
  console.log('✅ robots.txt généré')

  // Écrire sitemap-index.xml
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-news.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`

  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex)
  console.log('✅ sitemap-index.xml généré')

  console.log('\n🎉 Tous les fichiers SEO ont été générés avec succès!')
  console.log(`📁 Fichiers créés dans: ${publicDir}`)
  console.log(`🌐 URL de base: ${BASE_URL}`)
  console.log(`🌍 Langues supportées: ${SUPPORTED_LOCALES.join(', ')}`)
}

// ========================================
// EXÉCUTION
// ========================================

if (require.main === module) {
  console.log('🚀 Génération des fichiers SEO pour DAVY Trading Platform...\n')
  writeFiles()
}

module.exports = {
  generateSitemapXML,
  generateImageSitemap,
  generateNewsSitemap,
  generateRobotsTxt,
  writeFiles
} 