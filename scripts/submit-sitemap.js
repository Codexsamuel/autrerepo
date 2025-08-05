#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🗺️ Soumission du Sitemap aux Moteurs de Recherche');
console.log('================================================\n');

// Configuration
const SITE_URL = 'https://dlsolutions.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const GOOGLE_SEARCH_CONSOLE_URL = 'https://www.google.com/ping?sitemap=';

// Moteurs de recherche à notifier
const SEARCH_ENGINES = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  },
  {
    name: 'Yandex',
    url: `https://blogs.yandex.com/pings/?status=success&url=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  }
];

// Fonction pour faire une requête HTTPS
function makeRequest(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {
        'User-Agent': 'DL-Solutions-Sitemap-Submitter/1.0'
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

// Fonction pour soumettre le sitemap
async function submitSitemap(engine) {
  try {
    console.log(`📤 Soumission à ${engine.name}...`);
    
    const response = await makeRequest(engine.url, engine.method);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`✅ ${engine.name}: Sitemap soumis avec succès (${response.statusCode})`);
      return { success: true, engine: engine.name, statusCode: response.statusCode };
    } else {
      console.log(`⚠️ ${engine.name}: Erreur ${response.statusCode}`);
      return { success: false, engine: engine.name, statusCode: response.statusCode, error: response.data };
    }
  } catch (error) {
    console.log(`❌ ${engine.name}: Erreur - ${error.message}`);
    return { success: false, engine: engine.name, error: error.message };
  }
}

// Fonction pour générer le rapport
function generateReport(results) {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log('\n📊 Rapport de Soumission');
  console.log('========================');
  console.log(`✅ Réussis: ${successful.length}/${results.length}`);
  console.log(`❌ Échoués: ${failed.length}/${results.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ Soumissions réussies:');
    successful.forEach(result => {
      console.log(`   - ${result.engine} (${result.statusCode})`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Soumissions échouées:');
    failed.forEach(result => {
      console.log(`   - ${result.engine}: ${result.error || `Erreur ${result.statusCode}`}`);
    });
  }
  
  // Sauvegarder le rapport
  const report = {
    date: new Date().toISOString(),
    sitemapUrl: SITEMAP_URL,
    results: results,
    summary: {
      total: results.length,
      successful: successful.length,
      failed: failed.length
    }
  };
  
  const reportPath = path.join('public/seo', 'sitemap-submission-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📁 Rapport sauvegardé: ${reportPath}`);
}

// Fonction pour vérifier le sitemap
function validateSitemap() {
  const sitemapPath = path.join('public', 'seo', 'sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.log('❌ Sitemap non trouvé. Génération en cours...');
    // Exécuter le script de génération SEO
    const { execSync } = require('child_process');
    try {
      execSync('node scripts/seo-optimizer.js', { stdio: 'inherit' });
      console.log('✅ Sitemap généré avec succès');
    } catch (error) {
      console.log('❌ Erreur lors de la génération du sitemap');
      return false;
    }
  }
  
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Vérifications basiques
  const checks = [
    { name: 'Format XML', check: sitemapContent.includes('<?xml') },
    { name: 'URLs valides', check: sitemapContent.includes(SITE_URL) },
    { name: 'Page d\'accueil', check: sitemapContent.includes(`${SITE_URL}/`) },
    { name: 'Portfolio Batobaye', check: sitemapContent.includes(`${SITE_URL}/portfolio/batobaye`) },
    { name: 'Services', check: sitemapContent.includes(`${SITE_URL}/services`) }
  ];
  
  console.log('\n🔍 Validation du Sitemap');
  console.log('=======================');
  
  let allValid = true;
  checks.forEach(check => {
    if (check.check) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
      allValid = false;
    }
  });
  
  return allValid;
}

// Fonction pour afficher les instructions Google Search Console
function showGoogleSearchConsoleInstructions() {
  console.log('\n🔧 Instructions Google Search Console');
  console.log('====================================');
  console.log('1. Allez sur https://search.google.com/search-console');
  console.log('2. Ajoutez votre propriété: https://dlsolutions.com');
  console.log('3. Vérifiez la propriété (fichier HTML ou balise meta)');
  console.log('4. Dans "Sitemaps", ajoutez: sitemap.xml');
  console.log('5. Surveillez l\'indexation dans "Couverture"');
  console.log('\n📋 URLs importantes à surveiller:');
  console.log(`   - ${SITE_URL}/ (Accueil)`);
  console.log(`   - ${SITE_URL}/portfolio/batobaye (Batobaye)`);
  console.log(`   - ${SITE_URL}/services (Services)`);
  console.log(`   - ${SITE_URL}/marketing-digital (Marketing)`);
  console.log(`   - ${SITE_URL}/e-commerce (E-commerce)`);
}

// Fonction principale
async function submitSitemapToSearchEngines() {
  console.log('🔍 Validation du sitemap...');
  
  if (!validateSitemap()) {
    console.log('❌ Sitemap invalide. Arrêt de la soumission.');
    return;
  }
  
  console.log('\n🚀 Soumission aux moteurs de recherche...');
  
  const results = [];
  
  for (const engine of SEARCH_ENGINES) {
    const result = await submitSitemap(engine);
    results.push(result);
    
    // Pause entre les soumissions
    if (engine !== SEARCH_ENGINES[SEARCH_ENGINES.length - 1]) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Générer le rapport
  generateReport(results);
  
  // Afficher les instructions
  showGoogleSearchConsoleInstructions();
  
  console.log('\n🎯 Mots-clés cibles pour l\'indexation:');
  console.log('   - Batobaye marketplace Cameroun');
  console.log('   - Batobaye e-commerce Cameroun');
  console.log('   - DL Solutions marketplace');
  console.log('   - Davy Lucie e-commerce');
  console.log('   - marketplace Cameroun');
  console.log('   - vente en ligne Cameroun');
  console.log('   - marketing digital Cameroun');
  
  console.log('\n✅ Soumission terminée !');
  console.log('💡 Surveillez l\'indexation dans Google Search Console');
}

// Gestion des arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node submit-sitemap.js [options]\n');
  console.log('Options:');
  console.log('  --help, -h     Afficher cette aide');
  console.log('  --validate     Valider uniquement le sitemap');
  console.log('  --google-only  Soumettre uniquement à Google\n');
  console.log('Exemples:');
  console.log('  node submit-sitemap.js');
  console.log('  node submit-sitemap.js --validate');
  console.log('  node submit-sitemap.js --google-only');
} else if (args.includes('--validate')) {
  validateSitemap();
} else {
  submitSitemapToSearchEngines();
} 