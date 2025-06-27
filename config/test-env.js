// Configuration temporaire pour les tests
// Copiez ces variables dans votre fichier .env.local

const testEnvVars = {
  // Configuration de base
  NODE_ENV: 'development',
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',

  // Services AI (à configurer avec vos vraies clés)
  OPENAI_API_KEY: 'sk-test-openai-key-for-testing',
  GEMINI_API_KEY: 'test-gemini-key',
  HUGGINGFACE_API_KEY: 'test-huggingface-key',

  // Paiements (à configurer avec vos vraies clés)
  STRIPE_SECRET_KEY: 'sk_test_test_stripe_key_for_testing',
  STRIPE_PUBLISHABLE_KEY: 'pk_test_test_stripe_key_for_testing',
  STRIPE_WEBHOOK_SECRET: 'whsec_test_webhook_secret',

  // CinetPay (optionnel)
  CINETPAY_API_KEY: 'test-cinetpay-key',
  CINETPAY_SITE_ID: 'test-site-id',
  CINETPAY_ENVIRONMENT: 'TEST',

  // Telegram Bot (à configurer avec votre vrai token)
  TELEGRAM_BOT_TOKEN: 'test-telegram-bot-token',
  TELEGRAM_CHAT_ID: 'test-chat-id',
  TELEGRAM_ADMIN_CHAT_ID: 'test-admin-chat-id',

  // Discord Bot (optionnel)
  DISCORD_BOT_TOKEN: 'test-discord-bot-token',
  DISCORD_CLIENT_ID: 'test-client-id',

  // AliExpress Scraping (optionnel)
  ALIEXPRESS_API_KEY: 'test-aliexpress-key',

  // Services Cloud (optionnel)
  CLOUDINARY_CLOUD_NAME: 'test-cloud-name',
  CLOUDINARY_API_KEY: 'test-api-key',
  CLOUDINARY_API_SECRET: 'test-api-secret',

  // N8N Workflows (optionnel)
  N8N_BASE_URL: 'http://localhost:5678',
  N8N_API_KEY: 'test-n8n-api-key',

  // Trading APIs (optionnel)
  META_API_TOKEN: 'test-meta-api-token',
  META_API_ACCOUNT_ID: 'test-account-id',

  // 1Win Trading (optionnel)
  ONE_WIN_API_KEY: 'test-1win-api-key',
  ONE_WIN_SECRET_KEY: 'test-1win-secret',

  // Email (optionnel)
  SENDGRID_API_KEY: 'test-sendgrid-key',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '587',
  SMTP_USER: 'test@gmail.com',
  SMTP_PASS: 'test-app-password',

  // Analytics (optionnel)
  GOOGLE_ANALYTICS_ID: 'G-TEST123',
  GOOGLE_TAG_MANAGER_ID: 'GTM-TEST123',

  // Monitoring (optionnel)
  SENTRY_DSN: 'test-sentry-dsn',

  // Cache (optionnel)
  REDIS_URL: 'redis://localhost:6379',

  // File Storage (optionnel)
  AWS_ACCESS_KEY_ID: 'test-aws-key',
  AWS_SECRET_ACCESS_KEY: 'test-aws-secret',
  AWS_REGION: 'us-east-1',
  AWS_S3_BUCKET: 'test-s3-bucket',

  // Security
  JWT_SECRET: 'test-jwt-secret-key-for-development',
  ENCRYPTION_KEY: 'test-encryption-key-for-development',

  // Feature Flags
  ENABLE_AI_TRADING: 'true',
  ENABLE_TELEGRAM_BOT: 'true',
  ENABLE_SCRAPING: 'true',
  ENABLE_N8N_WORKFLOWS: 'true',
  ENABLE_STRIPE_PAYMENTS: 'true'
};

// Fonction pour charger les variables d'environnement de test
function loadTestEnv() {
  Object.entries(testEnvVars).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

// Fonction pour afficher les instructions
function showInstructions() {
  console.log('📝 Instructions pour configurer les variables d\'environnement :');
  console.log('');
  console.log('1. Créez un fichier .env.local à la racine du projet');
  console.log('2. Copiez les variables suivantes :');
  console.log('');
  
  Object.entries(testEnvVars).forEach(([key, value]) => {
    console.log(`${key}=${value}`);
  });
  
  console.log('');
  console.log('3. Remplacez les valeurs "test-*" par vos vraies clés API');
  console.log('4. Redémarrez le serveur de développement');
}

module.exports = {
  testEnvVars,
  loadTestEnv,
  showInstructions
}; 