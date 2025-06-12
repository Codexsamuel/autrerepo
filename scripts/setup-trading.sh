#!/bin/bash

# Script de configuration pour le module de trading DAVY
# Ce script configure l'environnement de trading IA

echo "🚀 Configuration du module de trading DAVY..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Vérifier si on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "Ce script doit être exécuté depuis le répertoire racine du projet"
    exit 1
fi

print_header "Configuration du module de trading DAVY"

# 1. Installation des dépendances de trading
print_message "Installation des dépendances de trading..."

# Dépendances pour les données de marché
npm install --save \
    yahoo-finance2 \
    alpha-vantage \
    finnhub \
    polygon-api-client \
    coinmarketcap-api \
    coingecko-api

# Dépendances pour les graphiques et visualisations
npm install --save \
    recharts \
    chart.js \
    react-chartjs-2 \
    @nivo/core \
    @nivo/line \
    @nivo/bar \
    @nivo/pie

# Dépendances pour l'analyse technique
npm install --save \
    technicalindicators \
    tulind \
    talib.js

# Dépendances pour les notifications
npm install --save \
    node-cron \
    nodemailer \
    twilio

# 2. Création des dossiers nécessaires
print_message "Création de la structure de dossiers..."

mkdir -p components/trading
mkdir -p lib/trading
mkdir -p pages/api/trading
mkdir -p public/trading
mkdir -p data/market
mkdir -p logs/trading

# 3. Configuration des variables d'environnement
print_message "Configuration des variables d'environnement..."

# Créer le fichier .env.local s'il n'existe pas
if [ ! -f ".env.local" ]; then
    cat > .env.local << EOF
# Configuration Trading DAVY
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
YAHOO_FINANCE_API_KEY=your_yahoo_finance_api_key
NEWS_API_KEY=your_news_api_key
FINNHUB_API_KEY=your_finnhub_api_key
POLYGON_API_KEY=your_polygon_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
COINGECKO_API_KEY=your_coingecko_api_key

# Configuration IA Trading
AI_TRADING_ENABLED=true
AI_CONFIDENCE_THRESHOLD=70
AI_RISK_TOLERANCE=medium
AI_MAX_POSITION_SIZE=0.1

# Configuration des timeframes
DEFAULT_TIMEFRAME=1d
SUPPORTED_TIMEFRAMES=1h,1d,1w,1m,3m,6m,1y

# Configuration des actifs supportés
SUPPORTED_ASSETS=AAPL,TSLA,GOOGL,MSFT,AMZN,BTC,ETH,ADA,DOT,UNI,EUR/USD,GBP/USD,USD/JPY

# Configuration de la sécurité
ENABLE_2FA=true
SESSION_TIMEOUT=3600
MAX_LOGIN_ATTEMPTS=5

# Configuration des rapports
REPORT_GENERATION_ENABLED=true
AUTO_REPORT_FREQUENCY=daily
REPORT_RETENTION_DAYS=365

# Configuration des limites
MAX_TRADES_PER_DAY=50
MAX_INVESTMENT_AMOUNT=10000000
RISK_MANAGEMENT_ENABLED=true
EOF
    print_message "Fichier .env.local créé avec les variables de trading"
else
    print_warning "Le fichier .env.local existe déjà. Vérifiez qu'il contient les variables de trading nécessaires."
fi

# 4. Configuration de la base de données pour le trading
print_message "Configuration de la base de données trading..."

# Créer le schéma de base de données pour le trading
cat > lib/trading/database-schema.sql << EOF
-- Schéma de base de données pour le module de trading DAVY

-- Table des utilisateurs de trading
CREATE TABLE IF NOT EXISTS trading_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    risk_tolerance VARCHAR(20) DEFAULT 'medium',
    investment_amount DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des portefeuilles
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES trading_users(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    total_value DECIMAL(15,2) DEFAULT 0,
    cash_balance DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des positions
CREATE TABLE IF NOT EXISTS positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id),
    symbol VARCHAR(20) NOT NULL,
    quantity DECIMAL(15,8) NOT NULL,
    average_price DECIMAL(15,2) NOT NULL,
    current_price DECIMAL(15,2),
    unrealized_pnl DECIMAL(15,2) DEFAULT 0,
    realized_pnl DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des trades
CREATE TABLE IF NOT EXISTS trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES trading_users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    symbol VARCHAR(20) NOT NULL,
    action VARCHAR(10) NOT NULL, -- 'buy' or 'sell'
    quantity DECIMAL(15,8) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    commission DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
    executed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des recommandations IA
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    action VARCHAR(10) NOT NULL, -- 'buy', 'sell', 'hold'
    confidence DECIMAL(5,2) NOT NULL,
    reasoning TEXT,
    risk_level VARCHAR(10) NOT NULL, -- 'low', 'medium', 'high'
    timeframe VARCHAR(10) NOT NULL, -- 'short', 'medium', 'long'
    target_price DECIMAL(15,2),
    stop_loss DECIMAL(15,2),
    take_profit DECIMAL(15,2),
    strategy VARCHAR(50),
    market_conditions TEXT,
    news_impact TEXT,
    technical_analysis TEXT,
    fundamental_analysis TEXT,
    ai_insights JSONB,
    risk_reward_ratio DECIMAL(5,2),
    expected_return DECIMAL(5,2),
    volatility DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des données de marché
CREATE TABLE IF NOT EXISTS market_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    change DECIMAL(15,2) NOT NULL,
    change_percent DECIMAL(8,4) NOT NULL,
    volume BIGINT,
    market_cap DECIMAL(20,2),
    high_24h DECIMAL(15,2),
    low_24h DECIMAL(15,2),
    open_price DECIMAL(15,2),
    previous_close DECIMAL(15,2),
    asset_type VARCHAR(20) NOT NULL, -- 'stock', 'crypto', 'forex', 'commodity'
    exchange VARCHAR(50),
    currency VARCHAR(10),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des indicateurs techniques
CREATE TABLE IF NOT EXISTS technical_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    rsi DECIMAL(8,4),
    macd DECIMAL(15,8),
    macd_signal DECIMAL(15,8),
    macd_histogram DECIMAL(15,8),
    bollinger_upper DECIMAL(15,2),
    bollinger_middle DECIMAL(15,2),
    bollinger_lower DECIMAL(15,2),
    sma_20 DECIMAL(15,2),
    sma_50 DECIMAL(15,2),
    sma_200 DECIMAL(15,2),
    support_level DECIMAL(15,2),
    resistance_level DECIMAL(15,2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des actualités financières
CREATE TABLE IF NOT EXISTS financial_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    url VARCHAR(500),
    source VARCHAR(100),
    sentiment VARCHAR(20), -- 'positive', 'negative', 'neutral'
    impact VARCHAR(10), -- 'high', 'medium', 'low'
    symbols TEXT[], -- Array of affected symbols
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des alertes
CREATE TABLE IF NOT EXISTS trading_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES trading_users(id),
    symbol VARCHAR(20) NOT NULL,
    alert_type VARCHAR(50) NOT NULL, -- 'price_target', 'stop_loss', 'news', 'technical'
    condition VARCHAR(100) NOT NULL,
    value DECIMAL(15,2),
    is_active BOOLEAN DEFAULT true,
    triggered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_trades_user_id ON trades(user_id);
CREATE INDEX IF NOT EXISTS idx_trades_symbol ON trades(symbol);
CREATE INDEX IF NOT EXISTS idx_trades_created_at ON trades(created_at);
CREATE INDEX IF NOT EXISTS idx_positions_portfolio_id ON positions(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_market_data_symbol ON market_data(symbol);
CREATE INDEX IF NOT EXISTS idx_market_data_timestamp ON market_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_symbol ON ai_recommendations(symbol);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_created_at ON ai_recommendations(created_at);
CREATE INDEX IF NOT EXISTS idx_financial_news_symbols ON financial_news USING GIN(symbols);
CREATE INDEX IF NOT EXISTS idx_financial_news_published_at ON financial_news(published_at);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS \$\$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
\$\$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_trading_users_updated_at BEFORE UPDATE ON trading_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_positions_updated_at BEFORE UPDATE ON positions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EOF

print_message "Schéma de base de données créé"

# 5. Configuration des scripts npm
print_message "Configuration des scripts npm..."

# Ajouter les scripts de trading au package.json
if [ -f "package.json" ]; then
    # Sauvegarder le package.json original
    cp package.json package.json.backup
    
    # Ajouter les scripts de trading
    node -e "
    const fs = require('fs');
    const package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!package.scripts) package.scripts = {};
    
    package.scripts['trading:dev'] = 'next dev --port 3001';
    package.scripts['trading:build'] = 'next build';
    package.scripts['trading:start'] = 'next start --port 3001';
    package.scripts['trading:test'] = 'jest --testPathPattern=trading';
    package.scripts['trading:lint'] = 'eslint components/trading lib/trading';
    package.scripts['trading:data:sync'] = 'node scripts/sync-market-data.js';
    package.scripts['trading:ai:train'] = 'node scripts/train-ai-model.js';
    package.scripts['trading:backtest'] = 'node scripts/backtest-strategy.js';
    package.scripts['trading:report'] = 'node scripts/generate-trading-report.js';
    
    fs.writeFileSync('package.json', JSON.stringify(package, null, 2));
    "
    
    print_message "Scripts npm ajoutés au package.json"
fi

# 6. Configuration des webhooks
print_message "Configuration des webhooks..."

mkdir -p pages/api/webhooks

# Créer le webhook pour les données de marché
cat > pages/api/webhooks/market-data.ts << EOF
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { symbol, price, change, volume } = req.body;
        
        // Traiter les données de marché reçues
        console.log('Données de marché reçues:', { symbol, price, change, volume });
        
        // Ici, vous pouvez ajouter la logique pour sauvegarder en base de données
        // et déclencher des alertes si nécessaire
        
        res.status(200).json({ message: 'Données reçues avec succès' });
    } catch (error) {
        console.error('Erreur webhook:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
EOF

# 7. Configuration des tests
print_message "Configuration des tests..."

mkdir -p __tests__/trading

# Créer un test de base pour le module de trading
cat > __tests__/trading/trading-advisor.test.ts << EOF
import { render, screen } from '@testing-library/react';
import TradingAdvisor from '../../components/trading/TradingAdvisor';

describe('TradingAdvisor', () => {
    it('should render trading advisor component', () => {
        render(<TradingAdvisor />);
        expect(screen.getByText(/DAVY Trading Advisor/i)).toBeInTheDocument();
    });

    it('should display market data', () => {
        render(<TradingAdvisor />);
        expect(screen.getByText(/Données de Marché/i)).toBeInTheDocument();
    });
});
EOF

# 8. Configuration du monitoring
print_message "Configuration du monitoring..."

mkdir -p scripts/monitoring

# Créer un script de monitoring pour le trading
cat > scripts/monitoring/trading-monitor.js << EOF
#!/usr/bin/env node

const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// Fonction pour vérifier la santé du système de trading
function checkTradingHealth() {
    const timestamp = new Date().toISOString();
    const logMessage = \`[\${timestamp}] Vérification de la santé du système de trading\`;
    
    console.log(logMessage);
    
    // Ici, vous pouvez ajouter des vérifications spécifiques
    // - Vérifier la connectivité aux APIs
    // - Vérifier l'état de la base de données
    // - Vérifier les performances du système
    
    // Sauvegarder les logs
    const logFile = path.join(__dirname, '../logs/trading/health.log');
    fs.appendFileSync(logFile, logMessage + '\\n');
}

// Fonction pour nettoyer les anciens logs
function cleanupOldLogs() {
    const logsDir = path.join(__dirname, '../logs/trading');
    const files = fs.readdirSync(logsDir);
    
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
    
    files.forEach(file => {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtime.getTime() > maxAge) {
            fs.unlinkSync(filePath);
            console.log(\`Fichier de log supprimé: \${file}\`);
        }
    });
}

// Programmer les tâches de monitoring
cron.schedule('*/5 * * * *', checkTradingHealth); // Toutes les 5 minutes
cron.schedule('0 2 * * *', cleanupOldLogs); // Tous les jours à 2h du matin

console.log('Monitoring du trading DAVY démarré...');
EOF

chmod +x scripts/monitoring/trading-monitor.js

# 9. Configuration de la documentation
print_message "Configuration de la documentation..."

mkdir -p docs/trading

# Créer la documentation du module de trading
cat > docs/trading/README.md << EOF
# Module de Trading DAVY

## Vue d'ensemble

Le module de trading DAVY est un système d'intelligence artificielle avancé conçu pour fournir des recommandations de trading, analyser les marchés financiers et optimiser les portefeuilles d'investissement.

## Fonctionnalités

### 🧠 Analyse IA
- Analyse technique et fondamentale
- Recommandations personnalisées
- Prédictions de marché basées sur l'IA
- Gestion des risques intelligente

### 📊 Données de Marché
- Données en temps réel
- Historique complet
- Indicateurs techniques
- Actualités financières

### 💬 Assistant Conversationnel
- Chat IA intelligent
- Réponses contextuelles
- Support multilingue
- Interface vocale

### 📈 Gestion de Portefeuille
- Suivi en temps réel
- Optimisation automatique
- Rapports détaillés
- Alertes personnalisées

## Installation

1. Exécuter le script de configuration :
   \`\`\`bash
   ./scripts/setup-trading.sh
   \`\`\`

2. Configurer les variables d'environnement dans \`.env.local\`

3. Installer les dépendances :
   \`\`\`bash
   npm install
   \`\`\`

4. Démarrer le serveur de développement :
   \`\`\`bash
   npm run trading:dev
   \`\`\`

## Configuration

### Variables d'environnement requises

- \`ALPHA_VANTAGE_API_KEY\` : Clé API Alpha Vantage
- \`YAHOO_FINANCE_API_KEY\` : Clé API Yahoo Finance
- \`NEWS_API_KEY\` : Clé API News
- \`OPENAI_API_KEY\` : Clé API OpenAI pour l'IA

### Configuration de la base de données

Le module utilise Supabase pour le stockage des données. Exécutez le script SQL fourni dans \`lib/trading/database-schema.sql\`.

## Utilisation

### Interface Web

1. Accéder à \`/trading\` pour l'interface complète
2. Utiliser \`/admin\` pour accéder au module intégré

### API

- \`GET /api/trading/market-data\` : Récupérer les données de marché
- \`POST /api/trading/recommendations\` : Générer des recommandations
- \`GET /api/trading/portfolio\` : Récupérer le portefeuille

### Scripts

- \`npm run trading:data:sync\` : Synchroniser les données de marché
- \`npm run trading:ai:train\` : Entraîner le modèle IA
- \`npm run trading:backtest\` : Tester les stratégies

## Architecture

\`\`\`
components/trading/
├── TradingAdvisor.tsx      # Composant principal
├── DavyTradingChat.tsx     # Chat IA
└── ...

lib/trading/
├── marketData.ts           # Service données de marché
├── aiTrading.ts           # Service IA
└── ...

pages/api/trading/
├── market-data.ts          # API données de marché
├── recommendations.ts      # API recommandations
└── ...
\`\`\`

## Sécurité

- Authentification obligatoire
- Validation des données
- Limites de taux
- Chiffrement des données sensibles

## Monitoring

Le système inclut un monitoring automatique :
- Vérification de santé toutes les 5 minutes
- Nettoyage des logs automatique
- Alertes en cas de problème

## Support

Pour toute question ou problème :
1. Consulter la documentation
2. Vérifier les logs dans \`logs/trading/\`
3. Contacter l'équipe de développement

## Licence

Ce module fait partie du projet DL Solutions et est soumis aux mêmes conditions de licence.
EOF

# 10. Finalisation
print_header "Finalisation de la configuration"

print_message "Configuration du module de trading DAVY terminée !"
print_message ""
print_message "Prochaines étapes :"
print_message "1. Configurer vos clés API dans le fichier .env.local"
print_message "2. Exécuter le schéma SQL dans votre base de données Supabase"
print_message "3. Démarrer le serveur avec : npm run trading:dev"
print_message "4. Accéder à l'interface : http://localhost:3001/trading"
print_message ""
print_message "Documentation disponible dans : docs/trading/README.md"
print_message ""
print_warning "N'oubliez pas de configurer vos clés API pour que le module fonctionne correctement !"

echo ""
echo -e "${GREEN}✅ Configuration terminée avec succès !${NC}" 