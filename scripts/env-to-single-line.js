#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function convertEnvToSingleLine() {
  const envFiles = [
    '.env.local',
    '.env',
    'config/env.minimal.example',
    'config/env.example'
  ];
  
  let envContent = '';
  let sourceFile = '';
  
  // Chercher le premier fichier qui existe
  for (const file of envFiles) {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
      sourceFile = file;
      break;
    }
  }
  
  if (!envContent) {
    console.log('❌ Aucun fichier .env trouvé');
    console.log('📁 Fichiers cherchés:', envFiles.join(', '));
    return;
  }
  
  // Nettoyer le contenu
  const lines = envContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => {
      // Garder seulement les lignes avec des variables (pas les commentaires vides)
      return line && !line.startsWith('#') && line.includes('=');
    });
  
  // Convertir en une seule ligne
  const singleLine = lines.join(' ');
  
  console.log('✅ Conversion terminée !');
  console.log(`📄 Source: ${sourceFile}`);
  console.log(`📊 Variables: ${lines.length}`);
  console.log(`📏 Taille: ${(singleLine.length / 1024).toFixed(2)} KB`);
  console.log('\n📋 Copie cette ligne complète sur Vercel:');
  console.log('─'.repeat(80));
  console.log(singleLine);
  console.log('─'.repeat(80));
  
  // Sauvegarder dans un fichier
  const outputPath = path.join(__dirname, '..', 'env-single-line.txt');
  fs.writeFileSync(outputPath, singleLine);
  console.log(`\n💾 Sauvegardé dans: ${outputPath}`);
  
  console.log('\n📋 Instructions pour Vercel:');
  console.log('1. Va sur Vercel Dashboard → Project → Settings → Environment Variables');
  console.log('2. Clique sur "Import from .env file"');
  console.log('3. Colle la ligne ci-dessus dans la fenêtre');
  console.log('4. Vérifie que toutes les variables sont détectées');
  console.log('5. Clique sur "Import"');
}

// Exécution
if (require.main === module) {
  console.log('🔄 Conversion du fichier .env en une seule ligne...\n');
  convertEnvToSingleLine();
}

module.exports = { convertEnvToSingleLine }; 