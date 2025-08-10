/**
 * Webpack Plugin pour corriger les références à 'self' pendant le build serveur
 * Ce plugin remplace toutes les références à 'self' par 'undefined' pour éviter
 * l'erreur "ReferenceError: self is not defined" pendant le SSR
 * Version compatible Webpack 5+ avec traitement complet des chunks
 */

class SelfReferenceFixerPlugin {
  constructor(options = {}) {
    this.options = {
      replaceWith: 'undefined',
      debug: false,
      ...options,
    };
  }

  apply(compiler) {
    // Hook principal pour la compilation
    if (compiler.hooks && compiler.hooks.compilation) {
      compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
        try {
          // Hook pour traiter les modules après optimisation
          if (compilation.hooks && compilation.hooks.afterOptimizeChunkModules) {
            compilation.hooks.afterOptimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
              this.processModules(modules, 'afterOptimizeChunkModules');
            });
          }

          // Hook alternatif pour traiter les modules
          if (compilation.hooks && compilation.hooks.afterChunks) {
            compilation.hooks.afterChunks.tap('SelfReferenceFixer', (chunks) => {
              this.processModules(compilation.modules, 'afterChunks');
            });
          }

          // Hook pour traiter les chunks finaux
          if (compilation.hooks && compilation.hooks.afterProcessAssets) {
            compilation.hooks.afterProcessAssets.tap('SelfReferenceFixer', (assets) => {
              this.processAssets(assets, compilation);
            });
          }

          // Hook pour traiter les modules après la génération des chunks
          if (compilation.hooks && compilation.hooks.afterChunkAssets) {
            compilation.hooks.afterChunkAssets.tap('SelfReferenceFixer', (chunks) => {
              this.processChunkAssets(compilation);
            });
          }

        } catch (compilationError) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors de l\'initialisation de la compilation:', compilationError.message);
        }
      });
    }

    // Hook pour traiter les chunks finaux après la compilation
    if (compiler.hooks && compiler.hooks.afterEmit) {
      compiler.hooks.afterEmit.tap('SelfReferenceFixer', (compilation) => {
        this.processFinalChunks(compilation);
      });
    }

    // Hook de sécurité pour capturer les erreurs
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap('SelfReferenceFixer', (stats) => {
        console.log('✅ SelfReferenceFixer: Build terminé avec succès');
      });
    }

    if (compiler.hooks && compiler.hooks.failed) {
      compiler.hooks.failed.tap('SelfReferenceFixer', (error) => {
        console.warn('⚠️ SelfReferenceFixer: Build échoué:', error.message);
      });
    }
  }

  processModules(modules, hookName) {
    if (!modules || !Array.isArray(modules)) return;
    
    let processedCount = 0;
    modules.forEach((module) => {
      try {
        if (module && module._source && module._source._value && typeof module._source._value === 'string') {
          const originalContent = module._source._value;
          const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
          
          if (originalContent !== modifiedContent) {
            module._source._value = modifiedContent;
            processedCount++;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [${hookName}]: Remplacement dans ${module.resource || 'module inconnu'}`);
            }
          }
        }
      } catch (moduleError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement du module:', moduleError.message);
        }
      }
    });

    if (processedCount > 0 && this.options.debug) {
      console.log(`📊 SelfReferenceFixer [${hookName}]: ${processedCount} modules traités`);
    }
  }

  processAssets(assets, compilation) {
    if (!assets) return;
    
    let processedCount = 0;
    Object.keys(assets).forEach((assetName) => {
      try {
        const asset = assets[assetName];
        if (asset && asset.source && typeof asset.source === 'string') {
          const originalContent = asset.source;
          const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [assets]: Remplacement dans ${assetName}`);
            }
          }
        }
      } catch (assetError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement de l\'asset:', assetError.message);
        }
      }
    });

    if (processedCount > 0 && this.options.debug) {
      console.log(`📊 SelfReferenceFixer [assets]: ${processedCount} assets traités`);
    }
  }

  processChunkAssets(compilation) {
    if (!compilation.chunks) return;
    
    let processedCount = 0;
    compilation.chunks.forEach((chunk) => {
      try {
        if (chunk.files) {
          chunk.files.forEach((fileName) => {
            try {
              const asset = compilation.assets[fileName];
              if (asset && asset.source && typeof asset.source === 'string') {
                const originalContent = asset.source;
                const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
                
                if (originalContent !== modifiedContent) {
                  asset.source = modifiedContent;
                  processedCount++;
                  if (this.options.debug) {
                    console.log(`🔄 SelfReferenceFixer [chunkAssets]: Remplacement dans ${fileName}`);
                  }
                }
              }
            } catch (fileError) {
              if (this.options.debug) {
                console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement du fichier:', fileError.message);
              }
            }
          });
        }
      } catch (chunkError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement du chunk:', chunkError.message);
        }
      }
    });

    if (processedCount > 0 && this.options.debug) {
      console.log(`📊 SelfReferenceFixer [chunkAssets]: ${processedCount} fichiers de chunks traités`);
    }
  }

  processFinalChunks(compilation) {
    if (!compilation.assets) return;
    
    let processedCount = 0;
    Object.keys(compilation.assets).forEach((assetName) => {
      try {
        const asset = compilation.assets[assetName];
        if (asset && asset.source && typeof asset.source === 'string') {
          const originalContent = asset.source;
          const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [final]: Remplacement dans ${assetName}`);
            }
          }
        }
      } catch (assetError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement final:', assetError.message);
        }
      }
    });

    if (processedCount > 0) {
      console.log(`📊 SelfReferenceFixer [final]: ${processedCount} fichiers traités en final`);
    }
  }
}

module.exports = SelfReferenceFixerPlugin; 