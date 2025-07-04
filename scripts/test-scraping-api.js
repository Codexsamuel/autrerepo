#!/usr/bin/env node

const API_BASE_URL = 'https://api.daveandlucesolutions.com';

async function testScrapingAPI() {
  console.log('🧪 Test de l\'API de scraping DL Style...\n');

  try {
    // Test 1: API principale
    console.log('1️⃣ Test de l\'API principale...');
    const mainResponse = await fetch(`${API_BASE_URL}/api`);
    if (mainResponse.ok) {
      const mainData = await mainResponse.json();
      console.log('✅ API principale fonctionne');
      console.log('📊 Endpoints disponibles:', Object.keys(mainData.endpoints).length);
    } else {
      console.log('❌ API principale ne répond pas');
    }

    // Test 2: API de scraping des produits
    console.log('\n2️⃣ Test de l\'API de scraping des produits...');
    const productsResponse = await fetch(`${API_BASE_URL}/api/scraping/products`);
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('✅ API de scraping fonctionne');
      console.log('📦 Produits récupérés:', productsData.total);
      console.log('🕒 Timestamp:', productsData.timestamp);
      
      // Afficher les premiers produits
      if (productsData.data && productsData.data.length > 0) {
        console.log('\n📋 Exemple de produits:');
        productsData.data.slice(0, 3).forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.name} - ${product.price} ${product.currency}`);
        });
      }
    } else {
      console.log('❌ API de scraping ne répond pas');
    }

    // Test 3: Filtrage par catégorie
    console.log('\n3️⃣ Test du filtrage par catégorie...');
    const filteredResponse = await fetch(`${API_BASE_URL}/api/scraping/products?category=Véhicules`);
    if (filteredResponse.ok) {
      const filteredData = await filteredResponse.json();
      console.log('✅ Filtrage par catégorie fonctionne');
      console.log('🚗 Véhicules trouvés:', filteredData.total);
    } else {
      console.log('❌ Filtrage par catégorie ne fonctionne pas');
    }

    // Test 4: Recherche
    console.log('\n4️⃣ Test de la recherche...');
    const searchResponse = await fetch(`${API_BASE_URL}/api/scraping/products?search=BYD`);
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('✅ Recherche fonctionne');
      console.log('🔍 Résultats pour "BYD":', searchData.total);
    } else {
      console.log('❌ Recherche ne fonctionne pas');
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

// Fonction pour tester l'API toutes les 30 secondes
async function waitForAPI() {
  console.log('⏳ Attente du déploiement de l\'API...\n');
  
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`🔄 Tentative ${attempts}/${maxAttempts}...`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api`);
      if (response.ok) {
        console.log('🎉 API en ligne ! Lancement des tests...\n');
        await testScrapingAPI();
        return;
      }
    } catch (error) {
      // API pas encore en ligne
    }
    
    if (attempts < maxAttempts) {
      console.log('⏰ Attente 30 secondes...\n');
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }
  
  console.log('❌ API non disponible après plusieurs tentatives');
  console.log('💡 Vérifiez le statut du déploiement sur Vercel');
}

// Lancement du script
if (require.main === module) {
  waitForAPI();
}

module.exports = { testScrapingAPI, waitForAPI }; 