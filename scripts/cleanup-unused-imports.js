#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Nettoyage des imports inutilisés...');

try {
  // Installer eslint-plugin-unused-imports si pas déjà installé
  try {
    require('eslint-plugin-unused-imports');
  } catch {
    console.log('📦 Installation de eslint-plugin-unused-imports...');
    execSync('pnpm add -D eslint-plugin-unused-imports', { stdio: 'inherit' });
  }

  // Exécuter ESLint avec auto-fix
  console.log('🔧 Correction automatique des imports...');
  execSync('pnpm lint --fix', { stdio: 'inherit' });

  console.log('✅ Nettoyage terminé !');
} catch (error) {
  console.error('❌ Erreur lors du nettoyage:', error.message);
  process.exit(1);
} 