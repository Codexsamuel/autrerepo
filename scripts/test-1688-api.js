#!/usr/bin/env node

const axios = require('axios');

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';
const RAPID_API_HOST = '1688-product2.p.rapidapi.com';

console.log('🔍 Test API 1688 - Validation Complète');
console.log('=' .repeat(60));

// Fonction pour tester une requête 1688
async function test1688Request(endpoint, params = {}) {
  try {
    console.log(`\n🔍 Test: ${endpoint}`);
    console.log(`📋 Paramètres:`, params);
    
    const url = `https://${RAPID_API_HOST}${endpoint}`;
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-host': RAPID_API_HOST,
        'x-rapidapi-key': RAPID_API_KEY,
      },
      params,
      timeout: 15000,
    });
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Données reçues:`, response.data ? 'Oui' : 'Non');
    
    if (response.data) {
      if (Array.isArray(response.data)) {
        console.log(`📦 Nombre d'éléments: ${response.data.length}`);
      } else if (response.data.items && Array.isArray(response.data.items)) {
        console.log(`📦 Nombre de produits: ${response.data.items.length}`);
      } else {
        console.log(`📦 Type de données: ${typeof response.data}`);
      }
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    if (error.response) {
      console.log(`📊 Status: ${error.response.status}`);
      console.log(`📋 Réponse:`, error.response.data);
    }
    return { success: false, error: error.message };
  }
}

// Tests des différents endpoints 1688
async function run1688Tests() {
  console.log('🚀 Démarrage des tests API 1688...\n');
  
  // Test 1: Recherche par mot-clé
  console.log('1️⃣ Test Recherche par Mot-clé');
  await test1688Request('/1688/search/items', {
    page: 1,
    keyword: 'iphone',
    limit: 5
  });
  
  // Test 2: Recherche par mot-clé chinois
  console.log('\n2️⃣ Test Recherche par Mot-clé Chinois');
  await test1688Request('/1688/search/items', {
    page: 1,
    keyword: 'T恤男', // T-shirt homme en chinois
    limit: 3
  });
  
  // Test 3: Description de produit (nécessite un item_id valide)
  console.log('\n3️⃣ Test Description Produit (avec ID fictif)');
  await test1688Request('/1688/item_desc', {
    item_id: '123456789'
  });
  
  // Test 4: Informations shop (nécessite un member_id valide)
  console.log('\n4️⃣ Test Informations Shop (avec ID fictif)');
  await test1688Request('/1688/shop/shop_info', {
    member_id: '123456789'
  });
  
  // Test 5: Produits d'un shop (nécessite un member_id valide)
  console.log('\n5️⃣ Test Produits Shop (avec ID fictif)');
  await test1688Request('/1688/shop/items', {
    member_id: '123456789',
    page: 1,
    limit: 3
  });
  
  // Test 6: Conversion d'image
  console.log('\n6️⃣ Test Conversion Image');
  await test1688Request('/1688/tools/image/convert_url', {
    url: 'https://example.com/test-image.jpg'
  });
  
  // Test 7: Recherche par image
  console.log('\n7️⃣ Test Recherche par Image');
  await test1688Request('/1688/search/image', {
    page: 1,
    sort: 'default'
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('🎯 RÉSUMÉ DES TESTS API 1688');
  console.log('='.repeat(60));
  
  console.log('\n📋 Endpoints testés:');
  console.log('✅ /1688/search/items - Recherche par mot-clé');
  console.log('✅ /1688/item_desc - Description produit');
  console.log('✅ /1688/shop/shop_info - Informations shop');
  console.log('✅ /1688/shop/items - Produits d\'un shop');
  console.log('✅ /1688/tools/image/convert_url - Conversion image');
  console.log('✅ /1688/search/image - Recherche par image');
  
  console.log('\n🔑 Configuration:');
  console.log(`✅ Clé RapidAPI: ${RAPID_API_KEY.substring(0, 10)}...${RAPID_API_KEY.substring(RAPID_API_KEY.length - 10)}`);
  console.log(`✅ Host: ${RAPID_API_HOST}`);
  
  console.log('\n💡 Recommandations:');
  console.log('• Vérifier la validité de la clé RapidAPI');
  console.log('• Tester avec des IDs de produits réels pour les endpoints spécifiques');
  console.log('• Considérer l\'ajout de fallbacks pour les cas d\'erreur');
  
  console.log('\n🌐 Test via l\'API Next.js:');
  console.log('curl -s "http://localhost:3002/api/scrape?keyword=iphone&limit=5" | jq \'.1688\'');
  
  console.log('\n' + '='.repeat(60));
}

// Exécuter les tests
run1688Tests().catch(console.error); 