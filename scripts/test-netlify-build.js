#!/usr/bin/env node

/**
 * Script de test spécifique pour Netlify
 * Simule l'environnement de production et teste le plugin SelfReferenceFixer
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🌐 TEST NETLIFY - Plugin SelfReferenceFixer');
console.log('============================================\n');

// Configuration Netlify
const NETLIFY_ENV = {
  NODE_ENV: 'production',
  NETLIFY: 'true',
  NEXT_TELEMETRY_DISABLED: '1',
  DEBUG_SELF_REFERENCE_FIXER: 'true'
};

function runNetlifyBuildTest() {
  console.log('🚀 Test du build Netlify avec le plugin...\n');
  
  try {
    // Nettoyer le répertoire .next
    if (fs.existsSync('.next')) {
      console.log('🧹 Nettoyage du répertoire .next...');
      execSync('rm -rf .next', { stdio: 'inherit' });
    }
    
    // Lancer le build avec l'environnement Netlify
    console.log('🏗️ Lancement du build Netlify...');
    console.log('🔧 Variables d\'environnement Netlify activées');
    
    execSync('npm run build:netlify:secure', { 
      stdio: 'inherit',
      env: { ...process.env, ...NETLIFY_ENV }
    });
    
    console.log('\n✅ Build Netlify réussi ! Vérification des fichiers...\n');
    return true;
  } catch (error) {
    console.error('\n❌ Build Netlify échoué:', error.message);
    return false;
  }
}

function checkForSelfReferences() {
  console.log('🔍 Vérification des références à "self" après build...\n');
  
  const checkDirs = [
    '.next/server',
    '.next/static/chunks',
    '.next/static/css'
  ];
  
  let totalFiles = 0;
  let filesWithSelf = 0;
  let totalSelfReferences = 0;
  let errors = [];
  
  checkDirs.forEach(dirPath => {
    if (!fs.existsSync(dirPath)) {
      console.log(`📁 Répertoire ${dirPath} non trouvé`);
      return;
    }
    
    console.log(`🔍 Vérification de ${dirPath}...`);
    
    try {
      const files = fs.readdirSync(dirPath, { recursive: true });
      
      files.forEach(file => {
        if (typeof file === 'string' && file.endsWith('.js')) {
          const fullPath = path.join(dirPath, file);
          checkFile(fullPath);
        }
      });
    } catch (error) {
      console.warn(`⚠️ Erreur lors de la lecture de ${dirPath}:`, error.message);
    }
  });
  
  function checkFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      totalFiles++;
      
      const selfMatches = content.match(/self/g);
      if (selfMatches) {
        filesWithSelf++;
        totalSelfReferences += selfMatches.length;
        errors.push({
          file: filePath,
          count: selfMatches.length,
          content: content.substring(0, 200) + '...'
        });
        
        console.log(`❌ ${filePath} - ${selfMatches.length} références à 'self' trouvées`);
      }
    } catch (error) {
      console.warn(`⚠️ Erreur lors de la lecture de ${filePath}:`, error.message);
    }
  }
  
  // Résultats
  console.log('\n📊 RÉSULTATS DE LA VÉRIFICATION:');
  console.log('==================================');
  console.log(`📁 Fichiers analysés: ${totalFiles}`);
  console.log(`❌ Fichiers avec références à 'self': ${filesWithSelf}`);
  console.log(`🔢 Total des références à 'self': ${totalSelfReferences}`);
  
  if (filesWithSelf === 0) {
    console.log('\n🎉 SUCCÈS: Aucune référence à "self" trouvée !');
    console.log('✅ Le plugin SelfReferenceFixer fonctionne parfaitement en mode Netlify.');
  } else {
    console.log('\n⚠️ ATTENTION: Des références à "self" persistent !');
    console.log('🔧 Le plugin nécessite des ajustements pour Netlify.');
    
    console.log('\n📋 Détail des erreurs:');
    errors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.file}`);
      console.log(`   Références: ${error.count}`);
      console.log(`   Extrait: ${error.content}`);
    });
  }
  
  return { totalFiles, filesWithSelf, totalSelfReferences, errors };
}

function generateNetlifyReport(results) {
  console.log('\n🌐 RAPPORT NETLIFY');
  console.log('==================\n');
  
  if (results.filesWithSelf === 0) {
    console.log('✅ BUILD NETLIFY RÉUSSI');
    console.log('   - Aucune référence à "self" détectée');
    console.log('   - Plugin SelfReferenceFixer opérationnel');
    console.log('   - Prêt pour le déploiement');
  } else {
    console.log('❌ BUILD NETLIFY EN ÉCHEC');
    console.log('   - Références à "self" détectées');
    console.log('   - Plugin SelfReferenceFixer incomplet');
    console.log('   - Déploiement risqué');
  }
  
  console.log('\n📊 Statistiques:');
  console.log(`   - Fichiers analysés: ${results.totalFiles}`);
  console.log(`   - Fichiers problématiques: ${results.filesWithSelf}`);
  console.log(`   - Total références 'self': ${results.totalSelfReferences}`);
}

// Fonction principale
async function main() {
  try {
    console.log('🔧 Configuration de l\'environnement Netlify...');
    console.log(`   - NODE_ENV: ${NETLIFY_ENV.NODE_ENV}`);
    console.log(`   - NETLIFY: ${NETLIFY_ENV.NETLIFY}`);
    console.log(`   - DEBUG_SELF_REFERENCE_FIXER: ${NETLIFY_ENV.DEBUG_SELF_REFERENCE_FIXER}\n`);
    
    // Test du build Netlify
    const buildSuccess = runNetlifyBuildTest();
    
    if (buildSuccess) {
      // Vérification des références à 'self'
      const results = checkForSelfReferences();
      
      // Génération du rapport
      generateNetlifyReport(results);
      
      // Code de sortie
      process.exit(results.filesWithSelf === 0 ? 0 : 1);
    } else {
      console.log('\n❌ Test Netlify échoué - Build non réussi');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n💥 Erreur fatale:', error);
    process.exit(1);
  }
}

// Gestion des signaux
process.on('SIGINT', () => {
  console.log('\n\n⏹️ Test Netlify interrompu par l\'utilisateur');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n\n⏹️ Test Netlify terminé');
  process.exit(1);
});

// Lancement du test
main(); 