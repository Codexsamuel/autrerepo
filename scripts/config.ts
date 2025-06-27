import dotenv from 'dotenv';


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
  throw new Error(`Variables d'environnement manquantes: ${missingEnvVars.join(', ')}`);
}

export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  },
  google: {
    credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS!
  },
  scraper: {
    interval: parseInt(process.env.SCRAPER_INTERVAL || '21600000'), // 6 heures par défaut
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    timeout: 30000, // 30 secondes
    retryAttempts: 3,
    retryDelay: 5000 // 5 secondes
  }
}; 