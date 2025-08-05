#!/usr/bin/env node

console.log('🔍 Test de Configuration Environnement - DL Style');
console.log('=' .repeat(60));

// Fonction pour vérifier une variable d'environnement
function checkEnvVar(name, required = true, description = '') {
  const value = process.env[name];
  const status = value ? '✅' : '❌';
  const requiredText = required ? '(Requis)' : '(Optionnel)';
  
  console.log(`${status} ${name} ${requiredText}`);
  
  if (value) {
    // Masquer les valeurs sensibles
    if (name.includes('KEY') || name.includes('SECRET') || name.includes('TOKEN')) {
      const maskedValue = value.length > 20 ? 
        value.substring(0, 10) + '...' + value.substring(value.length - 10) : 
        '***' + value.substring(value.length - 4);
      console.log(`   Valeur: ${maskedValue}`);
    } else {
      console.log(`   Valeur: ${value}`);
    }
  } else if (required) {
    console.log(`   ⚠️ Variable manquante - ${description}`);
  }
  
  return !!value;
}

// Fonction pour tester la connexion Supabase
async function testSupabaseConnection() {
  console.log('\n🗄️ Test Connexion Supabase...');
  
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Variables Supabase manquantes');
      return false;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test simple de connexion
    const { data, error } = await supabase
      .from('scraped_products')
      .select('count', { count: 'exact', head: true });
    
    if (error && error.code !== 'PGRST116') {
      console.log('❌ Erreur connexion Supabase:', error.message);
      return false;
    }
    
    console.log('✅ Connexion Supabase réussie');
    return true;
  } catch (error) {
    console.log('❌ Erreur test Supabase:', error.message);
    return false;
  }
}

// Fonction pour tester RapidAPI
async function testRapidAPI() {
  console.log('\n🔑 Test RapidAPI...');
  
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  
  if (!rapidApiKey) {
    console.log('❌ Clé RapidAPI manquante');
    return false;
  }
  
  try {
    const https = require('https');
    
    // Test simple avec l'API de traduction
    const options = {
      hostname: 'google-translate1.p.rapidapi.com',
      port: 443,
      path: '/language/translate/v2',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': rapidApiKey,
      }
    };
    
    const testData = 'q=Hello&target=fr&source=en';
    
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({ status: res.statusCode, data: jsonData });
          } catch (error) {
            resolve({ status: res.statusCode, data: data });
          }
        });
      });
      
      req.on('error', reject);
      req.write(testData);
      req.end();
    });
    
    if (response.status === 200) {
      console.log('✅ RapidAPI fonctionnel');
      return true;
    } else {
      console.log(`⚠️ RapidAPI: Status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur test RapidAPI:', error.message);
    return false;
  }
}

// Test principal
async function runEnvTests() {
  console.log('🚀 Démarrage des tests de configuration...\n');
  
  let criticalVars = 0;
  let optionalVars = 0;
  let totalCritical = 0;
  let totalOptional = 0;
  
  // Variables critiques
  console.log('📋 Variables Critiques:');
  console.log('-'.repeat(40));
  
  const criticalVarsList = [
    { name: 'RAPIDAPI_KEY', desc: 'Clé principale RapidAPI' },
    { name: 'NEXT_PUBLIC_SUPABASE_URL', desc: 'URL Supabase' },
    { name: 'SUPABASE_SERVICE_ROLE_KEY', desc: 'Clé service Supabase' },
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', desc: 'Clé anonyme Supabase' },
    { name: 'NODE_ENV', desc: 'Environnement Node.js' },
    { name: 'NEXT_PUBLIC_APP_URL', desc: 'URL de l\'application' }
  ];
  
  criticalVarsList.forEach(({ name, desc }) => {
    totalCritical++;
    if (checkEnvVar(name, true, desc)) {
      criticalVars++;
    }
  });
  
  // Variables optionnelles
  console.log('\n📋 Variables Optionnelles:');
  console.log('-'.repeat(40));
  
  const optionalVarsList = [
    { name: 'DEFAULT_PROFIT_MARGIN', desc: 'Marge bénéficiaire par défaut' },
    { name: 'CACHE_DURATION_HOURS', desc: 'Durée du cache' },
    { name: 'TRANSLATION_TARGET_LANG', desc: 'Langue cible traduction' },
    { name: 'EUR_TO_USD_RATE', desc: 'Taux EUR/USD' },
    { name: 'RATE_LIMIT_REQUESTS_PER_MINUTE', desc: 'Limite requêtes/minute' },
    { name: 'API_TIMEOUT_MS', desc: 'Timeout API' },
    { name: 'LOG_LEVEL', desc: 'Niveau de log' },
    { name: 'ALIEXPRESS_MARGIN', desc: 'Marge AliExpress' },
    { name: 'EBAY_MARGIN', desc: 'Marge eBay' },
    { name: 'TAOBAO_MARGIN', desc: 'Marge Taobao' },
    { name: 'MARGIN_1688', desc: 'Marge 1688' },
    { name: 'GOOGLE_SHOPPING_MARGIN', desc: 'Marge Google Shopping' }
  ];
  
  optionalVarsList.forEach(({ name, desc }) => {
    totalOptional++;
    if (checkEnvVar(name, false, desc)) {
      optionalVars++;
    }
  });
  
  // Tests de connexion
  console.log('\n🔗 Tests de Connexion:');
  console.log('-'.repeat(40));
  
  const supabaseOk = await testSupabaseConnection();
  const rapidApiOk = await testRapidAPI();
  
  // Résumé
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ DE LA CONFIGURATION');
  console.log('='.repeat(60));
  
  console.log(`\n✅ Variables critiques: ${criticalVars}/${totalCritical}`);
  console.log(`⚠️ Variables optionnelles: ${optionalVars}/${totalOptional}`);
  console.log(`🗄️ Supabase: ${supabaseOk ? '✅ Connecté' : '❌ Erreur'}`);
  console.log(`🔑 RapidAPI: ${rapidApiOk ? '✅ Fonctionnel' : '❌ Erreur'}`);
  
  // Évaluation globale
  const criticalScore = (criticalVars / totalCritical) * 100;
  const optionalScore = (optionalVars / totalOptional) * 100;
  const connectionScore = ((supabaseOk ? 1 : 0) + (rapidApiOk ? 1 : 0)) / 2 * 100;
  
  const globalScore = (criticalScore * 0.6) + (connectionScore * 0.4);
  
  console.log(`\n🎯 Score global: ${globalScore.toFixed(1)}%`);
  
  if (globalScore >= 90) {
    console.log('🚀 Configuration EXCELLENTE - Prêt pour la production !');
  } else if (globalScore >= 70) {
    console.log('✅ Configuration BONNE - Fonctionnel avec quelques améliorations');
  } else if (globalScore >= 50) {
    console.log('⚠️ Configuration MOYENNE - Nécessite des corrections');
  } else {
    console.log('❌ Configuration INSUFFISANTE - Corrections critiques requises');
  }
  
  // Recommandations
  console.log('\n💡 Recommandations:');
  
  if (criticalVars < totalCritical) {
    console.log('• Ajouter les variables critiques manquantes');
  }
  
  if (!supabaseOk) {
    console.log('• Vérifier la configuration Supabase');
  }
  
  if (!rapidApiOk) {
    console.log('• Vérifier la clé RapidAPI');
  }
  
  if (optionalVars < totalOptional * 0.5) {
    console.log('• Considérer l\'ajout des variables optionnelles pour optimiser le système');
  }
  
  console.log('\n🌐 URLs de test:');
  console.log('• Démo Supabase: http://localhost:3002/demo-supabase');
  console.log('• Test Scraping: http://localhost:3002/test-scraping');
  console.log('• DL Style: http://localhost:3002/novacore/dl-style');
  
  console.log('\n' + '='.repeat(60));
}

// Exécuter les tests
runEnvTests().catch(console.error); 