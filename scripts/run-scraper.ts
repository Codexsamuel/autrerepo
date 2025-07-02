import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';


// Chargement des variables d'environnement
dotenv.config();

// Vérification des variables d'environnement requises
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'GOOGLE_APPLICATION_CREDENTIALS'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Variables d\'environnement manquantes:', missingEnvVars.join(', '));
  process.exit(1);
}

// Chemin vers le script du scraper
const scraperPath = path.join(__dirname, 'aliexpress-scraper.ts');

// Exécution du scraper avec ts-node
const scraper = spawn('ts-node', [scraperPath], {
  stdio: 'inherit',
  env: process.env
});

scraper.on('error', (error) => {
  console.error('Erreur lors de l\'exécution du scraper:', error);
  process.exit(1);
});

scraper.on('close', (code) => {
  if (code !== 0) {
    console.error(`Le scraper s'est terminé avec le code ${code}`);
    process.exit(code ?? undefined);
  }
  console.log('Scraper terminé avec succès');
}); 