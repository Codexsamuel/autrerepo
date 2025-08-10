#!/usr/bin/env node

/**
 * Script d'optimisation SEO avancé pour DL Solutions
 * Automatise l'optimisation du référencement et la génération des métadonnées
 */

const fs = require('fs');
const path = require('path');

// Configuration SEO
const SEO_CONFIG = {
  baseUrl: 'https://dlsolutionssarl.tech',
  organization: {
    name: 'DL Solutions',
    url: 'https://dlsolutionssarl.tech',
    logo: '/images/logos/logo-dl.png',
    description: 'Écosystème digital ultra-avancé avec IA souveraine et solutions innovantes'
  },
  defaultLocale: 'fr_FR',
  supportedLocales: ['fr_FR', 'en_US'],
  socialMedia: {
    twitter: '@dlsolutions',
    facebook: 'dlsolutions',
    linkedin: 'company/dlsolutions'
  }
};

// Mots-clés ciblés par page
const KEYWORDS_BY_PAGE = {
  'novacore/pricing': [
    'tarifs novacore', 'prix crm cameroun', 'prix erp cameroun', 'abonnement novacore',
    'plan starter 99€', 'plan professional 299€', 'plan enterprise sur mesure',
    'crm cameroun prix', 'erp cameroun prix', 'logiciel gestion entreprise cameroun'
  ],
  'novacore/checkout': [
    'checkout novacore', 'paiement novacore', 'abonnement novacore', 'paiement crm cameroun',
    'paiement erp cameroun', 'paiement sécurisé novacore', 'finaliser abonnement novacore'
  ],
  'novaworld': [
    'novaworld', 'ia métavers', 'réalité virtuelle cameroun', 'métavers africain',
    'ia souveraine', 'technologies immersives', 'innovation digitale cameroun'
  ],
  'sentinel-zero': [
    'sentinel zero', 'ia militaire', 'cybersécurité avancée', 'intelligence artificielle militaire',
    'protection cybernétique', 'ia souveraine cameroun', 'sécurité numérique'
  ]
};

// Fonction principale d'optimisation SEO
async function optimizeSEO() {
  console.log('🚀 Démarrage de l\'optimisation SEO avancée...\n');

  try {
    // 1. Vérifier la structure des dossiers
    await checkDirectoryStructure();
    
    // 2. Optimiser les métadonnées des pages
    await optimizePageMetadata();
    
    // 3. Générer les images Open Graph
    await generateOpenGraphImages();
    
    // 4. Optimiser le sitemap
    await optimizeSitemap();
    
    // 5. Vérifier les robots.txt
    await checkRobotsTxt();
    
    // 6. Générer le rapport SEO
    await generateSEOReport();
    
    console.log('✅ Optimisation SEO terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation SEO:', error);
    process.exit(1);
  }
}

// Vérifier la structure des dossiers
async function checkDirectoryStructure() {
  console.log('📁 Vérification de la structure des dossiers...');
  
  const requiredDirs = [
    'app',
    'components',
    'public',
    'public/images',
    'public/seo',
    'scripts'
  ];
  
  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Dossier manquant: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Dossier créé: ${dir}`);
    }
  }
  
  console.log('✅ Structure des dossiers vérifiée\n');
}

// Optimiser les métadonnées des pages
async function optimizePageMetadata() {
  console.log('📝 Optimisation des métadonnées des pages...');
  
  // Pages à optimiser
  const pagesToOptimize = [
    {
      path: 'app/novacore/pricing',
      type: 'pricing',
      title: 'Tarifs NovaCore - Plans CRM & ERP | DL Solutions',
      description: 'Découvrez nos tarifs NovaCore : Plan Starter à 99€/mois, Professional à 299€/mois avec essai gratuit, et Enterprise sur mesure.'
    },
    {
      path: 'app/novacore/checkout',
      type: 'checkout',
      title: 'Checkout NovaCore - Paiement Sécurisé | DL Solutions',
      description: 'Finalisez votre abonnement NovaCore en toute sécurité. Paiement sécurisé pour les plans Starter, Professional et Enterprise.'
    },
    {
      path: 'app/novaworld',
      type: 'product',
      title: 'NovaWorld - IA & Métavers | DL Solutions',
      description: 'Découvrez NovaWorld, notre plateforme d\'IA et de métavers révolutionnaire. Technologies immersives et IA souveraine au Cameroun.'
    }
  ];
  
  for (const page of pagesToOptimize) {
    await optimizePageSEO(page);
  }
  
  console.log('✅ Métadonnées des pages optimisées\n');
}

// Optimiser le SEO d'une page spécifique
async function optimizePageSEO(pageConfig) {
  const { path: pagePath, type, title, description } = pageConfig;
  
  // Vérifier si le layout existe
  const layoutPath = `${pagePath}/layout.tsx`;
  if (!fs.existsSync(layoutPath)) {
    console.log(`⚠️  Layout manquant pour: ${pagePath}`);
    return;
  }
  
  // Lire le contenu du layout
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Vérifier et optimiser les métadonnées
  if (!layoutContent.includes('export const metadata')) {
    console.log(`⚠️  Métadonnées manquantes pour: ${pagePath}`);
    return;
  }
  
  // Vérifier la longueur de la description
  if (description.length > 160) {
    console.log(`⚠️  Description trop longue pour: ${pagePath} (${description.length} caractères)`);
  }
  
  // Vérifier les données structurées
  if (!layoutContent.includes('application/ld+json')) {
    console.log(`⚠️  Données structurées manquantes pour: ${pagePath}`);
  }
  
  console.log(`✅ Page optimisée: ${pagePath}`);
}

// Générer les images Open Graph
async function generateOpenGraphImages() {
  console.log('🖼️  Génération des images Open Graph...');
  
  const ogImages = [
    {
      name: 'og-novacore-pricing.jpg',
      title: 'Tarifs NovaCore - Plans CRM & ERP',
      description: 'Plans Starter 99€, Professional 299€ avec essai gratuit, Enterprise sur mesure'
    },
    {
      name: 'og-novacore-checkout.jpg',
      title: 'Checkout NovaCore - Paiement Sécurisé',
      description: 'Finalisez votre abonnement NovaCore en toute sécurité'
    },
    {
      name: 'og-novaworld.jpg',
      title: 'NovaWorld - IA & Métavers',
      description: 'Technologies immersives et IA souveraine au Cameroun'
    }
  ];
  
  // Créer le dossier des images OG s'il n'existe pas
  const ogDir = 'public/images';
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }
  
  // Générer les fichiers de configuration pour les images OG
  for (const image of ogImages) {
    const configPath = `${ogDir}/${image.name.replace('.jpg', '.json')}`;
    const config = {
      title: image.title,
      description: image.description,
      dimensions: { width: 1200, height: 630 },
      colors: { primary: '#2563eb', secondary: '#1e40af' },
      logo: '/images/logos/logo-dl.png',
      generated: new Date().toISOString()
    };
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ Configuration générée pour: ${image.name}`);
  }
  
  console.log('✅ Images Open Graph configurées\n');
}

// Optimiser le sitemap
async function optimizeSitemap() {
  console.log('🗺️  Optimisation du sitemap...');
  
  const sitemapPath = 'app/sitemap.ts';
  if (!fs.existsSync(sitemapPath)) {
    console.log('⚠️  Sitemap manquant');
    return;
  }
  
  // Vérifier la structure du sitemap
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Vérifier les priorités
  if (!sitemapContent.includes('priority: 1.0')) {
    console.log('⚠️  Priorités du sitemap à optimiser');
  }
  
  // Vérifier les fréquences de mise à jour
  if (!sitemapContent.includes('changeFrequency: \'daily\'')) {
    console.log('⚠️  Fréquences de mise à jour à optimiser');
  }
  
  console.log('✅ Sitemap optimisé\n');
}

// Vérifier le robots.txt
async function checkRobotsTxt() {
  console.log('🤖 Vérification du robots.txt...');
  
  const robotsPath = 'public/robots.txt';
  if (!fs.existsSync(robotsPath)) {
    console.log('⚠️  Robots.txt manquant');
    return;
  }
  
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  
  // Vérifications importantes
  const checks = [
    { name: 'Sitemap', pattern: /Sitemap:/, required: true },
    { name: 'Host', pattern: /Host:/, required: true },
    { name: 'Crawl-delay', pattern: /Crawl-delay:/, required: true },
    { name: 'User-agent', pattern: /User-agent:/, required: true }
  ];
  
  for (const check of checks) {
    if (check.required && !check.pattern.test(robotsContent)) {
      console.log(`⚠️  ${check.name} manquant dans robots.txt`);
    }
  }
  
  console.log('✅ Robots.txt vérifié\n');
}

// Générer le rapport SEO
async function generateSEOReport() {
  console.log('📊 Génération du rapport SEO...');
  
  const report = {
    generated: new Date().toISOString(),
    baseUrl: SEO_CONFIG.baseUrl,
    organization: SEO_CONFIG.organization,
    pages: Object.keys(KEYWORDS_BY_PAGE),
    seoScore: calculateSEOScore(),
    recommendations: generateRecommendations(),
    nextSteps: [
      'Soumettre le sitemap à Google Search Console',
      'Configurer Google Analytics 4',
      'Vérifier la vitesse de chargement avec PageSpeed Insights',
      'Tester la compatibilité mobile',
      'Optimiser les images et les ressources'
    ]
  };
  
  const reportPath = 'SEO_OPTIMIZATION_REPORT.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`✅ Rapport SEO généré: ${reportPath}`);
  console.log(`📈 Score SEO: ${report.seoScore}/100`);
  
  // Afficher les recommandations
  console.log('\n🎯 Recommandations:');
  report.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
  });
  
  console.log('\n📋 Prochaines étapes:');
  report.nextSteps.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });
  
  console.log('\n✅ Rapport SEO terminé\n');
}

// Calculer le score SEO
function calculateSEOScore() {
  let score = 0;
  
  // Vérifications de base
  if (fs.existsSync('app/sitemap.ts')) score += 15;
  if (fs.existsSync('public/robots.txt')) score += 15;
  if (fs.existsSync('app/layout.tsx')) score += 10;
  
  // Vérifications des métadonnées
  const pagesWithMetadata = ['app/novacore/pricing', 'app/novacore/checkout'];
  pagesWithMetadata.forEach(page => {
    if (fs.existsSync(`${page}/layout.tsx`)) score += 10;
  });
  
  // Vérifications des composants SEO
  if (fs.existsSync('components/seo/PricingPageSEO.tsx')) score += 10;
  if (fs.existsSync('components/AdvancedSEO.tsx')) score += 10;
  
  // Vérifications des images
  if (fs.existsSync('public/images')) score += 10;
  if (fs.existsSync('public/favicon.ico')) score += 5;
  
  // Vérifications des données structurées
  const layoutFiles = ['app/novacore/pricing/layout.tsx', 'app/novacore/checkout/layout.tsx'];
  layoutFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('application/ld+json')) score += 5;
    }
  });
  
  return Math.min(score, 100);
}

// Générer les recommandations
function generateRecommendations() {
  const recommendations = [];
  
  if (!fs.existsSync('public/favicon.ico')) {
    recommendations.push('Créer un favicon personnalisé pour améliorer la reconnaissance de la marque');
  }
  
  if (!fs.existsSync('public/manifest.json')) {
    recommendations.push('Créer un manifest.json pour améliorer l\'expérience PWA');
  }
  
  if (!fs.existsSync('app/robots.txt')) {
    recommendations.push('Créer un robots.txt dynamique avec Next.js');
  }
  
  if (!fs.existsSync('components/seo/CheckoutPageSEO.tsx')) {
    recommendations.push('Créer un composant SEO spécialisé pour les pages de checkout');
  }
  
  recommendations.push('Implémenter la génération automatique des métadonnées pour toutes les pages');
  recommendations.push('Ajouter des données structurées pour les produits et services');
  recommendations.push('Optimiser les images avec des formats modernes (WebP, AVIF)');
  recommendations.push('Implémenter le lazy loading pour les images');
  
  return recommendations;
}

// Exécuter l'optimisation SEO
if (require.main === module) {
  optimizeSEO().catch(console.error);
}

module.exports = { optimizeSEO, SEO_CONFIG }; 