const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION FINALE DES IMPORTS');

function fixImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Corriger les imports mal formés
    const lines = content.split('\n');
    const fixedLines = [];
    let currentImport = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Détecter le début d'un import
      if (trimmed.startsWith('import {') && !trimmed.includes('} from')) {
        currentImport = { start: i, lines: [line] };
        continue;
      }

      // Si on a un import en cours
      if (currentImport) {
        currentImport.lines.push(line);

        // Si on trouve la fin de l'import
        if (trimmed.includes('} from')) {
          // Rejoindre toutes les lignes de l'import
          const importContent = currentImport.lines.join('\n');
          fixedLines.push(importContent);
          currentImport = null;
          continue;
        }

        // Si on trouve un autre import ou une ligne qui ne devrait pas être là
        if (trimmed.startsWith('import') && !trimmed.includes('} from')) {
          // Fermer l'import précédent avec "} from "lucide-react""
          const lastLine = currentImport.lines[currentImport.lines.length - 1];
          currentImport.lines[currentImport.lines.length - 1] = lastLine + ' } from "lucide-react"';
          const importContent = currentImport.lines.join('\n');
          fixedLines.push(importContent);
          
          // Commencer le nouvel import
          currentImport = { start: i, lines: [line] };
          continue;
        }
      } else {
        fixedLines.push(line);
      }
    }

    // Fermer l'import si il est encore ouvert
    if (currentImport) {
      const lastLine = currentImport.lines[currentImport.lines.length - 1];
      currentImport.lines[currentImport.lines.length - 1] = lastLine + ' } from "lucide-react"';
      const importContent = currentImport.lines.join('\n');
      fixedLines.push(importContent);
    }

    const newContent = fixedLines.join('\n');
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Imports corrigés: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`❌ Erreur sur ${filePath}:`, error.message);
    return false;
  }
}

// Fichiers à corriger
const filesToFix = [
  'components/photo-verification-system.tsx',
  'app/admin/dashboard/page.tsx',
  'app/demo/dl-agriculture/page.tsx',
  'app/demo/dl-business/page.tsx',
  'app/demo/dl-commerce/commandes/page.tsx'
];

let correctedCount = 0;

filesToFix.forEach(file => {
  if (fs.existsSync(file) && fixImports(file)) {
    correctedCount++;
  }
});

console.log(`\n🎉 CORRECTION DES IMPORTS TERMINÉE`);
console.log(`📊 Fichiers corrigés: ${correctedCount}/${filesToFix.length}`); 