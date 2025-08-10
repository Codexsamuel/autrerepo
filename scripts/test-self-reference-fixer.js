#!/usr/bin/env node

/**
 * Script de test pour le plugin SelfReferenceFixer
 * Vérifie que les références à 'self' sont correctement remplacées
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 TEST DU PLUGIN SELFREDERENCEFIXER');
console.log('=====================================');

// Vérifier si le dossier .next existe
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log('❌ Dossier .next non trouvé. Lancez d\'abord le build.');
  process.exit(1);
}

// Vérifier les fichiers de chunks
const serverDir = path.join(nextDir, 'server');
const staticDir = path.join(nextDir, 'static');

let totalFiles = 0;
let processedFiles = 0;
let selfReferencesFound = 0;

function checkFile(filePath, fileType) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    totalFiles++;
    
    // Vérifier les références à 'self'
    const selfMatches = content.match(/self/g);
    if (selfMatches) {
      selfReferencesFound += selfMatches.length;
      console.log(`⚠️  Références à 'self' trouvées dans ${fileType}: ${path.basename(filePath)} (${selfMatches.length} occurrences)`);
    } else {
      processedFiles++;
    }
  } catch (error) {
    console.log(`⚠️  Erreur lors de la lecture de ${filePath}:`, error.message);
  }
}

function scanDirectory(dir, fileType) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, fileType);
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      checkFile(filePath, fileType);
    }
  });
}

// Scanner les dossiers
console.log('🔍 Vérification des fichiers de chunks...');
scanDirectory(serverDir, 'server');
scanDirectory(staticDir, 'static');

// Résultats
console.log('\n📊 RÉSULTATS DU TEST:');
console.log('======================');
console.log(`📁 Fichiers totaux scannés: ${totalFiles}`);
console.log(`✅ Fichiers sans 'self': ${processedFiles}`);
console.log(`⚠️  Fichiers avec 'self': ${totalFiles - processedFiles}`);
console.log(`🔢 Total références 'self': ${selfReferencesFound}`);

if (selfReferencesFound === 0) {
  console.log('\n🎉 SUCCÈS: Aucune référence à "self" trouvée !');
  console.log('   Le plugin SelfReferenceFixer fonctionne parfaitement.');
} else {
  console.log('\n⚠️  ATTENTION: Des références à "self" sont encore présentes.');
  console.log('   Le plugin peut nécessiter des ajustements.');
}

console.log('\n🔧 Pour activer le mode debug du plugin, ajoutez debug: true dans next.config.js'); 