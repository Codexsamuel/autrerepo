const https = require('https');

// Configuration
const NETLIFY_SITE_ID = 'davyetlucie'; // Votre site Netlify
const VERCEL_BACKEND_URL = 'https://autrerepo-69ck.vercel.app'; // Backend Vercel
const NETLIFY_FRONTEND_URL = 'https://daveandlucesolutions.com'; // Frontend Netlify

console.log('🔧 Configuration des variables d\'environnement Netlify...\n');

// Variables d'environnement à configurer sur Netlify
const NETLIFY_ENV_VARS = {
  // Configuration de base
  NODE_ENV: 'production',
  NEXT_PUBLIC_APP_URL: NETLIFY_FRONTEND_URL,
  NEXT_PUBLIC_API_URL: VERCEL_BACKEND_URL,
  
  // Supabase (à configurer avec vos vraies valeurs)
  NEXT_PUBLIC_SUPABASE_URL: 'your_supabase_url_here',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your_supabase_anon_key_here',
  SUPABASE_SERVICE_ROLE_KEY: 'your_supabase_service_role_key_here',
  
  // Clerk Authentication (à configurer)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'your_clerk_publishable_key_here',
  CLERK_SECRET_KEY: 'your_clerk_secret_key_here',
  
  // Stripe (à configurer)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'your_stripe_publishable_key_here',
  STRIPE_SECRET_KEY: 'your_stripe_secret_key_here',
  STRIPE_WEBHOOK_SECRET: 'your_stripe_webhook_secret_here',
  
  // OpenAI (à configurer)
  OPENAI_API_KEY: 'your_openai_api_key_here',
  
  // Trading APIs (à configurer)
  META_API_TOKEN: 'your_meta_api_token_here',
  META_API_ACCOUNT_ID: 'your_meta_api_account_id_here',
  
  // Google APIs (à configurer)
  GOOGLE_ANALYTICS_ID: 'your_google_analytics_id_here',
  GOOGLE_MY_BUSINESS_CLIENT_ID: 'your_google_my_business_client_id_here',
  
  // Email (à configurer)
  SENDGRID_API_KEY: 'your_sendgrid_api_key_here',
  
  // Sécurité
  JWT_SECRET: 'your_jwt_secret_here',
  ENCRYPTION_KEY: 'your_encryption_key_here',
  
  // Feature flags
  ENABLE_SCRAPING: 'true',
  ENABLE_AI_TRADING: 'true',
  ENABLE_TELEGRAM_BOT: 'true',
  
  // URLs de redirection
  NEXT_PUBLIC_VERCEL_URL: VERCEL_BACKEND_URL,
  NEXT_PUBLIC_NETLIFY_DEPLOY_URL: NETLIFY_FRONTEND_URL
};

// Test de connexion au backend Vercel
function testBackendConnection() {
  return new Promise((resolve) => {
    console.log('🔗 Test de connexion au backend Vercel...');
    
    const req = https.get(`${VERCEL_BACKEND_URL}/api/debug/env`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ Backend Vercel accessible`);
            console.log(`   📝 Environment: ${jsonData.environment || 'N/A'}`);
            console.log(`   🔧 Variables configurées: ${jsonData.configuredVars || 0}`);
            
            // Afficher les variables importantes
            if (jsonData.variables) {
              console.log(`   🗄️ SUPABASE_URL: ${jsonData.variables.NEXT_PUBLIC_SUPABASE_URL || '❌ Manquant'}`);
              console.log(`   🔑 OPENAI_API_KEY: ${jsonData.variables.OPENAI_API_KEY || '❌ Manquant'}`);
              console.log(`   💳 STRIPE_SECRET_KEY: ${jsonData.variables.STRIPE_SECRET_KEY || '❌ Manquant'}`);
            }
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
          }
        } else {
          console.log(`   ❌ Backend non accessible (${res.statusCode})`);
        }
        
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Test de connexion au frontend Netlify
function testFrontendConnection() {
  return new Promise((resolve) => {
    console.log('\n🌐 Test de connexion au frontend Netlify...');
    
    const req = https.get(NETLIFY_FRONTEND_URL, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Content-Type: ${res.headers['content-type'] || 'N/A'}`);
      
      if (res.statusCode === 200) {
        console.log(`   ✅ Frontend Netlify accessible`);
        console.log(`   🔗 URL: ${NETLIFY_FRONTEND_URL}`);
      } else {
        console.log(`   ❌ Frontend non accessible (${res.statusCode})`);
      }
      
      resolve(res.statusCode === 200);
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Test des APIs de scraping via le backend Vercel
function testScrapingAPIs() {
  return new Promise((resolve) => {
    console.log('\n📡 Test des APIs de scraping via le backend Vercel...');
    
    const req = https.get(`${VERCEL_BACKEND_URL}/api/scraping/products?q=phone`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`   ✅ API Scraping fonctionnelle`);
            console.log(`   📦 Produits trouvés: ${jsonData.products?.length || 0}`);
            console.log(`   🔍 Requête: ${jsonData.query || 'N/A'}`);
          } catch (e) {
            console.log(`   ❌ Réponse non-JSON: ${data.substring(0, 200)}...`);
          }
        } else {
          console.log(`   ❌ API Scraping non accessible (${res.statusCode})`);
        }
        
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Erreur réseau: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('   ⏰ Timeout après 10 secondes');
      req.destroy();
      resolve(false);
    });
  });
}

// Générer le fichier .env.local pour Netlify
function generateNetlifyEnvFile() {
  console.log('\n📝 Génération du fichier .env.local pour Netlify...');
  
  const envContent = Object.entries(NETLIFY_ENV_VARS)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  const fs = require('fs');
  fs.writeFileSync('.env.local', envContent);
  
  console.log('   ✅ Fichier .env.local généré');
  console.log('   📄 Variables à configurer:', Object.keys(NETLIFY_ENV_VARS).length);
  
  return envContent;
}

// Instructions pour configurer Netlify
function printNetlifyInstructions() {
  console.log('\n' + '='.repeat(80));
  console.log('📋 INSTRUCTIONS POUR CONFIGURER NETLIFY');
  console.log('='.repeat(80));
  
  console.log('\n🔧 ÉTAPES À SUIVRE:');
  console.log('\n1. Allez sur https://app.netlify.com/');
  console.log('2. Sélectionnez votre projet "davyetlucie"');
  console.log('3. Allez dans "Site settings" > "Environment variables"');
  console.log('4. Ajoutez les variables suivantes:');
  
  Object.entries(NETLIFY_ENV_VARS).forEach(([key, value]) => {
    console.log(`   ${key} = ${value}`);
  });
  
  console.log('\n⚠️ IMPORTANT:');
  console.log('• Remplacez "your_*_here" par vos vraies valeurs');
  console.log('• Les variables NEXT_PUBLIC_* sont accessibles côté client');
  console.log('• Les autres variables sont côté serveur uniquement');
  
  console.log('\n🔗 URLs de votre architecture:');
  console.log(`   Frontend (Netlify): ${NETLIFY_FRONTEND_URL}`);
  console.log(`   Backend (Vercel): ${VERCEL_BACKEND_URL}`);
  console.log(`   Test des variables: ${NETLIFY_FRONTEND_URL}/test-env`);
  
  console.log('\n✅ APRÈS CONFIGURATION:');
  console.log('1. Redéployez votre site Netlify');
  console.log('2. Testez la page /test-env');
  console.log('3. Vérifiez que le scraping fonctionne');
  
  console.log('\n' + '='.repeat(80));
}

// Exécution des tests
async function runSetup() {
  console.log('🚀 Configuration de l\'architecture Netlify + Vercel...\n');
  
  const results = await Promise.all([
    testBackendConnection(),
    testFrontendConnection(),
    testScrapingAPIs()
  ]);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS DES TESTS');
  console.log('='.repeat(60));
  
  console.log(`🔗 Backend Vercel: ${results[0] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`🌐 Frontend Netlify: ${results[1] ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`📡 API Scraping: ${results[2] ? '✅ OK' : '❌ ÉCHEC'}`);
  
  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;
  
  console.log(`\n📈 Score: ${successCount}/${totalCount} tests réussis`);
  
  if (successCount === totalCount) {
    console.log('🎉 Architecture opérationnelle !');
    console.log('📝 Génération des variables d\'environnement...');
    generateNetlifyEnvFile();
  } else {
    console.log('\n⚠️ PROBLÈMES DÉTECTÉS:');
    
    if (!results[0]) {
      console.log('   • Le backend Vercel n\'est pas accessible');
      console.log('   • Vérifiez le déploiement Vercel');
    }
    
    if (!results[1]) {
      console.log('   • Le frontend Netlify n\'est pas accessible');
      console.log('   • Vérifiez le déploiement Netlify');
    }
    
    if (!results[2]) {
      console.log('   • Les APIs de scraping ne fonctionnent pas');
      console.log('   • Vérifiez les variables d\'environnement Vercel');
    }
  }
  
  printNetlifyInstructions();
}

// Exécution
runSetup().catch(console.error); 