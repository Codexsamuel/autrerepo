#!/usr/bin/env node

/**
 * Script pour supprimer complètement les fichiers service worker
 * pendant le build Netlify pour éviter l'erreur 'self is not defined'
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Suppression des fichiers service worker...');

// Fonction pour supprimer un fichier
function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Supprimé: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression de ${filePath}:`, error.message);
  }
  return false;
}

// Fonction pour supprimer un répertoire
function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath, { recursive: true });
      console.log(`🗑️ Répertoire supprimé: ${dirPath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression du répertoire ${dirPath}:`, error.message);
  }
  return false;
}

// Patterns de fichiers à supprimer
const patterns = [
  'public/sw.js',
  'public/images/sw.js',
  'public/images/workbox-*.js',
  'public/workbox-*.js',
  'public/*sw*.js',
  'public/*workbox*'
];

let totalRemoved = 0;

// Supprimer les fichiers selon les patterns
patterns.forEach(pattern => {
  try {
    const files = glob.sync(pattern);
    files.forEach(file => {
      if (removeFile(file)) {
        totalRemoved++;
      }
    });
  } catch (error) {
    console.error(`❌ Erreur avec le pattern ${pattern}:`, error.message);
  }
});

// Supprimer le répertoire temporaire s'il existe
removeDirectory('temp-sw');

console.log(`✅ Suppression terminée. ${totalRemoved} fichiers supprimés.`); 