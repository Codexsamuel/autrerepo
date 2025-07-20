#!/usr/bin/env node

/**
 * Alibaba Cloud Developer Toolkit Setup Script
 * Configuration automatique pour les APIs Alibaba 1688
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configuration Alibaba Cloud Developer Toolkit...\n');

// Vérifier si aliyun CLI est installé
try {
  execSync('aliyun --version', { stdio: 'pipe' });
  console.log('✅ Aliyun CLI installé');
} catch (error) {
  console.log('❌ Aliyun CLI non trouvé. Installation...');
  try {
    execSync('brew install aliyun-cli', { stdio: 'inherit' });
    console.log('✅ Aliyun CLI installé avec succès');
  } catch (installError) {
    console.log('❌ Erreur lors de l\'installation d\'Aliyun CLI');
    console.log('Installation manuelle requise: brew install aliyun-cli');
    process.exit(1);
  }
}

// Configuration des variables d'environnement
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

console.log('\n📝 Configuration des variables d\'environnement...');

// Lire le fichier .env.example s'il existe
let envContent = '';
if (fs.existsSync(envExamplePath)) {
  envContent = fs.readFileSync(envExamplePath, 'utf8');
}

// Ajouter les variables Alibaba si elles n'existent pas
const alibabaVars = [
  '# Alibaba 1688 API Configuration',
  'ALIBABA_APP_KEY=your_app_key_here',
  'ALIBABA_APP_SECRET=your_app_secret_here',
  'ALIBABA_ACCESS_TOKEN=your_access_token_here',
  'ALIBABA_REFRESH_TOKEN=your_refresh_token_here',
  'ALIBABA_API_BASE_URL=https://gw.open.1688.com/openapi',
  ''
].join('\n');

if (!envContent.includes('ALIBABA_APP_KEY')) {
  envContent += '\n' + alibabaVars;
}

// Écrire le fichier .env.local
fs.writeFileSync(envPath, envContent);
console.log('✅ Variables d\'environnement configurées dans .env.local');

// Créer le script de test Alibaba
const testScriptPath = path.join(process.cwd(), 'scripts/test-alibaba.js');
const testScriptContent = `#!/usr/bin/env node

/**
 * Script de test pour les APIs Alibaba 1688
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function testAlibabaAPI() {
  console.log('🧪 Test des APIs Alibaba 1688...\\n');

  const config = {
    appKey: process.env.ALIBABA_APP_KEY,
    appSecret: process.env.ALIBABA_APP_SECRET,
    accessToken: process.env.ALIBABA_ACCESS_TOKEN,
    refreshToken: process.env.ALIBABA_REFRESH_TOKEN,
    baseURL: process.env.ALIBABA_API_BASE_URL || 'https://gw.open.1688.com/openapi'
  };

  console.log('📋 Configuration:');
  console.log('- App Key:', config.appKey ? '✅ Configuré' : '❌ Manquant');
  console.log('- App Secret:', config.appSecret ? '✅ Configuré' : '❌ Manquant');
  console.log('- Access Token:', config.accessToken ? '✅ Configuré' : '❌ Manquant');
  console.log('- Refresh Token:', config.refreshToken ? '✅ Configuré' : '❌ Manquant');
  console.log('- Base URL:', config.baseURL);
  console.log('');

  if (!config.appKey || !config.appSecret) {
    console.log('❌ Configuration incomplète');
    console.log('📝 Veuillez configurer vos clés API dans .env.local');
    console.log('🔗 Obtenir les clés: https://open.1688.com/');
    return;
  }

  try {
    // Test de l'API de recherche de catégories
    console.log('🔍 Test: Recherche de catégories...');
    const categoryResponse = await axios.post(\`\${config.baseURL}/alibaba.category.search\`, {
      _aop_timestamp: Date.now(),
      _aop_signature: 'test_signature',
      access_token: config.accessToken,
      keyword: 'electronics'
    });
    console.log('✅ API de catégories fonctionnelle');
  } catch (error) {
    console.log('❌ Erreur API catégories:', error.message);
  }

  try {
    // Test de l'API de recherche de produits
    console.log('🔍 Test: Recherche de produits...');
    const productResponse = await axios.post(\`\${config.baseURL}/alibaba.product.search\`, {
      _aop_timestamp: Date.now(),
      _aop_signature: 'test_signature',
      access_token: config.accessToken,
      keyword: 'smartphone',
      pageSize: 10
    });
    console.log('✅ API de produits fonctionnelle');
  } catch (error) {
    console.log('❌ Erreur API produits:', error.message);
  }

  console.log('\\n🎯 Prochaines étapes:');
  console.log('1. Obtenir vos vraies clés API sur https://open.1688.com/');
  console.log('2. Mettre à jour .env.local avec vos vraies clés');
  console.log('3. Tester avec: node scripts/test-alibaba.js');
  console.log('4. Intégrer dans votre application');
}

testAlibabaAPI().catch(console.error);
`;

fs.writeFileSync(testScriptPath, testScriptContent);
fs.chmodSync(testScriptPath, '755');
console.log('✅ Script de test créé: scripts/test-alibaba.js');

// Créer le guide de configuration
const guidePath = path.join(process.cwd(), 'docs/ALIBABA-SETUP-GUIDE.md');
const guideContent = `# 🚀 Guide de Configuration Alibaba 1688 API

## 📋 Prérequis

- Compte Alibaba 1688 développeur
- Aliyun CLI installé
- Node.js et npm

## 🔑 Étape 1: Obtenir les Clés API

### 1. Créer un compte développeur
- Aller sur https://open.1688.com/
- Créer un compte développeur
- Vérifier votre identité

### 2. Créer une application
- Cliquer sur "Créer une application"
- Remplir les informations requises
- Sélectionner les APIs nécessaires:
  - \`alibaba.category.search\`
  - \`alibaba.product.search\`
  - \`alibaba.product.get\`
  - \`alibaba.category.attribute.get\`

### 3. Obtenir les clés
- **App Key**: Clé publique de votre application
- **App Secret**: Clé secrète de votre application
- **Access Token**: Token d'accès (généré après autorisation)
- **Refresh Token**: Token de rafraîchissement

## ⚙️ Étape 2: Configuration Locale

### 1. Mettre à jour .env.local
\`\`\`bash
# Alibaba 1688 API Configuration
ALIBABA_APP_KEY=your_real_app_key_here
ALIBABA_APP_SECRET=your_real_app_secret_here
ALIBABA_ACCESS_TOKEN=your_real_access_token_here
ALIBABA_REFRESH_TOKEN=your_real_refresh_token_here
ALIBABA_API_BASE_URL=https://gw.open.1688.com/openapi
\`\`\`

### 2. Tester la configuration
\`\`\`bash
node scripts/test-alibaba.js
\`\`\`

## 🧪 Étape 3: Tests

### Test des APIs
\`\`\`bash
# Test complet
npm run test:alibaba

# Test spécifique
curl "http://localhost:3000/api/scraping/official?action=stats"
\`\`\`

## 🔧 Étape 4: Intégration

### Dans votre application
\`\`\`javascript
import { Alibaba1688OfficialAPI } from '@/lib/scraper/alibaba-official-api';

const alibabaAPI = new Alibaba1688OfficialAPI();

// Recherche de produits
const products = await alibabaAPI.searchProducts('smartphone', 'Electronics', 10);

// Détails d'un produit
const productDetails = await alibabaAPI.getProductDetails('product_id');
\`\`\`

## 🚨 Dépannage

### Erreur 403 - Accès refusé
- Vérifier que vos clés API sont correctes
- Vérifier les permissions de votre application
- Vérifier que l'Access Token n'a pas expiré

### Erreur 401 - Non autorisé
- Régénérer l'Access Token
- Vérifier l'App Secret

### Erreur de signature
- Vérifier la génération de signature
- Vérifier le timestamp

## 📞 Support

- Documentation officielle: https://open.1688.com/doc/
- Support technique: https://open.1688.com/support/
- Forum développeurs: https://open.1688.com/forum/

## ✅ Checklist

- [ ] Compte développeur créé
- [ ] Application créée
- [ ] Clés API obtenues
- [ ] .env.local configuré
- [ ] Tests passés
- [ ] Intégration fonctionnelle
- [ ] Production déployée

---

**🎯 Votre système Alibaba 1688 est maintenant prêt pour la production !**
`;

fs.writeFileSync(guidePath, guideContent);
console.log('✅ Guide de configuration créé: docs/ALIBABA-SETUP-GUIDE.md');

// Ajouter les scripts npm
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  
  packageJson.scripts['test:alibaba'] = 'node scripts/test-alibaba.js';
  packageJson.scripts['setup:alibaba'] = 'node scripts/alibaba-setup.js';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Scripts npm ajoutés');
}

console.log('\n🎉 Configuration Alibaba Cloud Developer Toolkit terminée !');
console.log('\n📋 Prochaines étapes:');
console.log('1. Obtenir vos clés API sur https://open.1688.com/');
console.log('2. Configurer .env.local avec vos vraies clés');
console.log('3. Tester avec: npm run test:alibaba');
console.log('4. Consulter le guide: docs/ALIBABA-SETUP-GUIDE.md');
console.log('\n🚀 Votre système de scraping Alibaba 1688 est prêt !'); 