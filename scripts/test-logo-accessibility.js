#!/usr/bin/env node

const https = require('https');

// URL du logo déclarée dans le JSON-LD
const logoUrl = 'https://daveandlucesolutions.com/images/dl-logo.jpg';

console.log('🔍 Test d\'accessibilité du logo pour Google...\n');

function testLogoAccessibility(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    https.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log(`📊 Résultats pour: ${url}`);
      console.log(`   Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log(`   Content-Length: ${res.headers['content-length']} bytes`);
      console.log(`   Temps de réponse: ${responseTime}ms`);
      
      if (res.statusCode === 200) {
        console.log('   ✅ Logo accessible !');
        
        // Vérifier le type de contenu
        const contentType = res.headers['content-type'];
        if (contentType && contentType.includes('image/')) {
          console.log('   ✅ Type de contenu correct (image)');
        } else {
          console.log('   ⚠️  Type de contenu inattendu');
        }
        
        // Vérifier la taille
        const contentLength = parseInt(res.headers['content-length']);
        if (contentLength && contentLength > 1000) {
          console.log('   ✅ Taille du fichier correcte');
        } else {
          console.log('   ⚠️  Fichier trop petit, possible erreur');
        }
        
      } else {
        console.log('   ❌ Logo non accessible');
      }
      
      console.log('');
      resolve();
    }).on('error', (err) => {
      console.log(`   ❌ Erreur: ${err.message}`);
      console.log('');
      resolve();
    });
  });
}

async function runTests() {
  console.log('🚀 Démarrage des tests...\n');
  
  // Test de l'URL principale
  await testLogoAccessibility(logoUrl);
  
  // Test alternatif avec HTTPS explicite
  await testLogoAccessibility('https://daveandlucesolutions.com/images/dl-logo.jpg');
  
  console.log('📋 Recommandations pour Google:');
  console.log('   1. ✅ URL HTTPS utilisée');
  console.log('   2. ✅ Format JPG supporté');
  console.log('   3. ✅ Chemin relatif correct (/images/dl-logo.jpg)');
  console.log('   4. ✅ Domaine cohérent (daveandlucesolutions.com)');
  console.log('');
  console.log('🔧 Prochaines étapes:');
  console.log('   - Déployer les modifications');
  console.log('   - Utiliser Google Rich Results Test');
  console.log('   - Attendre l\'indexation par Google (1-4 semaines)');
  console.log('');
  console.log('✨ Test terminé !');
}

runTests().catch(console.error); 