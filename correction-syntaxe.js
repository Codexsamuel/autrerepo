const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION DES ERREURS DE SYNTAXE');

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Corriger les imports mal formés
    const lines = content.split('\n');
    const fixedLines = [];
    let inImport = false;
    let importStart = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Détecter le début d'un import
      if (line.startsWith('import {') && !line.includes('} from')) {
        inImport = true;
        importStart = i;
        fixedLines.push(lines[i]);
        continue;
      }
      
      // Si on est dans un import et qu'on trouve "} from"
      if (inImport && line.includes('} from')) {
        inImport = false;
        fixedLines.push(lines[i]);
        continue;
      }
      
      // Si on est dans un import mais qu'on trouve une ligne qui ne devrait pas être là
      if (inImport && (line.startsWith('import') || line.includes('from'))) {
        // Fermer l'import précédent et commencer un nouveau
        if (importStart >= 0) {
          // Ajouter la fermeture manquante
          fixedLines[fixedLines.length - 1] = fixedLines[fixedLines.length - 1] + ' } from "lucide-react"';
        }
        inImport = false;
        importStart = -1;
        fixedLines.push(lines[i]);
        continue;
      }
      
      // Ajouter la ligne normalement
      fixedLines.push(lines[i]);
    }

    // Fermer l'import si il est encore ouvert à la fin
    if (inImport && importStart >= 0) {
      fixedLines[fixedLines.length - 1] = fixedLines[fixedLines.length - 1] + ' } from "lucide-react"';
    }

    const newContent = fixedLines.join('\n');
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Syntaxe corrigée: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`❌ Erreur sur ${filePath}:`, error.message);
    return false;
  }
}

// Fichiers à corriger spécifiquement
const filesToFix = [
  'components/advanced-hotel-crm.tsx',
  'components/photo-verification-system.tsx',
  'app/admin/dashboard/page.tsx',
  'app/demo/dl-agriculture/page.tsx',
  'app/demo/dl-business/page.tsx'
];

let correctedCount = 0;

filesToFix.forEach(file => {
  if (fs.existsSync(file) && fixSyntaxErrors(file)) {
    correctedCount++;
  }
});

console.log(`\n🎉 CORRECTION DE SYNTAXE TERMINÉE`);
console.log(`📊 Fichiers corrigés: ${correctedCount}/${filesToFix.length}`); 