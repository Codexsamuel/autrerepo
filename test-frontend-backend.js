#!/usr/bin/env node

const https = require('https');

// URLs de test
const BACKEND_URL = 'https://autrerepo-69ck-8j32qukvd-dave-and-luce-solutions-projects.vercel.app';
const FRONTEND_URL = 'https://daveandlucesolutions.com'; // URL Netlify

console.log('🔗 Test de connexion Frontend (Netlify) ↔ Backend (Vercel)...\n');

// Test de l'API principale avec CORS
function testAPICORS() {
  return new Promise((resolve, reject) => {
    const req = https.get(`${BACKEND_URL}/api`, (res) => {
      console.log(`📡 Test CORS API Principale:`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   CORS Headers:`);
      console.log(`     - Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
      console.log(`     - Access-Control-Allow-Methods: ${res.headers['access-control-allow-methods']}`);
      console.log(`     - Access-Control-Allow-Headers: ${res.headers['access-control-allow-headers']}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ API accessible avec CORS configuré`);
            console.log(`   📋 Endpoints disponibles: ${Object.keys(jsonData.endpoints || {}).length}`);
            resolve(true);
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 100)}...`);
            resolve(false);
          }
        } else {
          console.log(`   ❌ Erreur HTTP: ${res.statusCode}`);
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
      console.log(`\n📡 Test API Scraping:`);
      console.log(`   Status: ${res.statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ API Scraping fonctionnelle`);
            console.log(`   📦 Produits disponibles: ${jsonData.data?.length || 0}`);
            if (jsonData.data && jsonData.data.length > 0) {
              console.log(`   🛍️  Premier produit: ${jsonData.data[0].name}`);
            }
            resolve(true);
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 100)}...`);
            resolve(false);
          }
        } else {
          console.log(`   ❌ Erreur HTTP: ${res.statusCode}`);
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

// Test du frontend Netlify
function testFrontend() {
  return new Promise((resolve, reject) => {
    const req = https.get(FRONTEND_URL, (res) => {
      console.log(`\n📡 Test Frontend Netlify:`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Server: ${res.headers.server}`);
      
      if (res.statusCode === 200) {
        console.log(`   ✅ Frontend Netlify accessible`);
        resolve(true);
      } else {
        console.log(`   ❌ Frontend non accessible`);
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
  console.log(`🎯 Configuration:`);
  console.log(`   Backend Vercel: ${BACKEND_URL}`);
  console.log(`   Frontend Netlify: ${FRONTEND_URL}\n`);
  
  const results = await Promise.all([
    testAPICORS(),
    testScrapingAPI(),
    testFrontend()
  ]);
  
  console.log('\n📊 Résumé des tests:');
  console.log(`   API Principale (CORS): ${results[0] ? '✅' : '❌'}`);
  console.log(`   API Scraping: ${results[1] ? '✅' : '❌'}`);
  console.log(`   Frontend Netlify: ${results[2] ? '✅' : '❌'}`);
  
  if (results[0] && results[1] && results[2]) {
    console.log('\n🎉 PARFAIT ! Votre architecture est opérationnelle !');
    console.log('   ✅ Backend Vercel accessible');
    console.log('   ✅ Frontend Netlify accessible');
    console.log('   ✅ CORS configuré pour la communication');
    console.log('\n🚀 Votre application est prête pour la production !');
  } else if (results[0] && results[1]) {
    console.log('\n✅ Backend opérationnel !');
    console.log('   Votre frontend peut maintenant communiquer avec le backend.');
  } else {
    console.log('\n⚠️  Problèmes détectés. Vérifiez la configuration.');
  }
}

runTests().catch(console.error); 