const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext = ['.tsx', '.ts']) {
  let results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next') && !filePath.includes('.git')) {
      results = results.concat(getAllFiles(filePath, ext));
    } else if (ext.some(e => file.name.endsWith(e))) {
      results.push(filePath);
    }
  });
  return results;
}

function cleanReactImports(content) {
  // 1. Place 'use client' tout en haut
  let lines = content.split('\n');
  let useClientIdx = lines.findIndex(l => l.trim() === '"use client"' || l.trim() === "'use client'");
  let useClientLine = '';
  
  if (useClientIdx !== -1) {
    useClientLine = lines[useClientIdx];
    lines.splice(useClientIdx, 1);
  }
  
  // 2. Supprimer toutes les lignes contenant motion/framer-motion
  lines = lines.filter(line => 
    !line.includes('framer-motion') && 
    !line.includes('motion') && 
    !line.includes('Motion') &&
    !line.includes('import React from') &&
    !line.includes('import * as React from')
  );
  
  // 3. Collecter tous les imports React
  let reactImports = new Set();
  let otherImports = [];
  
  lines.forEach(line => {
    if (line.includes("from 'react'") || line.includes('from "react"')) {
      // Extraire les imports nommés
      const match = line.match(/import\s*{([^}]+)}\s*from\s*['"]react['"]/);
      if (match) {
        const imports = match[1].split(',').map(imp => imp.trim());
        imports.forEach(imp => {
          if (imp && !imp.includes('type')) {
            reactImports.add(imp);
          }
        });
      }
    } else if (line.trim().startsWith('import ')) {
      otherImports.push(line);
    }
  });
  
  // 4. Supprimer toutes les lignes d'import React
  lines = lines.filter(line => 
    !line.includes("from 'react'") && 
    !line.includes('from "react"') &&
    !line.trim().startsWith('import ')
  );
  
  // 5. Créer le nouvel import React consolidé
  let newReactImport = '';
  if (reactImports.size > 0) {
    const importsArray = Array.from(reactImports).sort();
    newReactImport = `import { ${importsArray.join(', ')} } from 'react';`;
  }
  
  // 6. Reconstruire le fichier
  let newContent = [];
  
  // 'use client' en premier
  if (useClientLine) {
    newContent.push(useClientLine);
    newContent.push('');
  }
  
  // Import React consolidé
  if (newReactImport) {
    newContent.push(newReactImport);
  }
  
  // Autres imports
  otherImports.forEach(imp => {
    newContent.push(imp);
  });
  
  // Ligne vide après les imports
  if (newReactImport || otherImports.length > 0) {
    newContent.push('');
  }
  
  // Reste du contenu
  newContent = newContent.concat(lines);
  
  return newContent.join('\n');
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = cleanReactImports(content);
    
    if (content !== cleanedContent) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

// Exécution principale
console.log('🚀 DÉBUT DE LA CORRECTION RADICALE');
console.log('=====================================');

const files = getAllFiles('.');
let correctedCount = 0;

files.forEach(file => {
  if (processFile(file)) {
    correctedCount++;
  }
});

console.log('=====================================');
console.log(`✅ CORRECTION TERMINÉE: ${correctedCount} fichiers corrigés`);
console.log('🚀 Suppression de framer-motion et consolidation des imports React terminée'); 