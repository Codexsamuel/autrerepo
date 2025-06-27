const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION DES ERREURS DE SYNTAXE');

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Corriger les imports lucide-react mal formés
    content = content.replace(/import \{\s*([^}]+)\s*\} from ["']lucide-react["']/g, (match, imports) => {
      const cleanImports = imports
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0 && !imp.includes('\n'))
        .join(', ');
      return `import { ${cleanImports} } from "lucide-react"`;
    });

    // 2. Corriger les imports React
    content = content.replace(/import \{\s*([^}]+)\s*\} from ["']react["']/g, (match, imports) => {
      const cleanImports = imports
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0 && !imp.includes('\n'))
        .join(', ');
      return `import { ${cleanImports} } from "react"`;
    });

    // 3. Supprimer les lignes d'import vides ou mal formées
    const lines = content.split('\n');
    const cleanLines = lines.filter((line, index) => {
      const trimmed = line.trim();
      
      // Supprimer les lignes d'import mal formées
      if (trimmed.startsWith('import {') && !trimmed.includes('}') && !trimmed.includes('from')) {
        return false;
      }
      
      // Supprimer les lignes avec juste des virgules
      if (trimmed === ',' || trimmed === '},') {
        return false;
      }
      
      return true;
    });

    if (cleanLines.length !== lines.length) {
      content = cleanLines.join('\n');
      modified = true;
    }

    // 4. Corriger les expressions JSX mal fermées
    content = content.replace(/\[\s*([^\]]+)\s*\]\s*$/gm, (match, content) => {
      // S'assurer que les tableaux sont bien fermés
      return `[${content.trim()}]`;
    });

    // 5. S'assurer que "use client" est en haut
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
  './app/demo/dl-commerce/page.tsx',
  './app/demo/dl-mining/page.tsx',
  './app/demo/dl-travel/page.tsx'
];

filesToFix.forEach(fixSyntaxErrors);

console.log('🎉 CORRECTION DES ERREURS TERMINÉE'); 