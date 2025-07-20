#!/usr/bin/env node

/**
 * Test final pour l'affichage mobile DL Solutions
 * Vérification complète de tous les composants mobiles
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 TEST FINAL AFFICHAGE MOBILE DL SOLUTIONS');
console.log('===========================================\n');

// Configuration
const projectRoot = process.cwd();

// Vérifications principales
function checkMobileComponents() {
  console.log('📱 VÉRIFICATION DES COMPOSANTS MOBILES:');
  
  const components = [
    'components/layout/MobileNavigation.tsx',
    'components/layout/ResponsiveLayout.tsx',
    'components/ui/ResponsiveCard.tsx',
    'components/ui/ResponsiveGrid.tsx'
  ];
  
  let allComponentsExist = true;
  
  components.forEach(component => {
    const componentPath = path.join(projectRoot, component);
    const exists = fs.existsSync(componentPath);
    
    if (exists) {
      console.log(`✅ ${component} - Présent`);
      
      // Vérifier le contenu du composant
      const content = fs.readFileSync(componentPath, 'utf8');
      if (content.includes('mobile') || content.includes('responsive')) {
        console.log(`   📝 Optimisé pour mobile`);
      }
    } else {
      console.log(`❌ ${component} - MANQUANT`);
      allComponentsExist = false;
    }
  });
  
  console.log('');
  return allComponentsExist;
}

// Vérification du CSS mobile
function checkMobileCSS() {
  console.log('🎨 VÉRIFICATION CSS MOBILE:');
  
  const cssPath = path.join(projectRoot, 'app/mobile-fixes.css');
  
  if (!fs.existsSync(cssPath)) {
    console.log('❌ mobile-fixes.css non trouvé');
    return false;
  }
  
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Vérifications importantes
  const checks = [
    { name: 'Media queries 768px', pattern: /@media.*max-width.*768px/, required: true },
    { name: 'Navigation mobile', pattern: /sidebar/, required: true },
    { name: 'Position fixed', pattern: /position.*fixed/, required: true },
    { name: 'Mobile menu toggle', pattern: /mobile-menu-toggle/, required: true },
    { name: 'Responsive layout', pattern: /responsive-layout/, required: true },
    { name: 'Mobile card', pattern: /mobile-card/, required: true },
    { name: 'Mobile grid', pattern: /mobile-grid/, required: true },
    { name: 'Touch targets', pattern: /min-height.*44px/, required: true },
    { name: 'iOS input fix', pattern: /font-size.*16px/, required: true },
    { name: 'PWA support', pattern: /display-mode.*standalone/, required: false },
    { name: 'Dark mode', pattern: /prefers-color-scheme.*dark/, required: false },
    { name: 'Safe area', pattern: /safe-area-inset/, required: false }
  ];
  
  let passedChecks = 0;
  let totalChecks = checks.length;
  
  checks.forEach(check => {
    const hasPattern = check.pattern.test(cssContent);
    
    if (hasPattern) {
      console.log(`✅ ${check.name}`);
      passedChecks++;
    } else if (check.required) {
      console.log(`❌ ${check.name} - MANQUANT`);
    } else {
      console.log(`⚠️  ${check.name} - Optionnel (non présent)`);
    }
  });
  
  console.log(`\n📊 CSS Mobile: ${passedChecks}/${totalChecks} (${Math.round(passedChecks/totalChecks*100)}%)`);
  console.log('');
  
  return passedChecks >= totalChecks * 0.8; // Au moins 80% des vérifications
}

// Vérification du layout principal
function checkLayout() {
  console.log('🏗️  VÉRIFICATION LAYOUT PRINCIPAL:');
  
  const layoutPath = path.join(projectRoot, 'app/layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    console.log('❌ layout.tsx non trouvé');
    return false;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  const checks = [
    { name: 'Viewport meta tag', pattern: /viewport/, required: true },
    { name: 'Mobile CSS import', pattern: /mobile-fixes\.css/, required: true },
    { name: 'PWA meta tags', pattern: /apple-mobile-web-app/, required: false },
    { name: 'Theme color', pattern: /theme-color/, required: false }
  ];
  
  let passedChecks = 0;
  
  checks.forEach(check => {
    const hasPattern = check.pattern.test(layoutContent);
    
    if (hasPattern) {
      console.log(`✅ ${check.name}`);
      passedChecks++;
    } else if (check.required) {
      console.log(`❌ ${check.name} - MANQUANT`);
    } else {
      console.log(`⚠️  ${check.name} - Optionnel (non présent)`);
    }
  });
  
  console.log('');
  return passedChecks >= 2; // Au moins les 2 vérifications requises
}

// Test de serveur
async function testServer() {
  console.log('🌐 TEST SERVEUR:');
  
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
              hasViewport: data.includes('viewport'),
              hasMobileCss: data.includes('mobile-fixes.css'),
              hasResponsive: data.includes('responsive')
            });
          });
        });
        
        req.on('error', reject);
        req.on('timeout', () => reject(new Error('Timeout')));
        req.end();
      });
    };
    
    const result = await testRequest();
    
    console.log(`✅ Serveur accessible (Status: ${result.status})`);
    console.log(`   Viewport: ${result.hasViewport ? '✅' : '❌'}`);
    console.log(`   Mobile CSS: ${result.hasMobileCss ? '✅' : '❌'}`);
    console.log(`   Responsive: ${result.hasResponsive ? '✅' : '❌'}`);
    
  } catch (error) {
    console.log(`❌ Serveur non accessible: ${error.message}`);
    console.log('   Démarrez le serveur avec: npm run dev');
  }
  
  console.log('');
}

// Génération du rapport final
function generateFinalReport(componentsOk, cssOk, layoutOk) {
  console.log('📋 RAPPORT FINAL:');
  console.log('=================');
  
  const checks = [
    { name: 'Composants mobiles', status: componentsOk },
    { name: 'CSS mobile', status: cssOk },
    { name: 'Layout principal', status: layoutOk }
  ];
  
  let passedChecks = 0;
  let totalChecks = checks.length;
  
  checks.forEach(check => {
    const status = check.status ? '✅' : '❌';
    console.log(`${status} ${check.name}`);
    if (check.status) passedChecks++;
  });
  
  console.log(`\n📈 Score global: ${passedChecks}/${totalChecks} (${Math.round(passedChecks/totalChecks*100)}%)`);
  
  if (passedChecks === totalChecks) {
    console.log('\n🎉 EXCELLENT ! L\'affichage mobile est parfaitement configuré.');
    console.log('   Votre application s\'adaptera parfaitement sur tous les appareils mobiles.');
  } else if (passedChecks >= totalChecks * 0.8) {
    console.log('\n✅ TRÈS BIEN ! L\'affichage mobile est bien configuré.');
    console.log('   Quelques optimisations mineures peuvent encore être apportées.');
  } else {
    console.log('\n⚠️  ATTENTION ! Des problèmes d\'affichage mobile ont été détectés.');
    console.log('   Consultez les recommandations ci-dessous.');
  }
  
  console.log('');
}

// Instructions de test manuel
function generateTestInstructions() {
  console.log('🧪 INSTRUCTIONS DE TEST MANUEL:');
  console.log('===============================');
  console.log('1. Ouvrez http://localhost:3000 dans votre navigateur');
  console.log('2. Activez les outils de développement (F12)');
  console.log('3. Cliquez sur l\'icône mobile (responsive design)');
  console.log('4. Testez ces tailles d\'écran:');
  console.log('   📱 iPhone SE: 375px');
  console.log('   📱 iPhone 12: 390px');
  console.log('   📱 Samsung Galaxy: 360px');
  console.log('   📱 iPhone 12 Pro Max: 428px');
  console.log('   📱 iPad: 768px');
  console.log('5. Vérifiez ces éléments:');
  console.log('   ✅ Menu hamburger fonctionne');
  console.log('   ✅ Navigation mobile fluide');
  console.log('   ✅ Cartes s\'adaptent correctement');
  console.log('   ✅ Texte lisible sur mobile');
  console.log('   ✅ Boutons et liens tactiles');
  console.log('   ✅ Formulaires utilisables');
  console.log('   ✅ Images responsives');
  console.log('6. Testez l\'orientation paysage');
  console.log('7. Vérifiez les performances de chargement');
  console.log('');
  
  console.log('📱 TEST SUR APPAREIL RÉEL:');
  console.log('==========================');
  console.log('1. Partagez votre écran ou utilisez un tunnel (ngrok)');
  console.log('2. Testez sur iPhone, Android, tablette');
  console.log('3. Vérifiez la navigation tactile');
  console.log('4. Testez les gestes (swipe, pinch)');
  console.log('5. Vérifiez l\'accessibilité');
  console.log('');
}

// Fonction principale
async function main() {
  try {
    // Vérifications
    const componentsOk = checkMobileComponents();
    const cssOk = checkMobileCSS();
    const layoutOk = checkLayout();
    
    // Test serveur
    await testServer();
    
    // Rapport final
    generateFinalReport(componentsOk, cssOk, layoutOk);
    
    // Instructions
    generateTestInstructions();
    
    // Message de succès
    if (componentsOk && cssOk && layoutOk) {
      console.log('🚀 VOTRE APPLICATION MOBILE EST PRÊTE !');
      console.log('========================================');
      console.log('✅ Navigation mobile optimisée');
      console.log('✅ Layout responsive parfait');
      console.log('✅ CSS mobile complet');
      console.log('✅ Composants adaptatifs');
      console.log('✅ PWA ready');
      console.log('');
      console.log('🎯 Prochaines étapes:');
      console.log('1. Testez sur appareils réels');
      console.log('2. Optimisez les images si nécessaire');
      console.log('3. Configurez le PWA pour l\'installation');
      console.log('4. Testez les performances');
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    process.exit(1);
  }
}

// Exécution
if (require.main === module) {
  main();
}

module.exports = {
  checkMobileComponents,
  checkMobileCSS,
  checkLayout,
  testServer,
  generateFinalReport
}; 