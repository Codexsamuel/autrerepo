#!/usr/bin/env node

/**
 * Script de test pour vérifier le comportement du SelfReferenceFixer
 * dans un environnement similaire à Netlify
 */

const path = require('path');
const fs = require('fs');

console.log('🧪 Test du SelfReferenceFixer pour Netlify...\n');

// Simuler l'environnement Netlify
process.env.NETLIFY = 'true';
process.env.NODE_ENV = 'production';
process.env.DEBUG_SELF_REFERENCE_FIXER = 'true';

// Vérifier la configuration
console.log('📋 Configuration de test:');
console.log(`  - NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`  - NETLIFY: ${process.env.NETLIFY}`);
console.log(`  - DEBUG_SELF_REFERENCE_FIXER: ${process.env.DEBUG_SELF_REFERENCE_FIXER}`);

// Vérifier que le plugin est disponible
try {
  const pluginPath = path.join(__dirname, '..', 'lib', 'webpack-plugins', 'self-reference-fixer.js');
  console.log(`\n🔍 Vérification du plugin: ${pluginPath}`);
  
  if (fs.existsSync(pluginPath)) {
    console.log('✅ Plugin trouvé');
    
    // Charger le plugin
    const SelfReferenceFixerPlugin = require(pluginPath);
    
    if (typeof SelfReferenceFixerPlugin === 'function') {
      console.log('✅ Plugin chargé avec succès');
      
      // Créer une instance du plugin
      const plugin = new SelfReferenceFixerPlugin({
        replaceWith: 'undefined',
        debug: true,
        aggressive: true
      });
      
      console.log('✅ Instance du plugin créée');
      console.log(`  - Options: ${JSON.stringify(plugin.options)}`);
      
      // Test de la méthode replaceSelfReferences
      if (typeof plugin.replaceSelfReferences === 'function') {
        console.log('\n🧪 Test de la méthode replaceSelfReferences:');
        
        const testCases = [
          'self',
          'self.property',
          'function() { return self; }',
          'const obj = { self: true }',
          'if (self === window) { }',
          'self.addEventListener("load", () => {})',
          'console.log(self)',
          '// self reference in comment',
          '"self" in quotes',
          "'self' in single quotes"
        ];
        
        testCases.forEach((testCase, index) => {
          const result = plugin.replaceSelfReferences(testCase);
          const originalCount = (testCase.match(/\bself\b/g) || []).length;
          const resultCount = (result.match(/\bself\b/g) || []).length;
          
          console.log(`  Test ${index + 1}: "${testCase}"`);
          console.log(`    → Résultat: "${result}"`);
          console.log(`    → Références 'self': ${originalCount} → ${resultCount}`);
          console.log('');
        });
        
      } else {
        console.log('❌ Méthode replaceSelfReferences non trouvée');
      }
      
    } else {
      console.log('❌ Plugin n\'est pas une fonction constructeur');
    }
    
  } else {
    console.log('❌ Plugin non trouvé');
  }
  
} catch (error) {
  console.log('❌ Erreur lors du chargement du plugin:', error.message);
}

// Vérifier la configuration Next.js
try {
  console.log('\n🔍 Vérification de la configuration Next.js...');
  const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
  
  if (fs.existsSync(nextConfigPath)) {
    console.log('✅ next.config.js trouvé');
    
    // Lire le contenu pour vérifier la configuration
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Vérifier la présence des plugins
    if (configContent.includes('VendorsSelfReferenceFixer')) {
      console.log('✅ VendorsSelfReferenceFixer configuré');
    } else {
      console.log('⚠️ VendorsSelfReferenceFixer non trouvé dans la config');
    }
    
    if (configContent.includes('SelfReferenceFixerPlugin')) {
      console.log('✅ SelfReferenceFixerPlugin configuré');
    } else {
      console.log('⚠️ SelfReferenceFixerPlugin non trouvé dans la config');
    }
    
    if (configContent.includes('NetlifyDebugPlugin')) {
      console.log('✅ NetlifyDebugPlugin configuré');
    } else {
      console.log('⚠️ NetlifyDebugPlugin non trouvé dans la config');
    }
    
  } else {
    console.log('❌ next.config.js non trouvé');
  }
  
} catch (error) {
  console.log('❌ Erreur lors de la vérification de la config Next.js:', error.message);
}

// Vérifier les scripts de build
try {
  console.log('\n🔍 Vérification des scripts de build...');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    console.log('✅ package.json trouvé');
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const scripts = packageJson.scripts || {};
    
    if (scripts['build:netlify:ultra-secure']) {
      console.log('✅ Script build:netlify:ultra-secure trouvé');
      console.log(`  → ${scripts['build:netlify:ultra-secure']}`);
    } else {
      console.log('❌ Script build:netlify:ultra-secure non trouvé');
    }
    
    if (scripts['build:netlify:no-plugin']) {
      console.log('✅ Script build:netlify:no-plugin trouvé');
      console.log(`  → ${scripts['build:netlify:no-plugin']}`);
    } else {
      console.log('❌ Script build:netlify:no-plugin non trouvé');
    }
    
  } else {
    console.log('❌ package.json non trouvé');
  }
  
} catch (error) {
  console.log('❌ Erreur lors de la vérification des scripts:', error.message);
}

// Test de simulation d'un build
console.log('\n🧪 Test de simulation d\'un build...');

// Créer un objet de compilation simulé
const mockCompilation = {
  assets: {
    'vendors.js': {
      source: () => 'const self = window; console.log(self); if (self === globalThis) { }',
      size: () => 100
    },
    'main.js': {
      source: () => 'function test() { return self; }',
      size: () => 50
    },
    'chunk.js': {
      source: () => 'export default self;',
      size: () => 30
    }
  },
  chunks: [
    {
      files: ['vendors.js', 'main.js']
    }
  ]
};

// Simuler le traitement des assets
try {
  console.log('📊 Simulation du traitement des assets...');
  
  const plugin = new (require('../lib/webpack-plugins/self-reference-fixer'))({
    replaceWith: 'undefined',
    debug: true,
    aggressive: true
  });
  
  // Simuler le traitement
  plugin.processAllAssets(mockCompilation);
  plugin.processAllChunks(mockCompilation);
  
  console.log('✅ Simulation terminée');
  
  // Vérifier les résultats
  Object.entries(mockCompilation.assets).forEach(([filename, asset]) => {
    const source = asset.source();
    const selfCount = (source.match(/\bself\b/g) || []).length;
    console.log(`  ${filename}: ${selfCount} références 'self' restantes`);
  });
  
} catch (error) {
  console.log('❌ Erreur lors de la simulation:', error.message);
}

console.log('\n🎯 Recommandations pour Netlify:');
console.log('1. Vérifier que DEBUG_SELF_REFERENCE_FIXER=true est défini');
console.log('2. Utiliser le script build:netlify:ultra-secure');
console.log('3. Vérifier les logs de build pour les messages du plugin');
console.log('4. Si le problème persiste, essayer build:netlify:no-plugin pour désactiver le plugin');

console.log('\n✅ Test terminé'); 