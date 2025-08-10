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
      aggressive: true, // Mode agressif pour capturer plus de références
      ...options,
    };
    this.processedFiles = new Set();
    this.totalReplacements = 0;
  }

  apply(compiler) {
    // Hook principal pour la compilation
    if (compiler.hooks && compiler.hooks.compilation) {
      compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
        try {
          // Hook moderne pour traiter les assets (Webpack 5+)
          if (compilation.hooks && compilation.hooks.processAssets) {
            compilation.hooks.processAssets.tap(
              {
                name: 'SelfReferenceFixer',
                stage: compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
              },
              (assets) => {
                this.processAssets(assets, compilation, 'processAssets');
              }
            );
          }

          // Hook pour traiter les modules après optimisation
          if (compilation.hooks && compilation.hooks.afterOptimizeChunkModules) {
            compilation.hooks.afterOptimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
              this.processModules(modules, 'afterOptimizeChunkModules');
            });
          }

          // Hook pour traiter les chunks après optimisation (maintenu pour compatibilité)
          if (compilation.hooks && compilation.hooks.afterOptimizeChunkAssets) {
            compilation.hooks.afterOptimizeChunkAssets.tap('SelfReferenceFixer', (chunks) => {
              this.processChunkAssets(compilation, 'afterOptimizeChunkAssets');
            });
          }

          // Hook pour traiter les chunks après génération
          if (compilation.hooks && compilation.hooks.afterChunks) {
            compilation.hooks.afterChunks.tap('SelfReferenceFixer', (chunks) => {
              this.processModules(compilation.modules, 'afterChunks');
            });
          }

          // Hook pour traiter les assets après traitement
          if (compilation.hooks && compilation.hooks.afterProcessAssets) {
            compilation.hooks.afterProcessAssets.tap('SelfReferenceFixer', (assets) => {
              this.processAssets(assets, compilation, 'afterProcessAssets');
            });
          }

          // Hook pour traiter les chunks après génération
          if (compilation.hooks && compilation.hooks.afterChunkAssets) {
            compilation.hooks.afterChunkAssets.tap('SelfReferenceFixer', (chunks) => {
              this.processChunkAssets(compilation, 'afterChunkAssets');
            });
          }

          // Hook CRUCIAL pour traiter les chunks avant émission
          if (compilation.hooks && compilation.hooks.beforeChunkAssets) {
            compilation.hooks.beforeChunkAssets.tap('SelfReferenceFixer', () => {
              this.processAllChunks(compilation);
            });
          }

          // Hook pour traiter les assets avant émission
          if (compilation.hooks && compilation.hooks.beforeEmit) {
            compilation.hooks.beforeEmit.tap('SelfReferenceFixer', () => {
              this.processAllAssets(compilation);
            });
          }

          // Hook pour traiter les chunks après émission
          if (compilation.hooks && compilation.hooks.afterEmit) {
            compilation.hooks.afterEmit.tap('SelfReferenceFixer', () => {
              this.processEmittedChunks(compilation);
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
        if (this.options.debug) {
          console.log(`📊 SelfReferenceFixer: ${this.processedFiles.size} fichiers traités au total`);
          console.log(`🔄 SelfReferenceFixer: ${this.totalReplacements} remplacements effectués au total`);
        }
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
          const modifiedContent = this.replaceSelfReferences(originalContent);
          
          if (originalContent !== modifiedContent) {
            module._source._value = modifiedContent;
            processedCount++;
            this.totalReplacements += (originalContent.match(/self/g) || []).length;
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

  processAssets(assets, compilation, hookName) {
    if (!assets) return;
    
    let processedCount = 0;
    Object.keys(assets).forEach((assetName) => {
      try {
        const asset = assets[assetName];
        if (asset && asset.source && typeof asset.source === 'string') {
          const originalContent = asset.source;
          const modifiedContent = this.replaceSelfReferences(originalContent);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            this.processedFiles.add(assetName);
            this.totalReplacements += (originalContent.match(/self/g) || []).length;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [${hookName}]: Remplacement dans ${assetName}`);
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
      console.log(`📊 SelfReferenceFixer [${hookName}]: ${processedCount} assets traités`);
    }
  }

  processChunkAssets(compilation, hookName) {
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
                const modifiedContent = this.replaceSelfReferences(originalContent);
                
                if (originalContent !== modifiedContent) {
                  asset.source = modifiedContent;
                  processedCount++;
                  this.processedFiles.add(fileName);
                  this.totalReplacements += (originalContent.match(/self/g) || []).length;
                  if (this.options.debug) {
                    console.log(`🔄 SelfReferenceFixer [${hookName}]: Remplacement dans ${fileName}`);
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
      console.log(`📊 SelfReferenceFixer [${hookName}]: ${processedCount} fichiers de chunks traités`);
    }
  }

  processAllChunks(compilation) {
    if (!compilation.assets) return;
    
    let processedCount = 0;
    Object.keys(compilation.assets).forEach((assetName) => {
      try {
        const asset = compilation.assets[assetName];
        if (asset && asset.source && typeof asset.source === 'string') {
          const originalContent = asset.source;
          const modifiedContent = this.replaceSelfReferences(originalContent);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            this.processedFiles.add(assetName);
            this.totalReplacements += (originalContent.match(/self/g) || []).length;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [beforeChunkAssets]: Remplacement dans ${assetName}`);
            }
          }
        }
      } catch (assetError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement complet des chunks:', assetError.message);
        }
      }
    });

    if (processedCount > 0) {
      console.log(`📊 SelfReferenceFixer [beforeChunkAssets]: ${processedCount} fichiers traités avant émission`);
    }
  }

  processAllAssets(compilation) {
    if (!compilation.assets) return;
    
    let processedCount = 0;
    Object.keys(compilation.assets).forEach((assetName) => {
      try {
        const asset = compilation.assets[assetName];
        if (asset && asset.source && typeof asset.source === 'string') {
          const originalContent = asset.source;
          const modifiedContent = this.replaceSelfReferences(originalContent);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            this.processedFiles.add(assetName);
            this.totalReplacements += (originalContent.match(/self/g) || []).length;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [beforeEmit]: Remplacement dans ${assetName}`);
            }
          }
        }
      } catch (assetError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement avant émission:', assetError.message);
        }
      }
    });

    if (processedCount > 0 && this.options.debug) {
      console.log(`📊 SelfReferenceFixer [beforeEmit]: ${processedCount} fichiers traités avant émission`);
    }
  }

  processEmittedChunks(compilation) {
    if (!compilation.assets) return;
    
    let processedCount = 0;
    Object.keys(compilation.assets).forEach((assetName) => {
      try {
        const asset = compilation.assets[assetName];
        if (asset && asset.source && typeof asset.source === 'string') {
          const originalContent = asset.source;
          const modifiedContent = this.replaceSelfReferences(originalContent);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            this.processedFiles.add(assetName);
            this.totalReplacements += (originalContent.match(/self/g) || []).length;
            if (this.options.debug) {
              console.log(`🔄 SelfReferenceFixer [afterEmit]: Remplacement dans ${assetName}`);
            }
          }
        }
      } catch (assetError) {
        if (this.options.debug) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement après émission:', assetError.message);
        }
      }
    });

    if (processedCount > 0 && this.options.debug) {
      console.log(`📊 SelfReferenceFixer [afterEmit]: ${processedCount} fichiers traités après émission`);
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
          const modifiedContent = this.replaceSelfReferences(originalContent);
          
          if (originalContent !== modifiedContent) {
            asset.source = modifiedContent;
            processedCount++;
            this.processedFiles.add(assetName);
            this.totalReplacements += (originalContent.match(/self/g) || []).length;
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

    if (processedCount > 0 && this.options.debug) {
      console.log(`📊 SelfReferenceFixer [final]: ${processedCount} fichiers traités en final`);
    }
  }

  // Nouvelle méthode pour un remplacement plus agressif des références à 'self'
  replaceSelfReferences(content) {
    if (!content || typeof content !== 'string') return content;
    
    let modifiedContent = content;
    
    if (this.options.aggressive) {
      // Remplacement agressif : capturer tous les contextes possibles
      // 1. Remplacement des références directes à 'self'
      modifiedContent = modifiedContent.replace(/\bself\b/g, this.options.replaceWith);
      
      // 2. Remplacement des références dans les chaînes de caractères (si nécessaire)
      // modifiedContent = modifiedContent.replace(/'self'/g, `'${this.options.replaceWith}'`);
      // modifiedContent = modifiedContent.replace(/"self"/g, `"${this.options.replaceWith}"`);
      
      // 3. Remplacement des références dans les commentaires (optionnel)
      // modifiedContent = modifiedContent.replace(/\/\*.*?self.*?\*\//g, '');
      // modifiedContent = modifiedContent.replace(/\/\/.*?self.*$/gm, '');
      
      // 4. Remplacement des références dans les expressions régulières (si nécessaire)
      // modifiedContent = modifiedContent.replace(/\/.*?self.*?\//g, '');
    } else {
      // Remplacement standard
      modifiedContent = modifiedContent.replace(/\bself\b/g, this.options.replaceWith);
    }
    
    return modifiedContent;
  }
}

module.exports = SelfReferenceFixerPlugin; 