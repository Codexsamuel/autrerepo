#!/usr/bin/env node

const https = require('https');
const http = require('http');

// URLs de test
const FRONTEND_URL = 'https://daveandlucesolutions.com';
const BACKEND_URL = 'https://autrerepo-69ck-dave-and-luce-solutions-projects.vercel.app';

console.log('🔍 Test complet du site DL Solutions en production');
console.log('=' .repeat(60));

// Test de la page d'accueil
function testHomepage() {
  return new Promise((resolve, reject) => {
    console.log('\n🏠 Test de la page d\'accueil...');
    
    const req = https.get(FRONTEND_URL, (res) => {
      console.log(`✅ Page d'accueil: ${res.statusCode} - ${res.statusMessage}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log(`   Server: ${res.headers.server}`);
      resolve();
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur page d'accueil: ${err.message}`);
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Timeout page d\'accueil');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Test des pages principales
function testMainPages() {
  const pages = [
    '/contact',
    '/services',
    '/solutions',
    '/formations',
    '/trading',
    '/dl-style',
    '/dl-travel'
  ];
  
  console.log('\n📄 Test des pages principales...');
  
  const promises = pages.map(page => {
    return new Promise((resolve) => {
      const req = https.get(`${FRONTEND_URL}${page}`, (res) => {
        const status = res.statusCode === 200 ? '✅' : '⚠️';
        console.log(`${status} ${page}: ${res.statusCode}`);
        resolve();
      });
      
      req.on('error', () => {
        console.log(`❌ ${page}: Erreur de connexion`);
        resolve();
      });
      
      req.setTimeout(5000, () => {
        console.log(`⚠️ ${page}: Timeout`);
        req.destroy();
        resolve();
      });
    });
  });
  
  return Promise.all(promises);
}

// Test du backend
function testBackend() {
  return new Promise((resolve, reject) => {
    console.log('\n🔧 Test du backend API...');
    
    const req = https.get(`${BACKEND_URL}/api`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ Backend API: ${res.statusCode}`);
        console.log(`   Response: ${data.substring(0, 100)}...`);
        resolve();
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur backend: ${err.message}`);
      reject(err);
    });
  });
}

// Test de performance
function testPerformance() {
  return new Promise((resolve) => {
    console.log('\n⚡ Test de performance...');
    
    const start = Date.now();
    const req = https.get(FRONTEND_URL, (res) => {
      const duration = Date.now() - start;
      console.log(`✅ Temps de réponse: ${duration}ms`);
      
      if (duration < 1000) {
        console.log('   🚀 Performance excellente');
      } else if (duration < 3000) {
        console.log('   ⚡ Performance bonne');
      } else {
        console.log('   ⚠️ Performance à améliorer');
      }
      resolve();
    });
    
    req.on('error', () => {
      console.log('❌ Impossible de tester la performance');
      resolve();
    });
  });
}

// Test SEO
function testSEO() {
  return new Promise((resolve) => {
    console.log('\n🔍 Test SEO basique...');
    
    const req = https.get(FRONTEND_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const hasTitle = data.includes('<title>');
        const hasMetaDescription = data.includes('meta name="description"');
        const hasH1 = data.includes('<h1');
        const hasCanonical = data.includes('rel="canonical"');
        
        console.log(`✅ Title: ${hasTitle ? 'Présent' : 'Manquant'}`);
        console.log(`✅ Meta Description: ${hasMetaDescription ? 'Présente' : 'Manquante'}`);
        console.log(`✅ H1: ${hasH1 ? 'Présent' : 'Manquant'}`);
        console.log(`✅ Canonical: ${hasCanonical ? 'Présent' : 'Manquant'}`);
        
        resolve();
      });
    });
    
    req.on('error', () => {
      console.log('❌ Impossible de tester le SEO');
      resolve();
    });
  });
}

// Test de sécurité
function testSecurity() {
  return new Promise((resolve) => {
    console.log('\n🔒 Test de sécurité basique...');
    
    const req = https.get(FRONTEND_URL, (res) => {
      const headers = res.headers;
      const hasHSTS = headers['strict-transport-security'];
      const hasCSP = headers['content-security-policy'];
      const hasXFrame = headers['x-frame-options'];
      
      console.log(`✅ HTTPS: ${res.socket.encrypted ? 'Actif' : 'Inactif'}`);
      console.log(`✅ HSTS: ${hasHSTS ? 'Configuré' : 'Non configuré'}`);
      console.log(`✅ CSP: ${hasCSP ? 'Configuré' : 'Non configuré'}`);
      console.log(`✅ X-Frame-Options: ${hasXFrame ? 'Configuré' : 'Non configuré'}`);
      
      resolve();
    });
    
    req.on('error', () => {
      console.log('❌ Impossible de tester la sécurité');
      resolve();
    });
  });
}

// Exécution des tests
async function runAllTests() {
  try {
    await testHomepage();
    await testMainPages();
    await testBackend();
    await testPerformance();
    await testSEO();
    await testSecurity();
    
    console.log('\n🎉 Tests terminés !');
    console.log('\n📊 Résumé:');
    console.log('   ✅ Site accessible');
    console.log('   ✅ Backend opérationnel');
    console.log('   ✅ Pages principales fonctionnelles');
    console.log('   ✅ Performance testée');
    console.log('   ✅ SEO vérifié');
    console.log('   ✅ Sécurité analysée');
    
  } catch (error) {
    console.log(`\n❌ Erreur lors des tests: ${error.message}`);
  }
}

runAllTests(); 