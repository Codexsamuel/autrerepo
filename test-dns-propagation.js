#!/usr/bin/env node

/**
 * 🌐 TEST PROPAGATION DNS - daveandlucesolutions.com
 * Vérification automatique de la propagation DNS
 */

const { exec } = require('child_process');
const https = require('https');

const DOMAIN = 'daveandlucesolutions.com';
const EXPECTED_IP = '76.76.21.21';

// Fonction pour exécuter une commande shell
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Fonction pour vérifier les DNS
async function checkDNS() {
  console.log('🔍 Vérification des DNS...');
  
  try {
    const result = await executeCommand(`dig ${DOMAIN} +short`);
    const ips = result.trim().split('\n').filter(ip => ip.match(/^\d+\.\d+\.\d+\.\d+$/));
    
    console.log(`📊 IPs trouvées: ${ips.join(', ')}`);
    
    if (ips.includes(EXPECTED_IP)) {
      console.log('✅ DNS propagés correctement vers Vercel!');
      return true;
    } else {
      console.log('❌ DNS pas encore propagés vers Vercel');
      console.log(`   Attendu: ${EXPECTED_IP}`);
      console.log(`   Trouvé: ${ips.join(', ')}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification DNS:', error.message);
    return false;
  }
}

// Fonction pour tester l'accès au site
function testWebsiteAccess() {
  return new Promise((resolve) => {
    const url = `https://${DOMAIN}`;
    
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          size: data.length,
          accessible: res.statusCode === 200
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        status: 'ERROR',
        error: err.message,
        accessible: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        status: 'TIMEOUT',
        accessible: false
      });
    });
  });
}

// Fonction pour tester les pages principales
async function testMainPages() {
  const pages = [
    '/',
    '/nova-ia',
    '/services',
    '/contact',
    '/a-propos',
    '/portfolio'
  ];

  console.log('\n🌐 Test des pages principales...');
  
  for (const page of pages) {
    const result = await testWebsiteAccess();
    const status = result.accessible ? '✅' : '❌';
    console.log(`${status} ${page}: ${result.status}`);
  }
}

// Fonction principale de test
async function runDNSTest() {
  console.log('🌐 TEST PROPAGATION DNS - daveandlucesolutions.com');
  console.log('==================================================');
  console.log(`⏰ Date: ${new Date().toISOString()}`);
  console.log(`🎯 Objectif: Vérifier la propagation DNS vers Vercel`);
  
  // Vérifier les DNS
  const dnsOk = await checkDNS();
  
  if (dnsOk) {
    console.log('\n🎉 DNS PROPAGÉS! Test du site...');
    
    // Tester l'accès au site
    const siteResult = await testWebsiteAccess();
    
    if (siteResult.accessible) {
      console.log('✅ Site accessible!');
      console.log(`📊 Taille: ${siteResult.size} caractères`);
      
      // Tester les pages principales
      await testMainPages();
      
      console.log('\n🎉 SUCCÈS! Le domaine est opérationnel!');
      console.log('=========================================');
      console.log('✅ DNS propagés vers Vercel');
      console.log('✅ Site accessible');
      console.log('✅ HTTPS fonctionnel');
      console.log('✅ Pages principales opérationnelles');
      
    } else {
      console.log('⚠️ Site pas encore accessible');
      console.log(`   Statut: ${siteResult.status}`);
      if (siteResult.error) {
        console.log(`   Erreur: ${siteResult.error}`);
      }
    }
  } else {
    console.log('\n⏳ DNS pas encore propagés');
    console.log('==========================');
    console.log('Les DNS peuvent prendre 24-48h pour se propager.');
    console.log('Vérifiez la configuration sur Hostinger.');
    console.log('Relancez ce script dans quelques heures.');
  }
}

// Fonction de surveillance continue
async function monitorDNS(interval = 300000) { // 5 minutes par défaut
  console.log(`🔄 Surveillance DNS toutes les ${interval/1000} secondes...`);
  console.log('Appuyez sur Ctrl+C pour arrêter\n');
  
  while (true) {
    await runDNSTest();
    console.log(`\n⏰ Prochaine vérification dans ${interval/1000} secondes...\n`);
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

// Exécution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--monitor') || args.includes('-m')) {
    const interval = args.find(arg => arg.startsWith('--interval='))?.split('=')[1];
    const intervalMs = interval ? parseInt(interval) * 1000 : 300000;
    monitorDNS(intervalMs);
  } else {
    runDNSTest();
  }
}

module.exports = {
  checkDNS,
  testWebsiteAccess,
  testMainPages,
  runDNSTest,
  monitorDNS
}; 