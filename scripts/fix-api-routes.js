#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function removeStaticExportsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Supprimer les exports problématiques
    const lines = content.split('\n');
    const filteredLines = lines.filter(line => 
      !line.includes('export const dynamic') && 
      !line.includes('export const revalidate') &&
      !line.includes('// Configuration pour l\'export statique')
    );
    
    // Écrire le fichier modifié
    fs.writeFileSync(filePath, filteredLines.join('\n'));
    console.log(`✅ ${filePath} - Exports supprimés`);
    
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.name === 'route.ts' && fullPath.includes('/api/')) {
      removeStaticExportsFromFile(fullPath);
    }
  }
}

// Traiter le répertoire app/api
const apiDir = path.join(__dirname, '../app/api');
if (fs.existsSync(apiDir)) {
  console.log('🔧 Suppression des exports problématiques des routes API...');
  processDirectory(apiDir);
  console.log('✅ Traitement terminé !');
} else {
  console.log('❌ Répertoire app/api non trouvé');
} 