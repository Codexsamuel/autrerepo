const fs = require('fs');
const path = require('path');

// Liste des fichiers à corriger
const filesToFix = [
  'app/solutions/hospitalier/chambres/page.tsx',
  'app/solutions/hospitalier/chambres/[id]/page.tsx',
  'app/solutions/hospitalier/facturation/page.tsx',
  'app/solutions/hospitalier/chambres/nouveau/page.tsx',
  'app/solutions/hospitalier/clients/[id]/page.tsx',
  'app/solutions/hospitalier/reservations/nouveau/page.tsx',
  'app/solutions/banque/comptes/page.tsx',
  'app/solutions/banque/transactions/page.tsx',
  'app/solutions/banque/clients/[id]/page.tsx',
  'app/solutions/banque/prets/nouveau/page.tsx',
  'app/solutions/banque/comptes/nouveau/page.tsx',
  'app/solutions/banque/transactions/nouveau/page.tsx',
  'app/solutions/banque/comptes/[id]/page.tsx'
];

filesToFix.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remplacer l'import createClient
      content = content.replace(
        /import\s*{\s*createClient\s*}\s*from\s*["']@\/lib\/supabase\/client["']/g,
        'import { supabase } from "@/lib/supabase/client"'
      );
      
      // Supprimer les redéclarations const supabase = supabase;
      content = content.replace(/\n\s*const\s+supabase\s*=\s*supabase\s*;\s*\n/g, '\n');
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎉 All imports fixed!'); 