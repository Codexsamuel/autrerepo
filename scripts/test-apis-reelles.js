#!/usr/bin/env node

/**
 * Script de test des APIs réelles RapidAPI
 * Vérifie que toutes les APIs fonctionnent avec de vraies données
 */

const http = require('http');

const BASE_URL = 'http://localhost:3001';
const TEST_QUERIES = {
  amazon: 'iphone',
  taobao: 'phone',
  ebay: 'electronics',
  aliexpress: 'phone',
  translator: 'Hello'
};

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers,
            isHtml: true
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout (15s)'));
    });
  });
}

async function testAPI(apiName, endpoint, query) {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    log(`\n🔍 Test ${apiName.toUpperCase()}: ${query}`, 'blue');
    log(`URL: ${url}`, 'cyan');
    
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      log(`✅ Status: ${response.status}`, 'green');
      
      if (response.data.success) {
        log(`✅ API ${apiName} fonctionnelle`, 'green');
        
        // Vérifier les données
        if (response.data.data && response.data.data.length > 0) {
          const productCount = response.data.data.length;
          log(`📦 ${productCount} produits récupérés`, 'green');
          
          // Afficher le premier produit
          const firstProduct = response.data.data[0];
          log(`\n📋 Premier produit:`, 'yellow');
          log(`   Nom: ${firstProduct.title || firstProduct.name || 'N/A'}`, 'yellow');
          log(`   Prix: ${firstProduct.price || 'N/A'}`, 'yellow');
          log(`   Source: ${firstProduct.source || apiName}`, 'yellow');
          
          return { success: true, productCount, hasRealData: true };
        } else {
          log(`⚠️ Aucun produit récupéré (mode simulation probable)`, 'yellow');
          return { success: true, productCount: 0, hasRealData: false };
        }
      } else {
        log(`❌ API ${apiName} en erreur: ${response.data.message || 'Erreur inconnue'}`, 'red');
        return { success: false, error: response.data.message };
      }
    } else {
      log(`❌ Status: ${response.status}`, 'red');
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function testTranslation() {
  const url = `${BASE_URL}/api/translate?action=translate&text=${TEST_QUERIES.translator}&target=fr`;
  
  try {
    log(`\n🔍 Test TRADUCTION: "${TEST_QUERIES.translator}" → Français`, 'blue');
    log(`URL: ${url}`, 'cyan');
    
    const response = await makeRequest(url);
    
    if (response.status === 200 && response.data.success) {
      log(`✅ Traduction réussie`, 'green');
      log(`📝 "${TEST_QUERIES.translator}" → "${response.data.data.translatedText}"`, 'green');
      return { success: true, hasRealData: true };
    } else {
      log(`⚠️ Mode simulation (pas de vraie traduction)`, 'yellow');
      return { success: true, hasRealData: false };
    }
  } catch (error) {
    log(`❌ Erreur traduction: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function testAutoUpdate() {
  const url = `${BASE_URL}/api/products/auto-update?force=true`;
  
  try {
    log(`\n🔍 Test AUTO-UPDATE: Mise à jour forcée`, 'blue');
    log(`URL: ${url}`, 'cyan');
    
    const response = await makeRequest(url);
    
    if (response.status === 200 && response.data.success) {
      log(`✅ Auto-update fonctionnel`, 'green');
      
      const results = response.data.data.results;
      let totalProducts = 0;
      let sourcesWithData = 0;
      
      Object.entries(results).forEach(([source, products]) => {
        const count = products.length;
        totalProducts += count;
        if (count > 0) sourcesWithData++;
        
        const status = count > 0 ? '✅' : '⚠️';
        const color = count > 0 ? 'green' : 'yellow';
        log(`   ${status} ${source}: ${count} produits`, color);
      });
      
      log(`📊 Total: ${totalProducts} produits de ${sourcesWithData} sources`, 'cyan');
      return { success: true, totalProducts, sourcesWithData };
    } else {
      log(`❌ Auto-update en erreur`, 'red');
      return { success: false, error: 'Auto-update failed' };
    }
  } catch (error) {
    log(`❌ Erreur auto-update: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function testAllAPIs() {
  log(`\n${colors.bold}🧪 TEST DES APIs RÉELLES RAPIDAPI${colors.reset}`, 'bold');
  log(`URL de base: ${BASE_URL}`, 'blue');
  log(`Date: ${new Date().toISOString()}`, 'blue');
  
  const results = [];
  
  // Test des APIs e-commerce
  const apis = [
    {
      name: 'Amazon',
      endpoint: `/api/amazon/products?query=${TEST_QUERIES.amazon}&page=1&limit=5`
    },
    {
      name: 'Taobao',
      endpoint: `/api/taobao/products?query=${TEST_QUERIES.taobao}&site=taobao&page=1&limit=5`
    },
    {
      name: 'eBay',
      endpoint: `/api/ebay/products?query=${TEST_QUERIES.ebay}&page=1&limit=5`
    },
    {
      name: 'AliExpress',
      endpoint: `/api/aliexpress/products?query=${TEST_QUERIES.aliexpress}&page=1&limit=5`
    }
  ];
  
  for (const api of apis) {
    const result = await testAPI(api.name, api.endpoint, TEST_QUERIES[api.name.toLowerCase()]);
    results.push({ api: api.name, ...result });
  }
  
  // Test traduction
  const translationResult = await testTranslation();
  results.push({ api: 'Translation', ...translationResult });
  
  // Test auto-update
  const autoUpdateResult = await testAutoUpdate();
  results.push({ api: 'Auto-Update', ...autoUpdateResult });
  
  // Résumé
  log(`\n${colors.bold}📋 RÉSUMÉ DES TESTS${colors.reset}`, 'bold');
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  const withRealData = results.filter(r => r.hasRealData).length;
  
  log(`Tests réussis: ${successful}/${total}`, successful === total ? 'green' : 'yellow');
  log(`APIs avec vraies données: ${withRealData}/${total}`, withRealData > 0 ? 'green' : 'yellow');
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const color = result.success ? 'green' : 'red';
    const dataStatus = result.hasRealData ? ' (VRAIES DONNÉES)' : ' (SIMULATION)';
    log(`${status} ${result.api}: ${result.success ? 'OK' + dataStatus : result.error}`, color);
  });
  
  // Évaluation
  log(`\n${colors.bold}🎯 ÉVALUATION${colors.reset}`, 'bold');
  
  if (withRealData === total) {
    log(`🏆 PARFAIT ! Toutes les APIs utilisent de vraies données`, 'green');
    log(`✅ Système 100% opérationnel avec APIs réelles`, 'green');
  } else if (withRealData > 0) {
    log(`🟡 PARTIEL ! ${withRealData}/${total} APIs avec vraies données`, 'yellow');
    log(`⚠️ Certaines APIs sont encore en mode simulation`, 'yellow');
  } else {
    log(`🔴 SIMULATION ! Aucune API avec vraies données`, 'red');
    log(`❌ Configuration des clés RapidAPI nécessaire`, 'red');
  }
  
  // Recommandations
  log(`\n${colors.bold}💡 RECOMMANDATIONS${colors.reset}`, 'bold');
  
  if (withRealData === 0) {
    log(`🔧 Actions requises:`, 'yellow');
    log(`   1. Créer un compte RapidAPI`, 'yellow');
    log(`   2. Souscrire aux APIs gratuites`, 'yellow');
    log(`   3. Configurer les clés dans .env.local`, 'yellow');
    log(`   4. Redémarrer le serveur`, 'yellow');
    log(`\n📖 Voir: docs/CONFIGURATION_APIS_REELLES.md`, 'cyan');
  } else if (withRealData < total) {
    log(`🔧 APIs à configurer:`, 'yellow');
    results.filter(r => !r.hasRealData).forEach(result => {
      log(`   - ${result.api}`, 'yellow');
    });
  } else {
    log(`✅ Aucune action requise`, 'green');
    log(`🚀 Système prêt pour la production !`, 'green');
  }
  
  return results;
}

// Fonction principale
async function main() {
  try {
    await testAllAPIs();
    
    log(`\n${colors.bold}🎉 TESTS TERMINÉS${colors.reset}`, 'bold');
    log(`Vérifiez les résultats ci-dessus pour configurer vos APIs !`, 'cyan');
    
  } catch (error) {
    log(`\n❌ Erreur lors des tests: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Exécution si appelé directement
if (require.main === module) {
  main();
}

module.exports = { testAllAPIs, testAPI, testTranslation, testAutoUpdate }; 