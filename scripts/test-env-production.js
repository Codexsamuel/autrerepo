const https = require('https');

// Configuration
const PRODUCTION_URL = 'https://daveandlucesolutions.com';

console.log('🔍 Test des variables d\'environnement en production...\n');

// Test 1: Vérifier l'API de scraping
function testScrapingAPI() {
  return new Promise((resolve) => {
    console.log('📡 Test de l\'API de scraping...');
    
    const req = https.get(`${PRODUCTION_URL}/api/scraping/products?q=phone`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Headers:`, res.headers);
        
        try {
          const jsonData = JSON.parse(data);
          console.log(`   ✅ Réponse JSON valide`);
          console.log(`   📦 Produits trouvés: ${jsonData.products?.length || 0}`);
          console.log(`   🔍 Requête: ${jsonData.query || 'N/A'}`);
          
          if (jsonData.error) {
            console.log(`   ❌ Erreur: ${jsonData.error}`);
          }
        } catch (e) {
          console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
        }
        
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 2: Vérifier l'API chinese-stores
function testChineseStoresAPI() {
  return new Promise((resolve) => {
    console.log('\n🏪 Test de l\'API chinese-stores...');
    
    const req = https.get(`${PRODUCTION_URL}/api/scraping/chinese-stores?action=stats`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        try {
          const jsonData = JSON.parse(data);
          console.log(`   ✅ Réponse JSON valide`);
          console.log(`   📊 Stats:`, jsonData.data || 'N/A');
          
          if (jsonData.error) {
            console.log(`   ❌ Erreur: ${jsonData.error}`);
          }
        } catch (e) {
          console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
        }
        
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 3: Vérifier les variables d'environnement via une API de debug
function testEnvironmentVariables() {
  return new Promise((resolve) => {
    console.log('\n🔧 Test des variables d\'environnement...');
    
    const req = https.get(`${PRODUCTION_URL}/api/debug/env`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ Variables d'environnement disponibles:`);
            console.log(`   📝 NODE_ENV: ${jsonData.NODE_ENV || 'N/A'}`);
            console.log(`   🌐 NEXT_PUBLIC_APP_URL: ${jsonData.NEXT_PUBLIC_APP_URL || 'N/A'}`);
            console.log(`   🔑 OPENAI_API_KEY: ${jsonData.OPENAI_API_KEY ? '✅ Configuré' : '❌ Manquant'}`);
            console.log(`   💳 STRIPE_SECRET_KEY: ${jsonData.STRIPE_SECRET_KEY ? '✅ Configuré' : '❌ Manquant'}`);
            console.log(`   🗄️ SUPABASE_URL: ${jsonData.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configuré' : '❌ Manquant'}`);
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
          }
        } else {
          console.log(`   ❌ Endpoint non disponible (${res.statusCode})`);
        }
        
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 4: Vérifier la page d'accueil
function testHomePage() {
  return new Promise((resolve) => {
    console.log('\n🏠 Test de la page d\'accueil...');
    
    const req = https.get(PRODUCTION_URL, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Content-Type: ${res.headers['content-type'] || 'N/A'}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`   ✅ Page d'accueil accessible`);
          console.log(`   📄 Taille: ${(data.length / 1024).toFixed(2)} KB`);
          
          // Vérifier si le scraping est mentionné dans la page
          if (data.includes('scraping') || data.includes('produits')) {
            console.log(`   🔍 Références au scraping trouvées`);
          } else {
            console.log(`   ⚠️ Aucune référence au scraping trouvée`);
          }
        } else {
          console.log(`   ❌ Page d'accueil non accessible`);
        }
        
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Exécution des tests
async function runTests() {
  console.log('🚀 Démarrage des tests de production...\n');
  
  const results = await Promise.all([
    testScrapingAPI(),
    testChineseStoresAPI(),
    testEnvironmentVariables(),
    testHomePage()
  ]);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS DES TESTS DE PRODUCTION');
  console.log('='.repeat(60));
  
  console.log(`📡 API Scraping: ${results[0] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🏪 API Chinese Stores: ${results[1] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🔧 Variables d'environnement: ${results[2] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🏠 Page d'accueil: ${results[3] ? '✅ OK' : '❌ ÉCHEC'}`);
  
  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;
  
  console.log(`\n📈 Score: ${successCount}/${totalCount} tests réussis`);
  
  if (successCount === totalCount) {
    console.log('🎉 Tous les tests sont passés ! Le scraping devrait fonctionner.');
  } else {
    console.log('\n⚠️ DIAGNOSTIC DU PROBLÈME DE SCRAPING:');
    
    if (!results[0]) {
      console.log('   • L\'API de scraping ne répond pas');
      console.log('   • Vérifiez les variables d\'environnement sur Vercel');
      console.log('   • Vérifiez les logs de déploiement');
    }
    
    if (!results[1]) {
      console.log('   • L\'API chinese-stores ne répond pas');
      console.log('   • Problème possible avec les routes API');
    }
    
    if (!results[2]) {
      console.log('   • Impossible de vérifier les variables d\'environnement');
      console.log('   • Créez une route /api/debug/env pour diagnostiquer');
    }
    
    if (!results[3]) {
      console.log('   • La page d\'accueil n\'est pas accessible');
      console.log('   • Problème de déploiement général');
    }
    
    console.log('\n🔧 ACTIONS RECOMMANDÉES:');
    console.log('   1. Vérifiez les variables d\'environnement sur Vercel');
    console.log('   2. Redéployez l\'application');
    console.log('   3. Vérifiez les logs de déploiement');
    console.log('   4. Testez les APIs individuellement');
  }
  
  console.log('\n🔗 URL de production:', PRODUCTION_URL);
}

// Exécution
runTests().catch(console.error); 