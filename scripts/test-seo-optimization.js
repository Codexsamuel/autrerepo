#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔍 Test d\'Optimisation SEO - DL Solutions');
console.log('==========================================\n');

// Configuration
const SITE_URL = 'https://dlsolutions.com';
const TEST_PAGES = [
  '/',
  '/portfolio',
  '/portfolio/batobaye',
  '/services',
  '/marketing-digital',
  '/e-commerce',
  '/contact'
];

// Tests SEO à effectuer
const SEO_TESTS = {
  // Test des balises meta
  metaTags: {
    title: 'Titre de la page',
    description: 'Description de la page',
    keywords: 'Mots-clés',
    robots: 'Instructions pour les robots',
    canonical: 'URL canonique',
    ogTags: 'Balises Open Graph',
    twitterTags: 'Balises Twitter Card'
  },
  
  // Test des données structurées
  structuredData: {
    organization: 'Données structurées Organisation',
    website: 'Données structurées Site Web',
    breadcrumb: 'Données structurées Fil d\'Ariane',
    article: 'Données structurées Article',
    product: 'Données structurées Produit'
  },
  
  // Test des performances
  performance: {
    loadTime: 'Temps de chargement',
    imageOptimization: 'Optimisation des images',
    fontLoading: 'Chargement des polices',
    cssOptimization: 'Optimisation CSS',
    jsOptimization: 'Optimisation JavaScript'
  },
  
  // Test de l'accessibilité
  accessibility: {
    altTags: 'Balises alt sur les images',
    headingStructure: 'Structure des titres',
    colorContrast: 'Contraste des couleurs',
    keyboardNavigation: 'Navigation au clavier',
    screenReader: 'Compatibilité lecteur d\'écran'
  },
  
  // Test du contenu
  content: {
    keywordDensity: 'Densité des mots-clés',
    contentLength: 'Longueur du contenu',
    internalLinks: 'Liens internes',
    externalLinks: 'Liens externes',
    imageCount: 'Nombre d\'images'
  }
};

// Fonction pour faire une requête HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'DL-Solutions-SEO-Tester/1.0'
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// Fonction pour analyser les balises meta
function analyzeMetaTags(html) {
  const results = {
    title: null,
    description: null,
    keywords: null,
    robots: null,
    canonical: null,
    ogTags: [],
    twitterTags: []
  };
  
  // Titre
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    results.title = titleMatch[1].trim();
  }
  
  // Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (descMatch) {
    results.description = descMatch[1].trim();
  }
  
  // Mots-clés
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (keywordsMatch) {
    results.keywords = keywordsMatch[1].trim();
  }
  
  // Robots
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (robotsMatch) {
    results.robots = robotsMatch[1].trim();
  }
  
  // Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (canonicalMatch) {
    results.canonical = canonicalMatch[1].trim();
  }
  
  // Open Graph tags
  const ogMatches = html.match(/<meta[^>]*property=["']og:[^"']+["'][^>]*>/gi);
  if (ogMatches) {
    results.ogTags = ogMatches;
  }
  
  // Twitter Card tags
  const twitterMatches = html.match(/<meta[^>]*name=["']twitter:[^"']+["'][^>]*>/gi);
  if (twitterMatches) {
    results.twitterTags = twitterMatches;
  }
  
  return results;
}

// Fonction pour analyser les données structurées
function analyzeStructuredData(html) {
  const results = {
    organization: false,
    website: false,
    breadcrumb: false,
    article: false,
    product: false,
    total: 0
  };
  
  // Compter les données structurées
  const structuredDataMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi);
  if (structuredDataMatches) {
    results.total = structuredDataMatches.length;
  }
  
  // Vérifier les types spécifiques
  if (html.includes('"@type": "Organization"')) {
    results.organization = true;
  }
  
  if (html.includes('"@type": "WebSite"')) {
    results.website = true;
  }
  
  if (html.includes('"@type": "BreadcrumbList"')) {
    results.breadcrumb = true;
  }
  
  if (html.includes('"@type": "Article"')) {
    results.article = true;
  }
  
  if (html.includes('"@type": "Product"')) {
    results.product = true;
  }
  
  return results;
}

// Fonction pour analyser les performances
function analyzePerformance(html, responseTime) {
  const results = {
    loadTime: responseTime,
    imageCount: 0,
    cssCount: 0,
    jsCount: 0,
    fontCount: 0
  };
  
  // Compter les images
  const imageMatches = html.match(/<img[^>]*>/gi);
  if (imageMatches) {
    results.imageCount = imageMatches.length;
  }
  
  // Compter les CSS
  const cssMatches = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi);
  if (cssMatches) {
    results.cssCount = cssMatches.length;
  }
  
  // Compter les JavaScript
  const jsMatches = html.match(/<script[^>]*src=["'][^"']+["'][^>]*>/gi);
  if (jsMatches) {
    results.jsCount = jsMatches.length;
  }
  
  // Compter les polices
  const fontMatches = html.match(/<link[^>]*rel=["']preload["'][^>]*as=["']font["'][^>]*>/gi);
  if (fontMatches) {
    results.fontCount = fontMatches.length;
  }
  
  return results;
}

// Fonction pour analyser l'accessibilité
function analyzeAccessibility(html) {
  const results = {
    altTags: 0,
    headingStructure: [],
    formLabels: 0,
    ariaLabels: 0
  };
  
  // Compter les balises alt
  const altMatches = html.match(/alt=["'][^"']*["']/gi);
  if (altMatches) {
    results.altTags = altMatches.length;
  }
  
  // Analyser la structure des titres
  const headingMatches = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi);
  if (headingMatches) {
    results.headingStructure = headingMatches.map(h => {
      const level = h.match(/<h([1-6])/i)[1];
      const text = h.replace(/<[^>]*>/g, '').trim();
      return { level, text };
    });
  }
  
  // Compter les labels de formulaire
  const labelMatches = html.match(/<label[^>]*>/gi);
  if (labelMatches) {
    results.formLabels = labelMatches.length;
  }
  
  // Compter les aria-labels
  const ariaMatches = html.match(/aria-label=["'][^"']*["']/gi);
  if (ariaMatches) {
    results.ariaLabels = ariaMatches.length;
  }
  
  return results;
}

// Fonction pour analyser le contenu
function analyzeContent(html, keywords) {
  const results = {
    contentLength: 0,
    keywordDensity: {},
    internalLinks: 0,
    externalLinks: 0,
    wordCount: 0
  };
  
  // Extraire le texte du contenu
  const textContent = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                         .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                         .replace(/<[^>]*>/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim();
  
  results.contentLength = textContent.length;
  results.wordCount = textContent.split(/\s+/).length;
  
  // Analyser la densité des mots-clés
  keywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = textContent.match(regex);
    if (matches) {
      results.keywordDensity[keyword] = {
        count: matches.length,
        density: (matches.length / results.wordCount * 100).toFixed(2) + '%'
      };
    }
  });
  
  // Compter les liens internes
  const internalLinkMatches = html.match(/href=["']\/[^"']*["']/gi);
  if (internalLinkMatches) {
    results.internalLinks = internalLinkMatches.length;
  }
  
  // Compter les liens externes
  const externalLinkMatches = html.match(/href=["']https?:\/\/[^"']*["']/gi);
  if (externalLinkMatches) {
    results.externalLinks = externalLinkMatches.length;
  }
  
  return results;
}

// Fonction pour tester une page
async function testPage(pageUrl) {
  const fullUrl = SITE_URL + pageUrl;
  console.log(`\n📄 Test de la page: ${pageUrl}`);
  console.log('─'.repeat(50));
  
  try {
    const startTime = Date.now();
    const response = await makeRequest(fullUrl);
    const loadTime = Date.now() - startTime;
    
    if (response.statusCode !== 200) {
      console.log(`❌ Erreur ${response.statusCode} pour ${pageUrl}`);
      return null;
    }
    
    const html = response.data;
    const keywords = ['Batobaye', 'DL Solutions', 'Davy', 'Lucie', 'marketplace', 'e-commerce', 'Cameroun'];
    
    // Analyser les différents aspects
    const metaAnalysis = analyzeMetaTags(html);
    const structuredDataAnalysis = analyzeStructuredData(html);
    const performanceAnalysis = analyzePerformance(html, loadTime);
    const accessibilityAnalysis = analyzeAccessibility(html);
    const contentAnalysis = analyzeContent(html, keywords);
    
    // Afficher les résultats
    console.log(`✅ Statut: ${response.statusCode}`);
    console.log(`⏱️ Temps de chargement: ${loadTime}ms`);
    
    // Meta tags
    console.log('\n📋 Balises Meta:');
    console.log(`   Titre: ${metaAnalysis.title ? '✅' : '❌'} ${metaAnalysis.title?.substring(0, 60)}...`);
    console.log(`   Description: ${metaAnalysis.description ? '✅' : '❌'} ${metaAnalysis.description?.substring(0, 60)}...`);
    console.log(`   Mots-clés: ${metaAnalysis.keywords ? '✅' : '❌'}`);
    console.log(`   Canonical: ${metaAnalysis.canonical ? '✅' : '❌'}`);
    console.log(`   Open Graph: ${metaAnalysis.ogTags.length} balises`);
    console.log(`   Twitter Card: ${metaAnalysis.twitterTags.length} balises`);
    
    // Données structurées
    console.log('\n🏗️ Données Structurées:');
    console.log(`   Total: ${structuredDataAnalysis.total} scripts`);
    console.log(`   Organisation: ${structuredDataAnalysis.organization ? '✅' : '❌'}`);
    console.log(`   Site Web: ${structuredDataAnalysis.website ? '✅' : '❌'}`);
    
    // Performance
    console.log('\n⚡ Performance:');
    console.log(`   Images: ${performanceAnalysis.imageCount}`);
    console.log(`   CSS: ${performanceAnalysis.cssCount}`);
    console.log(`   JavaScript: ${performanceAnalysis.jsCount}`);
    console.log(`   Polices: ${performanceAnalysis.fontCount}`);
    
    // Accessibilité
    console.log('\n♿ Accessibilité:');
    console.log(`   Balises alt: ${accessibilityAnalysis.altTags}`);
    console.log(`   Labels: ${accessibilityAnalysis.formLabels}`);
    console.log(`   Aria-labels: ${accessibilityAnalysis.ariaLabels}`);
    console.log(`   Titres: ${accessibilityAnalysis.headingStructure.length}`);
    
    // Contenu
    console.log('\n📝 Contenu:');
    console.log(`   Mots: ${contentAnalysis.wordCount}`);
    console.log(`   Liens internes: ${contentAnalysis.internalLinks}`);
    console.log(`   Liens externes: ${contentAnalysis.externalLinks}`);
    
    // Mots-clés
    console.log('\n🎯 Mots-clés:');
    Object.entries(contentAnalysis.keywordDensity).forEach(([keyword, data]) => {
      console.log(`   ${keyword}: ${data.count} fois (${data.density})`);
    });
    
    return {
      page: pageUrl,
      statusCode: response.statusCode,
      loadTime,
      metaAnalysis,
      structuredDataAnalysis,
      performanceAnalysis,
      accessibilityAnalysis,
      contentAnalysis
    };
    
  } catch (error) {
    console.log(`❌ Erreur pour ${pageUrl}: ${error.message}`);
    return null;
  }
}

// Fonction pour générer le rapport
function generateReport(results) {
  const validResults = results.filter(r => r !== null);
  
  console.log('\n📊 Rapport d\'Optimisation SEO');
  console.log('=============================');
  console.log(`Pages testées: ${validResults.length}/${TEST_PAGES.length}`);
  
  // Statistiques globales
  const avgLoadTime = validResults.reduce((sum, r) => sum + r.loadTime, 0) / validResults.length;
  const totalStructuredData = validResults.reduce((sum, r) => sum + r.structuredDataAnalysis.total, 0);
  const totalKeywords = validResults.reduce((sum, r) => sum + Object.keys(r.contentAnalysis.keywordDensity).length, 0);
  
  console.log(`\n📈 Statistiques Globales:`);
  console.log(`   Temps de chargement moyen: ${avgLoadTime.toFixed(0)}ms`);
  console.log(`   Données structurées totales: ${totalStructuredData}`);
  console.log(`   Mots-clés détectés: ${totalKeywords}`);
  
  // Recommandations
  console.log(`\n💡 Recommandations:`);
  
  const slowPages = validResults.filter(r => r.loadTime > 3000);
  if (slowPages.length > 0) {
    console.log(`   ⚠️ Pages lentes (${slowPages.length}):`);
    slowPages.forEach(page => {
      console.log(`      - ${page.page}: ${page.loadTime}ms`);
    });
  }
  
  const pagesWithoutStructuredData = validResults.filter(r => r.structuredDataAnalysis.total === 0);
  if (pagesWithoutStructuredData.length > 0) {
    console.log(`   ⚠️ Pages sans données structurées (${pagesWithoutStructuredData.length}):`);
    pagesWithoutStructuredData.forEach(page => {
      console.log(`      - ${page.page}`);
    });
  }
  
  const pagesWithoutMeta = validResults.filter(r => !r.metaAnalysis.description);
  if (pagesWithoutMeta.length > 0) {
    console.log(`   ⚠️ Pages sans description (${pagesWithoutMeta.length}):`);
    pagesWithoutMeta.forEach(page => {
      console.log(`      - ${page.page}`);
    });
  }
  
  // Sauvegarder le rapport
  const report = {
    date: new Date().toISOString(),
    siteUrl: SITE_URL,
    results: validResults,
    summary: {
      totalPages: validResults.length,
      avgLoadTime,
      totalStructuredData,
      totalKeywords
    }
  };
  
  const reportPath = path.join('public/seo', 'seo-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📁 Rapport sauvegardé: ${reportPath}`);
  console.log('\n✅ Test SEO terminé !');
}

// Fonction principale
async function runSEOTests() {
  console.log('🚀 Démarrage des tests SEO...\n');
  
  const results = [];
  
  for (const page of TEST_PAGES) {
    const result = await testPage(page);
    results.push(result);
    
    // Pause entre les tests
    if (page !== TEST_PAGES[TEST_PAGES.length - 1]) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Générer le rapport
  generateReport(results);
}

// Gestion des arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node test-seo-optimization.js [options]\n');
  console.log('Options:');
  console.log('  --help, -h     Afficher cette aide');
  console.log('  --page <url>   Tester une page spécifique\n');
  console.log('Exemples:');
  console.log('  node test-seo-optimization.js');
  console.log('  node test-seo-optimization.js --page /portfolio/batobaye');
} else if (args.includes('--page')) {
  const pageIndex = args.indexOf('--page');
  const pageUrl = args[pageIndex + 1];
  if (pageUrl) {
    testPage(pageUrl);
  } else {
    console.log('❌ URL de page manquante');
  }
} else {
  runSEOTests();
} 