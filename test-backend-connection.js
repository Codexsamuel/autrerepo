#!/usr/bin/env node

const https = require('https');

const BACKEND_URL = 'https://autrerepo-69ck-8j32qukvd-dave-and-luce-solutions-projects.vercel.app';

console.log('🔗 Test de connexion au backend Vercel...\n');

// Test de l'API principale
function testMainAPI() {
  return new Promise((resolve, reject) => {
    const req = https.get(`${BACKEND_URL}/api`, (res) => {
      console.log(`📡 API Principale (/api):`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Headers: ${JSON.stringify(res.headers, null, 2)}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`   ✅ Succès! Réponse: ${data.substring(0, 200)}...`);
          resolve(true);
        } else {
          console.log(`   ❌ Erreur! Réponse: ${data.substring(0, 200)}...`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Erreur réseau: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log(`   ⏰ Timeout après 10 secondes`);
      req.destroy();
      resolve(false);
    });
  });
}

// Test de l'API scraping
function testScrapingAPI() {
  return new Promise((resolve, reject) => {
    const req = https.get(`${BACKEND_URL}/api/scraping/products`, (res) => {
      console.log(`\n📡 API Scraping (/api/scraping/products):`);
      console.log(`   Status: ${res.statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`   ✅ Succès! Réponse: ${data.substring(0, 200)}...`);
          resolve(true);
        } else {
          console.log(`   ❌ Erreur! Réponse: ${data.substring(0, 200)}...`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Erreur réseau: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log(`   ⏰ Timeout après 10 secondes`);
      req.destroy();
      resolve(false);
    });
  });
}

// Test de la page d'accueil
function testHomePage() {
  return new Promise((resolve, reject) => {
    const req = https.get(BACKEND_URL, (res) => {
      console.log(`\n📡 Page d'accueil (/):`);
      console.log(`   Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log(`   ✅ Page d'accueil accessible`);
        resolve(true);
      } else {
        console.log(`   ❌ Page d'accueil non accessible`);
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Erreur réseau: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log(`   ⏰ Timeout après 10 secondes`);
      req.destroy();
      resolve(false);
    });
  });
}

// Exécution des tests
async function runTests() {
  console.log(`🎯 URL du backend: ${BACKEND_URL}\n`);
  
  const results = await Promise.all([
    testMainAPI(),
    testScrapingAPI(),
    testHomePage()
  ]);
  
  console.log('\n📊 Résumé des tests:');
  console.log(`   API Principale: ${results[0] ? '✅' : '❌'}`);
  console.log(`   API Scraping: ${results[1] ? '✅' : '❌'}`);
  console.log(`   Page d'accueil: ${results[2] ? '✅' : '❌'}`);
  
  if (results.some(r => r)) {
    console.log('\n🎉 Au moins un endpoint fonctionne!');
  } else {
    console.log('\n⚠️  Aucun endpoint ne fonctionne. Vérifiez la protection Vercel.');
    console.log('\n🔧 Actions recommandées:');
    console.log('   1. Allez dans Vercel Dashboard');
    console.log('   2. Sélectionnez le projet autrerepo-69ck');
    console.log('   3. Cherchez "Deployment Protection" ou "Password Protection"');
    console.log('   4. Désactivez la protection');
  }
}

runTests().catch(console.error); 