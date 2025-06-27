const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION COMPLÈTE DES IMPORTS ET SYNTAXE');

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

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Supprimer toutes les lignes contenant framer-motion
    const lines = content.split('\n');
    const filteredLines = lines.filter(line => 
      !line.includes('framer-motion') && 
      !line.includes('motion') && 
      !line.includes('Motion')
    );
    
    if (filteredLines.length !== lines.length) {
      content = filteredLines.join('\n');
      modified = true;
    }

    // 2. Corriger les imports lucide-react mal formés
    const lucideMatch = content.match(/import\s*\{\s*([^}]+)\s*\}\s*from\s*["']lucide-react["']/s);
    if (lucideMatch) {
      const imports = lucideMatch[1]
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0 && !imp.includes('\n'))
        .join(', ');
      
      content = content.replace(/import\s*\{\s*[^}]+\s*\}\s*from\s*["']lucide-react["']/s, 
        `import { ${imports} } from "lucide-react"`);
      modified = true;
    }

    // 3. Corriger les imports React
    const reactMatch = content.match(/import\s*\{\s*([^}]+)\s*\}\s*from\s*["']react["']/s);
    if (reactMatch) {
      const imports = reactMatch[1]
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0 && !imp.includes('\n'))
        .join(', ');
      
      content = content.replace(/import\s*\{\s*[^}]+\s*\}\s*from\s*["']react["']/s, 
        `import { ${imports} } from "react"`);
      modified = true;
    }

    // 4. Supprimer les imports vides ou mal formés
    content = content.replace(/import\s*\{\s*\}\s*from\s*["'][^"']+["'];?\n?/g, '');
    content = content.replace(/import\s*\{\s*,\s*\}\s*from\s*["'][^"']+["'];?\n?/g, '');

    // 5. Corriger les tableaux mal formés
    content = content.replace(/\[\s*([^\]]+)\s*\]\s*$/gm, (match, content) => {
      return `[${content.trim()}]`;
    });

    // 6. S'assurer que "use client" est en haut
    if (content.includes('"use client"')) {
      const lines = content.split('\n');
      const useClientIndex = lines.findIndex(line => line.trim() === '"use client"');
      if (useClientIndex > 0) {
        lines.splice(useClientIndex, 1);
        lines.unshift('"use client"');
        content = lines.join('\n');
        modified = true;
      }
    }

    // 7. Supprimer les lignes d'import mal formées
    const cleanLines = content.split('\n').filter(line => {
      const trimmed = line.trim();
      return !(trimmed.startsWith('import {') && !trimmed.includes('}') && !trimmed.includes('from'));
    });

    if (cleanLines.length !== content.split('\n').length) {
      content = cleanLines.join('\n');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Corrigé: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Erreur avec ${filePath}:`, error.message);
  }
}

// Corriger tous les fichiers
const files = getAllFiles('.');
console.log(`📁 Trouvé ${files.length} fichiers à corriger`);

files.forEach(fixFile);

console.log('🎉 CORRECTION COMPLÈTE TERMINÉE'); 