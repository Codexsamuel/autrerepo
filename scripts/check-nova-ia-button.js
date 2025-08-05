#!/usr/bin/env node

/**
 * 🔍 Script de vérification du bouton NovaIA dans la navigation
 */

const BASE_URL = 'http://localhost:3000';

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function checkNovaIAButton() {
  log('🔍 Vérification du bouton NovaIA dans la navigation...', 'bold');
  
  try {
    // Récupérer le HTML de la page d'accueil
    const response = await fetch(BASE_URL);
    const html = await response.text();
    
    // Vérifier la présence du bouton NovaIA
    const novaIAButtonPatterns = [
      /href="\/nova-ia"/,
      /NovaIA/,
      /from-purple-600 to-pink-600/,
      /Brain className/
    ];
    
    let foundPatterns = 0;
    
    novaIAButtonPatterns.forEach((pattern, index) => {
      if (pattern.test(html)) {
        foundPatterns++;
        logSuccess(`Pattern ${index + 1} trouvé: ${pattern}`);
      } else {
        logError(`Pattern ${index + 1} manquant: ${pattern}`);
      }
    });
    
    if (foundPatterns >= 2) {
      logSuccess('🎉 Le bouton NovaIA est bien présent dans la navigation !');
      logInfo('Vous devriez voir un bouton "NovaIA" avec une icône de cerveau dans votre barre de navigation.');
    } else {
      logError('⚠️  Le bouton NovaIA pourrait ne pas être visible. Vérifiez la page.');
    }
    
    // Vérifier que la page NovaIA est accessible
    log('\n🔗 Vérification de l\'accessibilité de la page NovaIA...', 'bold');
    
    const novaIAResponse = await fetch(`${BASE_URL}/nova-ia`);
    if (novaIAResponse.ok) {
      logSuccess('Page NovaIA accessible');
    } else {
      logError(`Page NovaIA non accessible: ${novaIAResponse.status}`);
    }
    
  } catch (error) {
    logError(`Erreur lors de la vérification: ${error.message}`);
  }
}

// Exécution
if (require.main === module) {
  checkNovaIAButton().catch(error => {
    logError(`Erreur: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { checkNovaIAButton }; 