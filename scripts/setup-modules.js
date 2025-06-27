#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configuration des modules DAVY Trading Advisor...\n');

// Vérification des variables d'environnement
function checkEnvironmentVariables() {
  console.log('📋 Vérification des variables d\'environnement...');
  
  const requiredVars = [
    'OPENAI_API_KEY',
    'STRIPE_SECRET_KEY',
    'TELEGRAM_BOT_TOKEN'
  ];
  
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.log('⚠️  Variables d\'environnement manquantes:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\n📝 Veuillez configurer ces variables dans votre fichier .env');
    return false;
  }
  
  console.log('✅ Toutes les variables d\'environnement sont configurées\n');
  return true;
}

// Création des dossiers nécessaires
function createDirectories() {
  console.log('📁 Création des dossiers nécessaires...');
  
  const directories = [
    'logs',
    'data',
    'uploads',
    'temp',
    'backups'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`   ✅ Créé: ${dir}`);
    } else {
      console.log(`   ℹ️  Existe déjà: ${dir}`);
    }
  });
  
  console.log('');
}

// Configuration de la base de données
function setupDatabase() {
  console.log('🗄️  Configuration de la base de données...');
  
  // Vérifier si la base de données est accessible
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL non configurée');
    return false;
  }
  
  console.log('✅ Configuration de base de données détectée');
  console.log('');
  return true;
}

// Test des services AI
async function testAIServices() {
  console.log('🤖 Test des services AI...');
  
  try {
    // Test OpenAI
    if (process.env.OPENAI_API_KEY) {
      console.log('   ✅ OpenAI API Key configurée');
    } else {
      console.log('   ⚠️  OpenAI API Key manquante');
    }
    
    // Test Gemini
    if (process.env.GEMINI_API_KEY) {
      console.log('   ✅ Gemini API Key configurée');
    } else {
      console.log('   ⚠️  Gemini API Key manquante (optionnelle)');
    }
    
    // Test HuggingFace
    if (process.env.HUGGINGFACE_API_KEY) {
      console.log('   ✅ HuggingFace API Key configurée');
    } else {
      console.log('   ⚠️  HuggingFace API Key manquante (optionnelle)');
    }
    
  } catch (error) {
    console.log('   ❌ Erreur lors du test des services AI:', error.message);
    return false;
  }
  
  console.log('');
  return true;
}

// Test des services de paiement
function testPaymentServices() {
  console.log('💳 Test des services de paiement...');
  
  try {
    // Test Stripe
    if (process.env.STRIPE_SECRET_KEY) {
      console.log('   ✅ Stripe configuré');
    } else {
      console.log('   ⚠️  Stripe non configuré');
    }
    
    // Test CinetPay
    if (process.env.CINETPAY_API_KEY) {
      console.log('   ✅ CinetPay configuré');
    } else {
      console.log('   ⚠️  CinetPay non configuré (optionnel)');
    }
    
  } catch (error) {
    console.log('   ❌ Erreur lors du test des services de paiement:', error.message);
    return false;
  }
  
  console.log('');
  return true;
}

// Test des bots
function testBots() {
  console.log('🤖 Test des bots...');
  
  try {
    // Test Telegram Bot
    if (process.env.TELEGRAM_BOT_TOKEN) {
      console.log('   ✅ Telegram Bot configuré');
    } else {
      console.log('   ⚠️  Telegram Bot non configuré');
    }
    
    // Test Discord Bot
    if (process.env.DISCORD_BOT_TOKEN) {
      console.log('   ✅ Discord Bot configuré');
    } else {
      console.log('   ⚠️  Discord Bot non configuré (optionnel)');
    }
    
  } catch (error) {
    console.log('   ❌ Erreur lors du test des bots:', error.message);
    return false;
  }
  
  console.log('');
  return true;
}

// Configuration des workflows N8N
function setupN8NWorkflows() {
  console.log('⚙️  Configuration des workflows N8N...');
  
  try {
    const workflowsDir = path.join(process.cwd(), 'workflows', 'n8n');
    
    if (fs.existsSync(workflowsDir)) {
      const workflowFiles = fs.readdirSync(workflowsDir);
      console.log(`   ✅ ${workflowFiles.length} workflows détectés`);
      
      workflowFiles.forEach(file => {
        if (file.endsWith('.ts') || file.endsWith('.js')) {
          console.log(`      - ${file}`);
        }
      });
    } else {
      console.log('   ⚠️  Dossier workflows/n8n non trouvé');
    }
    
  } catch (error) {
    console.log('   ❌ Erreur lors de la configuration des workflows:', error.message);
    return false;
  }
  
  console.log('');
  return true;
}

// Création du fichier de configuration
function createConfigFile() {
  console.log('📝 Création du fichier de configuration...');
  
  const configContent = `// Configuration des modules DAVY Trading Advisor
export const config = {
  ai: {
    openai: {
      enabled: ${!!process.env.OPENAI_API_KEY},
      apiKey: process.env.OPENAI_API_KEY
    },
    gemini: {
      enabled: ${!!process.env.GEMINI_API_KEY},
      apiKey: process.env.GEMINI_API_KEY
    },
    huggingface: {
      enabled: ${!!process.env.HUGGINGFACE_API_KEY},
      apiKey: process.env.HUGGINGFACE_API_KEY
    }
  },
  payments: {
    stripe: {
      enabled: ${!!process.env.STRIPE_SECRET_KEY},
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    },
    cinetpay: {
      enabled: ${!!process.env.CINETPAY_API_KEY},
      apiKey: process.env.CINETPAY_API_KEY,
      siteId: process.env.CINETPAY_SITE_ID
    }
  },
  bots: {
    telegram: {
      enabled: ${!!process.env.TELEGRAM_BOT_TOKEN},
      token: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID
    },
    discord: {
      enabled: ${!!process.env.DISCORD_BOT_TOKEN},
      token: process.env.DISCORD_BOT_TOKEN,
      clientId: process.env.DISCORD_CLIENT_ID
    }
  },
  workflows: {
    n8n: {
      enabled: ${!!process.env.N8N_API_KEY},
      baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
      apiKey: process.env.N8N_API_KEY
    }
  },
  trading: {
    metaApi: {
      enabled: ${!!process.env.META_API_TOKEN},
      token: process.env.META_API_TOKEN,
      accountId: process.env.META_API_ACCOUNT_ID
    },
    oneWin: {
      enabled: ${!!process.env.ONE_WIN_API_KEY},
      apiKey: process.env.ONE_WIN_API_KEY,
      secretKey: process.env.ONE_WIN_SECRET_KEY
    }
  }
};

export default config;
`;

  const configPath = path.join(process.cwd(), 'lib', 'config.ts');
  
  try {
    fs.writeFileSync(configPath, configContent);
    console.log('   ✅ Fichier de configuration créé: lib/config.ts');
  } catch (error) {
    console.log('   ❌ Erreur lors de la création du fichier de configuration:', error.message);
    return false;
  }
  
  console.log('');
  return true;
}

// Génération du rapport final
function generateReport() {
  console.log('📊 Rapport de configuration...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    modules: {
      ai: {
        openai: !!process.env.OPENAI_API_KEY,
        gemini: !!process.env.GEMINI_API_KEY,
        huggingface: !!process.env.HUGGINGFACE_API_KEY
      },
      payments: {
        stripe: !!process.env.STRIPE_SECRET_KEY,
        cinetpay: !!process.env.CINETPAY_API_KEY
      },
      bots: {
        telegram: !!process.env.TELEGRAM_BOT_TOKEN,
        discord: !!process.env.DISCORD_BOT_TOKEN
      },
      workflows: {
        n8n: !!process.env.N8N_API_KEY
      },
      trading: {
        metaApi: !!process.env.META_API_TOKEN,
        oneWin: !!process.env.ONE_WIN_API_KEY
      }
    }
  };
  
  const reportPath = path.join(process.cwd(), 'logs', 'setup-report.json');
  
  try {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log('📄 Rapport sauvegardé: logs/setup-report.json');
  } catch (error) {
    console.log('⚠️  Impossible de sauvegarder le rapport');
  }
  
  console.log('\n🎉 Configuration terminée !');
  console.log('\n📋 Prochaines étapes:');
  console.log('   1. Configurer les variables d\'environnement manquantes');
  console.log('   2. Installer les dépendances: npm install');
  console.log('   3. Démarrer le serveur: npm run dev');
  console.log('   4. Tester les fonctionnalités: http://localhost:3000/trading');
}

// Fonction principale
async function main() {
  try {
    // Charger les variables d'environnement
    require('dotenv').config();
    
    // Exécuter les vérifications
    const envCheck = checkEnvironmentVariables();
    createDirectories();
    const dbCheck = setupDatabase();
    const aiCheck = await testAIServices();
    const paymentCheck = testPaymentServices();
    const botCheck = testBots();
    const workflowCheck = setupN8NWorkflows();
    const configCheck = createConfigFile();
    
    // Générer le rapport
    generateReport();
    
    // Résumé
    console.log('\n📈 Résumé:');
    console.log(`   Variables d'environnement: ${envCheck ? '✅' : '❌'}`);
    console.log(`   Base de données: ${dbCheck ? '✅' : '❌'}`);
    console.log(`   Services AI: ${aiCheck ? '✅' : '❌'}`);
    console.log(`   Services de paiement: ${paymentCheck ? '✅' : '❌'}`);
    console.log(`   Bots: ${botCheck ? '✅' : '❌'}`);
    console.log(`   Workflows: ${workflowCheck ? '✅' : '❌'}`);
    console.log(`   Configuration: ${configCheck ? '✅' : '❌'}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = {
  checkEnvironmentVariables,
  createDirectories,
  setupDatabase,
  testAIServices,
  testPaymentServices,
  testBots,
  setupN8NWorkflows,
  createConfigFile,
  generateReport
}; 