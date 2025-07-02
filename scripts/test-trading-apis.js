#!/usr/bin/env node

/**
 * Script de test des APIs de trading
 * Usage: node scripts/test-trading-apis.js
 */

const https = require('https');
const http = require('http');

// Configuration
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Fonction utilitaire pour faire des requêtes HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Test Alpha Vantage (Actions)
async function testAlphaVantage() {
  console.log('\n🔍 Test Alpha Vantage API (Actions)...');
  
  if (!ALPHA_VANTAGE_API_KEY) {
    console.log('❌ ALPHA_VANTAGE_API_KEY non configurée');
    console.log('💡 Obtenez une clé gratuite sur: https://www.alphavantage.co/support/#api-key');
    return;
  }
  
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const result = await makeRequest(url);
    
    if (result.status === 200) {
      const quote = result.data['Global Quote'];
      if (quote) {
        console.log('✅ Alpha Vantage API fonctionne');
        console.log(`   AAPL: $${quote['05. price']} (${quote['10. change percent']})`);
      } else {
        console.log('⚠️  Alpha Vantage API: Limite de requêtes atteinte ou erreur');
        console.log('   Réponse:', JSON.stringify(result.data, null, 2));
      }
    } else {
      console.log(`❌ Alpha Vantage API: Erreur HTTP ${result.status}`);
    }
  } catch (error) {
    console.log('❌ Alpha Vantage API: Erreur de connexion');
    console.log('   Erreur:', error.message);
  }
}

// Test CoinGecko (Cryptomonnaies)
async function testCoinGecko() {
  console.log('\n🔍 Test CoinGecko API (Cryptomonnaies)...');
  
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true';
    const result = await makeRequest(url);
    
    if (result.status === 200) {
      console.log('✅ CoinGecko API fonctionne');
      console.log(`   Bitcoin: $${result.data.bitcoin.usd} (${result.data.bitcoin.usd_24h_change.toFixed(2)}%)`);
      console.log(`   Ethereum: $${result.data.ethereum.usd} (${result.data.ethereum.usd_24h_change.toFixed(2)}%)`);
    } else {
      console.log(`❌ CoinGecko API: Erreur HTTP ${result.status}`);
    }
  } catch (error) {
    console.log('❌ CoinGecko API: Erreur de connexion');
    console.log('   Erreur:', error.message);
  }
}

// Test Exchange Rate API (Forex)
async function testExchangeRate() {
  console.log('\n🔍 Test Exchange Rate API (Forex)...');
  
  try {
    const url = 'https://api.exchangerate-api.com/v4/latest/EUR';
    const result = await makeRequest(url);
    
    if (result.status === 200) {
      console.log('✅ Exchange Rate API fonctionne');
      console.log(`   EUR/USD: ${result.data.rates.USD}`);
      console.log(`   EUR/GBP: ${result.data.rates.GBP}`);
      console.log(`   Date: ${result.data.date}`);
    } else {
      console.log(`❌ Exchange Rate API: Erreur HTTP ${result.status}`);
    }
  } catch (error) {
    console.log('❌ Exchange Rate API: Erreur de connexion');
    console.log('   Erreur:', error.message);
  }
}

// Test de notre API locale
async function testLocalAPI() {
  console.log('\n🔍 Test API locale...');
  
  try {
    const url = 'http://localhost:3000/api/trading/real-data?symbols=AAPL,bitcoin,EUR/USD&portfolio=true';
    const result = await makeRequest(url);
    
    if (result.status === 200) {
      console.log('✅ API locale fonctionne');
      console.log('   Données récupérées:', Object.keys(result.data));
      
      if (result.data.symbols) {
        console.log(`   Symboles: ${result.data.symbols.length} récupérés`);
      }
      
      if (result.data.portfolio) {
        console.log(`   Portefeuille: ${result.data.portfolio.length} positions`);
      }
    } else {
      console.log(`❌ API locale: Erreur HTTP ${result.status}`);
      console.log('   Assurez-vous que le serveur Next.js est démarré');
    }
  } catch (error) {
    console.log('❌ API locale: Erreur de connexion');
    console.log('   Erreur:', error.message);
    console.log('   Assurez-vous que le serveur Next.js est démarré sur http://localhost:3000');
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Test des APIs de Trading');
  console.log('============================');
  
  await testCoinGecko();
  await testExchangeRate();
  await testAlphaVantage();
  await testLocalAPI();
  
  console.log('\n📋 Résumé des APIs:');
  console.log('✅ CoinGecko: Cryptomonnaies (gratuit, pas de clé requise)');
  console.log('✅ Exchange Rate: Forex (gratuit, pas de clé requise)');
  console.log('⚠️  Alpha Vantage: Actions (clé requise, limite de 5 requêtes/min en gratuit)');
  console.log('💡 Pour les actions, vous pouvez aussi utiliser Yahoo Finance ou d\'autres APIs');
  
  console.log('\n🔧 Configuration recommandée:');
  console.log('1. Obtenez une clé Alpha Vantage gratuite');
  console.log('2. Ajoutez ALPHA_VANTAGE_API_KEY à vos variables d\'environnement');
  console.log('3. Redémarrez votre serveur Next.js');
  console.log('4. Testez la page /demo/real-trading');
}

// Exécution
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testAlphaVantage, testCoinGecko, testExchangeRate, testLocalAPI }; 