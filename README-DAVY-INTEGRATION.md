# 🚀 DAVY Trading Advisor - Guide d'Intégration

## 📋 Vue d'ensemble

Ce guide documente l'intégration complète des modules DAVY Trading Advisor dans votre projet Next.js. L'intégration inclut :

- 🤖 **DAVY Trading Advisor** - Assistant IA pour le trading
- 💳 **Services de Paiement** - Stripe et CinetPay
- 🕷️ **Scraping AliExpress** - Extraction de données produits
- 🤖 **Bots Automatisés** - Telegram et Discord
- ⚙️ **Workflows N8N** - Automatisation des processus

## 🏗️ Architecture

```
lib/
├── ai/
│   └── ai-service.ts          # Service AI principal
├── trading/
│   └── aiTrading.ts           # DAVY Trading Advisor
├── payments/
│   ├── stripe-service.ts      # Service Stripe
│   └── cinetpay-service.ts    # Service CinetPay
├── scraper/
│   └── aliexpress.ts          # Scraper AliExpress
├── bots/
│   ├── telegram-trading-bot.ts # Bot Telegram
│   └── discord-bot.ts         # Bot Discord
└── services/
    └── metaApiService.ts      # API MetaTrader

components/
└── trading/
    ├── DavyTradingChat.tsx    # Interface de chat
    └── DAVYDashboard.tsx      # Dashboard principal

workflows/
└── n8n/
    └── dl-style-workflows.ts  # Workflows automatisés
```

## 🚀 Installation

### 1. Variables d'environnement

Créez un fichier `.env.local` basé sur `config/env.example` :

```bash
# Copier le fichier d'exemple
cp config/env.example .env.local
```

Configurez les variables essentielles :

```env
# Services AI (Obligatoire)
OPENAI_API_KEY=your-openai-api-key

# Paiements (Obligatoire)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key

# Telegram Bot (Obligatoire)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id

# Services optionnels
GEMINI_API_KEY=your-gemini-api-key
HUGGINGFACE_API_KEY=your-huggingface-api-key
CINETPAY_API_KEY=your-cinetpay-api-key
DISCORD_BOT_TOKEN=your-discord-bot-token
```

### 2. Installation des dépendances

```bash
# Dépendances principales
npm install openai @google/generative-ai stripe telegraf puppeteer

# Dépendances optionnelles
npm install discord.js @supabase/supabase-js cloudinary
```

### 3. Configuration automatique

Exécutez le script de configuration :

```bash
node scripts/setup-modules.js
```

## 🎯 Utilisation

### DAVY Trading Advisor

#### Interface Web
Accédez au dashboard : `http://localhost:3000/trading`

```typescript
// Utilisation programmatique
import { DavyTradingAdvisor } from '@/lib/trading/aiTrading';

const advisor = new DavyTradingAdvisor();

// Obtenir une prédiction
const prediction = await advisor.getPrediction('AAPL');

// Analyser le sentiment
const analysis = await advisor.getMarketAnalysis('BTC');

// Générer un signal
const signal = await advisor.getTradingSignal('ETH');
```

#### Bot Telegram
```typescript
import TelegramTradingBot from '@/lib/bots/telegram-trading-bot';

const bot = new TelegramTradingBot({
  token: process.env.TELEGRAM_BOT_TOKEN!,
  allowedUsers: ['user_id_1', 'user_id_2'],
  adminUsers: ['admin_id'],
  tradingEnabled: true,
  notificationsEnabled: true
});

await bot.start();
```

**Commandes disponibles :**
- `/start` - Démarrer le bot
- `/prediction AAPL` - Prédiction pour AAPL
- `/analysis BTC` - Analyse de sentiment
- `/signal ETH` - Signal de trading
- `/alerts` - Gérer les alertes
- `/status` - Statut du bot

### Services de Paiement

#### Stripe
```typescript
import StripeService from '@/lib/payments/stripe-service';

const stripe = new StripeService();

// Créer un paiement
const paymentIntent = await stripe.createPaymentIntent(100, 'eur');

// Créer un client
const customer = await stripe.createCustomer('user@example.com', 'John Doe');

// Créer un abonnement
const subscription = await stripe.createSubscription(customer.id, 'price_id');
```

#### CinetPay
```typescript
import CinetPayService from '@/lib/payments/cinetpay-service';

const cinetpay = new CinetPayService();

// Créer un paiement
const payment = await cinetpay.createPayment({
  amount: 1000,
  currency: 'XOF',
  description: 'Paiement test',
  returnUrl: 'https://example.com/success',
  cancelUrl: 'https://example.com/cancel'
});
```

### Scraping AliExpress

```typescript
import AliExpressScraper from '@/lib/scraper/aliexpress';

const scraper = new AliExpressScraper();

// Rechercher des produits
const products = await scraper.searchProducts('smartphone', {
  maxProducts: 20,
  minPrice: 50,
  maxPrice: 500,
  sortBy: 'price'
});

// Obtenir les détails d'un produit
const product = await scraper.getProductDetails('product_url');

// Historique des prix
const history = await scraper.getPriceHistory('product_id', 30);
```

### Workflows N8N

```typescript
import DLStyleWorkflowManager from '@/workflows/n8n/dl-style-workflows';

const workflowManager = new DLStyleWorkflowManager();

// Lister les workflows
const workflows = workflowManager.getAllWorkflows();

// Exécuter un workflow
const result = await workflowManager.executeWorkflow('aliexpress-sync');

// Obtenir les statistiques
const stats = await workflowManager.getWorkflowStats('order-management');
```

## 🔧 Configuration Avancée

### Personnalisation du DAVY Trading Advisor

```typescript
// lib/trading/aiTrading.ts
export class DavyTradingAdvisor {
  constructor(config?: {
    aiModel?: 'gpt-4' | 'gpt-3.5-turbo';
    confidenceThreshold?: number;
    maxPredictions?: number;
  }) {
    // Configuration personnalisée
  }
}
```

### Ajout de nouveaux workflows N8N

```typescript
// workflows/n8n/custom-workflow.ts
export const customWorkflow: DLStyleWorkflow = {
  id: 'custom-workflow',
  name: 'Workflow Personnalisé',
  description: 'Description du workflow',
  active: true,
  nodes: [
    // Configuration des nœuds
  ],
  connections: {
    // Configuration des connexions
  }
};
```

### Intégration avec d'autres services

```typescript
// lib/services/custom-service.ts
export class CustomService {
  constructor() {
    // Initialisation
  }

  async integrateWithDavy(data: any) {
    // Intégration avec DAVY
    const advisor = new DavyTradingAdvisor();
    return await advisor.getPrediction(data.symbol);
  }
}
```

## 📊 Monitoring et Logs

### Logs automatiques
Les logs sont automatiquement générés dans le dossier `logs/` :

- `setup-report.json` - Rapport de configuration
- `trading-logs.json` - Logs de trading
- `payment-logs.json` - Logs de paiement
- `bot-logs.json` - Logs des bots

### Monitoring en temps réel
```typescript
// Vérifier le statut des services
const status = {
  ai: await checkAIServices(),
  payments: await checkPaymentServices(),
  bots: await checkBots(),
  workflows: await checkWorkflows()
};
```

## 🚨 Dépannage

### Problèmes courants

#### 1. Erreur OpenAI API
```
❌ Erreur: Impossible de générer une prédiction
```
**Solution :** Vérifiez votre clé API OpenAI dans `.env.local`

#### 2. Bot Telegram ne répond pas
```
❌ Erreur: Bot non autorisé
```
**Solution :** Vérifiez le token et ajoutez votre ID dans `allowedUsers`

#### 3. Scraping AliExpress échoue
```
❌ Erreur: Impossible de scraper AliExpress
```
**Solution :** Vérifiez votre clé API AliExpress et les permissions

#### 4. Workflows N8N non exécutés
```
❌ Erreur: Workflow non trouvé
```
**Solution :** Vérifiez la configuration N8N et les permissions API

### Logs de débogage

Activez les logs détaillés :

```typescript
// lib/config.ts
export const config = {
  debug: true,
  logLevel: 'verbose',
  // ...
};
```

## 🔒 Sécurité

### Bonnes pratiques

1. **Variables d'environnement**
   - Ne jamais commiter les clés API
   - Utiliser des clés de test en développement
   - Rotation régulière des clés

2. **Permissions**
   - Limiter l'accès aux bots
   - Vérifier les permissions API
   - Surveiller les utilisations

3. **Validation des données**
   - Valider toutes les entrées utilisateur
   - Sanitizer les données de scraping
   - Vérifier les signatures webhook

### Audit de sécurité

```bash
# Vérifier les dépendances
npm audit

# Vérifier les permissions
node scripts/security-audit.js
```

## 📈 Performance

### Optimisations recommandées

1. **Cache Redis**
   ```typescript
   // lib/cache/redis.ts
   import Redis from 'ioredis';
   
   const redis = new Redis(process.env.REDIS_URL);
   
   // Cache des prédictions
   await redis.setex(`prediction:${symbol}`, 3600, JSON.stringify(prediction));
   ```

2. **Mise en cache des requêtes**
   ```typescript
   // lib/utils/cache.ts
   export function withCache<T>(key: string, fn: () => Promise<T>, ttl: number = 3600) {
     // Implémentation du cache
   }
   ```

3. **Optimisation des workflows**
   - Exécution parallèle quand possible
   - Mise en cache des résultats intermédiaires
   - Limitation des appels API

## 🔄 Mise à jour

### Mise à jour des modules

```bash
# Mettre à jour les dépendances
npm update

# Mettre à jour les workflows
git pull origin main

# Reconfigurer
node scripts/setup-modules.js
```

### Migration des données

```typescript
// scripts/migrate-data.js
export async function migrateData() {
  // Migration des données existantes
  // Sauvegarde avant migration
  // Restauration en cas d'erreur
}
```

## 📞 Support

### Ressources utiles

- 📚 [Documentation OpenAI](https://platform.openai.com/docs)
- 💳 [Documentation Stripe](https://stripe.com/docs)
- 🤖 [Documentation Telegram Bot](https://core.telegram.org/bots/api)
- ⚙️ [Documentation N8N](https://docs.n8n.io/)

### Contact

Pour toute question ou problème :
- 📧 Email : support@dlsolutions.com
- 💬 Discord : [Serveur DLSolutions](https://discord.gg/dlsolutions)
- 📱 Telegram : @DLSolutionsSupport

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2024  
**Auteur :** DLSolutions Team 