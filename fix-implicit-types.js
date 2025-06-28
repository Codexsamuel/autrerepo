const fs = require('fs');

// Fonction pour corriger les types implicites dans les reduce
function fixImplicitTypes(content) {
  // Corriger les patterns de reduce avec types implicites
  content = content.replace(
    /\.reduce\(\(sum,\s*(\w+)\)\s*=>/g,
    '.reduce((sum: number, $1: any) =>'
  );
  
  // Corriger les patterns avec plusieurs paramètres
  content = content.replace(
    /\.reduce\(\((\w+),\s*(\w+)\)\s*=>/g,
    '.reduce(($1: number, $2: any) =>'
  );
  
  return content;
}

// Chercher tous les fichiers TypeScript/TSX avec des reduce
const filesToCheck = [
  'app/solutions/hospitalier/page.tsx',
  'app/solutions/assurance/page.tsx',
  'app/solutions/immobilier/page.tsx',
  'app/solutions/hospitality/page.tsx',
  'app/solutions/trading/page.tsx',
  'app/novacore/analytics/page.tsx',
  'app/novacore/dashboard/page.tsx'
];

filesToCheck.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = fixImplicitTypes(content);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed implicit types: ${filePath}`);
      } else {
        console.log(`ℹ️  No changes needed: ${filePath}`);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎉 All implicit types fixed!'); 