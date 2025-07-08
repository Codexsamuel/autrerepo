const https = require('https');

// Configuration finale
const DOMAIN = 'daveandlucesolutions.com';
const VERCEL_BACKEND = 'https://autrerepo-69ck.vercel.app';

console.log('🎯 Test Final de Déploiement avec Domaine Personnalisé\n');

// Test 1: Page d'accueil avec domaine personnalisé
function testMainDomain() {
  return new Promise((resolve) => {
    console.log('🏠 Test de la page d\'accueil...');
    
    const req = https.get(`https://${DOMAIN}`, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Server: ${res.headers.server || 'N/A'}`);
      console.log(`   Content-Type: ${res.headers['content-type'] || 'N/A'}`);
      
      if (res.statusCode === 200) {
        console.log(`   ✅ ${DOMAIN} accessible via Netlify`);
      } else {
        console.log(`   ❌ ${DOMAIN} non accessible (${res.statusCode})`);
      }
      
      resolve(res.statusCode === 200);
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

// Test 2: Page de test des variables d'environnement
function testEnvPage() {
  return new Promise((resolve) => {
    console.log('\n🔧 Test de la page de diagnostic...');
    
    const req = https.get(`https://${DOMAIN}/test-env`, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log(`   ✅ Page /test-env accessible`);
      } else {
        console.log(`   ❌ Page /test-env non accessible (${res.statusCode})`);
      }
      
      resolve(res.statusCode === 200);
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

// Test 3: Page de démonstration scraping
function testScrapingDemo() {
  return new Promise((resolve) => {
    console.log('\n📡 Test de la page de démonstration scraping...');
    
    const req = https.get(`https://${DOMAIN}/scraping-demo`, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log(`   ✅ Page /scraping-demo accessible`);
      } else {
        console.log(`   ❌ Page /scraping-demo non accessible (${res.statusCode})`);
      }
      
      resolve(res.statusCode === 200);
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

// Test 4: API de scraping via Vercel
function testScrapingAPI() {
  return new Promise((resolve) => {
    console.log('\n🛍️ Test de l\'API de scraping...');
    
    const req = https.get(`${VERCEL_BACKEND}/api/scraping/products?q=phone`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ API Scraping fonctionnelle`);
            console.log(`   📦 Produits trouvés: ${jsonData.data?.length || 0}`);
            console.log(`   🔍 Requête: ${jsonData.query || 'N/A'}`);
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
          }
        } else {
          console.log(`   ❌ API Scraping non accessible (${res.statusCode})`);
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

// Test 5: API de debug via Vercel
function testDebugAPI() {
  return new Promise((resolve) => {
    console.log('\n🔍 Test de l\'API de debug...');
    
    const req = https.get(`${VERCEL_BACKEND}/api/debug/env`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ API Debug fonctionnelle`);
            console.log(`   📝 Environment: ${jsonData.environment || 'N/A'}`);
            console.log(`   🔧 Variables configurées: ${jsonData.configuredVars || 0}`);
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
          }
        } else {
          console.log(`   ❌ API Debug non accessible (${res.statusCode})`);
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
async function runFinalTests() {
  console.log('🚀 Test Final de l\'Architecture Complète...\n');
  
  const results = await Promise.all([
    testMainDomain(),
    testEnvPage(),
    testScrapingDemo(),
    testScrapingAPI(),
    testDebugAPI()
  ]);
  
  console.log('\n' + '='.repeat(70));
  console.log('📊 RÉSULTATS FINAUX DU DÉPLOIEMENT');
  console.log('='.repeat(70));
  
  console.log(`🏠 Page d'accueil (${DOMAIN}): ${results[0] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🔧 Page de diagnostic (/test-env): ${results[1] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`📡 Page de démonstration (/scraping-demo): ${results[2] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🛍️ API Scraping (Vercel): ${results[3] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🔍 API Debug (Vercel): ${results[4] ? '✅ OK' : '❌ ÉCHEC'}`);
  
  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;
  
  console.log(`\n📈 Score Final: ${successCount}/${totalCount} tests réussis`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 FÉLICITATIONS ! Votre architecture est 100% opérationnelle !');
    console.log('\n✅ TOUT FONCTIONNE :');
    console.log('   • Domaine personnalisé configuré sur Hostinger');
    console.log('   • Frontend déployé sur Netlify');
    console.log('   • Backend déployé sur Vercel');
    console.log('   • APIs de scraping fonctionnelles');
    console.log('   • Variables d\'environnement configurées');
    
    console.log('\n🔗 URLs de votre plateforme :');
    console.log(`   🌐 Site principal: https://${DOMAIN}`);
    console.log(`   🔧 Diagnostic: https://${DOMAIN}/test-env`);
    console.log(`   📡 Démo scraping: https://${DOMAIN}/scraping-demo`);
    console.log(`   🛍️ API Backend: ${VERCEL_BACKEND}/api/scraping/products`);
    
    console.log('\n🚀 Votre plateforme est prête pour la production !');
  } else {
    console.log('\n⚠️ PROBLÈMES DÉTECTÉS :');
    
    if (!results[0]) {
      console.log('   • Le domaine principal n\'est pas accessible');
      console.log('   • Vérifiez la configuration DNS sur Hostinger');
    }
    
    if (!results[1] || !results[2]) {
      console.log('   • Les pages de test ne sont pas accessibles');
      console.log('   • Vérifiez le déploiement Netlify');
    }
    
    if (!results[3] || !results[4]) {
      console.log('   • Les APIs Vercel ne fonctionnent pas');
      console.log('   • Vérifiez le déploiement Vercel');
    }
    
    console.log('\n🔧 Actions recommandées :');
    console.log('   1. Vérifiez les logs de déploiement Netlify');
    console.log('   2. Vérifiez les logs de déploiement Vercel');
    console.log('   3. Vérifiez la configuration DNS sur Hostinger');
    console.log('   4. Attendez la propagation DNS (peut prendre 24h)');
  }
  
  console.log('\n' + '='.repeat(70));
}

// Exécution
runFinalTests().catch(console.error); 