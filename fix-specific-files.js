const fs = require('fs');

console.log('🔧 CORRECTION DES FICHIERS SPÉCIFIQUES');

function fixSpecificFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Trouver et corriger les imports lucide-react mal formés
    const lucideRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']lucide-react["']/s;
    const lucideMatch = content.match(lucideRegex);
    
    if (lucideMatch) {
      const imports = lucideMatch[1]
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0 && !imp.includes('\n'))
        .join(', ');
      
      content = content.replace(lucideRegex, `import { ${imports} } from "lucide-react"`);
      modified = true;
      console.log(`  - Imports lucide-react corrigés: ${imports}`);
    }

    // 2. Trouver et corriger les imports React mal formés
    const reactRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']react["']/s;
    const reactMatch = content.match(reactRegex);
    
    if (reactMatch) {
      const imports = reactMatch[1]
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0 && !imp.includes('\n'))
        .join(', ');
      
      content = content.replace(reactRegex, `import { ${imports} } from "react"`);
      modified = true;
      console.log(`  - Imports React corrigés: ${imports}`);
    }

    // 3. Supprimer les lignes d'import mal formées
    const lines = content.split('\n');
    const cleanLines = lines.filter(line => {
      const trimmed = line.trim();
      return !(trimmed.startsWith('import {') && !trimmed.includes('}') && !trimmed.includes('from'));
    });

    if (cleanLines.length !== lines.length) {
      content = cleanLines.join('\n');
      modified = true;
      console.log(`  - Lignes d'import mal formées supprimées`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Corrigé: ${filePath}`);
    } else {
      console.log(`⚠️  Aucune modification nécessaire: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Erreur avec ${filePath}:`, error.message);
  }
}

// Fichiers spécifiques à corriger
const filesToFix = [
  './components/photo-verification-system.tsx',
  './components/trading/DavyTradingChat.tsx',
  './components/trading/TradingAdvisor.tsx',
  './app/admin/dashboard/page.tsx',
  './app/demo/dl-business/page.tsx'
];

filesToFix.forEach(fixSpecificFile);

console.log('🎉 CORRECTION DES FICHIERS SPÉCIFIQUES TERMINÉE'); 