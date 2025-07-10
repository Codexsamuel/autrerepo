#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Configuration des tests
const tests = [
  {
    name: 'Page d\'accueil',
    url: '/',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'Page formations',
    url: '/formations',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'Page NovaWorld',
    url: '/novaworld',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'Page DL-Style',
    url: '/dl-style',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'Page scraping multi-marchés',
    url: '/scraping-multi-market',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'API scraping - Alibaba vehicles',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'alibaba',
      category: 'vehicles',
      limit: 3
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  },
  {
    name: 'API scraping - Shein women-clothing',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'shein',
      category: 'women-clothing',
      limit: 2
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  },
  {
    name: 'API scraping - Cdiscount furniture',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'cdiscount',
      category: 'furniture',
      limit: 2
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  },
  {
    name: 'API scraping - Amazon electronics',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'amazon',
      category: 'electronics',
      limit: 2
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  },
  {
    name: 'API scraping - eBay men-clothing',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'ebay',
      category: 'men-clothing',
      limit: 2
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  },
  {
    name: 'API scraping - AliExpress women-clothing',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'aliexpress',
      category: 'women-clothing',
      limit: 2
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  },
  {
    name: 'API scraping - Toutes plateformes',
    url: '/api/scraping/multi-market',
    method: 'POST',
    data: JSON.stringify({
      platform: 'all',
      category: 'vehicles',
      limit: 5
    }),
    headers: { 'Content-Type': 'application/json' },
    expectedStatus: 200
  }
];

// Fonction pour effectuer une requête HTTP
function makeRequest(test) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: test.url,
      method: test.method,
      headers: test.headers || {}
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          test: test
        });
      });
    });

    req.on('error', (error) => {
      reject({
        error: error,
        test: test
      });
    });

    if (test.data) {
      req.write(test.data);
    }
    
    req.end();
  });
}

// Fonction pour analyser la réponse
function analyzeResponse(result) {
  const { status, data, test } = result;
  
  console.log(`\n🔍 Test: ${test.name}`);
  console.log(`   URL: ${test.method} ${test.url}`);
  console.log(`   Status: ${status} ${status === test.expectedStatus ? '✅' : '❌'}`);
  
  if (status === 200) {
    if (test.url.includes('/api/')) {
      try {
        const jsonData = JSON.parse(data);
        if (jsonData.success) {
          const productCount = jsonData.data?.products?.length || 0;
          console.log(`   ✅ API fonctionne - ${productCount} produits retournés`);
          
          if (productCount > 0) {
            const firstProduct = jsonData.data.products[0];
            console.log(`   📦 Premier produit: ${firstProduct.title}`);
            console.log(`   💰 Prix: ${firstProduct.price} ${firstProduct.currency}`);
            console.log(`   🏪 Plateforme: ${firstProduct.platform}`);
          }
        } else {
          console.log(`   ❌ API retourne une erreur: ${jsonData.message || 'Erreur inconnue'}`);
        }
      } catch (e) {
        console.log(`   ❌ Erreur parsing JSON: ${e.message}`);
      }
    } else {
      // Test de page web
      if (data.includes('<title>')) {
        const titleMatch = data.match(/<title>([^<]*)<\/title>/);
        if (titleMatch) {
          console.log(`   📄 Page chargée - Titre: ${titleMatch[1]}`);
        } else {
          console.log(`   📄 Page chargée - Titre non trouvé`);
        }
      } else {
        console.log(`   📄 Page chargée - Contenu HTML détecté`);
      }
    }
  } else {
    console.log(`   ❌ Erreur HTTP: ${status}`);
  }
}

// Fonction principale de test
async function runTests() {
  console.log('🚀 Démarrage des tests du système DL Solutions');
  console.log('=' .repeat(60));
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    try {
      const result = await makeRequest(test);
      analyzeResponse(result);
      
      if (result.status === test.expectedStatus) {
        passedTests++;
      }
    } catch (error) {
      console.log(`\n🔍 Test: ${test.name}`);
      console.log(`   ❌ Erreur de connexion: ${error.error.message}`);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log(`📊 Résultats des tests:`);
  console.log(`   ✅ Tests réussis: ${passedTests}/${totalTests}`);
  console.log(`   ❌ Tests échoués: ${totalTests - passedTests}/${totalTests}`);
  console.log(`   📈 Taux de réussite: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 Tous les tests sont passés ! Le système fonctionne parfaitement.');
  } else {
    console.log('\n⚠️  Certains tests ont échoué. Vérifiez les erreurs ci-dessus.');
  }
  
  console.log('\n🔗 URLs à tester manuellement:');
  console.log(`   🌐 Page d'accueil: ${BASE_URL}`);
  console.log(`   📚 Formations: ${BASE_URL}/formations`);
  console.log(`   🌍 NovaWorld: ${BASE_URL}/novaworld`);
  console.log(`   🛍️  DL-Style: ${BASE_URL}/dl-style`);
  console.log(`   🔍 Scraping: ${BASE_URL}/scraping-multi-market`);
}

// Exécution des tests
runTests().catch(console.error); 