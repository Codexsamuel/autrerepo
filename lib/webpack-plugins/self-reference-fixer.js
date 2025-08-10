/**
 * Webpack Plugin pour corriger les références à 'self' pendant le build serveur
 * Ce plugin remplace toutes les références à 'self' par 'undefined' pour éviter
 * l'erreur "ReferenceError: self is not defined" pendant le SSR
 */

class SelfReferenceFixerPlugin {
  constructor(options = {}) {
    this.options = {
      replaceWith: 'undefined',
      ...options
    };
  }

  apply(compiler) {
    // Hook pour filtrer les modules avant résolution
    compiler.hooks.normalModuleFactory.tap('SelfReferenceFixer', (normalModuleFactory) => {
      normalModuleFactory.hooks.beforeResolve.tap('SelfReferenceFixer', (resolveData) => {
        if (resolveData.request && resolveData.request.includes('self')) {
          console.log(`🔄 SelfReferenceFixer: Remplacement de '${resolveData.request}' par '${this.options.replaceWith}'`);
          resolveData.request = this.options.replaceWith;
        }
      });
    });

    // Hook pour remplacer le contenu des modules
    compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
      compilation.hooks.afterOptimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
        modules.forEach((module) => {
          if (module._source && module._source._value) {
            const originalContent = module._source._value;
            const modifiedContent = originalContent.replace(/self/g, this.options.replaceWith);
            
            if (originalContent !== modifiedContent) {
              console.log(`🔄 SelfReferenceFixer: Remplacement de 'self' dans ${module.resource || 'module inconnu'}`);
              module._source._value = modifiedContent;
            }
          }
        });
      });
    });

    // Hook pour filtrer les modules contenant des références à 'self'
    compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
      compilation.hooks.optimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
        modules.forEach((module) => {
          if (module.resource && (
            module.resource.includes('workbox') || 
            module.resource.includes('sw.js') ||
            module.resource.includes('service-worker')
          )) {
            console.log(`🚫 SelfReferenceFixer: Module service worker ignoré: ${module.resource}`);
            // Marquer le module comme ignoré
            module.resource = 'ignored';
          }
        });
      });
    });

    // Hook pour remplacer les imports de modules contenant 'self'
    compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
      compilation.hooks.afterOptimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
        modules.forEach((module) => {
          if (module.dependencies) {
            module.dependencies.forEach((dependency) => {
              if (dependency.request && dependency.request.includes('self')) {
                console.log(`🔄 SelfReferenceFixer: Dépendance 'self' remplacée: ${dependency.request}`);
                dependency.request = this.options.replaceWith;
              }
            });
          }
        });
      });
    });

    // Hook pour ignorer complètement les modules service worker
    compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
      compilation.hooks.beforeModuleIds.tap('SelfReferenceFixer', (compilation) => {
        compilation.modules.forEach((module) => {
          if (module.resource && (
            module.resource.includes('workbox') || 
            module.resource.includes('sw.js') ||
            module.resource.includes('service-worker') ||
            module.resource.includes('self')
          )) {
            console.log(`🚫 SelfReferenceFixer: Module ignoré: ${module.resource}`);
            // Marquer le module comme ignoré
            module.resource = 'ignored';
          }
        });
      });
    });

    // Hook pour remplacer les références globales à 'self'
    compiler.hooks.compilation.tap('SelfReferenceFixer', (compilation) => {
      compilation.hooks.afterOptimizeChunkModules.tap('SelfReferenceFixer', (chunks, modules) => {
        modules.forEach((module) => {
          if (module._source && module._source._value) {
            let content = module._source._value;
            
            // Remplacer toutes les références à 'self'
            content = content.replace(/self\./g, 'undefined.');
            content = content.replace(/self\[/g, 'undefined[');
            content = content.replace(/self\s*=/g, 'undefined =');
            content = content.replace(/self\s*;/g, 'undefined;');
            content = content.replace(/self\s*\)/g, 'undefined)');
            content = content.replace(/self\s*,/g, 'undefined,');
            content = content.replace(/self\s*&&/g, 'undefined &&');
            content = content.replace(/self\s*\|\|/g, 'undefined ||');
            content = content.replace(/self\s*\+/g, 'undefined +');
            content = content.replace(/self\s*-/g, 'undefined -');
            content = content.replace(/self\s*\*/g, 'undefined *');
            content = content.replace(/self\s*\//g, 'undefined /');
            content = content.replace(/self\s*%/g, 'undefined %');
            content = content.replace(/self\s*</g, 'undefined <');
            content = content.replace(/self\s*>/g, 'undefined >');
            content = content.replace(/self\s*<=/g, 'undefined <=');
            content = content.replace(/self\s*>=/g, 'undefined >=');
            content = content.replace(/self\s*===/g, 'undefined ===');
            content = content.replace(/self\s*!==/g, 'undefined !==');
            content = content.replace(/self\s*==/g, 'undefined ==');
            content = content.replace(/self\s*!=/g, 'undefined !=');
            
            if (content !== module._source._value) {
              console.log(`🔄 SelfReferenceFixer: Remplacement avancé de 'self' dans ${module.resource || 'module inconnu'}`);
              module._source._value = content;
            }
          }
        });
      });
    });
  }
}

module.exports = SelfReferenceFixerPlugin; 