#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Routes à tester pour éviter les 404
const routesToTest = [
  // Pages principales
  '/',
  '/formations',
  '/novaworld',
  '/dl-style',
  '/scraping-multi-market',
  
  // NovaWorld Social
  '/novaworld/social',
  '/novaworld/social/dashboard',
  '/novaworld/social/groups',
  '/novaworld/social/events',
  '/novaworld/social/resources',
  '/novaworld/social/settings',
  '/novaworld/social/messages',
  '/novaworld/social/moderation',
  
  // Formations
  '/formations/televente-prospection',
  
  // DL-Style
  '/dl-style/outlet',
  
  // Service worker
  '/sw.js',
  
  // API de fallback
  '/api/images/fallback?path=test.jpg',
  
  // Routes de fallback
  '/novaworld/social/unknown-page',
  '/unknown-route'
];

// Fonction pour tester une route
function testRoute(route) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: route,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      resolve({
        route,
        status: res.statusCode,
        success: res.statusCode !== 404
      });
    });

    req.on('error', () => {
      resolve({
        route,
        status: 'ERROR',
        success: false
      });
    });

    req.end();
  });
}

// Test principal
async function runTests() {
  console.log('🔍 Test de suppression des erreurs 404...');
  console.log('=' .repeat(60));
  
  let passedTests = 0;
  let totalTests = routesToTest.length;
  
  for (const route of routesToTest) {
    const result = await testRoute(route);
    
    if (result.success) {
      console.log(`✅ ${route} - Status: ${result.status}`);
      passedTests++;
    } else {
      console.log(`❌ ${route} - Status: ${result.status} (404 détecté)`);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log(`📊 Résultats:`);
  console.log(`   ✅ Routes fonctionnelles: ${passedTests}/${totalTests}`);
  console.log(`   ❌ Erreurs 404: ${totalTests - passedTests}/${totalTests}`);
  console.log(`   📈 Taux de réussite: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 Aucune erreur 404 détectée ! Le projet est prêt.');
  } else {
    console.log('\n⚠️  Des erreurs 404 persistent. Vérifiez les routes ci-dessus.');
  }
}

runTests().catch(console.error); 