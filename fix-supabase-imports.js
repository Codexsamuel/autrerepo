const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to fix imports in a file
function fixImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix direct createClient imports from @supabase/supabase-js
    if (content.includes("import { supabase } from '@/lib/supabase/client'")) {
      content = content.replace(
        "import { createClient } from '@supabase/supabase-js'",
        "import { supabase } from '@/lib/supabase/client'"
      );
      modified = true;
    }
    
    // Fix createClient imports from local supabase client
    if (content.includes("import { supabase } from '@/lib/supabase/client'")) {
      content = content.replace(
        "import { createClient } from '@/lib/supabase/client'",
        "import { supabase } from '@/lib/supabase/client'"
      );
      modified = true;
    }
    
    // Replace supabase calls with supabase
    if (content.includes('supabase) {
      content = content.replace(/createClient\([^)]*\)/g, 'supabase');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Main execution
console.log('Fixing Supabase imports...');

const projectRoot = process.cwd();
const files = findFiles(projectRoot);

files.forEach(file => {
  if (!file.includes('node_modules') && !file.includes('.next')) {
    fixImports(file);
  }
});

console.log('Supabase import fixes completed!'); 