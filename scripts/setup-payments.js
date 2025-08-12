#!/usr/bin/env node

/**
 * Script de configuration du système de paiements NovaIA
 * Configure Stripe, Supabase, Orange Money et MoMo
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Configuration du système de paiements NovaIA...');
console.log('=' * 60);

// Vérifier les variables d'environnement
function checkEnvironmentVariables() {
  console.log('\n🔍 Vérification des variables d\'environnement...');
  
  const requiredVars = [
    // Stripe
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    
    // Supabase
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    
    // Orange Money
    'ORANGE_MONEY_MERCHANT_ID',
    'ORANGE_MONEY_API_KEY',
    'ORANGE_MONEY_SECRET_KEY',
    'ORANGE_MONEY_CALLBACK_URL',
    
    // MoMo
    'MOMO_MERCHANT_ID',
    'MOMO_API_KEY',
    'MOMO_SECRET_KEY',
    'MOMO_CALLBACK_URL'
  ];
  
  const missingVars = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    console.log('❌ Variables d\'environnement manquantes:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    console.log('\n📝 Veuillez configurer ces variables dans votre fichier .env.local');
    return false;
  }
  
  console.log('✅ Toutes les variables d\'environnement sont configurées');
  return true;
}

// Créer le fichier .env.local
function createEnvFile() {
  console.log('\n📝 Création du fichier .env.local...');
  
  const envContent = `# NOVAIA PAYMENT SYSTEM - Variables d'environnement
# Copier ce fichier et configurer les valeurs

# ============================================================================
# STRIPE PAYMENT SYSTEM
# ============================================================================
STRIPE_SECRET_KEY=sk_test_... # Clé secrète Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Clé publique Stripe
STRIPE_WEBHOOK_SECRET=whsec_... # Secret webhook Stripe

# ============================================================================
# SUPABASE DATABASE
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://... # URL Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... # Clé anonyme Supabase
SUPABASE_SERVICE_ROLE_KEY=eyJ... # Clé service Supabase

# ============================================================================
# ORANGE MONEY
# ============================================================================
ORANGE_MONEY_MERCHANT_ID=om_merchant_... # ID marchand Orange Money
ORANGE_MONEY_API_KEY=om_api_... # Clé API Orange Money
ORANGE_MONEY_SECRET_KEY=om_secret_... # Clé secrète Orange Money
ORANGE_MONEY_CALLBACK_URL=https://.../api/payments/orange-money/webhook # URL webhook

# ============================================================================
# MOMO (MOBILE MONEY)
# ============================================================================
MOMO_MERCHANT_ID=momo_merchant_... # ID marchand MoMo
MOMO_API_KEY=momo_api_... # Clé API MoMo
MOMO_SECRET_KEY=momo_secret_... # Clé secrète MoMo
MOMO_CALLBACK_URL=https://.../api/payments/momo/webhook # URL webhook

# ============================================================================
# NOVAIA CORE
# ============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000 # URL de l'application
NOVAIA_API_KEY=novaia_... # Clé API NovaIA
NOVAIA_WEBHOOK_URL=https://... # URL webhook NovaIA

# ============================================================================
# ENVIRONMENT
# ============================================================================
NODE_ENV=development # Environment (development/production)
`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    console.log('⚠️ Le fichier .env.local existe déjà');
    return true;
  }
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fichier .env.local créé avec succès');
    return true;
  } catch (error) {
    console.log('❌ Erreur lors de la création du fichier .env.local:', error.message);
    return false;
  }
}

// Vérifier la structure des dossiers
function checkDirectoryStructure() {
  console.log('\n📁 Vérification de la structure des dossiers...');
  
  const requiredDirs = [
    'lib/payments',
    'components/payments',
    'app/api/payments',
    'database',
    'scripts'
  ];
  
  const missingDirs = [];
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      missingDirs.push(dir);
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`   ✅ Dossier créé: ${dir}`);
      } catch (error) {
        console.log(`   ❌ Erreur création dossier ${dir}:`, error.message);
      }
    } else {
      console.log(`   ✅ Dossier existant: ${dir}`);
    }
  }
  
  return missingDirs.length === 0;
}

// Vérifier les dépendances
function checkDependencies() {
  console.log('\n📦 Vérification des dépendances...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Fichier package.json non trouvé');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const requiredDeps = [
      '@stripe/stripe-js',
      '@stripe/react-stripe-js',
      'stripe',
      '@supabase/supabase-js'
    ];
    
    const missingDeps = [];
    
    for (const dep of requiredDeps) {
      if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
        missingDeps.push(dep);
      }
    }
    
    if (missingDeps.length > 0) {
      console.log('⚠️ Dépendances manquantes:');
      missingDeps.forEach(dep => console.log(`   - ${dep}`));
      console.log('\n📝 Installez les dépendances avec: npm install');
      return false;
    }
    
    console.log('✅ Toutes les dépendances sont installées');
    return true;
  } catch (error) {
    console.log('❌ Erreur lors de la lecture du package.json:', error.message);
    return false;
  }
}

// Instructions de configuration
function showSetupInstructions() {
  console.log('\n📋 Instructions de configuration:');
  console.log('=' * 60);
  
  console.log('\n1. 🔑 Configuration Stripe:');
  console.log('   - Créez un compte sur https://stripe.com');
  console.log('   - Récupérez vos clés API dans le dashboard');
  console.log('   - Configurez les webhooks pour /api/payments/webhook');
  
  console.log('\n2. 🟠 Configuration Orange Money:');
  console.log('   - Contactez Orange Money pour un compte marchand');
  console.log('   - Récupérez vos clés API et ID marchand');
  console.log('   - Configurez les webhooks pour /api/payments/orange-money/webhook');
  console.log('   - Pays supportés: France, Côte d\'Ivoire, Sénégal, Mali, Madagascar, Cameroun');
  
  console.log('\n3. 📱 Configuration MoMo (Mobile Money):');
  console.log('   - Contactez MoMo pour un compte marchand');
  console.log('   - Récupérez vos clés API et ID marchand');
  console.log('   - Configurez les webhooks pour /api/payments/momo/webhook');
  console.log('   - Pays supportés: Ghana, Kenya, Tanzanie, Ouganda, Rwanda');
  
  console.log('\n4. 🗄️ Configuration Supabase:');
  console.log('   - Créez un projet sur https://supabase.com');
  console.log('   - Récupérez vos clés API');
  console.log('   - Exécutez les scripts de migration:');
  console.log('     npm run db:migrate');
  console.log('     psql -d novaia -f database/mobile_money_schema.sql');
  
  console.log('\n5. 🌐 Configuration Vercel:');
  console.log('   - Ajoutez les variables d\'environnement dans votre projet Vercel');
  console.log('   - Configurez les webhooks Stripe, Orange Money et MoMo');
  
  console.log('\n6. 🧪 Test local:');
  console.log('   - Copiez .env.local et configurez les valeurs');
  console.log('   - Lancez l\'application: npm run dev');
  console.log('   - Testez les différents moyens de paiement');
  
  console.log('\n7. 🚀 Déploiement:');
  console.log('   - Déployez sur Vercel: vercel --prod');
  console.log('   - Mettez à jour tous les webhooks avec l\'URL de production');
  console.log('   - Testez les paiements en mode production');
}

// Fonction principale
async function main() {
  try {
    console.log('🚀 Démarrage de la configuration NovaIA...');
    
    // Vérifications
    const envOk = checkEnvironmentVariables();
    const dirsOk = checkDirectoryStructure();
    const depsOk = checkDependencies();
    
    // Créer le fichier .env.local si nécessaire
    if (!envOk) {
      createEnvFile();
    }
    
    // Résumé
    console.log('\n📊 Résumé de la configuration:');
    console.log('=' * 40);
    console.log(`   Variables d'environnement: ${envOk ? '✅' : '❌'}`);
    console.log(`   Structure des dossiers: ${dirsOk ? '✅' : '❌'}`);
    console.log(`   Dépendances: ${depsOk ? '✅' : '❌'}`);
    
    if (envOk && dirsOk && depsOk) {
      console.log('\n🎉 Configuration complète ! NovaIA est prêt pour tous les moyens de paiement.');
    } else {
      console.log('\n⚠️ Configuration partielle. Suivez les instructions ci-dessous.');
    }
    
    // Afficher les instructions
    showSetupInstructions();
    
    console.log('\n🔗 Liens utiles:');
    console.log('   - Documentation Stripe: https://stripe.com/docs');
    console.log('   - Documentation Orange Money: https://developers.orange.com');
    console.log('   - Documentation MoMo: https://developers.momo.com');
    console.log('   - Documentation Supabase: https://supabase.com/docs');
    console.log('   - Documentation Vercel: https://vercel.com/docs');
    
    console.log('\n🌍 NOVAIA SUPPORTE MAINTENANT:');
    console.log('   💳 Cartes bancaires (Stripe)');
    console.log('   🟠 Orange Money (Afrique de l\'Ouest)');
    console.log('   📱 MoMo (Afrique de l\'Est)');
    console.log('   🏦 Virements bancaires (SEPA, ACH, SWIFT)');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la configuration:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = {
  checkEnvironmentVariables,
  createEnvFile,
  checkDirectoryStructure,
  checkDependencies
}; 