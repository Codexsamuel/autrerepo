#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fonction pour corriger les composants Button asChild
function fixButtonIssues(content) {
  // Remplacer Button asChild avec Link par des Link stylés
  content = content.replace(
    /<Button asChild>\s*<Link([^>]*)>([^<]*)<\/Link>\s*<\/Button>/g,
    '<Link$1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">$2</Link>'
  );

  // Remplacer Button asChild size="sm" variant="outline" avec Link
  content = content.replace(
    /<Button asChild size="sm" variant="outline">\s*<Link([^>]*)>([^<]*)<\/Link>\s*<\/Button>/g,
    '<Link$1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">$2</Link>'
  );

  // Remplacer Button asChild size="sm" variant="destructive"
  content = content.replace(
    /<Button asChild size="sm" variant="destructive">\s*<Link([^>]*)>([^<]*)<\/Link>\s*<\/Button>/g,
    '<Link$1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">$2</Link>'
  );

  // Remplacer Button asChild variant="outline"
  content = content.replace(
    /<Button asChild variant="outline">\s*<Link([^>]*)>([^<]*)<\/Link>\s*<\/Button>/g,
    '<Link$1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">$2</Link>'
  );

  // Remplacer Button asChild variant="secondary"
  content = content.replace(
    /<Button asChild variant="secondary">\s*<Link([^>]*)>([^<]*)<\/Link>\s*<\/Button>/g,
    '<Link$1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">$2</Link>'
  );

  // Remplacer Button asChild sans variant spécifique
  content = content.replace(
    /<Button asChild>\s*<Link([^>]*)>([^<]*)<\/Link>\s*<\/Button>/g,
    '<Link$1 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">$2</Link>'
  );

  // Supprimer les imports Button inutilisés
  if (!content.includes('<Button') && content.includes('import { Button }')) {
    content = content.replace(/import \{ Button[^}]*\} from ["']@\/components\/ui\/button["'];?\n?/g, '');
  }

  return content;
}

// Fonction pour traiter un fichier
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const fixedContent = fixButtonIssues(content);
    
    if (originalContent !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  Aucun changement: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error.message);
    return false;
  }
}

// Fonction principale
function main() {
  console.log('🔧 Correction automatique des composants Button asChild...\n');

  // Trouver tous les fichiers .tsx dans le dossier app
  const files = glob.sync('app/**/*.tsx');
  
  let fixedCount = 0;
  let totalCount = files.length;

  files.forEach(file => {
    if (processFile(file)) {
      fixedCount++;
    }
  });

  console.log(`\n🎉 Correction terminée !`);
  console.log(`📊 Fichiers traités: ${totalCount}`);
  console.log(`🔧 Fichiers corrigés: ${fixedCount}`);
  console.log(`⏭️  Fichiers inchangés: ${totalCount - fixedCount}`);
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { fixButtonIssues, processFile }; 