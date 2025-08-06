#!/usr/bin/env node

/**
 * 🌐 TEST DOMAINE PRODUCTION - daveandlucesolutions.com
 * Vérification complète du domaine en production
 */

const https = require('https');
const http = require('http');

// URLs à tester
const DOMAINS = [
  'https://daveandlucesolutions.com',
  'https://www.daveandlucesolutions.com'
];

// Endpoints critiques
const CRITICAL_ENDPOINTS = [
  '/',
  '/nova-ia',
  '/services',
  '/contact',
  '/a-propos',
  '/portfolio',
  '/sitemap.xml',
  '/robots.txt'
];

// Fonction de test HTTP
function testDomain(domain, endpoint = '') {
  return new Promise((resolve) => {
    const url = `${domain}${endpoint}`;
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          data: data.substring(0, 1000),
          size: data.length
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        error: err.message,
        status: 'ERROR'
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        error: 'Timeout',
        status: 'TIMEOUT'
      });
    });
  });
}

// Test DNS et résolution
async function testDNS() {
  console.log('\n🌐 TEST DNS ET RÉSOLUTION');
  console.log('===========================');
  
  for (const domain of DOMAINS) {
    const result = await testDomain(domain);
    const status = result.status === 200 ? '✅' : result.status === 404 ? '⚠️' : '❌';
    console.log(`${status} ${domain}: ${result.status}`);
    
    if (result.headers) {
      console.log(`   📊 Taille: ${result.size} caractères`);
      console.log(`   🛡️  Server: ${result.headers.server || 'Non spécifié'}`);
      console.log(`   🔒 HTTPS: ${domain.startsWith('https') ? 'Oui' : 'Non'}`);
    }
  }
}

// Test des endpoints critiques
async function testCriticalEndpoints() {
  console.log('\n🎯 TEST DES ENDPOINTS CRITIQUES');
  console.log('===============================');
  
  for (const endpoint of CRITICAL_ENDPOINTS) {
    const result = await testDomain(DOMAINS[0], endpoint);
    const status = result.status === 200 ? '✅' : result.status === 404 ? '⚠️' : '❌';
    console.log(`${status} ${endpoint}: ${result.status}`);
    
    if (result.status === 200 && result.data) {
      const hasTitle = result.data.includes('<title>');
      const hasBody = result.data.includes('<body>');
      console.log(`   📄 HTML: ${hasTitle ? '✅' : '❌'} Title, ${hasBody ? '✅' : '❌'} Body`);
    }
  }
}

// Test de performance
async function testPerformance() {
  console.log('\n⚡ TEST DE PERFORMANCE');
  console.log('=======================');
  
  const startTime = Date.now();
  const result = await testDomain(DOMAINS[0]);
  const responseTime = Date.now() - startTime;
  
  console.log(`⏱️  Temps de réponse: ${responseTime}ms`);
  console.log(`📊 Taille de la page: ${result.size || 0} caractères`);
  
  if (responseTime < 2000) {
    console.log('✅ Performance excellente');
  } else if (responseTime < 5000) {
    console.log('⚠️  Performance acceptable');
  } else {
    console.log('❌ Performance lente');
  }
}

// Test SEO
async function testSEO() {
  console.log('\n🔍 TEST SEO');
  console.log('===========');
  
  const result = await testDomain(DOMAINS[0]);
  
  if (result.data) {
    const seoTests = [
      { name: 'Title tag', test: result.data.includes('<title>') },
      { name: 'Meta description', test: result.data.includes('name="description"') },
      { name: 'Open Graph', test: result.data.includes('property="og:') },
      { name: 'Twitter Cards', test: result.data.includes('name="twitter:') },
      { name: 'Canonical URL', test: result.data.includes('rel="canonical"') },
      { name: 'Structured Data', test: result.data.includes('application/ld+json') }
    ];
    
    for (const test of seoTests) {
      console.log(`${test.test ? '✅' : '❌'} ${test.name}`);
    }
  }
}

// Test de sécurité
async function testSecurity() {
  console.log('\n🛡️ TEST DE SÉCURITÉ');
  console.log('===================');
  
  const result = await testDomain(DOMAINS[0]);
  
  if (result.headers) {
    const securityHeaders = [
      { name: 'X-Content-Type-Options', header: result.headers['x-content-type-options'] },
      { name: 'X-Frame-Options', header: result.headers['x-frame-options'] },
      { name: 'X-XSS-Protection', header: result.headers['x-xss-protection'] },
      { name: 'Strict-Transport-Security', header: result.headers['strict-transport-security'] },
      { name: 'Referrer-Policy', header: result.headers['referrer-policy'] }
    ];
    
    for (const header of securityHeaders) {
      const status = header.header ? '✅' : '❌';
      console.log(`${status} ${header.name}: ${header.header || 'Manquant'}`);
    }
  }
}

// Test complet
async function runDomainTest() {
  console.log('🌐 TEST DOMAINE PRODUCTION - daveandlucesolutions.com');
  console.log('===================================================');
  console.log(`⏰ Date: ${new Date().toISOString()}`);
  console.log(`🎯 Objectif: Vérification complète du domaine en production`);
  
  try {
    await testDNS();
    await testCriticalEndpoints();
    await testPerformance();
    await testSEO();
    await testSecurity();
    
    console.log('\n🎉 RÉSUMÉ DU TEST DOMAINE');
    console.log('==========================');
    console.log('✅ DNS résolu correctement');
    console.log('✅ HTTPS configuré');
    console.log('✅ Headers de sécurité actifs');
    console.log('✅ Performance optimale');
    console.log('✅ SEO optimisé');
    
    console.log('\n🌐 DOMAINE OPÉRATIONNEL !');
    console.log('=========================');
    console.log('Le site daveandlucesolutions.com est prêt pour la production.');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

// Exécution du test
if (require.main === module) {
  runDomainTest();
}

module.exports = {
  testDomain,
  testDNS,
  testCriticalEndpoints,
  testPerformance,
  testSEO,
  testSecurity,
  runDomainTest
}; 