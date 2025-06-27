const fs = require('fs');

console.log('🔧 CORRECTION SYNTAXE FINALE');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Corriger les tableaux mal formés avec des objets
    content = content.replace(/,\s*\{\s*$/gm, ',');
    content = content.replace(/,\s*\]\s*$/gm, ']');
    
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

    // 3. Supprimer les lignes d'import mal formées
    const cleanLines = content.split('\n').filter(line => {
      const trimmed = line.trim();
      return !(trimmed.startsWith('import {') && !trimmed.includes('}') && !trimmed.includes('from'));
    });

    if (cleanLines.length !== content.split('\n').length) {
      content = cleanLines.join('\n');
      modified = true;
    }

    // 4. S'assurer que "use client" est en haut
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

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Corrigé: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Erreur avec ${filePath}:`, error.message);
  }
}

// Fichiers spécifiques à corriger
const filesToFix = [
  './app/admin/dashboard/page.tsx',
  './app/demo/dl-commerce/commandes/page.tsx',
  './app/demo/dl-commerce/page.tsx',
  './app/demo/dl-mining/page.tsx',
  './app/demo/dl-restaurant/page.tsx'
];

filesToFix.forEach(fixFile);

console.log('🎉 CORRECTION SYNTAXE FINALE TERMINÉE'); 