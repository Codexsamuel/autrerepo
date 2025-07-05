#!/usr/bin/env node

const https = require('https');
const http = require('http');

// URLs de test
const BACKEND_URL = 'https://autrerepo-69ck-dave-and-luce-solutions-projects.vercel.app';
const FRONTEND_URL = 'https://daveandlucesolutions.com'; // ou l'URL Netlify si le domaine n'est pas encore propagé

console.log('🔍 Test de connexion Frontend-Backend DL Solutions');
console.log('=' .repeat(50));

// Test du backend Vercel
function testBackend() {
  return new Promise((resolve, reject) => {
    console.log('\n📡 Test du Backend Vercel...');
    
    const req = https.get(`${BACKEND_URL}/api`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ Backend API: ${res.statusCode} - ${res.statusMessage}`);
        console.log(`📄 Réponse: ${data.substring(0, 100)}...`);
        
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur Backend: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Timeout Backend (10s)');
      req.destroy();
      resolve(false);
    });
  });
}

// Test de l'API de scraping
function testScrapingAPI() {
  return new Promise((resolve, reject) => {
    console.log('\n🛍️ Test de l\'API de scraping...');
    
    const req = https.get(`${BACKEND_URL}/api/scraping/products`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ API Scraping: ${res.statusCode} - ${res.statusMessage}`);
        
        try {
          const jsonData = JSON.parse(data);
          console.log(`📦 Produits trouvés: ${jsonData.products?.length || 0}`);
          console.log(`📄 Premier produit: ${jsonData.products?.[0]?.title?.substring(0, 50)}...`);
        } catch (e) {
          console.log(`📄 Réponse brute: ${data.substring(0, 100)}...`);
        }
        
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur API Scraping: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Timeout API Scraping (10s)');
      req.destroy();
      resolve(false);
    });
  });
}

// Test du frontend Netlify
function testFrontend() {
  return new Promise((resolve, reject) => {
    console.log('\n🌐 Test du Frontend Netlify...');
    
    const req = https.get(FRONTEND_URL, (res) => {
      console.log(`✅ Frontend: ${res.statusCode} - ${res.statusMessage}`);
      console.log(`📄 Content-Type: ${res.headers['content-type']}`);
      console.log(`📄 Server: ${res.headers['server']}`);
      
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur Frontend: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Timeout Frontend (10s)');
      req.destroy();
      resolve(false);
    });
  });
}

// Test CORS
function testCORS() {
  return new Promise((resolve, reject) => {
    console.log('\n🌍 Test CORS...');
    
    const options = {
      hostname: 'autrerepo-69ck-dave-and-luce-solutions-projects.vercel.app',
      port: 443,
      path: '/api',
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://daveandlucesolutions.com',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`✅ CORS: ${res.statusCode} - ${res.statusMessage}`);
      console.log(`📄 Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
      console.log(`📄 Access-Control-Allow-Methods: ${res.headers['access-control-allow-methods']}`);
      
      if (res.statusCode === 200 || res.statusCode === 204) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur CORS: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Timeout CORS (10s)');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Exécution des tests
async function runTests() {
  console.log('🚀 Démarrage des tests de connexion...\n');
  
  const results = {
    backend: await testBackend(),
    scraping: await testScrapingAPI(),
    frontend: await testFrontend(),
    cors: await testCORS()
  };
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 RÉSULTATS DES TESTS');
  console.log('=' .repeat(50));
  
  console.log(`🔧 Backend Vercel: ${results.backend ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🛍️ API Scraping: ${results.scraping ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🌐 Frontend Netlify: ${results.frontend ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🌍 CORS: ${results.cors ? '✅ OK' : '❌ ÉCHEC'}`);
  
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\n📈 Score: ${successCount}/${totalCount} tests réussis`);
  
  if (successCount === totalCount) {
    console.log('🎉 Tous les tests sont passés ! L\'architecture est opérationnelle.');
  } else {
    console.log('⚠️ Certains tests ont échoué. Vérifiez la configuration.');
  }
  
  console.log('\n🔗 URLs:');
  console.log(`   Backend: ${BACKEND_URL}`);
  console.log(`   Frontend: ${FRONTEND_URL}`);
}

// Exécution
runTests().catch(console.error); 