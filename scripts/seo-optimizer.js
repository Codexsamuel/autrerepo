#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Optimisation SEO - Mots-clés Batobaye & Marketplace');
console.log('=====================================================\n');

// Mots-clés principaux pour Batobaye et marketplace
const SEO_KEYWORDS = {
  primary: [
    'Batobaye',
    'Batobaye Market',
    'Batobaye E-commerce',
    'marketplace',
    'vente en ligne',
    'e-commerce',
    'boutique en ligne',
    'commerce électronique',
    'plateforme de vente',
    'DL Solutions',
    'Davy',
    'Lucie',
    'Dave and Luce',
    'marketing digital'
  ],
  
  location: [
    'Cameroun',
    'Yaoundé',
    'Douala',
    'Afrique',
    'Afrique Centrale'
  ],
  
  features: [
    'dashboard admin',
    'gestion produits',
    'inventaire en ligne',
    'analytics e-commerce',
    'IA e-commerce',
    'OpenAI e-commerce',
    'Sage Compta',
    'intégration ERP',
    'paiement CinetPay',
    'livraison Cameroun',
    'checkout sécurisé',
    'panier d\'achat',
    'catalogue produits',
    'gestion des commandes'
  ],
  
  technical: [
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Prisma ORM',
    'Tailwind CSS',
    'Vercel',
    'développement web',
    'application web',
    'site web'
  ],
  
  business: [
    'solution e-commerce',
    'plateforme marketplace',
    'système de vente',
    'gestion boutique',
    'automatisation',
    'optimisation',
    'performance',
    'sécurité',
    'scalabilité'
  ]
};

// Générer les combinaisons de mots-clés
function generateKeywordCombinations() {
  const combinations = [];
  
  // Combinaisons primaires
  SEO_KEYWORDS.primary.forEach(primary => {
    SEO_KEYWORDS.location.forEach(location => {
      combinations.push(`${primary} ${location}`);
    });
  });
  
  // Combinaisons avec fonctionnalités
  SEO_KEYWORDS.primary.forEach(primary => {
    SEO_KEYWORDS.features.forEach(feature => {
      combinations.push(`${primary} ${feature}`);
    });
  });
  
  // Combinaisons business
  SEO_KEYWORDS.primary.forEach(primary => {
    SEO_KEYWORDS.business.forEach(business => {
      combinations.push(`${primary} ${business}`);
    });
  });
  
  // Combinaisons longues
  combinations.push('Batobaye marketplace Cameroun');
  combinations.push('Batobaye e-commerce Cameroun');
  combinations.push('Batobaye boutique en ligne Cameroun');
  combinations.push('Batobaye vente en ligne Cameroun');
  combinations.push('DL Solutions Batobaye marketplace');
  combinations.push('DL Solutions e-commerce Cameroun');
  combinations.push('Davy Lucie Batobaye marketplace');
  combinations.push('Dave and Luce e-commerce Cameroun');
  combinations.push('marketplace Cameroun Batobaye');
  combinations.push('e-commerce Cameroun Batobaye');
  combinations.push('boutique en ligne Cameroun Batobaye');
  combinations.push('vente en ligne Cameroun Batobaye');
  combinations.push('plateforme de vente Cameroun Batobaye');
  combinations.push('commerce électronique Cameroun Batobaye');
  
  return [...new Set(combinations)]; // Supprimer les doublons
}

// Générer les métadonnées SEO
function generateSEOMetadata() {
  const keywords = generateKeywordCombinations();
  
  return {
    title: 'Batobaye Marketplace - Plateforme E-commerce Complète | DL Solutions Davy & Lucie',
    description: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay. Solution marketplace moderne au Cameroun.',
    keywords: keywords.join(', '),
    ogTitle: 'Batobaye Marketplace - Plateforme E-commerce Complète',
    ogDescription: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay.',
    twitterTitle: 'Batobaye Marketplace - Plateforme E-commerce Complète',
    twitterDescription: 'Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay.',
    canonical: 'https://dlsolutions.com/portfolio/batobaye',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Batobaye Marketplace',
      description: 'Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay',
      url: 'https://dlsolutions.com/portfolio/batobaye',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      author: {
        '@type': 'Organization',
        name: 'DL Solutions',
        url: 'https://dlsolutions.com'
      },
      creator: {
        '@type': 'Person',
        name: 'Davy & Lucie',
        url: 'https://dlsolutions.com'
      },
      datePublished: '2024-12-01',
      softwareVersion: '2.0.0',
      downloadUrl: 'https://github.com/Codexsamuel/batobaye',
      installUrl: 'https://dlsolutions.com/portfolio/batobaye',
      featureList: [
        'Catalogue produits avec filtres avancés',
        'Panier d\'achat persistant',
        'Checkout sécurisé CinetPay',
        'Dashboard admin VIP',
        'Intégration IA OpenAI',
        'Analytics en temps réel',
        'Gestion des commandes',
        'Intégration Sage Compta'
      ]
    }
  };
}

// Générer le sitemap XML
function generateSitemapXML() {
  const baseUrl = 'https://dlsolutions.com';
  const currentDate = new Date().toISOString();
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/portfolio/batobaye', priority: '0.9', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/a-propos', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/dl-style', priority: '0.9', changefreq: 'daily' },
    { url: '/novaworld', priority: '0.9', changefreq: 'daily' },
    { url: '/novacore', priority: '0.9', changefreq: 'weekly' },
    { url: '/marketing-digital', priority: '0.85', changefreq: 'weekly' },
    { url: '/e-commerce', priority: '0.9', changefreq: 'weekly' },
    { url: '/formations', priority: '0.7', changefreq: 'monthly' },
    { url: '/capacites-techniques', priority: '0.5', changefreq: 'monthly' },
    { url: '/devis', priority: '0.6', changefreq: 'weekly' },
    { url: '/rendez-vous', priority: '0.6', changefreq: 'weekly' }
  ];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
}

// Générer le robots.txt
function generateRobotsTXT() {
  const baseUrl = 'https://dlsolutions.com';
  
  return `User-agent: *
Allow: /
Allow: /portfolio
Allow: /portfolio/batobaye
Allow: /services
Allow: /a-propos
Allow: /contact
Allow: /dl-style
Allow: /novaworld
Allow: /novacore
Allow: /marketing-digital
Allow: /e-commerce
Allow: /formations
Allow: /capacites-techniques
Allow: /devis
Allow: /rendez-vous

Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /temp/

User-agent: Googlebot
Allow: /
Allow: /portfolio
Allow: /portfolio/batobaye
Allow: /services
Allow: /a-propos
Allow: /contact
Allow: /dl-style
Allow: /novaworld
Allow: /novacore
Allow: /marketing-digital
Allow: /e-commerce
Allow: /formations
Allow: /capacites-techniques
Allow: /devis
Allow: /rendez-vous

Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /temp/

Crawl-delay: 1

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}`;
}

// Fonction principale
function optimizeSEO() {
  console.log('📝 Génération des mots-clés SEO...');
  const keywords = generateKeywordCombinations();
  console.log(`✅ ${keywords.length} mots-clés générés\n`);
  
  console.log('🔧 Génération des métadonnées SEO...');
  const metadata = generateSEOMetadata();
  console.log('✅ Métadonnées générées\n');
  
  console.log('🗺️ Génération du sitemap XML...');
  const sitemap = generateSitemapXML();
  console.log('✅ Sitemap XML généré\n');
  
  console.log('🤖 Génération du robots.txt...');
  const robots = generateRobotsTXT();
  console.log('✅ Robots.txt généré\n');
  
  // Sauvegarder les fichiers
  const outputDir = 'public/seo';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Sauvegarder les mots-clés
  fs.writeFileSync(
    path.join(outputDir, 'keywords.json'),
    JSON.stringify({ keywords, metadata }, null, 2)
  );
  
  // Sauvegarder le sitemap
  fs.writeFileSync(
    path.join(outputDir, 'sitemap.xml'),
    sitemap
  );
  
  // Sauvegarder le robots.txt
  fs.writeFileSync(
    path.join(outputDir, 'robots.txt'),
    robots
  );
  
  console.log('📊 Statistiques SEO:');
  console.log(`   - Mots-clés générés: ${keywords.length}`);
  console.log(`   - Pages dans le sitemap: 15`);
  console.log(`   - Métadonnées optimisées: ✅`);
  console.log(`   - Structured data: ✅`);
  console.log(`   - Robots.txt: ✅`);
  console.log(`   - Sitemap XML: ✅\n`);
  
  console.log('🎯 Mots-clés principaux pour Batobaye:');
  console.log('   - Batobaye marketplace Cameroun');
  console.log('   - Batobaye e-commerce Cameroun');
  console.log('   - Batobaye boutique en ligne Cameroun');
  console.log('   - Batobaye vente en ligne Cameroun');
  console.log('   - DL Solutions Batobaye marketplace');
  console.log('   - Davy Lucie Batobaye marketplace\n');
  
  console.log('📁 Fichiers générés dans public/seo/:');
  console.log('   - keywords.json (mots-clés et métadonnées)');
  console.log('   - sitemap.xml (sitemap optimisé)');
  console.log('   - robots.txt (robots optimisé)\n');
  
  console.log('🚀 Optimisation SEO terminée !');
  console.log('💡 Prochaines étapes:');
  console.log('   1. Soumettre le sitemap à Google Search Console');
  console.log('   2. Vérifier l\'indexation avec Google Search');
  console.log('   3. Surveiller les performances SEO');
  console.log('   4. Optimiser régulièrement le contenu');
}

// Exécuter l'optimisation
optimizeSEO(); 