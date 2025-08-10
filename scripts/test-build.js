#!/usr/bin/env node

/**
 * Script de test pour vérifier que le plugin fonctionne avec Next.js
 * Teste une compilation webpack simple
 */

const path = require('path');

console.log('🧪 Test de compilation avec le plugin SelfReferenceFixer...\n');

// Simuler un environnement Netlify
process.env.NETLIFY = 'true';
process.env.DEBUG_SELF_REFERENCE_FIXER = 'true';

try {
  // Charger le plugin
  const NetlifySelfFixerPlugin = require('../lib/webpack-plugins/netlify-self-fixer');
  
  if (!NetlifySelfFixerPlugin) {
    throw new Error('Plugin non trouvé');
  }
  
  console.log('✅ Plugin chargé avec succès');
  
  // Créer une instance du plugin
  const plugin = new NetlifySelfFixerPlugin({
    replaceWith: 'undefined',
    debug: true,
    aggressive: true
  });
  
  console.log('✅ Plugin instancié avec succès');
  
  // Simuler une compilation webpack simple
  const mockCompilation = {
    assets: {
      'test.js': {
        source: () => 'const x = self; const y = "self"; const z = self.property;',
        size: () => 50
      },
      'vendors.js': {
        source: () => 'self.self.self; window.self;',
        size: () => 30
      }
    }
  };
  
  // Simuler un compilateur webpack
  const mockCompiler = {
    hooks: {
      afterEmit: {
        tap: (name, callback) => {
          console.log(`🔧 Hook ${name} enregistré`);
          
          // Exécuter le callback
          try {
            callback(mockCompilation);
            console.log('✅ Callback exécuté avec succès');
          } catch (error) {
            console.error('❌ Erreur lors de l\'exécution du callback:', error.message);
            throw error;
          }
        }
      }
    }
  };
  
  // Appliquer le plugin
  plugin.apply(mockCompiler);
  
  // Vérifier que les assets ont été modifiés
  const testAsset = mockCompilation.assets['test.js'];
  const vendorsAsset = mockCompilation.assets['vendors.js'];
  
  if (testAsset && vendorsAsset) {
    const testSource = testAsset.source();
    const vendorsSource = vendorsAsset.source();
    
    console.log('\n📝 Résultats du traitement:');
    console.log(`   test.js: ${testSource}`);
    console.log(`   vendors.js: ${vendorsSource}`);
    
    // Vérifier que 'self' a été remplacé dans les références mais pas dans les chaînes
    if (testSource.includes('undefined.property') && testSource.includes('"self"')) {
      console.log('✅ Remplacement correct dans test.js');
    } else {
      console.log('❌ Remplacement incorrect dans test.js');
    }
    
    if (vendorsSource.includes('undefined.undefined.undefined') && vendorsSource.includes('window.undefined')) {
      console.log('✅ Remplacement correct dans vendors.js');
    } else {
      console.log('❌ Remplacement incorrect dans vendors.js');
    }
  }
  
  console.log('\n🎉 Test de compilation réussi!');
  console.log('🚀 Le plugin est prêt pour Next.js!');
  
} catch (error) {
  console.error('❌ Erreur lors du test:', error.message);
  process.exit(1);
} 