#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🧹 Démarrage du nettoyage post-build...');

// Configuration
const NEXT_DIR = '.next';
const REPLACEMENTS = {
  'self': 'globalThis',
  'typeof self': 'typeof globalThis',
  'self.': 'globalThis.',
  'self[': 'globalThis[',
  'self(': 'globalThis(',
};

// Statistiques
let totalFiles = 0;
let processedFiles = 0;
let totalReplacements = 0;

// Fonction pour traiter un fichier
function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fileReplacements = 0;
    
    // Appliquer les remplacements
    for (const [search, replace] of Object.entries(REPLACEMENTS)) {
      if (content.includes(search)) {
        const beforeCount = (content.match(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        const newContent = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
        const afterCount = (newContent.match(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        
        if (beforeCount > afterCount) {
          fileReplacements += (beforeCount - afterCount);
          modified = true;
        }
      }
    }
    
    // Écrire le fichier modifié si nécessaire
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      processedFiles++;
      totalReplacements += fileReplacements;
      console.log(`🔧 ${filePath}: ${fileReplacements} remplacements`);
    }
    
    totalFiles++;
  } catch (error) {
    console.warn(`⚠️ Erreur lors du traitement de ${filePath}:`, error.message);
  }
}

// Fonction principale
function main() {
  try {
    // Vérifier que le dossier .next existe
    if (!fs.existsSync(NEXT_DIR)) {
      console.log('⚠️ Dossier .next non trouvé, arrêt du nettoyage');
      return;
    }
    
    console.log('🔍 Recherche des fichiers JavaScript...');
    
    // Trouver tous les fichiers JavaScript dans .next
    const jsFiles = glob.sync('**/*.js', {
      cwd: NEXT_DIR,
      absolute: true,
      ignore: ['**/node_modules/**', '**/.git/**']
    });
    
    console.log(`📁 ${jsFiles.length} fichiers JavaScript trouvés`);
    
    // Traiter chaque fichier
    jsFiles.forEach(processFile);
    
    // Résumé
    console.log('\n📊 Résumé du nettoyage:');
    console.log(`   - Fichiers examinés: ${totalFiles}`);
    console.log(`   - Fichiers traités: ${processedFiles}`);
    console.log(`   - Remplacements totaux: ${totalReplacements}`);
    
    if (processedFiles > 0) {
      console.log('✅ Nettoyage terminé avec succès !');
    } else {
      console.log('ℹ️ Aucun fichier nécessitait de nettoyage');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
main(); 