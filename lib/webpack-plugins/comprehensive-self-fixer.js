/**
 * Plugin webpack complet pour corriger les références à 'self'
 * Ce plugin traite le problème à plusieurs niveaux pour assurer une correction complète
 */

class ComprehensiveSelfFixerPlugin {
  constructor(options = {}) {
    this.options = {
      replaceWith: 'undefined',
      debug: process.env.DEBUG_SELF_REFERENCE_FIXER === 'true',
      aggressive: true,
      ...options
    };
    
    this.stats = {
      processedFiles: new Set(),
      processedModules: new Set(),
      totalReplacements: 0,
      errors: []
    };
  }
  
  apply(compiler) {
    console.log('🔧 ComprehensiveSelfFixer: Initialisation...');
    
    // Hook pour la compilation
    compiler.hooks.compilation.tap('ComprehensiveSelfFixer', (compilation) => {
      console.log('🔧 ComprehensiveSelfFixer: Compilation détectée');
      
      // Vérifier que compilation et hooks existent
      if (!compilation || !compilation.hooks) {
        console.warn('⚠️ ComprehensiveSelfFixer: Compilation ou hooks non disponibles');
        return;
      }
      
      // Hook pour traiter les modules
      if (compilation.hooks.buildModule) {
        compilation.hooks.buildModule.tap('ComprehensiveSelfFixer', (module) => {
          this.processModule(module, compilation);
        });
      }
      
      // Hook pour traiter les chunks après optimisation
      if (compilation.hooks.afterOptimizeChunkModules) {
        compilation.hooks.afterOptimizeChunkModules.tap('ComprehensiveSelfFixer', (chunks, modules) => {
          console.log('🔧 ComprehensiveSelfFixer: Optimisation des chunks terminée');
          modules.forEach(module => this.processModule(module, compilation));
        });
      }
      
      // Hook pour traiter les assets
      if (compilation.hooks.processAssets) {
        compilation.hooks.processAssets.tap(
          {
            name: 'ComprehensiveSelfFixer',
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
          },
          (assets) => {
            console.log('🔧 ComprehensiveSelfFixer: Traitement des assets...');
            Object.keys(assets).forEach(filename => {
              if (filename.endsWith('.js')) {
                this.processAsset(filename, assets[filename], compilation);
              }
            });
          }
        );
      }
      
      // Hook pour traiter les chunks avant création des assets
      if (compilation.hooks.beforeChunkAssets) {
        compilation.hooks.beforeChunkAssets.tap('ComprehensiveSelfFixer', () => {
          console.log('🔧 ComprehensiveSelfFixer: Préparation des chunks...');
        });
      }
      
      // Hook pour traiter les assets après émission
      if (compilation.hooks.afterEmit) {
        compilation.hooks.afterEmit.tap('ComprehensiveSelfFixer', () => {
          console.log('🔧 ComprehensiveSelfFixer: Traitement final...');
          this.logStats();
        });
      }
    });
    
    // Hook pour traiter les erreurs
    if (compiler.hooks.failed) {
      compiler.hooks.failed.tap('ComprehensiveSelfFixer', (error) => {
        console.warn('⚠️ ComprehensiveSelfFixer: Build échoué:', error.message);
        this.stats.errors.push(error.message);
      });
    }
    
    // Hook pour la fin du build
    if (compiler.hooks.done) {
      compiler.hooks.done.tap('ComprehensiveSelfFixer', (stats) => {
        console.log('✅ ComprehensiveSelfFixer: Build terminé');
        this.logStats();
      });
    }
  }
  
  processModule(module, compilation) {
    try {
      if (!module.resource || !module.resource.endsWith('.js')) return;
      
      // Traiter le module source
      if (module._source && typeof module._source.source === 'function') {
        let source = module._source.source();
        
        if (source.includes('self')) {
          const beforeCount = (source.match(/\bself\b/g) || []).length;
          source = this.replaceSelfReferences(source);
          const afterCount = (source.match(/\bself\b/g) || []).length;
          const replacements = beforeCount - afterCount;
          
          if (replacements > 0) {
            module._source._value = source;
            this.stats.totalReplacements += replacements;
            this.stats.processedModules.add(module.resource);
            
            if (this.options.debug) {
              console.log(`🔧 Module traité: ${module.resource} (${replacements} remplacements)`);
            }
          }
        }
      }
      
      // Traiter le code du module si disponible
      if (module.code && typeof module.code === 'string') {
        if (module.code.includes('self')) {
          const beforeCount = (module.code.match(/\bself\b/g) || []).length;
          module.code = this.replaceSelfReferences(module.code);
          const afterCount = (module.code.match(/\bself\b/g) || []).length;
          const replacements = beforeCount - afterCount;
          
          if (replacements > 0) {
            this.stats.totalReplacements += replacements;
            this.stats.processedModules.add(module.resource);
          }
        }
      }
    } catch (error) {
      const errorMsg = `Erreur lors du traitement du module ${module.resource}: ${error.message}`;
      this.stats.errors.push(errorMsg);
      if (this.options.debug) {
        console.warn('⚠️', errorMsg);
      }
    }
  }
  
  processAsset(filename, asset, compilation) {
    try {
      if (asset && typeof asset.source === 'function') {
        let source = asset.source();
        
        if (source.includes('self')) {
          const beforeCount = (source.match(/\bself\b/g) || []).length;
          source = this.replaceSelfReferences(source);
          const afterCount = (source.match(/\bself\b/g) || []).length;
          const replacements = beforeCount - afterCount;
          
          if (replacements > 0) {
            // Mettre à jour l'asset
            compilation.assets[filename] = {
              source: () => source,
              size: () => source.length,
            };
            
            this.stats.processedFiles.add(filename);
            this.stats.totalReplacements += replacements;
            
            if (this.options.debug) {
              console.log(`🔧 Asset traité: ${filename} (${replacements} remplacements)`);
            }
          }
        }
      }
    } catch (error) {
      const errorMsg = `Erreur lors du traitement de l'asset ${filename}: ${error.message}`;
      this.stats.errors.push(errorMsg);
      if (this.options.debug) {
        console.warn('⚠️', errorMsg);
      }
    }
  }
  
  processChunkFile(filename, compilation) {
    try {
      const asset = compilation.assets[filename];
      if (asset) {
        this.processAsset(filename, asset, compilation);
      }
    } catch (error) {
      const errorMsg = `Erreur lors du traitement du chunk ${filename}: ${error.message}`;
      this.stats.errors.push(errorMsg);
      if (this.options.debug) {
        console.warn('⚠️', errorMsg);
      }
    }
  }
  
  replaceSelfReferences(source) {
    if (!source || typeof source !== 'string') return source;
    
    let result = '';
    let inString = false;
    let quoteChar = null;
    let escapeNext = false;
    let i = 0;
    
    while (i < source.length) {
      const char = source[i];
      
      if (escapeNext) {
        result += char;
        escapeNext = false;
        i++;
        continue;
      }
      
      if (char === '\\') {
        result += char;
        escapeNext = true;
        i++;
        continue;
      }
      
      if (char === '"' || char === "'" || char === '`') {
        if (!inString) {
          inString = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inString = false;
          quoteChar = null;
        }
        result += char;
        i++;
        continue;
      }
      
      // Vérifier si on a 'self' en dehors d'une chaîne
      if (!inString && source.substring(i, i + 4) === 'self' && 
          (i === 0 || !/[a-zA-Z0-9_]/.test(source[i - 1])) &&
          (i + 4 >= source.length || !/[a-zA-Z0-9_]/.test(source[i + 4]))) {
        result += this.options.replaceWith;
        i += 4;
      } else {
        result += char;
        i++;
      }
    }
    
    return result;
  }
  
  logStats() {
    console.log('📊 ComprehensiveSelfFixer - Statistiques:');
    console.log(`   - Fichiers traités: ${this.stats.processedFiles.size}`);
    console.log(`   - Modules traités: ${this.stats.processedModules.size}`);
    console.log(`   - Remplacements totaux: ${this.stats.totalReplacements}`);
    
    if (this.stats.errors.length > 0) {
      console.log(`   - Erreurs: ${this.stats.errors.length}`);
      if (this.options.debug) {
        this.stats.errors.forEach(error => console.warn(`     ⚠️ ${error}`));
      }
    }
  }
}

module.exports = ComprehensiveSelfFixerPlugin; 