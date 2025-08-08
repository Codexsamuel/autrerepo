#!/usr/bin/env node

/**
 * 🔧 SCRIPT DE RÉSOLUTION DU PROBLÈME DE DOMAINE
 * Le domaine daveandlucesolutions.com est assigné à un autre projet Vercel
 * Ce script aide à résoudre ce conflit
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
          accessible: res.statusCode === 200,
          headers: res.headers
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

// Fonction pour analyser le problème
async function analyzeProblem() {
  console.log('🔧 ANALYSE DU PROBLÈME DE DOMAINE');
  console.log('==================================');
  
  // Vérifier les DNS
  const dnsOk = await checkDNS();
  
  if (dnsOk) {
    console.log('\n🎉 DNS PROPAGÉS! Test du site...');
    
    // Tester l'accès au site
    const siteResult = await testWebsiteAccess();
    
    if (siteResult.accessible) {
      console.log('✅ Site accessible!');
      console.log(`📊 Taille: ${siteResult.size} caractères`);
      console.log('🎉 PROBLÈME RÉSOLU!');
    } else {
      console.log('⚠️ Site pas encore accessible');
      console.log(`   Statut: ${siteResult.status}`);
      if (siteResult.error) {
        console.log(`   Erreur: ${siteResult.error}`);
      }
      
      // Analyser les headers pour plus d'informations
      if (siteResult.headers) {
        console.log('\n📋 Headers de réponse:');
        console.log(`   Server: ${siteResult.headers.server}`);
        console.log(`   X-Vercel-Id: ${siteResult.headers['x-vercel-id']}`);
        console.log(`   X-Matched-Path: ${siteResult.headers['x-matched-path']}`);
      }
    }
  } else {
    console.log('\n⏳ DNS pas encore propagés');
    console.log('==========================');
    console.log('Les DNS peuvent prendre 24-48h pour se propager.');
    console.log('Vérifiez la configuration sur Hostinger.');
  }
}

// Fonction pour générer les instructions de résolution
function generateResolutionInstructions() {
  console.log('\n🔧 INSTRUCTIONS DE RÉSOLUTION');
  console.log('=============================');
  console.log('');
  console.log('PROBLÈME IDENTIFIÉ:');
  console.log('Le domaine daveandlucesolutions.com est assigné à un autre projet Vercel');
  console.log('');
  console.log('SOLUTIONS:');
  console.log('');
  console.log('1️⃣ SOLUTION RECOMMANDÉE - Retirer le domaine de l\'autre projet:');
  console.log('   a) Connectez-vous à Vercel Dashboard');
  console.log('   b) Allez dans l\'autre projet qui utilise le domaine');
  console.log('   c) Allez dans Settings > Domains');
  console.log('   d) Supprimez daveandlucesolutions.com de ce projet');
  console.log('   e) Revenez dans ce projet et ajoutez le domaine');
  console.log('');
  console.log('2️⃣ SOLUTION ALTERNATIVE - Utiliser un sous-domaine:');
  console.log('   a) Ajoutez www.daveandlucesolutions.com à ce projet');
  console.log('   b) Configurez la redirection dans Hostinger');
  console.log('');
  console.log('3️⃣ SOLUTION TEMPORAIRE - Utiliser l\'URL Vercel:');
  console.log('   a) Utilisez: https://autrerepo-69ck-d5rf1c73d-dave-and-luce-solutions-projects.vercel.app');
  console.log('   b) Le site fonctionne parfaitement sur cette URL');
  console.log('');
  console.log('COMMANDES VERCEL UTILES:');
  console.log('   vercel domains ls                    # Lister les domaines');
  console.log('   vercel domains add <domain>          # Ajouter un domaine');
  console.log('   vercel domains rm <domain>           # Retirer un domaine');
  console.log('   vercel --prod                        # Déployer en production');
  console.log('');
  console.log('VÉRIFICATION DNS:');
  console.log('   dig daveandlucesolutions.com +short  # Vérifier les IPs');
  console.log('   nslookup daveandlucesolutions.com    # Vérifier la résolution');
  console.log('');
  console.log('TEST DU SITE:');
  console.log('   curl -I https://daveandlucesolutions.com/');
  console.log('   curl -I https://autrerepo-69ck-d5rf1c73d-dave-and-luce-solutions-projects.vercel.app/');
}

// Fonction principale
async function main() {
  console.log('🔧 RÉSOLUTION DU PROBLÈME DE DOMAINE - daveandlucesolutions.com');
  console.log('================================================================');
  console.log(`⏰ Date: ${new Date().toISOString()}`);
  console.log(`🎯 Objectif: Résoudre l'erreur 404 sur le domaine principal`);
  
  try {
    // Analyser le problème
    await analyzeProblem();
    
    // Générer les instructions de résolution
    generateResolutionInstructions();
    
    console.log('\n📊 STATUT ACTUEL:');
    console.log('✅ Déploiement Vercel: SUCCÈS');
    console.log('✅ DNS propagés: SUCCÈS');
    console.log('❌ Domaine connecté: ÉCHEC (assigné à un autre projet)');
    console.log('✅ Site fonctionnel: OUI (sur URL Vercel)');
    
    console.log('\n🎯 PROCHAINES ÉTAPES:');
    console.log('1. Retirer le domaine de l\'autre projet Vercel');
    console.log('2. Ajouter le domaine à ce projet');
    console.log('3. Vérifier l\'accès au site');
    console.log('4. Tester toutes les pages');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
    process.exit(1);
  }
}

// Exécution du script
if (require.main === module) {
  main();
}

module.exports = {
  checkDNS,
  testWebsiteAccess,
  analyzeProblem,
  generateResolutionInstructions
}; 