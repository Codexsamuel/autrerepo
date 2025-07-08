const https = require('https');

// Configuration
const NETLIFY_URL = 'https://daveandlucesolutions.com';

console.log('🔍 Test des fonctions Netlify de scraping...\n');

// Test 1: Vérifier l'API de scraping via Netlify Functions
function testNetlifyScrapingAPI() {
  return new Promise((resolve) => {
    console.log('📡 Test de l\'API de scraping Netlify...');
    
    const req = https.get(`${NETLIFY_URL}/api/scraping/products?q=phone`, (res) => {
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

// Test 2: Vérifier l'API chinese-stores via Netlify Functions
function testNetlifyChineseStoresAPI() {
  return new Promise((resolve) => {
    console.log('\n🏪 Test de l\'API chinese-stores Netlify...');
    
    const req = https.get(`${NETLIFY_URL}/api/scraping/chinese-stores?action=stats`, (res) => {
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

// Test 3: Vérifier les variables d'environnement via Netlify Functions
function testNetlifyEnvironmentVariables() {
  return new Promise((resolve) => {
    console.log('\n🔧 Test des variables d\'environnement Netlify...');
    
    const req = https.get(`${NETLIFY_URL}/api/debug/env`, (res) => {
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
            console.log(`   📝 NODE_ENV: ${jsonData.variables?.NODE_ENV || 'N/A'}`);
            console.log(`   🌐 NEXT_PUBLIC_APP_URL: ${jsonData.variables?.NEXT_PUBLIC_APP_URL || 'N/A'}`);
            console.log(`   🔑 OPENAI_API_KEY: ${jsonData.variables?.OPENAI_API_KEY || 'N/A'}`);
            console.log(`   💳 STRIPE_SECRET_KEY: ${jsonData.variables?.STRIPE_SECRET_KEY || 'N/A'}`);
            console.log(`   🗄️ SUPABASE_URL: ${jsonData.variables?.NEXT_PUBLIC_SUPABASE_URL || 'N/A'}`);
            console.log(`   🔧 ENABLE_SCRAPING: ${jsonData.variables?.ENABLE_SCRAPING || 'N/A'}`);
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

// Test 4: Vérifier la fonction Netlify directement
function testNetlifyFunctionDirect() {
  return new Promise((resolve) => {
    console.log('\n⚡ Test direct de la fonction Netlify...');
    
    const req = https.get(`${NETLIFY_URL}/.netlify/functions/scraping-api/products?q=phone`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        try {
          const jsonData = JSON.parse(data);
          console.log(`   ✅ Fonction Netlify fonctionnelle`);
          console.log(`   📦 Produits trouvés: ${jsonData.products?.length || 0}`);
          
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

// Exécution des tests
async function runTests() {
  console.log('🚀 Démarrage des tests Netlify...\n');
  
  const results = await Promise.all([
    testNetlifyScrapingAPI(),
    testNetlifyChineseStoresAPI(),
    testNetlifyEnvironmentVariables(),
    testNetlifyFunctionDirect()
  ]);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS DES TESTS NETLIFY');
  console.log('='.repeat(60));
  
  console.log(`📡 API Scraping (via redirect): ${results[0] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🏪 API Chinese Stores (via redirect): ${results[1] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🔧 Variables d'environnement (via redirect): ${results[2] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`⚡ Fonction Netlify (directe): ${results[3] ? '✅ OK' : '❌ ÉCHEC'}`);
  
  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;
  
  console.log(`\n📈 Score: ${successCount}/${totalCount} tests réussis`);
  
  if (successCount === totalCount) {
    console.log('🎉 Tous les tests sont passés ! Le scraping fonctionne sur Netlify.');
  } else {
    console.log('\n⚠️ DIAGNOSTIC DU PROBLÈME:');
    
    if (!results[0] && !results[3]) {
      console.log('   • Les fonctions Netlify ne répondent pas');
      console.log('   • Vérifiez le déploiement des fonctions');
      console.log('   • Vérifiez les variables d\'environnement sur Netlify');
    }
    
    if (!results[0] && results[3]) {
      console.log('   • Les redirections API ne fonctionnent pas');
      console.log('   • Vérifiez la configuration netlify.toml');
    }
    
    if (!results[2]) {
      console.log('   • Impossible de vérifier les variables d\'environnement');
      console.log('   • Vérifiez les variables sur Netlify Dashboard');
    }
    
    console.log('\n🔧 ACTIONS RECOMMANDÉES:');
    console.log('   1. Redéployez l\'application sur Netlify');
    console.log('   2. Vérifiez les variables d\'environnement sur Netlify');
    console.log('   3. Vérifiez les logs de déploiement');
    console.log('   4. Testez les fonctions individuellement');
  }
  
  console.log('\n🔗 URL Netlify:', NETLIFY_URL);
}

// Exécution
runTests().catch(console.error); 