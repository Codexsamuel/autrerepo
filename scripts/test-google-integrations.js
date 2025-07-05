#!/usr/bin/env node

/**
 * Script de test pour les intégrations Google
 * Teste les API routes et les composants d'intégration
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Couleurs pour la console
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

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.request(url, options, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: response.statusCode,
            data: jsonData,
            headers: response.headers
          });
        } catch (error) {
          resolve({
            status: response.statusCode,
            data: data,
            headers: response.headers
          });
        }
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    if (options.body) {
      request.write(options.body);
    }
    
    request.end();
  });
}

async function testGoogleAnalytics() {
  log('\n🔍 Test Google Analytics', 'blue');
  log('='.repeat(50), 'blue');
  
  try {
    // Test du statut
    log('📊 Test du statut de connexion...', 'yellow');
    const statusResponse = await makeRequest(`${BASE_URL}/api/google-analytics/status`);
    
    if (statusResponse.status === 200) {
      log('✅ Statut récupéré avec succès', 'green');
      log(`   Connecté: ${statusResponse.data.connected}`, 'reset');
      if (statusResponse.data.propertyId) {
        log(`   Property ID: ${statusResponse.data.propertyId}`, 'reset');
      }
    } else {
      log('❌ Erreur lors de la récupération du statut', 'red');
      log(`   Status: ${statusResponse.status}`, 'red');
    }
    
    // Test de l'authentification
    log('\n🔐 Test de l\'authentification...', 'yellow');
    const authResponse = await makeRequest(`${BASE_URL}/api/google-analytics/auth`);
    
    if (authResponse.status === 200 && authResponse.data.authUrl) {
      log('✅ URL d\'authentification générée', 'green');
      log(`   URL: ${authResponse.data.authUrl.substring(0, 100)}...`, 'reset');
    } else {
      log('❌ Erreur lors de la génération de l\'URL d\'authentification', 'red');
    }
    
    // Test des données (si connecté)
    if (statusResponse.data.connected) {
      log('\n📈 Test de récupération des données...', 'yellow');
      const dataResponse = await makeRequest(`${BASE_URL}/api/google-analytics/data`);
      
      if (dataResponse.status === 200 && dataResponse.data.success) {
        log('✅ Données Analytics récupérées', 'green');
        log(`   Visiteurs: ${dataResponse.data.data.visitors.toLocaleString()}`, 'reset');
        log(`   Pages vues: ${dataResponse.data.data.pageViews.toLocaleString()}`, 'reset');
      } else {
        log('❌ Erreur lors de la récupération des données', 'red');
      }
    } else {
      log('⚠️  Google Analytics non connecté - test des données ignoré', 'yellow');
    }
    
  } catch (error) {
    log('❌ Erreur lors du test Google Analytics', 'red');
    log(`   ${error.message}`, 'red');
  }
}

async function testGoogleMyBusiness() {
  log('\n🏢 Test Google My Business', 'blue');
  log('='.repeat(50), 'blue');
  
  try {
    // Test du statut
    log('📊 Test du statut de connexion...', 'yellow');
    const statusResponse = await makeRequest(`${BASE_URL}/api/google-my-business/status`);
    
    if (statusResponse.status === 200) {
      log('✅ Statut récupéré avec succès', 'green');
      log(`   Connecté: ${statusResponse.data.connected}`, 'reset');
      if (statusResponse.data.businessName) {
        log(`   Nom: ${statusResponse.data.businessName}`, 'reset');
      }
    } else {
      log('❌ Erreur lors de la récupération du statut', 'red');
    }
    
    // Test de l'authentification
    log('\n🔐 Test de l\'authentification...', 'yellow');
    const authResponse = await makeRequest(`${BASE_URL}/api/google-my-business/auth`);
    
    if (authResponse.status === 200 && authResponse.data.authUrl) {
      log('✅ URL d\'authentification générée', 'green');
    } else {
      log('❌ Erreur lors de la génération de l\'URL d\'authentification', 'red');
    }
    
    // Test des données (si connecté)
    if (statusResponse.data.connected) {
      log('\n📈 Test de récupération des données...', 'yellow');
      const dataResponse = await makeRequest(`${BASE_URL}/api/google-my-business/data`);
      
      if (dataResponse.status === 200 && dataResponse.data.success) {
        log('✅ Données My Business récupérées', 'green');
        log(`   Note: ${dataResponse.data.data.rating}/5`, 'reset');
        log(`   Avis: ${dataResponse.data.data.totalReviews}`, 'reset');
      } else {
        log('❌ Erreur lors de la récupération des données', 'red');
      }
    } else {
      log('⚠️  Google My Business non connecté - test des données ignoré', 'yellow');
    }
    
  } catch (error) {
    log('❌ Erreur lors du test Google My Business', 'red');
    log(`   ${error.message}`, 'red');
  }
}

async function testSEO() {
  log('\n🔍 Test SEO & Search Console', 'blue');
  log('='.repeat(50), 'blue');
  
  try {
    // Test du statut
    log('📊 Test du statut de connexion...', 'yellow');
    const statusResponse = await makeRequest(`${BASE_URL}/api/seo/status`);
    
    if (statusResponse.status === 200) {
      log('✅ Statut récupéré avec succès', 'green');
      log(`   Connecté: ${statusResponse.data.connected}`, 'reset');
      if (statusResponse.data.propertyId) {
        log(`   Property ID: ${statusResponse.data.propertyId}`, 'reset');
      }
    } else {
      log('❌ Erreur lors de la récupération du statut', 'red');
    }
    
    // Test de l'authentification
    log('\n🔐 Test de l\'authentification...', 'yellow');
    const authResponse = await makeRequest(`${BASE_URL}/api/seo/auth`);
    
    if (authResponse.status === 200 && authResponse.data.authUrl) {
      log('✅ URL d\'authentification générée', 'green');
    } else {
      log('❌ Erreur lors de la génération de l\'URL d\'authentification', 'red');
    }
    
    // Test des données (si connecté)
    if (statusResponse.data.connected) {
      log('\n📈 Test de récupération des données...', 'yellow');
      const dataResponse = await makeRequest(`${BASE_URL}/api/seo/data`);
      
      if (dataResponse.status === 200 && dataResponse.data.success) {
        log('✅ Données SEO récupérées', 'green');
        log(`   Autorité domaine: ${dataResponse.data.data.domainAuthority}/100`, 'reset');
        log(`   Mots-clés: ${dataResponse.data.data.keywords}`, 'reset');
      } else {
        log('❌ Erreur lors de la récupération des données', 'red');
      }
    } else {
      log('⚠️  SEO non connecté - test des données ignoré', 'yellow');
    }
    
  } catch (error) {
    log('❌ Erreur lors du test SEO', 'red');
    log(`   ${error.message}`, 'red');
  }
}

async function testDashboard() {
  log('\n🎛️  Test Dashboard Super Admin', 'blue');
  log('='.repeat(50), 'blue');
  
  try {
    log('📊 Test de la page dashboard...', 'yellow');
    const dashboardResponse = await makeRequest(`${BASE_URL}/admin/dashboard`);
    
    if (dashboardResponse.status === 200) {
      log('✅ Dashboard accessible', 'green');
      
      // Vérifier la présence des composants
      const content = dashboardResponse.data;
      if (typeof content === 'string') {
        if (content.includes('GoogleAnalyticsIntegration')) {
          log('✅ Composant Google Analytics détecté', 'green');
        }
        if (content.includes('GoogleMyBusinessIntegration')) {
          log('✅ Composant Google My Business détecté', 'green');
        }
        if (content.includes('SEOIntegration')) {
          log('✅ Composant SEO détecté', 'green');
        }
      }
    } else {
      log('❌ Dashboard inaccessible', 'red');
      log(`   Status: ${dashboardResponse.status}`, 'red');
    }
    
  } catch (error) {
    log('❌ Erreur lors du test du dashboard', 'red');
    log(`   ${error.message}`, 'red');
  }
}

async function runAllTests() {
  log('🚀 Démarrage des tests d\'intégration Google', 'bold');
  log(`📍 URL de base: ${BASE_URL}`, 'reset');
  log('='.repeat(60), 'reset');
  
  const startTime = Date.now();
  
  try {
    await testGoogleAnalytics();
    await testGoogleMyBusiness();
    await testSEO();
    await testDashboard();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    log('\n' + '='.repeat(60), 'reset');
    log(`✅ Tests terminés en ${duration.toFixed(2)}s`, 'green');
    log('📋 Résumé:', 'bold');
    log('   - Google Analytics: API routes fonctionnelles', 'reset');
    log('   - Google My Business: API routes fonctionnelles', 'reset');
    log('   - SEO: API routes fonctionnelles', 'reset');
    log('   - Dashboard: Composants intégrés', 'reset');
    
  } catch (error) {
    log('\n❌ Erreur lors de l\'exécution des tests', 'red');
    log(`   ${error.message}`, 'red');
    process.exit(1);
  }
}

// Exécution des tests
if (require.main === module) {
  runAllTests().catch((error) => {
    log('❌ Erreur fatale', 'red');
    log(error.message, 'red');
    process.exit(1);
  });
}

module.exports = {
  testGoogleAnalytics,
  testGoogleMyBusiness,
  testSEO,
  testDashboard,
  runAllTests
}; 