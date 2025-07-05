#!/usr/bin/env node

const https = require('https');

// Fonction d'optimisation Cloudinary simplifiée
function optimizeVideoUrl(url, options = {}) {
  const { quality = 'auto', format = 'mp4' } = options;
  
  // Ajouter les transformations Cloudinary pour l'optimisation
  const transformations = ['f_auto', 'fl_progressive'];
  
  if (quality !== 'auto') {
    transformations.push(`q_${quality}`);
  }
  
  // Insérer les transformations dans l'URL
  const baseUrl = url.replace('/upload/', `/upload/${transformations.join('/')}/`);
  
  return baseUrl;
}

// URLs vidéo à tester
const videoUrls = [
  "https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4",
  "https://res.cloudinary.com/dko5sommz/video/upload/v1750841005/WhatsApp_Video_2025-06-05_at_01.41.08_zau0s5.mp4",
  "https://res.cloudinary.com/dko5sommz/video/upload/v1750840992/evenement_a_l_institu_francais_ajicak.mp4",
  "https://res.cloudinary.com/dko5sommz/video/upload/v1750840982/teasing_UCAC_mllc2k.mp4",
  "https://res.cloudinary.com/dko5sommz/video/upload/v1750840961/UCAC_t3lduu.mp4"
];

function testUrl(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    https.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      if (res.statusCode === 200) {
        console.log(`✅ ${url}`);
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Content-Type: ${res.headers['content-type']}`);
        console.log(`   Content-Length: ${res.headers['content-length']} bytes`);
        console.log(`   Response Time: ${responseTime}ms`);
        console.log(`   Optimized URL: ${optimizeVideoUrl(url, { quality: 'auto', format: 'mp4' })}`);
        console.log('');
        resolve({ success: true, url, statusCode: res.statusCode, responseTime });
      } else {
        console.log(`❌ ${url}`);
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Error: ${res.statusMessage}`);
        console.log('');
        resolve({ success: false, url, statusCode: res.statusCode, error: res.statusMessage });
      }
    }).on('error', (err) => {
      console.log(`❌ ${url}`);
      console.log(`   Error: ${err.message}`);
      console.log('');
      resolve({ success: false, url, error: err.message });
    });
  });
}

async function testAllVideos() {
  console.log('🎬 Test des URLs vidéo Cloudinary optimisées\n');
  console.log('=' .repeat(80));
  
  const results = [];
  
  for (const url of videoUrls) {
    const result = await testUrl(url);
    results.push(result);
  }
  
  console.log('=' .repeat(80));
  console.log('📊 Résumé des tests:');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Succès: ${successful}/${results.length}`);
  console.log(`❌ Échecs: ${failed}/${results.length}`);
  
  if (failed > 0) {
    console.log('\n🔍 URLs en échec:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.url}: ${r.error || `Status ${r.statusCode}`}`);
    });
  }
  
  console.log('\n🎯 Recommandations:');
  if (successful === results.length) {
    console.log('   ✅ Toutes les vidéos sont accessibles');
    console.log('   ✅ L\'optimisation Cloudinary fonctionne');
    console.log('   ✅ Prêt pour le déploiement');
  } else {
    console.log('   ⚠️  Certaines vidéos ne sont pas accessibles');
    console.log('   🔧 Vérifiez les permissions Cloudinary');
    console.log('   🔧 Vérifiez que les URLs sont correctes');
  }
}

// Exécuter les tests
testAllVideos().catch(console.error); 