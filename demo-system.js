#!/usr/bin/env node

const http = require('http');
const readline = require('readline');

const BASE_URL = 'http://localhost:3000';

// Interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour faire une requête HTTP
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    if (options.data) req.write(options.data);
    req.end();
  });
}

// Fonction pour afficher un produit
function displayProduct(product, index = 1) {
  console.log(`\n${index}. 📦 ${product.title}`);
  console.log(`   💰 ${product.price} ${product.currency}`);
  console.log(`   ⭐ ${product.rating?.toFixed(1) || 'N/A'} (${product.reviews || 0} avis)`);
  console.log(`   🏪 ${product.platform}`);
  console.log(`   📝 ${product.description.substring(0, 100)}...`);
}

// Fonction pour tester le scraping
async function testScraping(platform, category, limit = 3) {
  console.log(`\n🔍 Test du scraping ${platform} - Catégorie: ${category}`);
  console.log('=' .repeat(50));
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/scraping/multi-market',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ platform, category, limit })
    });
    
    if (response.status === 200) {
      const result = JSON.parse(response.data);
      if (result.success) {
        console.log(`✅ ${result.data.totalResults} produits trouvés`);
        result.data.products.forEach((product, index) => {
          displayProduct(product, index + 1);
        });
      } else {
        console.log(`❌ Erreur: ${result.message}`);
      }
    } else {
      console.log(`❌ Erreur HTTP: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Erreur de connexion: ${error.message}`);
  }
}

// Menu principal
function showMenu() {
  console.log('\n' + '=' .repeat(60));
  console.log('🚀 DÉMONSTRATION SYSTÈME DL SOLUTIONS');
  console.log('=' .repeat(60));
  console.log('1. 🔍 Test scraping Alibaba (vehicles)');
  console.log('2. 👗 Test scraping Shein (women-clothing)');
  console.log('3. 🛋️  Test scraping Cdiscount (furniture)');
  console.log('4. 📱 Test scraping Amazon (electronics)');
  console.log('5. 👔 Test scraping eBay (men-clothing)');
  console.log('6. 🛍️  Test scraping AliExpress (women-clothing)');
  console.log('7. 🌍 Test scraping toutes plateformes');
  console.log('8. 📊 Test avec filtres de prix');
  console.log('9. 🔄 Test performance (multiples requêtes)');
  console.log('10. 🌐 Ouvrir pages web');
  console.log('0. ❌ Quitter');
  console.log('=' .repeat(60));
}

// Fonction pour ouvrir les pages web
function openWebPages() {
  console.log('\n🌐 Ouverture des pages web...');
  const pages = [
    { name: 'Accueil', url: 'http://localhost:3000' },
    { name: 'Formations', url: 'http://localhost:3000/formations' },
    { name: 'NovaWorld', url: 'http://localhost:3000/novaworld' },
    { name: 'DL-Style', url: 'http://localhost:3000/dl-style' },
    { name: 'Scraping', url: 'http://localhost:3000/scraping-multi-market' }
  ];
  
  pages.forEach(page => {
    console.log(`   📄 ${page.name}: ${page.url}`);
  });
  
  // Ouvrir la page principale
  require('child_process').exec(`open ${BASE_URL}`);
}

// Fonction pour tester la performance
async function testPerformance() {
  console.log('\n⚡ Test de performance...');
  console.log('=' .repeat(40));
  
  const platforms = ['alibaba', 'shein', 'cdiscount', 'amazon', 'ebay', 'aliexpress'];
  const startTime = Date.now();
  
  const promises = platforms.map(async (platform) => {
    const platformStart = Date.now();
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: '/api/scraping/multi-market',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ platform, category: 'electronics', limit: 1 })
      });
      
      const duration = Date.now() - platformStart;
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`   ${status} ${platform}: ${duration}ms`);
      return { platform, success: response.status === 200, duration };
    } catch (error) {
      const duration = Date.now() - platformStart;
      console.log(`   ❌ ${platform}: ${duration}ms (erreur)`);
      return { platform, success: false, duration };
    }
  });
  
  const results = await Promise.all(promises);
  const totalTime = Date.now() - startTime;
  const successCount = results.filter(r => r.success).length;
  
  console.log('\n📊 Résultats:');
  console.log(`   ⏱️  Temps total: ${totalTime}ms`);
  console.log(`   ✅ Succès: ${successCount}/${platforms.length}`);
  console.log(`   📈 Taux de réussite: ${Math.round((successCount / platforms.length) * 100)}%`);
}

// Boucle principale
async function main() {
  console.log('🚀 Démarrage de la démonstration DL Solutions...');
  
  while (true) {
    showMenu();
    
    const choice = await new Promise(resolve => {
      rl.question('\nChoisissez une option (0-10): ', resolve);
    });
    
    switch (choice.trim()) {
      case '1':
        await testScraping('alibaba', 'vehicles');
        break;
      case '2':
        await testScraping('shein', 'women-clothing');
        break;
      case '3':
        await testScraping('cdiscount', 'furniture');
        break;
      case '4':
        await testScraping('amazon', 'electronics');
        break;
      case '5':
        await testScraping('ebay', 'men-clothing');
        break;
      case '6':
        await testScraping('aliexpress', 'women-clothing');
        break;
      case '7':
        await testScraping('all', 'vehicles', 5);
        break;
      case '8':
        console.log('\n🔍 Test avec filtres de prix (100-500€)...');
        try {
          const response = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/api/scraping/multi-market',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ 
              platform: 'cdiscount', 
              category: 'furniture', 
              limit: 3,
              minPrice: 100,
              maxPrice: 500
            })
          });
          
          if (response.status === 200) {
            const result = JSON.parse(response.data);
            console.log(`✅ ${result.data.totalResults} produits trouvés dans la fourchette de prix`);
            result.data.products.forEach((product, index) => {
              displayProduct(product, index + 1);
            });
          }
        } catch (error) {
          console.log(`❌ Erreur: ${error.message}`);
        }
        break;
      case '9':
        await testPerformance();
        break;
      case '10':
        openWebPages();
        break;
      case '0':
        console.log('\n👋 Merci d\'avoir testé le système DL Solutions !');
        rl.close();
        return;
      default:
        console.log('\n❌ Option invalide. Veuillez choisir 0-10.');
    }
    
    await new Promise(resolve => {
      rl.question('\nAppuyez sur Entrée pour continuer...', resolve);
    });
  }
}

// Gestion des erreurs
process.on('SIGINT', () => {
  console.log('\n\n👋 Démonstration interrompue. Au revoir !');
  rl.close();
  process.exit(0);
});

// Démarrage
main().catch(console.error); 