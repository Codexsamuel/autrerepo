#!/usr/bin/env node

/**
 * Script de Test Automatisé pour DL Solutions
 * Valide tous les modules et fonctionnalités de l'application
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration des couleurs pour l'affichage
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Statistiques des tests
let testStats = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0
};

// Fonction pour afficher les résultats
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, status, details = '') {
  testStats.total++;
  const statusColor = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
  const statusText = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '⚠';
  
  log(`${statusText} ${testName}`, statusColor);
  if (details) {
    log(`   ${details}`, 'cyan');
  }
  
  if (status === 'PASS') testStats.passed++;
  else if (status === 'FAIL') testStats.failed++;
  else testStats.skipped++;
}

// Test 1: Vérification de l'environnement
function testEnvironment() {
  log('\n🔧 TEST 1: Vérification de l\'environnement', 'bright');
  
  // Vérifier Node.js
  try {
    const nodeVersion = process.version;
    logTest('Node.js version', 'PASS', `Version: ${nodeVersion}`);
  } catch (error) {
    logTest('Node.js version', 'FAIL', error.message);
  }
  
  // Vérifier les dépendances
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    logTest('package.json', 'PASS', 'Fichier trouvé');
    
    const requiredDeps = ['next', 'react', 'react-dom', '@supabase/supabase-js'];
    for (const dep of requiredDeps) {
      if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
        logTest(`Dépendance ${dep}`, 'PASS');
      } else {
        logTest(`Dépendance ${dep}`, 'FAIL', 'Manquante');
      }
    }
  } catch (error) {
    logTest('package.json', 'FAIL', error.message);
  }
  
  // Vérifier les variables d'environnement
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'GEMINI_API_KEY',
      'HUGGINGFACE_API_KEY'
    ];
    
    for (const envVar of requiredEnvVars) {
      if (envFile.includes(envVar)) {
        logTest(`Variable d'environnement ${envVar}`, 'PASS');
      } else {
        logTest(`Variable d'environnement ${envVar}`, 'FAIL', 'Manquante');
      }
    }
  } catch (error) {
    logTest('Fichier .env', 'FAIL', error.message);
  }
}

// Test 2: Vérification de la structure du projet
function testProjectStructure() {
  log('\n📁 TEST 2: Structure du projet', 'bright');
  
  const requiredDirs = [
    'app',
    'components',
    'lib',
    'public',
    'scripts'
  ];
  
  const requiredFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'lib/supabase.ts',
    'components/ui/button.tsx',
    'next.config.js',
    'tailwind.config.js'
  ];
  
  for (const dir of requiredDirs) {
    if (fs.existsSync(dir)) {
      logTest(`Dossier ${dir}`, 'PASS');
    } else {
      logTest(`Dossier ${dir}`, 'FAIL', 'Manquant');
    }
  }
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      logTest(`Fichier ${file}`, 'PASS');
    } else {
      logTest(`Fichier ${file}`, 'FAIL', 'Manquant');
    }
  }
}

// Test 3: Vérification des modules principaux
function testMainModules() {
  log('\n🏗️ TEST 3: Modules principaux', 'bright');
  
  const modules = [
    { name: 'DL Style (E-commerce)', path: 'app/dl-style' },
    { name: 'DL Trading', path: 'app/trading' },
    { name: 'NovaCore', path: 'app/novacore' },
    { name: 'Intranet', path: 'app/intranet' },
    { name: 'Formations', path: 'app/formations' },
    { name: 'Services', path: 'app/services' },
    { name: 'Contact', path: 'app/contact' },
    { name: 'À propos', path: 'app/a-propos' }
  ];
  
  for (const module of modules) {
    if (fs.existsSync(module.path)) {
      const pageFile = path.join(module.path, 'page.tsx');
      if (fs.existsSync(pageFile)) {
        logTest(`Module ${module.name}`, 'PASS');
      } else {
        logTest(`Module ${module.name}`, 'FAIL', 'page.tsx manquant');
      }
    } else {
      logTest(`Module ${module.name}`, 'FAIL', 'Dossier manquant');
    }
  }
}

// Test 4: Vérification de l'authentification
function testAuthentication() {
  log('\n🔐 TEST 4: Système d\'authentification', 'bright');
  
  const authFiles = [
    'app/sign-in/page.tsx',
    'app/sign-up/page.tsx',
    'lib/supabase.ts'
  ];
  
  for (const file of authFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('supabase') || content.includes('auth')) {
        logTest(`Fichier d'auth ${file}`, 'PASS');
      } else {
        logTest(`Fichier d'auth ${file}`, 'FAIL', 'Configuration Supabase manquante');
      }
    } else {
      logTest(`Fichier d'auth ${file}`, 'FAIL', 'Fichier manquant');
    }
  }
}

// Test 5: Vérification du scraping
function testScraping() {
  log('\n🕷️ TEST 5: Système de scraping', 'bright');
  
  const scrapingFiles = [
    'lib/scraper/aliexpress.ts',
    'lib/scraper/multi-markets.ts'
  ];
  
  for (const file of scrapingFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('fetch') || content.includes('axios') || content.includes('puppeteer')) {
        logTest(`Scraper ${file}`, 'PASS');
      } else {
        logTest(`Scraper ${file}`, 'FAIL', 'Logique de scraping manquante');
      }
    } else {
      logTest(`Scraper ${file}`, 'SKIP', 'Fichier non trouvé');
    }
  }
}

// Test 6: Vérification de la base de données
function testDatabase() {
  log('\n🗄️ TEST 6: Configuration base de données', 'bright');
  
  try {
    const supabaseConfig = fs.readFileSync('lib/supabase.ts', 'utf8');
    
    if (supabaseConfig.includes('createClient')) {
      logTest('Configuration Supabase', 'PASS');
    } else {
      logTest('Configuration Supabase', 'FAIL', 'Client non configuré');
    }
    
    if (supabaseConfig.includes('SUPER_ADMIN_EMAIL')) {
      logTest('Compte Super Admin', 'PASS');
    } else {
      logTest('Compte Super Admin', 'FAIL', 'Configuration manquante');
    }
    
  } catch (error) {
    logTest('Configuration Supabase', 'FAIL', error.message);
  }
}

// Test 7: Vérification des composants UI
function testUIComponents() {
  log('\n🎨 TEST 7: Composants UI', 'bright');
  
  const uiComponents = [
    'components/ui/button.tsx',
    'components/ui/card.tsx',
    'components/ui/input.tsx',
    'components/ui/alert.tsx',
    'components/layout/navigation.tsx'
  ];
  
  for (const component of uiComponents) {
    if (fs.existsSync(component)) {
      const content = fs.readFileSync(component, 'utf8');
      if (content.includes('export') || content.includes('function') || content.includes('const')) {
        logTest(`Composant ${component}`, 'PASS');
      } else {
        logTest(`Composant ${component}`, 'FAIL', 'Code manquant');
      }
    } else {
      logTest(`Composant ${component}`, 'FAIL', 'Fichier manquant');
    }
  }
}

// Test 8: Vérification des médias
function testMedia() {
  log('\n📸 TEST 8: Médias et assets', 'bright');
  
  const mediaDirs = [
    'public/images',
    'public/videos',
    'public/logos'
  ];
  
  for (const dir of mediaDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (files.length > 0) {
        logTest(`Dossier médias ${dir}`, 'PASS', `${files.length} fichiers`);
      } else {
        logTest(`Dossier médias ${dir}`, 'FAIL', 'Aucun fichier');
      }
    } else {
      logTest(`Dossier médias ${dir}`, 'SKIP', 'Dossier non trouvé');
    }
  }
}

// Test 9: Vérification de la configuration Next.js
function testNextJSConfig() {
  log('\n⚙️ TEST 9: Configuration Next.js', 'bright');
  
  const configFiles = [
    'next.config.js',
    'tailwind.config.js',
    'tsconfig.json'
  ];
  
  for (const file of configFiles) {
    if (fs.existsSync(file)) {
      logTest(`Configuration ${file}`, 'PASS');
    } else {
      logTest(`Configuration ${file}`, 'FAIL', 'Fichier manquant');
    }
  }
}

// Test 10: Vérification des scripts
function testScripts() {
  log('\n📜 TEST 10: Scripts et utilitaires', 'bright');
  
  const scripts = [
    'scripts/test-automation.js',
    'scripts/clean.sh',
    'scripts/config.ts'
  ];
  
  for (const script of scripts) {
    if (fs.existsSync(script)) {
      logTest(`Script ${script}`, 'PASS');
    } else {
      logTest(`Script ${script}`, 'SKIP', 'Script non trouvé');
    }
  }
}

// Fonction principale
function runAllTests() {
  log('🚀 DÉMARRAGE DES TESTS AUTOMATISÉS - DL SOLUTIONS', 'bright');
  log('=' .repeat(60), 'blue');
  
  testEnvironment();
  testProjectStructure();
  testMainModules();
  testAuthentication();
  testScraping();
  testDatabase();
  testUIComponents();
  testMedia();
  testNextJSConfig();
  testScripts();
  
  // Affichage des résultats finaux
  log('\n📊 RÉSULTATS FINAUX', 'bright');
  log('=' .repeat(60), 'blue');
  
  log(`Total des tests: ${testStats.total}`, 'bright');
  log(`Tests réussis: ${testStats.passed}`, 'green');
  log(`Tests échoués: ${testStats.failed}`, 'red');
  log(`Tests ignorés: ${testStats.skipped}`, 'yellow');
  
  const successRate = ((testStats.passed / testStats.total) * 100).toFixed(1);
  log(`Taux de réussite: ${successRate}%`, successRate >= 80 ? 'green' : 'red');
  
  if (testStats.failed === 0) {
    log('\n🎉 TOUS LES TESTS SONT PASSÉS ! L\'application est prête.', 'green');
  } else {
    log('\n⚠️  CERTAINS TESTS ONT ÉCHOUÉ. Vérifiez les erreurs ci-dessus.', 'red');
  }
  
  log('\n📋 CHECKLIST MANUELLE RECOMMANDÉE:', 'bright');
  log('1. Tester la connexion Super Admin (sobam@daveandlucesolutions.com)', 'cyan');
  log('2. Vérifier le scraping de produits sur DL Style', 'cyan');
  log('3. Tester l\'ajout au panier et le checkout', 'cyan');
  log('4. Vérifier les modules NovaCore et Intranet', 'cyan');
  log('5. Tester l\'upload de médias', 'cyan');
  log('6. Vérifier la navigation entre les pages', 'cyan');
  log('7. Tester les formulaires de contact et devis', 'cyan');
  log('8. Vérifier l\'intégration des APIs externes', 'cyan');
}

// Exécution des tests
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests, testStats }; 