#!/usr/bin/env node

/**
 * Script de déploiement des robots.txt pour l'écosystème DL Solutions
 * Gère automatiquement la configuration selon le domaine
 */

const fs = require('fs');
const path = require('path');

// Configuration des domaines
const DOMAIN_CONFIG = {
  'dlsolutionssarl.tech': {
    robotsFile: 'robots-tech.txt',
    sitemap: 'https://dlsolutionssarl.tech/sitemap-tech.xml',
    host: 'https://dlsolutionssarl.tech',
    crawlDelay: 0.5,
    description: 'Domaine Technologique - Solutions IA, drones, novacore, trading, scraping'
  },
  'daveandlucesolutions.com': {
    robotsFile: 'robots-main.txt',
    sitemap: 'https://daveandlucesolutions.com/sitemap-main.xml',
    host: 'https://daveandlucesolutions.com',
    crawlDelay: 1,
    description: 'Domaine Principal - Solutions business, immobilier, transport, style, marketing'
  }
};

/**
 * Déploie le robots.txt approprié pour un domaine donné
 * @param {string} domain - Le domaine cible
 * @param {string} outputPath - Chemin de sortie pour le robots.txt
 */
function deployRobotsForDomain(domain, outputPath = 'public/robots.txt') {
  const config = DOMAIN_CONFIG[domain];
  
  if (!config) {
    console.error(`❌ Configuration non trouvée pour le domaine: ${domain}`);
    process.exit(1);
  }

  console.log(`🚀 Déploiement du robots.txt pour ${domain}...`);
  console.log(`📝 Description: ${config.description}`);

  // Lire le fichier robots.txt de base
  const baseRobotsPath = path.join(__dirname, '..', 'public', config.robotsFile);
  
  if (!fs.existsSync(baseRobotsPath)) {
    console.error(`❌ Fichier robots de base non trouvé: ${baseRobotsPath}`);
    process.exit(1);
  }

  let robotsContent = fs.readFileSync(baseRobotsPath, 'utf8');

  // Remplacer les variables dynamiques
  robotsContent = robotsContent
    .replace(/\{DOMAIN\}/g, domain)
    .replace(/\{SITEMAP\}/g, config.sitemap)
    .replace(/\{HOST\}/g, config.host)
    .replace(/\{CRAWL_DELAY\}/g, config.crawlDelay)
    .replace(/\{DESCRIPTION\}/g, config.description);

  // Écrire le robots.txt final
  const outputRobotsPath = path.join(__dirname, '..', outputPath);
  fs.writeFileSync(outputRobotsPath, robotsContent);

  console.log(`✅ Robots.txt déployé avec succès pour ${domain}`);
  console.log(`📁 Fichier créé: ${outputRobotsPath}`);
  console.log(`🔗 Sitemap: ${config.sitemap}`);
  console.log(`🏠 Host: ${config.host}`);
  console.log(`⏱️  Crawl delay: ${config.crawlDelay}`);
}

/**
 * Déploie les robots.txt pour tous les domaines
 */
function deployAllRobots() {
  console.log('🚀 Déploiement des robots.txt pour tous les domaines...\n');

  Object.keys(DOMAIN_CONFIG).forEach(domain => {
    const outputPath = `public/robots-${domain.replace(/\./g, '-')}.txt`;
    deployRobotsForDomain(domain, outputPath);
    console.log(''); // Ligne vide pour la lisibilité
  });

  console.log('🎉 Déploiement terminé pour tous les domaines !');
}

/**
 * Affiche l'aide
 */
function showHelp() {
  console.log(`
🤖 Script de déploiement des robots.txt pour l'écosystème DL Solutions

Usage:
  node deploy-robots.js [options]

Options:
  --domain <domain>     Déploie le robots.txt pour un domaine spécifique
  --all                 Déploie les robots.txt pour tous les domaines
  --help                Affiche cette aide

Exemples:
  node deploy-robots.js --domain dlsolutionssarl.tech
  node deploy-robots.js --domain daveandlucesolutions.com
  node deploy-robots.js --all

Domaines supportés:
  - dlsolutionssarl.tech (Solutions technologiques)
  - daveandlucesolutions.com (Solutions business générales)
`);
}

// Gestion des arguments de ligne de commande
const args = process.argv.slice(2);

if (args.includes('--help') || args.length === 0) {
  showHelp();
  process.exit(0);
}

if (args.includes('--all')) {
  deployAllRobots();
  process.exit(0);
}

const domainIndex = args.indexOf('--domain');
if (domainIndex !== -1 && domainIndex + 1 < args.length) {
  const domain = args[domainIndex + 1];
  deployRobotsForDomain(domain);
} else {
  console.error('❌ Veuillez spécifier un domaine avec --domain <domain>');
  showHelp();
  process.exit(1);
} 