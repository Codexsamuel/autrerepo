/**
 * Webpack Plugin pour corriger les références à 'self' pendant le build serveur
 * Ce plugin remplace toutes les références à 'self' par 'undefined' pour éviter
 * l'erreur "ReferenceError: self is not defined" pendant le SSR
 * Version compatible Webpack 5+
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
    // Hook into the 'normalModuleFactory' to modify module requests
    if (compiler.hooks && compiler.hooks.normalModuleFactory) {
      compiler.hooks.normalModuleFactory.tap('SelfReferenceFixer', (nmf) => {
        if (nmf && nmf.hooks && nmf.hooks.beforeResolve) {
          // Utiliser la nouvelle API Webpack 5+ avec tap au lieu de tapAsync
          nmf.hooks.beforeResolve.tap('SelfReferenceFixer', (resolveData) => {
            try {
              if (this.options.debug) {
                console.log(`🔍 SelfReferenceFixer: Traitement de la requête: ${resolveData?.request || 'undefined'}`);
              }

              // Vérifier si resolveData et resolveData.request sont définis
              if (resolveData && typeof resolveData.request === 'string' && resolveData.request.includes('self')) {
                console.log(`🔄 SelfReferenceFixer: Remplacement de '${resolveData.request}' par '${this.options.replaceWith}'`);
                resolveData.request = this.options.replaceWith;
              }
              
              // Retourner true pour continuer le processus (nouvelle API Webpack 5+)
              return true;
            } catch (error) {
              console.warn('⚠️ SelfReferenceFixer: Erreur dans beforeResolve:', error.message);
              return true;
            }
          });
        }
      });
    }

    // Hook into compilation to modify module content
    if (compiler.hooks && compiler.hooks.compilation) {
      compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
        try {
          // Vérifier si le hook existe avant de l'utiliser
          if (compilation.hooks && compilation.hooks.afterOptimizeChunkModules) {
            compilation.hooks.afterOptimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
              try {
                if (modules && Array.isArray(modules)) {
                  modules.forEach((module) => {
                    try {
                      if (module && module._source && module._source._value && typeof module._source._value === 'string') {
                        const originalContent = module._source._value;
                        const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
                        
                        if (originalContent !== modifiedContent) {
                          console.log(`🔄 SelfReferenceFixer: Remplacement de 'self' dans ${module.resource || 'module inconnu'}`);
                          module._source._value = modifiedContent;
                        }
                      }
                    } catch (moduleError) {
                      console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement du module:', moduleError.message);
                    }
                  });
                }
              } catch (hookError) {
                console.warn('⚠️ SelfReferenceFixer: Erreur dans afterOptimizeChunkModules:', hookError.message);
              }
            });
          }

          // Hook alternatif pour la modification du contenu
          if (compilation.hooks && compilation.hooks.afterChunks) {
            compilation.hooks.afterChunks.tap('SelfReferenceFixer', (chunks) => {
              try {
                if (compilation.modules && Array.isArray(compilation.modules)) {
                  compilation.modules.forEach((module) => {
                    try {
                      if (module && module._source && module._source._value && typeof module._source._value === 'string') {
                        const originalContent = module._source._value;
                        const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
                        
                        if (originalContent !== modifiedContent) {
                          console.log(`🔄 SelfReferenceFixer: Remplacement de 'self' dans ${module.resource || 'module inconnu'}`);
                          module._source._value = modifiedContent;
                        }
                      }
                    } catch (moduleError) {
                      console.warn('⚠️ SelfReferenceFixer: Erreur lors du traitement du module (afterChunks):', moduleError.message);
                    }
                  });
                }
              } catch (chunksError) {
                console.warn('⚠️ SelfReferenceFixer: Erreur dans afterChunks:', chunksError.message);
              }
            });
          }
        } catch (compilationError) {
          console.warn('⚠️ SelfReferenceFixer: Erreur lors de l\'initialisation de la compilation:', compilationError.message);
        }
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
}

module.exports = SelfReferenceFixerPlugin; 