/**
 * Webpack Plugin spécialement conçu pour Netlify
 * Corrige les références à 'self' qui causent l'erreur "self is not defined"
 * Version optimisée pour Next.js 15+ et Webpack 5+
 */

class NetlifySelfFixerPlugin {
  constructor(options = {}) {
    this.options = {
      replaceWith: 'undefined',
      debug: process.env.DEBUG_SELF_REFERENCE_FIXER === 'true',
      aggressive: true,
      ...options,
    };
    this.processedFiles = new Set();
    this.totalReplacements = 0;
  }

  apply(compiler) {
    // Hook principal pour traiter les assets après leur génération
    compiler.hooks.afterEmit.tap('NetlifySelfFixer', (compilation) => {
      if (this.options.debug) {
        console.log('🔧 NetlifySelfFixer: Début du traitement des assets...');
      }

      try {
        this.processCompilationAssets(compilation);
      } catch (error) {
        console.warn('⚠️ NetlifySelfFixer: Erreur lors du traitement:', error.message);
      }

      if (this.options.debug) {
        console.log(`✅ NetlifySelfFixer: Traitement terminé - ${this.processedFiles.size} fichiers traités, ${this.totalReplacements} remplacements effectués`);
      }
    });

    // Hook de secours pour traiter les chunks
    if (compiler.hooks && compiler.hooks.afterChunks) {
      compiler.hooks.afterChunks.tap('NetlifySelfFixer', (chunks) => {
        if (this.options.debug) {
          console.log('🔧 NetlifySelfFixer: Traitement des chunks...');
        }
        
        try {
          this.processChunks(chunks);
        } catch (error) {
          console.warn('⚠️ NetlifySelfFixer: Erreur lors du traitement des chunks:', error.message);
        }
      });
    }
  }

  processCompilationAssets(compilation) {
    if (!compilation.assets) return;

    // Traiter tous les assets JavaScript
    for (const [filename, asset] of Object.entries(compilation.assets)) {
      if (filename.endsWith('.js')) {
        this.processAsset(filename, asset, compilation);
      }
    }
  }

  processChunks(chunks) {
    if (!chunks || !Array.isArray(chunks)) return;

    chunks.forEach(chunk => {
      if (chunk.files && Array.isArray(chunk.files)) {
        chunk.files.forEach(filename => {
          if (filename.endsWith('.js')) {
            // Traiter le chunk si c'est un fichier JavaScript
            this.processChunkFile(filename, chunk);
          }
        });
      }
    });
  }

  processAsset(filename, asset, compilation) {
    try {
      // Vérifier si l'asset a une méthode source() disponible
      if (asset && typeof asset.source === 'function') {
        let source = asset.source();
        
        // Remplacer toutes les références à 'self' par 'undefined'
        if (source.includes('self')) {
          const beforeCount = (source.match(/\bself\b/g) || []).length;
          
          // Remplacer les références 'self' en dehors des chaînes
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
          
          source = result;
          
          const afterCount = (source.match(/\bself\b/g) || []).length;
          const replacements = beforeCount - afterCount;
          
          if (replacements > 0) {
            // Mettre à jour l'asset dans la compilation
            compilation.assets[filename] = {
              source: () => source,
              size: () => source.length,
            };
            
            this.processedFiles.add(filename);
            this.totalReplacements += replacements;
            
            if (this.options.debug) {
              console.log(`🔧 NetlifySelfFixer: Traité ${filename} (${replacements} remplacements)`);
            }
          }
        }
      } else if (this.options.debug) {
        console.log(`ℹ️ Asset ${filename} n'a pas de méthode source() disponible`);
      }
    } catch (error) {
      if (this.options.debug) {
        console.log(`⚠️ Erreur lors du traitement de ${filename}:`, error.message);
      }
    }
  }

  processChunkFile(filename, chunk) {
    try {
      // Traiter le fichier de chunk si possible
      if (this.options.debug) {
        console.log(`🔧 NetlifySelfFixer: Traitement du chunk ${filename}`);
      }
    } catch (error) {
      if (this.options.debug) {
        console.log(`⚠️ Erreur lors du traitement du chunk ${filename}:`, error.message);
      }
    }
  }

  // Méthode utilitaire pour vérifier si un asset contient des références 'self'
  containsSelfReference(source) {
    if (!source || typeof source !== 'string') return false;
    
    // Vérifier s'il y a des références 'self' en dehors des chaînes
    let inString = false;
    let quoteChar = null;
    let escapeNext = false;
    
    for (let i = 0; i < source.length - 3; i++) {
      const char = source[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
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
        continue;
      }
      
      if (!inString && source.substring(i, i + 4) === 'self' && 
          (i === 0 || !/[a-zA-Z0-9_]/.test(source[i - 1])) &&
          (i + 4 >= source.length || !/[a-zA-Z0-9_]/.test(source[i + 4]))) {
        return true;
      }
    }
    
    return false;
  }

  // Méthode utilitaire pour compter les références 'self'
  countSelfReferences(source) {
    if (!source || typeof source !== 'string') return 0;
    const matches = source.match(/\bself\b/g);
    return matches ? matches.length : 0;
  }
}

module.exports = NetlifySelfFixerPlugin; 