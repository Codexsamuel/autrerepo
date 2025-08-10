#!/usr/bin/env node

/**
 * Script de test pour le plugin SelfReferenceFixer
 * Vérifie que toutes les références à 'self' sont correctement remplacées
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 TEST COMPLET DU PLUGIN SELFREDERENCEFIXER');
console.log('=============================================\n');

// Configuration
const TEST_DIRS = [
  '.next/server',
  '.next/static/chunks',
  '.next/static/css',
  'netlify/functions'
];

const SELF_PATTERNS = [
  /self/g,
  /typeof self/g,
  /self\./g,
  /window\.self/g,
  /global\.self/g
];

let totalFiles = 0;
let filesWithSelf = 0;
let totalSelfReferences = 0;
let errors = [];

function checkDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 Répertoire ${dirPath} non trouvé, ignoré`);
    return;
  }

  console.log(`🔍 Vérification du répertoire: ${dirPath}`);
  
  try {
    const files = fs.readdirSync(dirPath, { recursive: true });
    
    files.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.js')) {
        const fullPath = path.join(dirPath, file);
        checkFile(fullPath);
      }
    });
  } catch (error) {
    console.warn(`⚠️ Erreur lors de la lecture du répertoire ${dirPath}:`, error.message);
  }
}

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    totalFiles++;
    
    let fileHasSelf = false;
    let fileSelfCount = 0;
    
    SELF_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        fileHasSelf = true;
        fileSelfCount += matches.length;
        totalSelfReferences += matches.length;
      }
    });
    
    if (fileHasSelf) {
      filesWithSelf++;
      errors.push({
        file: filePath,
        count: fileSelfCount,
        content: content.substring(0, 200) + '...'
      });
      
      console.log(`❌ ${filePath} - ${fileSelfCount} références à 'self' trouvées`);
    }
  } catch (error) {
    console.warn(`⚠️ Erreur lors de la lecture du fichier ${filePath}:`, error.message);
  }
}

function runBuildTest() {
  console.log('\n🚀 Test du build avec le plugin...\n');
  
  try {
    // Nettoyer le répertoire .next
    if (fs.existsSync('.next')) {
      console.log('🧹 Nettoyage du répertoire .next...');
      execSync('rm -rf .next', { stdio: 'inherit' });
    }
    
    // Lancer le build
    console.log('🏗️ Lancement du build...');
    execSync('npm run build:netlify:secure', { 
      stdio: 'inherit',
      env: { ...process.env, DEBUG_SELF_REFERENCE_FIXER: 'true' }
    });
    
    console.log('\n✅ Build réussi ! Vérification des fichiers...\n');
    return true;
  } catch (error) {
    console.error('\n❌ Build échoué:', error.message);
    return false;
  }
}

function generateReport() {
  console.log('\n📊 RAPPORT FINAL');
  console.log('================\n');
  
  console.log(`📁 Fichiers analysés: ${totalFiles}`);
  console.log(`❌ Fichiers avec références à 'self': ${filesWithSelf}`);
  console.log(`🔢 Total des références à 'self': ${totalSelfReferences}`);
  
  if (filesWithSelf === 0) {
    console.log('\n🎉 SUCCÈS: Aucune référence à "self" trouvée !');
    console.log('✅ Le plugin SelfReferenceFixer fonctionne parfaitement.');
  } else {
    console.log('\n⚠️ ATTENTION: Des références à "self" persistent !');
    console.log('🔧 Le plugin nécessite des ajustements.');
    
    console.log('\n📋 Détail des erreurs:');
    errors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.file}`);
      console.log(`   Références: ${error.count}`);
      console.log(`   Extrait: ${error.content}`);
    });
  }
}

// Fonction principale
async function main() {
  try {
    // Test 1: Vérification des fichiers existants
    console.log('🔍 PHASE 1: Vérification des fichiers existants');
    console.log('================================================\n');
    
    TEST_DIRS.forEach(checkDirectory);
    
    if (totalFiles === 0) {
      console.log('📝 Aucun fichier .js trouvé. Lancement du build...\n');
    }
    
    // Test 2: Build et vérification
    console.log('🔍 PHASE 2: Test du build avec plugin');
    console.log('=======================================\n');
    
    const buildSuccess = runBuildTest();
    
    if (buildSuccess) {
      // Test 3: Vérification après build
      console.log('🔍 PHASE 3: Vérification après build');
      console.log('=====================================\n');
      
      // Réinitialiser les compteurs
      totalFiles = 0;
      filesWithSelf = 0;
      totalSelfReferences = 0;
      errors = [];
      
      TEST_DIRS.forEach(checkDirectory);
    }
    
    // Génération du rapport
    generateReport();
    
    // Code de sortie
    process.exit(filesWithSelf === 0 ? 0 : 1);
    
  } catch (error) {
    console.error('\n💥 Erreur fatale:', error);
    process.exit(1);
  }
}

// Gestion des signaux
process.on('SIGINT', () => {
  console.log('\n\n⏹️ Test interrompu par l\'utilisateur');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n\n⏹️ Test terminé');
  process.exit(1);
});

// Lancement du test
main(); 