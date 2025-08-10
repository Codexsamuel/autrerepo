#!/usr/bin/env node

/**
 * Script de nettoyage post-build pour corriger les références 'self' restantes
 * Ce script s'exécute après le build Next.js pour nettoyer les fichiers générés
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🧹 Début du nettoyage post-build...');

// Configuration
const BUILD_DIR = '.next';
const REPLACE_WITH = 'undefined';
const DEBUG = process.env.DEBUG_SELF_REFERENCE_FIXER === 'true';

// Statistiques
const stats = {
  processedFiles: 0,
  totalReplacements: 0,
  errors: []
};

/**
 * Remplace les références 'self' en dehors des chaînes de caractères
 */
function replaceSelfReferences(content) {
  if (!content || typeof content !== 'string') return content;
  
  let result = '';
  let inString = false;
  let quoteChar = null;
  let escapeNext = false;
  let i = 0;
  
  while (i < content.length) {
    const char = content[i];
    
    if (escapeNext) {
      result += char;
      escapeNext = false;
      i++;
      continue;
    }
    
    if (char === '\\') {
      result += char;
      escapeNext = true;
      i++;
      continue;
    }
    
    if (char === '"' || char === "'" || char === '`') {
      if (!inString) {
        inString = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inString = false;
        quoteChar = null;
      }
      result += char;
      i++;
      continue;
    }
    
    // Vérifier si on a 'self' en dehors d'une chaîne
    if (!inString && content.substring(i, i + 4) === 'self' && 
        (i === 0 || !/[a-zA-Z0-9_]/.test(content[i - 1])) &&
        (i + 4 >= content.length || !/[a-zA-Z0-9_]/.test(content[i + 4]))) {
      result += REPLACE_WITH;
      i += 4;
    } else {
      result += char;
      i++;
    }
  }
  
  return result;
}

/**
 * Traite un fichier JavaScript
 */
function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('self')) {
      const beforeCount = (content.match(/\bself\b/g) || []).length;
      const newContent = replaceSelfReferences(content);
      const afterCount = (newContent.match(/\bself\b/g) || []).length;
      const replacements = beforeCount - afterCount;
      
      if (replacements > 0) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        stats.totalReplacements += replacements;
        
        if (DEBUG) {
          console.log(`🔧 Fichier traité: ${filePath} (${replacements} remplacements)`);
        }
      }
    }
    
    stats.processedFiles++;
  } catch (error) {
    const errorMsg = `Erreur lors du traitement de ${filePath}: ${error.message}`;
    stats.errors.push(errorMsg);
    if (DEBUG) {
      console.warn('⚠️', errorMsg);
    }
  }
}

/**
 * Traite récursivement un répertoire
 */
function processDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return;
    
    const files = glob.sync(path.join(dirPath, '**/*.js'));
    
    for (const file of files) {
      processFile(file);
    }
    
    if (DEBUG) {
      console.log(`📁 Répertoire traité: ${dirPath} (${files.length} fichiers JavaScript)`);
    }
  } catch (error) {
    const errorMsg = `Erreur lors du traitement du répertoire ${dirPath}: ${error.message}`;
    stats.errors.push(errorMsg);
    if (DEBUG) {
      console.warn('⚠️', errorMsg);
    }
  }
}

/**
 * Fonction principale
 */
function main() {
  console.log('🔍 Recherche des fichiers à traiter...');
  
  // Traiter le répertoire de build principal
  processDirectory(BUILD_DIR);
  
  // Traiter spécifiquement les chunks et vendors
  const specificDirs = [
    path.join(BUILD_DIR, 'static', 'chunks'),
    path.join(BUILD_DIR, 'static', 'js'),
    path.join(BUILD_DIR, 'server')
  ];
  
  for (const dir of specificDirs) {
    if (fs.existsSync(dir)) {
      processDirectory(dir);
    }
  }
  
  // Afficher les statistiques
  console.log('\n📊 Statistiques du nettoyage:');
  console.log(`   - Fichiers traités: ${stats.processedFiles}`);
  console.log(`   - Remplacements totaux: ${stats.totalReplacements}`);
  
  if (stats.errors.length > 0) {
    console.log(`   - Erreurs: ${stats.errors.length}`);
    if (DEBUG) {
      stats.errors.forEach(error => console.warn(`     ⚠️ ${error}`));
    }
  }
  
  if (stats.totalReplacements > 0) {
    console.log('✅ Nettoyage terminé avec succès');
  } else {
    console.log('ℹ️ Aucune référence "self" trouvée à nettoyer');
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { processFile, processDirectory, replaceSelfReferences }; 