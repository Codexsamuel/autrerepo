/**
 * Polyfill pour la variable globale 'self'
 * Ce fichier définit 'self' comme 'undefined' pour éviter l'erreur "self is not defined"
 */

// Vérifier si 'self' n'est pas défini
if (typeof self === 'undefined') {
  // Définir 'self' comme 'undefined' pour éviter les erreurs
  global.self = undefined;
  
  // Alternative: définir comme un objet vide avec des propriétés communes
  // global.self = {
  //   location: undefined,
  //   navigator: undefined,
  //   document: undefined,
  //   window: undefined
  // };
  
  console.log('🔧 Polyfill "self" appliqué');
}

// Exporter pour utilisation dans d'autres modules
module.exports = global.self; 