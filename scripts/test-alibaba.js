#!/usr/bin/env node

/**
 * Script de test pour les APIs Alibaba 1688
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function testAlibabaAPI() {
  console.log('🧪 Test des APIs Alibaba 1688...\n');

  const config = {
    appKey: process.env.ALIBABA_APP_KEY,
    appSecret: process.env.ALIBABA_APP_SECRET,
    accessToken: process.env.ALIBABA_ACCESS_TOKEN,
    refreshToken: process.env.ALIBABA_REFRESH_TOKEN,
    baseURL: process.env.ALIBABA_API_BASE_URL || 'https://gw.open.1688.com/openapi'
  };

  console.log('📋 Configuration:');
  console.log('- App Key:', config.appKey ? '✅ Configuré' : '❌ Manquant');
  console.log('- App Secret:', config.appSecret ? '✅ Configuré' : '❌ Manquant');
  console.log('- Access Token:', config.accessToken ? '✅ Configuré' : '❌ Manquant');
  console.log('- Refresh Token:', config.refreshToken ? '✅ Configuré' : '❌ Manquant');
  console.log('- Base URL:', config.baseURL);
  console.log('');

  if (!config.appKey || !config.appSecret) {
    console.log('❌ Configuration incomplète');
    console.log('📝 Veuillez configurer vos clés API dans .env.local');
    console.log('🔗 Obtenir les clés: https://open.1688.com/');
    return;
  }

  try {
    // Test de l'API de recherche de catégories
    console.log('🔍 Test: Recherche de catégories...');
    const categoryResponse = await axios.post(`${config.baseURL}/alibaba.category.search`, {
      _aop_timestamp: Date.now(),
      _aop_signature: 'test_signature',
      access_token: config.accessToken,
      keyword: 'electronics'
    });
    console.log('✅ API de catégories fonctionnelle');
  } catch (error) {
    console.log('❌ Erreur API catégories:', error.message);
  }

  try {
    // Test de l'API de recherche de produits
    console.log('🔍 Test: Recherche de produits...');
    const productResponse = await axios.post(`${config.baseURL}/alibaba.product.search`, {
      _aop_timestamp: Date.now(),
      _aop_signature: 'test_signature',
      access_token: config.accessToken,
      keyword: 'smartphone',
      pageSize: 10
    });
    console.log('✅ API de produits fonctionnelle');
  } catch (error) {
    console.log('❌ Erreur API produits:', error.message);
  }

  console.log('\n🎯 Prochaines étapes:');
  console.log('1. Obtenir vos vraies clés API sur https://open.1688.com/');
  console.log('2. Mettre à jour .env.local avec vos vraies clés');
  console.log('3. Tester avec: node scripts/test-alibaba.js');
  console.log('4. Intégrer dans votre application');
}

testAlibabaAPI().catch(console.error);
