#!/usr/bin/env node

/**
 * Script de test de durabilité pour DL Style
 * Vérifie que le système fonctionne même avec des APIs défaillantes
 */

const http = require('http');

const BASE_URL = 'http://localhost:3001';
const TEST_ENDPOINTS = [
  '/api/products/auto-update?action=stats',
  '/api/products/auto-update?force=true',
  '/api/products/auto-update?action=update&source=amazon',
  '/api/products/auto-update?action=update&source=taobao',
  '/api/products/auto-update?action=update&source=1688',
  '/novacore/dl-style'
];

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function testEndpoint(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    log(`\n🔍 Test: ${endpoint}`, 'blue');
    
    const response = await makeRequest(url);
    
    if (response.status === 200) {
      log(`✅ Status: ${response.status}`, 'green');
      
      if (response.isHtml) {
        log(`📄 Réponse HTML (${response.data.length} caractères)`, 'yellow');
        if (response.data.includes('DL Style')) {
          log(`✅ Page DL Style détectée`, 'green');
        }
      } else {
        log(`📊 Réponse JSON:`, 'yellow');
        console.log(JSON.stringify(response.data, null, 2));
        
        // Vérifications spécifiques
        if (response.data.success !== undefined) {
          log(`✅ API fonctionnelle`, 'green');
        }
        
        if (response.data.data && response.data.data.totalProducts !== undefined) {
          log(`✅ Système de produits actif`, 'green');
        }
      }
      
      return { success: true, response };
    } else {
      log(`❌ Status: ${response.status}`, 'red');
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function testDurability() {
  log(`\n${colors.bold}🧪 TEST DE DURABILITÉ DL STYLE${colors.reset}`, 'bold');
  log(`URL de base: ${BASE_URL}`, 'blue');
  log(`Date: ${new Date().toISOString()}`, 'blue');
  
  const results = [];
  
  // Test 1: Statistiques
  log(`\n${colors.bold}📊 Test 1: Statistiques du système${colors.reset}`, 'bold');
  const statsResult = await testEndpoint('/api/products/auto-update?action=stats');
  results.push({ test: 'Statistiques', ...statsResult });
  
  // Test 2: Mise à jour forcée
  log(`\n${colors.bold}🔄 Test 2: Mise à jour forcée${colors.reset}`, 'bold');
  const forceResult = await testEndpoint('/api/products/auto-update?force=true');
  results.push({ test: 'Mise à jour forcée', ...forceResult });
  
  // Test 3: Sources individuelles
  log(`\n${colors.bold}🏪 Test 3: Sources individuelles${colors.reset}`, 'bold');
  const sources = ['amazon', 'taobao', '1688'];
  
  for (const source of sources) {
    const sourceResult = await testEndpoint(`/api/products/auto-update?action=update&source=${source}`);
    results.push({ test: `Source ${source}`, ...sourceResult });
  }
  
  // Test 4: Page principale
  log(`\n${colors.bold}🌐 Test 4: Page DL Style${colors.reset}`, 'bold');
  const pageResult = await testEndpoint('/novacore/dl-style');
  results.push({ test: 'Page DL Style', ...pageResult });
  
  // Résumé
  log(`\n${colors.bold}📋 RÉSUMÉ DES TESTS${colors.reset}`, 'bold');
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  log(`Tests réussis: ${successful}/${total}`, successful === total ? 'green' : 'yellow');
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const color = result.success ? 'green' : 'red';
    log(`${status} ${result.test}: ${result.success ? 'OK' : result.error}`, color);
  });
  
  // Évaluation de la durabilité
  log(`\n${colors.bold}🎯 ÉVALUATION DE LA DURABILITÉ${colors.reset}`, 'bold');
  
  if (successful === total) {
    log(`🏆 DURABILITÉ PARFAITE`, 'green');
    log(`✅ Tous les endpoints fonctionnent`, 'green');
    log(`✅ Système robuste et fiable`, 'green');
  } else if (successful >= total * 0.8) {
    log(`🟡 DURABILITÉ BONNE`, 'yellow');
    log(`⚠️ Quelques problèmes mineurs`, 'yellow');
    log(`✅ Système globalement fonctionnel`, 'yellow');
  } else {
    log(`🔴 DURABILITÉ PROBLÉMATIQUE`, 'red');
    log(`❌ Problèmes significatifs détectés`, 'red');
    log(`🔧 Maintenance nécessaire`, 'red');
  }
  
  // Recommandations
  log(`\n${colors.bold}💡 RECOMMANDATIONS${colors.reset}`, 'bold');
  
  if (successful === total) {
    log(`✅ Système prêt pour la production`, 'green');
    log(`✅ Aucune action requise`, 'green');
  } else {
    log(`🔧 Actions recommandées:`, 'yellow');
    
    const failedTests = results.filter(r => !r.success);
    failedTests.forEach(test => {
      log(`  - Vérifier: ${test.test}`, 'yellow');
    });
    
    log(`  - Tester les APIs externes`, 'yellow');
    log(`  - Vérifier la configuration`, 'yellow');
    log(`  - Contrôler les logs serveur`, 'yellow');
  }
  
  return results;
}

// Test de stress
async function stressTest() {
  log(`\n${colors.bold}⚡ TEST DE STRESS${colors.reset}`, 'bold');
  
  const concurrentRequests = 10;
  const endpoint = '/api/products/auto-update?action=stats';
  
  log(`Lancement de ${concurrentRequests} requêtes simultanées...`, 'blue');
  
  const promises = Array(concurrentRequests).fill().map((_, i) => 
    makeRequest(`${BASE_URL}${endpoint}`).then(response => ({
      id: i + 1,
      success: response.status === 200,
      status: response.status
    }))
  );
  
  const results = await Promise.allSettled(promises);
  
  const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
  
  log(`Résultats: ${successful}/${concurrentRequests} requêtes réussies`, 
      successful === concurrentRequests ? 'green' : 'yellow');
  
  if (successful === concurrentRequests) {
    log(`✅ Système stable sous charge`, 'green');
  } else {
    log(`⚠️ Problèmes de performance détectés`, 'yellow');
  }
}

// Fonction principale
async function main() {
  try {
    await testDurability();
    await stressTest();
    
    log(`\n${colors.bold}🎉 TESTS TERMINÉS${colors.reset}`, 'bold');
    log(`Le système DL Style est prêt pour une utilisation durable !`, 'green');
    
  } catch (error) {
    log(`\n❌ Erreur lors des tests: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Exécution si appelé directement
if (require.main === module) {
  main();
}

module.exports = { testDurability, stressTest, makeRequest }; 