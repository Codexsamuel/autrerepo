const fs = require('fs');
const path = require('path');

console.log('🚀 DÉBUT DE LA CORRECTION FINALE');

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

    // 1. Supprimer toute ligne contenant framer-motion ou motion
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

    // 2. Corriger les imports React
    content = content.replace(/import React from ['"]react['"]/g, '');
    content = content.replace(/import \* as React from ['"]react['"]/g, '');
    content = content.replace(/import React, \{/g, 'import {');
    content = content.replace(/import \{.*\} from ['"]react['"]/g, (match) => {
      // Nettoyer les imports React pour n'avoir que les hooks nécessaires
      const imports = match.match(/\{([^}]+)\}/)[1];
      const cleanImports = imports
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => 
          ['useState', 'useEffect', 'useCallback', 'useMemo', 'useRef', 'useContext', 'useReducer', 'useLayoutEffect', 'useImperativeHandle', 'forwardRef', 'createContext', 'Fragment'].includes(imp)
        )
        .join(', ');
      return `import { ${cleanImports} } from 'react'`;
    });

    // 3. Corriger les imports multi-lignes de lucide-react
    content = content.replace(/import \{\s*([^}]+)\s*\} from ['"]lucide-react['"]/g, (match, imports) => {
      const cleanImports = imports
        .split(',')
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0)
        .join(', ');
      return `import { ${cleanImports} } from "lucide-react"`;
    });

    // 4. Supprimer les imports vides ou mal formés
    content = content.replace(/import \{\s*\} from ['"][^'"]+['"];?\n?/g, '');
    content = content.replace(/import \{\s*,\s*\} from ['"][^'"]+['"];?\n?/g, '');

    // 5. Corriger les imports de jsxDEV et Fragment
    content = content.replace(/import.*jsxDEV.*/g, '');
    content = content.replace(/import.*Fragment.*from ['"]react\/jsx-dev-runtime['"]/g, '');

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

console.log('🎉 CORRECTION FINALE TERMINÉE'); 