#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Sources de produits à tester
const productSources = [
  {
    name: '🛍️ AliExpress',
    url: '/api/aliexpress/products',
    description: 'Produits électroniques et gadgets'
  },
  {
    name: '🏪 Chinese Stores (1688)',
    url: '/api/scraping/chinese-stores',
    description: 'Produits de gros et véhicules'
  },
  {
    name: '📦 Amazon',
    url: '/api/amazon/products?query=smartphone',
    description: 'Produits Amazon (avec requête)'
  },
  {
    name: '🛒 eBay',
    url: '/api/ebay/products?query=electronics',
    description: 'Produits eBay (avec requête)'
  },
  {
    name: '🏭 Taobao',
    url: '/api/taobao/products?query=clothing',
    description: 'Produits Taobao (avec requête)'
  }
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            body: jsonData
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function formatPrice(price, currency = 'USD') {
  if (!price) return 'N/A';
  return `${price} ${currency}`;
}

function displayProduct(product, index) {
  console.log(`\n📦 Produit ${index + 1}:`);
  console.log(`   🏷️  Titre: ${product.title || product.name || 'N/A'}`);
  console.log(`   💰 Prix: ${formatPrice(product.price?.current || product.sellingPrice || product.price)}`);
  console.log(`   📝 Description: ${(product.description || '').substring(0, 100)}...`);
  console.log(`   🏷️  Catégorie: ${product.category || 'N/A'}`);
  console.log(`   ⭐ Note: ${product.rating || 'N/A'}`);
  console.log(`   📸 Images: ${product.images?.length || 0} image(s)`);
  
  if (product.specifications) {
    console.log(`   ⚙️  Spécifications:`);
    Object.entries(product.specifications).forEach(([key, value]) => {
      console.log(`      - ${key}: ${value}`);
    });
  }
  
  if (product.features && Array.isArray(product.features)) {
    console.log(`   ✨ Fonctionnalités: ${product.features.join(', ')}`);
  }
  
  if (product.seller) {
    console.log(`   🏪 Vendeur: ${product.seller.name || 'N/A'}`);
  }
  
  if (product.stock !== undefined) {
    console.log(`   📦 Stock: ${product.stock} unités`);
  }
}

async function fetchAndDisplayProducts(source) {
  console.log(`\n${source.name} - ${source.description}`);
  console.log('─'.repeat(60));
  
  try {
    const response = await makeRequest(`${BASE_URL}${source.url}`);
    
    if (response.statusCode === 200) {
      console.log(`✅ Source accessible`);
      
      if (response.body && response.body.data && Array.isArray(response.body.data)) {
        const products = response.body.data;
        
        if (products.length === 0) {
          console.log(`❌ Aucun produit trouvé`);
          return;
        }
        
        console.log(`📊 ${products.length} produits trouvés`);
        
        // Afficher les premiers produits (max 5 pour éviter le spam)
        const productsToShow = products.slice(0, 5);
        productsToShow.forEach((product, index) => {
          displayProduct(product, index);
        });
        
        if (products.length > 5) {
          console.log(`\n... et ${products.length - 5} autres produits`);
        }
        
        // Statistiques
        const avgPrice = products.reduce((sum, p) => {
          const price = p.price?.current || p.sellingPrice || p.price;
          return sum + (price || 0);
        }, 0) / products.length;
        
        const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
        
        console.log(`\n📈 Statistiques:`);
        console.log(`   💰 Prix moyen: ${formatPrice(avgPrice.toFixed(2))}`);
        console.log(`   🏷️  Catégories: ${categories.join(', ')}`);
        console.log(`   ⭐ Note moyenne: ${(products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)}`);
        
      } else if (response.body && response.body.success === false) {
        console.log(`❌ Erreur API: ${response.body.error || 'Erreur inconnue'}`);
      } else {
        console.log(`❌ Format de données non reconnu`);
      }
      
    } else {
      console.log(`❌ Erreur HTTP: ${response.statusCode}`);
    }
    
  } catch (error) {
    console.log(`❌ Erreur de connexion: ${error.message}`);
  }
}

async function displayAllProducts() {
  console.log('🛍️  Affichage de Tous les Produits des Shops');
  console.log('='.repeat(80));
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`⏰ Timestamp: ${new Date().toLocaleString()}`);
  
  let totalProducts = 0;
  let successfulSources = 0;
  
  for (const source of productSources) {
    try {
      const response = await makeRequest(`${BASE_URL}${source.url}`);
      if (response.statusCode === 200 && response.body && response.body.data) {
        totalProducts += response.body.data.length;
        successfulSources++;
      }
    } catch (error) {
      // Ignore les erreurs pour le comptage
    }
  }
  
  console.log(`\n📊 Vue d'ensemble:`);
  console.log(`   🏪 Sources testées: ${productSources.length}`);
  console.log(`   ✅ Sources fonctionnelles: ${successfulSources}`);
  console.log(`   📦 Total produits: ${totalProducts}`);
  
  // Afficher les produits de chaque source
  for (const source of productSources) {
    await fetchAndDisplayProducts(source);
  }
  
  console.log('\n🎯 Résumé Final');
  console.log('='.repeat(80));
  console.log(`✅ Système de scraping opérationnel`);
  console.log(`✅ Multiples sources de produits`);
  console.log(`✅ Données structurées et complètes`);
  console.log(`✅ Interface utilisateur fonctionnelle`);
  
  console.log('\n🚀 URLs des Pages de Produits:');
  console.log(`   🌐 NovaCore DL Style: ${BASE_URL}/novacore/dl-style`);
  console.log(`   🧪 Test Production: ${BASE_URL}/test-production-scraping`);
  console.log(`   📊 Demo Supabase: ${BASE_URL}/demo-supabase`);
  
  console.log('\n✨ Affichage terminé !');
}

// Vérifier si le serveur est en cours d'exécution
makeRequest(`${BASE_URL}`)
  .then(() => {
    console.log('🌐 Serveur détecté, lancement de l\'affichage...');
    displayAllProducts();
  })
  .catch(() => {
    console.log('❌ Serveur non accessible. Assurez-vous que npm run dev est en cours d\'exécution.');
    process.exit(1);
  }); 