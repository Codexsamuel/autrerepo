#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue.bold('🚀 Démarrage du projet Batobaye E-commerce'));
console.log(chalk.gray('==========================================\n'));

// Configuration
const BATOBAYE_REPO = 'https://github.com/Codexsamuel/batobaye';
const PROJECT_DIR = 'batobaye';
const PORT = 3000;

// Couleurs pour les messages
const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  gray: chalk.gray
};

// Fonctions utilitaires
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.gray(`[${timestamp}]`)} ${colors[type](message)}`);
}

function runCommand(command, options = {}) {
  try {
    log(`Exécution: ${command}`, 'info');
    execSync(command, { 
      stdio: 'inherit', 
      cwd: options.cwd || process.cwd(),
      ...options 
    });
    return true;
  } catch (error) {
    log(`Erreur lors de l'exécution: ${command}`, 'error');
    return false;
  }
}

function checkPort(port) {
  try {
    execSync(`lsof -ti:${port}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function waitForPort(port, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const check = () => {
      attempts++;
      if (checkPort(port)) {
        log(`✅ Port ${port} est maintenant disponible`, 'success');
        resolve(true);
      } else if (attempts >= maxAttempts) {
        log(`❌ Timeout: Le port ${port} n'est pas disponible après ${maxAttempts} tentatives`, 'error');
        reject(new Error(`Port ${port} not available`));
      } else {
        log(`⏳ Attente du port ${port}... (${attempts}/${maxAttempts})`, 'warning');
        setTimeout(check, 2000);
      }
    };
    
    check();
  });
}

// Fonction principale
async function startBatobaye() {
  try {
    // 1. Vérifier si le projet existe déjà
    if (fs.existsSync(PROJECT_DIR)) {
      log(`📁 Le projet existe déjà dans ${PROJECT_DIR}`, 'info');
    } else {
      log(`📥 Clonage du repository Batobaye...`, 'info');
      if (!runCommand(`git clone ${BATOBAYE_REPO} ${PROJECT_DIR}`)) {
        throw new Error('Échec du clonage du repository');
      }
    }

    // 2. Aller dans le répertoire du projet
    process.chdir(PROJECT_DIR);
    log(`📂 Répertoire de travail: ${process.cwd()}`, 'info');

    // 3. Vérifier si node_modules existe
    if (!fs.existsSync('node_modules')) {
      log(`📦 Installation des dépendances...`, 'info');
      if (!runCommand('pnpm install')) {
        log(`⚠️  pnpm non disponible, tentative avec npm...`, 'warning');
        if (!runCommand('npm install')) {
          throw new Error('Échec de l\'installation des dépendances');
        }
      }
    } else {
      log(`✅ Dépendances déjà installées`, 'success');
    }

    // 4. Vérifier si le fichier .env.local existe
    if (!fs.existsSync('.env.local')) {
      log(`⚙️  Configuration de l'environnement...`, 'info');
      if (fs.existsSync('.env.example')) {
        runCommand('cp .env.example .env.local');
        log(`✅ Fichier .env.local créé à partir de .env.example`, 'success');
      } else {
        log(`⚠️  Aucun fichier .env.example trouvé`, 'warning');
      }
    } else {
      log(`✅ Configuration d'environnement déjà présente`, 'success');
    }

    // 5. Vérifier si le port est disponible
    if (checkPort(PORT)) {
      log(`⚠️  Le port ${PORT} est déjà utilisé`, 'warning');
      log(`💡 Le serveur utilisera automatiquement le port suivant disponible`, 'info');
    }

    // 6. Démarrer le serveur de développement
    log(`🚀 Démarrage du serveur de développement...`, 'info');
    log(`🌐 Le site sera accessible sur: http://localhost:${PORT}`, 'info');
    log(`🔧 Dashboard admin: http://localhost:${PORT}/admin`, 'info');
    log(`📱 Appuyez sur Ctrl+C pour arrêter le serveur`, 'info');
    console.log();

    // Démarrer le serveur
    const server = spawn('pnpm', ['dev'], {
      stdio: 'inherit',
      shell: true
    });

    // Attendre que le serveur démarre
    await waitForPort(PORT);

    // Ouvrir le navigateur après un délai
    setTimeout(() => {
      log(`🌐 Ouverture du navigateur...`, 'info');
      try {
        const platform = process.platform;
        let command;
        
        if (platform === 'darwin') {
          command = `open http://localhost:${PORT}`;
        } else if (platform === 'win32') {
          command = `start http://localhost:${PORT}`;
        } else {
          command = `xdg-open http://localhost:${PORT}`;
        }
        
        execSync(command);
      } catch (error) {
        log(`⚠️  Impossible d'ouvrir automatiquement le navigateur`, 'warning');
        log(`🌐 Veuillez ouvrir manuellement: http://localhost:${PORT}`, 'info');
      }
    }, 3000);

    // Gérer l'arrêt du serveur
    server.on('close', (code) => {
      log(`🛑 Serveur arrêté avec le code: ${code}`, 'info');
      process.exit(code);
    });

    // Gérer les signaux d'arrêt
    process.on('SIGINT', () => {
      log(`🛑 Arrêt du serveur...`, 'info');
      server.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
      log(`🛑 Arrêt du serveur...`, 'info');
      server.kill('SIGTERM');
    });

  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Fonction d'aide
function showHelp() {
  console.log(chalk.blue.bold('Aide - Script de démarrage Batobaye'));
  console.log(chalk.gray('=====================================\n'));
  console.log('Usage: node start-batobaye.js [options]\n');
  console.log('Options:');
  console.log('  --help, -h     Afficher cette aide');
  console.log('  --clean        Nettoyer et réinstaller le projet');
  console.log('  --port <num>   Spécifier un port personnalisé\n');
  console.log('Exemples:');
  console.log('  node start-batobaye.js');
  console.log('  node start-batobaye.js --clean');
  console.log('  node start-batobaye.js --port 3001\n');
}

// Gestion des arguments de ligne de commande
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

if (args.includes('--clean')) {
  log(`🧹 Nettoyage du projet...`, 'info');
  if (fs.existsSync(PROJECT_DIR)) {
    runCommand(`rm -rf ${PROJECT_DIR}`);
    log(`✅ Projet nettoyé`, 'success');
  }
}

// Démarrer le projet
startBatobaye(); 