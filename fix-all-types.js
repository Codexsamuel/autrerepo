const fs = require('fs');
const path = require('path');

// Fonction pour corriger tous les types implicites
function fixAllTypes(content) {
  // Corriger les gestionnaires d'événements
  content = content.replace(
    /const\s+(\w+)\s*=\s*\(e\)\s*=>/g,
    'const $1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>'
  );
  
  content = content.replace(
    /const\s+(\w+)\s*=\s*\(e\)\s*=>/g,
    'const $1 = (e: any) =>'
  );
  
  // Corriger les reduce
  content = content.replace(
    /\.reduce\(\(sum,\s*(\w+)\)\s*=>/g,
    '.reduce((sum: number, $1: any) =>'
  );
  
  content = content.replace(
    /\.reduce\(\((\w+),\s*(\w+)\)\s*=>/g,
    '.reduce(($1: number, $2: any) =>'
  );
  
  // Corriger les map
  content = content.replace(
    /\.map\(\((\w+)\)\s*=>/g,
    '.map(($1: any) =>'
  );
  
  // Corriger les filter
  content = content.replace(
    /\.filter\(\((\w+)\)\s*=>/g,
    '.filter(($1: any) =>'
  );
  
  return content;
}

// Fonction récursive pour trouver tous les fichiers TSX/TS
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Trouver tous les fichiers TypeScript
const tsFiles = findTsFiles('app').concat(findTsFiles('components')).concat(findTsFiles('lib'));

console.log(`Found ${tsFiles.length} TypeScript files to check...`);

let fixedCount = 0;

tsFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    content = fixAllTypes(content);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed types: ${filePath}`);
      fixedCount++;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log(`🎉 Fixed types in ${fixedCount} files!`); 