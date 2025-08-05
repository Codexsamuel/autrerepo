#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Test de l\'intégration Batobaye');
console.log('==================================\n');

// Configuration
const TESTS = [
  {
    name: 'Vérification des fichiers',
    test: () => {
      const files = [
        'app/portfolio/batobaye/page.tsx',
        'components/BatobayeLauncher.tsx',
        'scripts/start-batobaye.js',
        'docs/BATOBAYE_INTEGRATION.md'
      ];
      
      const missing = files.filter(file => !fs.existsSync(file));
      if (missing.length > 0) {
        throw new Error(`Fichiers manquants: ${missing.join(', ')}`);
      }
      return `✅ Tous les fichiers présents (${files.length})`;
    }
  },
  {
    name: 'Vérification du portfolio principal',
    test: () => {
      const portfolioContent = fs.readFileSync('app/portfolio/page.tsx', 'utf8');
      if (!portfolioContent.includes('Batobaye E-commerce')) {
        throw new Error('Projet Batobaye non trouvé dans le portfolio');
      }
      return '✅ Projet Batobaye intégré dans le portfolio';
    }
  },
  {
    name: 'Vérification du composant Lanceur',
    test: () => {
      const launcherContent = fs.readFileSync('components/BatobayeLauncher.tsx', 'utf8');
      if (!launcherContent.includes('BatobayeLauncher')) {
        throw new Error('Composant BatobayeLauncher invalide');
      }
      return '✅ Composant BatobayeLauncher valide';
    }
  },
  {
    name: 'Vérification du script de démarrage',
    test: () => {
      const scriptContent = fs.readFileSync('scripts/start-batobaye.js', 'utf8');
      if (!scriptContent.includes('BATOBAYE_REPO')) {
        throw new Error('Script de démarrage invalide');
      }
      return '✅ Script de démarrage valide';
    }
  },
  {
    name: 'Vérification de la documentation',
    test: () => {
      const docContent = fs.readFileSync('docs/BATOBAYE_INTEGRATION.md', 'utf8');
      if (!docContent.includes('Intégration Batobaye')) {
        throw new Error('Documentation invalide');
      }
      return '✅ Documentation présente';
    }
  },
  {
    name: 'Test de compilation TypeScript',
    test: () => {
      try {
        execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
        return '✅ Compilation TypeScript réussie';
      } catch (error) {
        throw new Error('Erreurs TypeScript détectées');
      }
    }
  },
  {
    name: 'Test de linting',
    test: () => {
      try {
        execSync('npx next lint --dir app/portfolio/batobaye --dir components', { stdio: 'pipe' });
        return '✅ Linting réussi';
      } catch (error) {
        throw new Error('Erreurs de linting détectées');
      }
    }
  }
];

// Fonction de test
async function runTests() {
  let passed = 0;
  let failed = 0;
  const results = [];

  console.log(`Exécution de ${TESTS.length} tests...\n`);

  for (const test of TESTS) {
    try {
      console.log(`🔍 ${test.name}...`);
      const result = test.test();
      console.log(`   ${result}\n`);
      results.push({ name: test.name, status: 'PASS', result });
      passed++;
    } catch (error) {
      console.log(`   ❌ ${error.message}\n`);
      results.push({ name: test.name, status: 'FAIL', error: error.message });
      failed++;
    }
  }

  // Résumé
  console.log('📊 Résumé des tests');
  console.log('==================');
  console.log(`✅ Réussis: ${passed}`);
  console.log(`❌ Échoués: ${failed}`);
  console.log(`📈 Taux de réussite: ${((passed / TESTS.length) * 100).toFixed(1)}%\n`);

  if (failed > 0) {
    console.log('❌ Tests échoués:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`   - ${r.name}: ${r.error}`);
    });
    console.log();
  }

  // Recommandations
  if (passed === TESTS.length) {
    console.log('🎉 Tous les tests sont passés !');
    console.log('✅ L\'intégration Batobaye est prête à être utilisée.');
    console.log('\n📋 Prochaines étapes:');
    console.log('   1. Tester manuellement la page /portfolio/batobaye');
    console.log('   2. Vérifier le lanceur automatique');
    console.log('   3. Tester le script de démarrage');
    console.log('   4. Déployer en production');
  } else {
    console.log('⚠️  Certains tests ont échoué.');
    console.log('🔧 Veuillez corriger les erreurs avant de continuer.');
  }

  return { passed, failed, results };
}

// Fonction de vérification rapide
function quickCheck() {
  console.log('🔍 Vérification rapide de l\'intégration...\n');
  
  const checks = [
    { file: 'app/portfolio/batobaye/page.tsx', desc: 'Page Batobaye' },
    { file: 'components/BatobayeLauncher.tsx', desc: 'Composant Lanceur' },
    { file: 'scripts/start-batobaye.js', desc: 'Script de démarrage' },
    { file: 'docs/BATOBAYE_INTEGRATION.md', desc: 'Documentation' }
  ];

  checks.forEach(check => {
    if (fs.existsSync(check.file)) {
      console.log(`✅ ${check.desc}: Présent`);
    } else {
      console.log(`❌ ${check.desc}: Manquant`);
    }
  });

  console.log('\n📋 URLs à tester:');
  console.log('   - Portfolio: http://localhost:3000/portfolio');
  console.log('   - Batobaye: http://localhost:3000/portfolio/batobaye');
  console.log('   - GitHub: https://github.com/Codexsamuel/batobaye');
  console.log('   - Site Live: https://batobaye.vercel.app');
}

// Gestion des arguments
const args = process.argv.slice(2);

if (args.includes('--quick') || args.includes('-q')) {
  quickCheck();
} else if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node test-batobaye-integration.js [options]\n');
  console.log('Options:');
  console.log('  --quick, -q    Vérification rapide');
  console.log('  --help, -h     Afficher cette aide\n');
  console.log('Exemples:');
  console.log('  node test-batobaye-integration.js');
  console.log('  node test-batobaye-integration.js --quick');
} else {
  runTests().then(({ passed, failed }) => {
    process.exit(failed > 0 ? 1 : 0);
  });
} 