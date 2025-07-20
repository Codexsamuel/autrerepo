#!/usr/bin/env node

/**
 * Script de test et diagnostic pour les problèmes d'affichage mobile
 * DL Solutions - Test Mobile Display
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNOSTIC AFFICHAGE MOBILE DL SOLUTIONS');
console.log('===========================================\n');

// Configuration
const projectRoot = process.cwd();
const criticalFiles = [
  'app/layout.tsx',
  'app/mobile-fixes.css',
  'app/globals.css',
  'next.config.js',
  'tailwind.config.ts',
  'package.json'
];

// Vérifications critiques
function checkCriticalFiles() {
  console.log('📁 VÉRIFICATION DES FICHIERS CRITIQUES:');
  
  let allFilesExist = true;
  
  criticalFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      console.log(`✅ ${file} - Présent`);
    } else {
      console.log(`❌ ${file} - MANQUANT`);
      allFilesExist = false;
    }
  });
  
  console.log('');
  return allFilesExist;
}

// Vérification du viewport meta tag
function checkViewportMeta() {
  console.log('📱 VÉRIFICATION VIEWPORT META TAG:');
  
  const layoutPath = path.join(projectRoot, 'app/layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ app/layout.tsx non trouvé');
    return false;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Vérifier la présence du viewport meta tag
  const viewportRegex = /<meta name="viewport"[^>]*>/;
  const hasViewport = viewportRegex.test(layoutContent);
  
  if (hasViewport) {
    console.log('✅ Viewport meta tag présent');
    
    // Vérifier le contenu du viewport
    const viewportMatch = layoutContent.match(viewportRegex);
    if (viewportMatch) {
      console.log(`   Contenu: ${viewportMatch[0]}`);
    }
  } else {
    console.log('❌ Viewport meta tag MANQUANT');
  }
  
  // Vérifier l'import du CSS mobile
  const mobileCssImport = /import.*mobile-fixes\.css/;
  const hasMobileCss = mobileCssImport.test(layoutContent);
  
  if (hasMobileCss) {
    console.log('✅ Import mobile-fixes.css présent');
  } else {
    console.log('❌ Import mobile-fixes.css MANQUANT');
  }
  
  console.log('');
  return hasViewport && hasMobileCss;
}

// Vérification du CSS mobile
function checkMobileCSS() {
  console.log('🎨 VÉRIFICATION CSS MOBILE:');
  
  const mobileCssPath = path.join(projectRoot, 'app/mobile-fixes.css');
  
  if (!fs.existsSync(mobileCssPath)) {
    console.log('❌ mobile-fixes.css non trouvé');
    return false;
  }
  
  const cssContent = fs.readFileSync(mobileCssPath, 'utf8');
  
  // Vérifications importantes
  const checks = [
    { name: 'Media queries mobile', pattern: /@media.*max-width.*768px/, required: true },
    { name: 'Reset mobile viewport', pattern: /box-sizing.*border-box/, required: true },
    { name: 'Fix navigation mobile', pattern: /sidebar.*position.*fixed/, required: true },
    { name: 'Fix grilles mobile', pattern: /grid-template-columns.*1fr/, required: true },
    { name: 'Fix boutons touch', pattern: /min-height.*44px/, required: true },
    { name: 'Fix inputs iOS', pattern: /font-size.*16px/, required: true },
    { name: 'Layout responsive', pattern: /responsive-layout/, required: true },
    { name: 'Mobile card styles', pattern: /mobile-card/, required: true },
    { name: 'PWA standalone', pattern: /display-mode.*standalone/, required: false },
    { name: 'Dark mode mobile', pattern: /prefers-color-scheme.*dark/, required: false }
  ];
  
  let allChecksPassed = true;
  
  checks.forEach(check => {
    const hasPattern = check.pattern.test(cssContent);
    
    if (hasPattern) {
      console.log(`✅ ${check.name}`);
    } else if (check.required) {
      console.log(`❌ ${check.name} - MANQUANT`);
      allChecksPassed = false;
    } else {
      console.log(`⚠️  ${check.name} - Optionnel (non présent)`);
    }
  });
  
  console.log('');
  return allChecksPassed;
}

// Vérification de la configuration Next.js
function checkNextConfig() {
  console.log('⚙️  VÉRIFICATION CONFIGURATION NEXT.JS:');
  
  const nextConfigPath = path.join(projectRoot, 'next.config.js');
  
  if (!fs.existsSync(nextConfigPath)) {
    console.log('❌ next.config.js non trouvé');
    return false;
  }
  
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  // Vérifications
  const checks = [
    { name: 'Compression activée', pattern: /compress.*true/, required: true },
    { name: 'Optimisation images', pattern: /formats.*webp/, required: false },
    { name: 'Headers CORS', pattern: /Access-Control-Allow-Origin/, required: false }
  ];
  
  let allChecksPassed = true;
  
  checks.forEach(check => {
    const hasPattern = check.pattern.test(configContent);
    
    if (hasPattern) {
      console.log(`✅ ${check.name}`);
    } else if (check.required) {
      console.log(`❌ ${check.name} - MANQUANT`);
      allChecksPassed = false;
    } else {
      console.log(`⚠️  ${check.name} - Optionnel (non présent)`);
    }
  });
  
  console.log('');
  return allChecksPassed;
}

// Vérification des dépendances
function checkDependencies() {
  console.log('📦 VÉRIFICATION DES DÉPENDANCES:');
  
  const packagePath = path.join(projectRoot, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    console.log('❌ package.json non trouvé');
    return false;
  }
  
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const dependencies = { ...packageContent.dependencies, ...packageContent.devDependencies };
  
  // Dépendances importantes pour mobile
  const importantDeps = [
    'next',
    'react',
    'react-dom',
    'tailwindcss',
    'framer-motion',
    '@radix-ui/react-dialog',
    '@radix-ui/react-navigation-menu'
  ];
  
  let allDepsPresent = true;
  
  importantDeps.forEach(dep => {
    if (dependencies[dep]) {
      console.log(`✅ ${dep} - ${dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - MANQUANT`);
      allDepsPresent = false;
    }
  });
  
  console.log('');
  return allDepsPresent;
}

// Génération de corrections automatiques
function generateMobileFixes() {
  console.log('🔧 GÉNÉRATION DE CORRECTIONS MOBILE:');
  
  // Vérifier si le fichier mobile-fixes.css existe et est complet
  const mobileCssPath = path.join(projectRoot, 'app/mobile-fixes.css');
  
  if (!fs.existsSync(mobileCssPath)) {
    console.log('❌ mobile-fixes.css manquant - création nécessaire');
    return false;
  }
  
  const cssContent = fs.readFileSync(mobileCssPath, 'utf8');
  
  // Vérifier si le contenu est suffisant
  if (cssContent.length < 1000) {
    console.log('⚠️  mobile-fixes.css semble incomplet');
    return false;
  }
  
  console.log('✅ mobile-fixes.css semble complet');
  
  // Vérifier le layout.tsx
  const layoutPath = path.join(projectRoot, 'app/layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ layout.tsx manquant');
    return false;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Vérifier l'import du CSS mobile
  if (!layoutContent.includes('mobile-fixes.css')) {
    console.log('⚠️  Import mobile-fixes.css manquant dans layout.tsx');
    return false;
  }
  
  console.log('✅ Import mobile-fixes.css présent dans layout.tsx');
  console.log('');
  return true;
}

// Recommandations
function generateRecommendations() {
  console.log('💡 RECOMMANDATIONS POUR L\'AFFICHAGE MOBILE:');
  
  const recommendations = [
    '1. Tester sur différents appareils (iPhone, Android, tablette)',
    '2. Vérifier les orientations portrait et paysage',
    '3. Tester avec différentes tailles d\'écran (320px à 768px)',
    '4. Vérifier la navigation tactile (boutons, liens)',
    '5. Tester les formulaires sur mobile',
    '6. Vérifier les images et médias',
    '7. Tester la performance de chargement',
    '8. Vérifier l\'accessibilité (contraste, taille de texte)',
    '9. Tester le mode hors ligne (PWA)',
    '10. Vérifier les animations et transitions'
  ];
  
  recommendations.forEach(rec => {
    console.log(`   ${rec}`);
  });
  
  console.log('');
}

// Test de serveur
async function testServer() {
  console.log('🌐 TEST DE CONNEXION SERVEUR:');
  
  try {
    const http = require('http');
    
    const testRequest = () => {
      return new Promise((resolve, reject) => {
        const req = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/',
          method: 'GET',
          timeout: 5000
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              hasViewport: data.includes('viewport'),
              hasMobileCss: data.includes('mobile-fixes.css')
            });
          });
        });
        
        req.on('error', reject);
        req.on('timeout', () => reject(new Error('Timeout')));
        req.end();
      });
    };
    
    const result = await testRequest();
    
    console.log(`✅ Serveur accessible sur localhost:3000`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Viewport meta: ${result.hasViewport ? '✅' : '❌'}`);
    console.log(`   Mobile CSS: ${result.hasMobileCss ? '✅' : '❌'}`);
    
  } catch (error) {
    console.log(`❌ Serveur non accessible: ${error.message}`);
    console.log('   Assurez-vous que le serveur de développement est démarré (npm run dev)');
  }
  
  console.log('');
}

// Fonction principale
async function main() {
  try {
    // Vérifications de base
    const filesOk = checkCriticalFiles();
    const viewportOk = checkViewportMeta();
    const cssOk = checkMobileCSS();
    const configOk = checkNextConfig();
    const depsOk = checkDependencies();
    const fixesOk = generateMobileFixes();
    
    // Test serveur
    await testServer();
    
    // Résumé
    console.log('📊 RÉSUMÉ DU DIAGNOSTIC:');
    console.log('========================');
    
    const checks = [
      { name: 'Fichiers critiques', status: filesOk },
      { name: 'Viewport meta tag', status: viewportOk },
      { name: 'CSS mobile', status: cssOk },
      { name: 'Config Next.js', status: configOk },
      { name: 'Dépendances', status: depsOk },
      { name: 'Corrections mobile', status: fixesOk }
    ];
  
    let passedChecks = 0;
    let totalChecks = checks.length;
    
    checks.forEach(check => {
      const status = check.status ? '✅' : '❌';
      console.log(`${status} ${check.name}`);
      if (check.status) passedChecks++;
    });
    
    console.log(`\n📈 Score: ${passedChecks}/${totalChecks} (${Math.round(passedChecks/totalChecks*100)}%)`);
    
    if (passedChecks === totalChecks) {
      console.log('\n🎉 Tous les tests sont passés ! L\'affichage mobile devrait être optimal.');
    } else {
      console.log('\n⚠️  Certains problèmes ont été détectés. Consultez les recommandations ci-dessous.');
    }
    
    generateRecommendations();
    
    // Instructions de test
    console.log('🧪 INSTRUCTIONS DE TEST MOBILE:');
    console.log('===============================');
    console.log('1. Ouvrez votre navigateur et allez sur http://localhost:3000');
    console.log('2. Ouvrez les outils de développement (F12)');
    console.log('3. Activez le mode responsive (icône mobile)');
    console.log('4. Testez différentes tailles d\'écran:');
    console.log('   - iPhone SE (375px)');
    console.log('   - iPhone 12 (390px)');
    console.log('   - Samsung Galaxy (360px)');
    console.log('   - iPad (768px)');
    console.log('5. Vérifiez que tous les éléments s\'adaptent correctement');
    console.log('6. Testez la navigation mobile (menu hamburger)');
    console.log('7. Vérifiez les formulaires et boutons');
    console.log('');
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message);
    process.exit(1);
  }
}

// Exécution
if (require.main === module) {
  main();
}

module.exports = {
  checkCriticalFiles,
  checkViewportMeta,
  checkMobileCSS,
  checkNextConfig,
  checkDependencies,
  generateMobileFixes,
  testServer
}; 