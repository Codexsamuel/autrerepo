#!/usr/bin/env node

/**
 * Script pour nettoyer les variables d'environnement
 * et respecter la limite de 4KB d'AWS Lambda
 */

const fs = require('fs');
const path = require('path');

// Variables essentielles uniquement
const essentialVars = [
  'NEXT_PUBLIC_APP_URL',
  'NODE_ENV',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'DATABASE_URL',
  'JWT_SECRET',
  'SESSION_SECRET',
  'LOG_LEVEL',
  'DEBUG_MODE'
];

// Variables optionnelles (à ajouter seulement si nécessaires)
const optionalVars = [
  'OPENAI_API_KEY',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'CINETPAY_API_KEY',
  'CINETPAY_SITE_ID'
];

function createMinimalEnv() {
  const minimalEnv = essentialVars.map(varName => `${varName}=your_${varName.toLowerCase()}`).join('\n');
  
  const outputPath = path.join(__dirname, '..', 'config', 'env.netlify.minimal');
  fs.writeFileSync(outputPath, minimalEnv);
  
  console.log('✅ Fichier .env minimal créé:', outputPath);
  console.log('📝 Variables essentielles:', essentialVars.length);
  console.log('💡 Ajoutez seulement ces variables dans Netlify pour respecter la limite 4KB');
}

function checkEnvSize(envContent) {
  const sizeInBytes = Buffer.byteLength(envContent, 'utf8');
  const sizeInKB = sizeInBytes / 1024;
  
  console.log(`📊 Taille des variables d'environnement: ${sizeInKB.toFixed(2)} KB`);
  
  if (sizeInKB > 4) {
    console.log('❌ DÉPASSE la limite de 4KB d\'AWS Lambda');
    console.log('💡 Utilisez seulement les variables essentielles');
  } else {
    console.log('✅ Respecte la limite de 4KB');
  }
  
  return sizeInKB;
}

// Exécution
if (require.main === module) {
  console.log('🧹 Nettoyage des variables d\'environnement pour Netlify...\n');
  
  createMinimalEnv();
  
  // Test avec les variables essentielles
  const testEnv = essentialVars.map(varName => `${varName}=test_value`).join('\n');
  checkEnvSize(testEnv);
  
  console.log('\n📋 Instructions:');
  console.log('1. Allez dans votre dashboard Netlify');
  console.log('2. Site settings > Environment variables');
  console.log('3. Supprimez toutes les variables non essentielles');
  console.log('4. Gardez seulement les variables listées dans env.netlify.minimal');
  console.log('5. Relancez le déploiement');
}

module.exports = { essentialVars, optionalVars, checkEnvSize };
