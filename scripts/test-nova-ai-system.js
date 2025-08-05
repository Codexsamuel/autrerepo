#!/usr/bin/env node

/**
 * 🧪 Script de test pour le système NovaIA complet
 * Teste toutes les nouvelles fonctionnalités ajoutées
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

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function testEndpoint(url, name) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      logSuccess(`${name} - OK`);
      return { success: true, data };
    } else {
      logError(`${name} - Erreur ${response.status}`);
      return { success: false, error: response.status };
    }
  } catch (error) {
    logError(`${name} - Erreur de connexion: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testPages() {
  log('\n📄 Test des pages web...', 'bold');
  
  const pages = [
    { url: '/', name: 'Page d\'accueil' },
    { url: '/nova-ia', name: 'Page NovaIA' },
    { url: '/commercial-document-generator', name: 'Générateur de documents commerciaux' }
  ];
  
  for (const page of pages) {
    await testEndpoint(`${BASE_URL}${page.url}`, page.name);
  }
}

async function testAPIs() {
  log('\n🔌 Test des APIs...', 'bold');
  
  const apis = [
    { url: '/api/ai/query2', name: 'AI Query 2 API' },
    { url: '/api/ai/deepfake-faceswap', name: 'Deepfake Face Swap API' },
    { url: '/api/commercial-document/generate', name: 'Commercial Document Generator API' }
  ];
  
  for (const api of apis) {
    await testEndpoint(`${BASE_URL}${api.url}`, api.name);
  }
}

async function testAIQuery2() {
  log('\n🤖 Test AI Query 2...', 'bold');
  
  try {
    const response = await fetch(`${BASE_URL}/api/ai/query2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'Explique-moi l\'intelligence artificielle en 2 phrases',
        type: 'general',
        options: {
          language: 'fr',
          tone: 'professional'
        }
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      logSuccess('AI Query 2 - Test de requête réussi');
      logInfo(`Réponse: ${data.data?.result?.substring(0, 100)}...`);
    } else {
      logError(`AI Query 2 - Erreur ${response.status}`);
    }
  } catch (error) {
    logError(`AI Query 2 - Erreur: ${error.message}`);
  }
}

async function testCommercialDocumentGenerator() {
  log('\n📄 Test du générateur de documents commerciaux...', 'bold');
  
  try {
    const response = await fetch(`${BASE_URL}/api/commercial-document/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientName: 'Test Client',
        projectName: 'Projet Test',
        industry: 'Technologie',
        objectives: 'Développer une solution innovante',
        budget: '50000€',
        duration: '6 mois',
        targetAudience: 'Professionnels du secteur tech',
        uniqueSellingPoints: 'Innovation, expertise, support',
        deliverables: 'Application web, documentation, formation',
        documentType: 'proposal',
        tone: 'professional',
        language: 'fr'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      logSuccess('Générateur de documents - Test réussi');
      logInfo(`Document généré: ${data.document?.title}`);
      logInfo(`Sections: ${data.document?.sections?.length || 0}`);
      logInfo(`Temps de génération: ${data.metadata?.generationTime || 0}ms`);
    } else {
      const errorData = await response.json();
      logError(`Générateur de documents - Erreur ${response.status}: ${errorData.error}`);
    }
  } catch (error) {
    logError(`Générateur de documents - Erreur: ${error.message}`);
  }
}

async function testDeepfakeFaceSwap() {
  log('\n🎭 Test Deepfake Face Swap...', 'bold');
  
  try {
    const response = await fetch(`${BASE_URL}/api/ai/deepfake-faceswap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceImage: 'https://example.com/source.jpg',
        targetImage: 'https://example.com/target.jpg',
        options: {
          quality: 'medium',
          preserveExpression: true,
          enhanceDetails: true
        }
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      logSuccess('Deepfake Face Swap - Test réussi');
      logInfo(`Qualité: ${data.data?.quality || 'N/A'}`);
      logInfo(`Confiance: ${data.data?.confidence || 'N/A'}`);
    } else {
      const errorData = await response.json();
      logError(`Deepfake Face Swap - Erreur ${response.status}: ${errorData.error}`);
    }
  } catch (error) {
    logError(`Deepfake Face Swap - Erreur: ${error.message}`);
  }
}

async function runAllTests() {
  log('🚀 Démarrage des tests du système NovaIA...', 'bold');
  
  // Test des pages
  await testPages();
  
  // Test des APIs
  await testAPIs();
  
  // Tests fonctionnels
  await testAIQuery2();
  await testCommercialDocumentGenerator();
  await testDeepfakeFaceSwap();
  
  log('\n🎉 Tests terminés !', 'bold');
  logInfo('Vérifiez les résultats ci-dessus pour identifier les éventuels problèmes.');
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  logError(`Erreur non gérée: ${reason}`);
  process.exit(1);
});

// Exécution des tests
if (require.main === module) {
  runAllTests().catch(error => {
    logError(`Erreur lors de l'exécution des tests: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  testPages,
  testAPIs,
  testAIQuery2,
  testCommercialDocumentGenerator,
  testDeepfakeFaceSwap,
  runAllTests
}; 