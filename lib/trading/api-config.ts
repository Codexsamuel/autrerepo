// Configuration des APIs de trading pour DAVY
// Centralisation de toutes les configurations d'APIs financières

export interface APIConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  rateLimit: {
    requests: number;
    window: number; // en secondes
  };
  enabled: boolean;
  priority: number; // 1 = plus prioritaire
}

export interface MarketDataProvider {
  name: string;
  supportedAssets: string[];
  dataTypes: ('price' | 'volume' | 'marketCap' | 'historical' | 'news')[];
  updateFrequency: number; // en secondes
  reliability: number; // 0-100
}

// Configuration des APIs principales
export const API_CONFIGS: { [key: string]: APIConfig } = {
  alphaVantage: {
    name: 'Alpha Vantage',
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: process.env.ALPHA_VANTAGE_API_KEY || '',
    rateLimit: {
      requests: 5,
      window: 60 // 5 requêtes par minute pour le plan gratuit
    },
    enabled: true,
    priority: 1
  },

  yahooFinance: {
    name: 'Yahoo Finance',
    baseUrl: 'https://query1.finance.yahoo.com/v8/finance',
    apiKey: process.env.YAHOO_FINANCE_API_KEY || '',
    rateLimit: {
      requests: 100,
      window: 60
    },
    enabled: true,
    priority: 2
  },

  finnhub: {
    name: 'Finnhub',
    baseUrl: 'https://finnhub.io/api/v1',
    apiKey: process.env.FINNHUB_API_KEY || '',
    rateLimit: {
      requests: 60,
      window: 60
    },
    enabled: true,
    priority: 3
  },

  polygon: {
    name: 'Polygon.io',
    baseUrl: 'https://api.polygon.io/v2',
    apiKey: process.env.POLYGON_API_KEY || '',
    rateLimit: {
      requests: 5,
      window: 60
    },
    enabled: true,
    priority: 4
  },

  coinmarketcap: {
    name: 'CoinMarketCap',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1',
    apiKey: process.env.COINMARKETCAP_API_KEY || '',
    rateLimit: {
      requests: 10,
      window: 60
    },
    enabled: true,
    priority: 5
  },

  coingecko: {
    name: 'CoinGecko',
    baseUrl: 'https://api.coingecko.com/api/v3',
    apiKey: process.env.COINGECKO_API_KEY || '',
    rateLimit: {
      requests: 50,
      window: 60
    },
    enabled: true,
    priority: 6
  },

  newsAPI: {
    name: 'News API',
    baseUrl: 'https://newsapi.org/v2',
    apiKey: process.env.NEWS_API_KEY || '',
    rateLimit: {
      requests: 100,
      window: 60
    },
    enabled: true,
    priority: 7
  },

  twitter: {
    name: 'Twitter API',
    baseUrl: 'https://api.twitter.com/2',
    apiKey: process.env.TWITTER_BEARER_TOKEN || '',
    rateLimit: {
      requests: 300,
      window: 900 // 15 minutes
    },
    enabled: true,
    priority: 8
  }
};

// Configuration des fournisseurs de données de marché
export const MARKET_DATA_PROVIDERS: MarketDataProvider[] = [
  {
    name: 'Yahoo Finance',
    supportedAssets: ['stocks', 'crypto', 'forex', 'commodities', 'indices'],
    dataTypes: ['price', 'volume', 'marketCap', 'historical'],
    updateFrequency: 1,
    reliability: 95
  },
  {
    name: 'Alpha Vantage',
    supportedAssets: ['stocks', 'crypto', 'forex'],
    dataTypes: ['price', 'volume', 'historical'],
    updateFrequency: 1,
    reliability: 90
  },
  {
    name: 'Finnhub',
    supportedAssets: ['stocks', 'crypto', 'forex'],
    dataTypes: ['price', 'volume', 'news'],
    updateFrequency: 1,
    reliability: 85
  },
  {
    name: 'CoinMarketCap',
    supportedAssets: ['crypto'],
    dataTypes: ['price', 'volume', 'marketCap', 'historical'],
    updateFrequency: 1,
    reliability: 92
  },
  {
    name: 'CoinGecko',
    supportedAssets: ['crypto'],
    dataTypes: ['price', 'volume', 'marketCap', 'historical'],
    updateFrequency: 1,
    reliability: 88
  }
];

// Configuration des actifs supportés
export const SUPPORTED_ASSETS = {
  stocks: [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'ADBE', 'CRM',
    'ORCL', 'INTC', 'AMD', 'QCOM', 'TXN', 'AVGO', 'MU', 'AMAT', 'LRCX', 'KLAC'
  ],
  crypto: [
    'BTC', 'ETH', 'ADA', 'DOT', 'UNI', 'LINK', 'LTC', 'BCH', 'XLM', 'VET',
    'TRX', 'FIL', 'DOGE', 'SHIB', 'MATIC', 'SOL', 'AVAX', 'ATOM', 'FTM', 'ALGO'
  ],
  forex: [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD',
    'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'CHF/JPY', 'AUD/JPY', 'CAD/JPY', 'NZD/JPY'
  ],
  commodities: [
    'GOLD', 'SILVER', 'OIL', 'GAS', 'COPPER', 'PLATINUM', 'PALLADIUM', 'NICKEL'
  ],
  indices: [
    'SPY', 'QQQ', 'IWM', 'DIA', 'VTI', 'VEA', 'VWO', 'BND', 'GLD', 'SLV'
  ]
};

// Configuration des timeframes
export const TIMEFRAMES = {
  '1m': { label: '1 Minute', seconds: 60 },
  '5m': { label: '5 Minutes', seconds: 300 },
  '15m': { label: '15 Minutes', seconds: 900 },
  '30m': { label: '30 Minutes', seconds: 1800 },
  '1h': { label: '1 Heure', seconds: 3600 },
  '4h': { label: '4 Heures', seconds: 14400 },
  '1d': { label: '1 Jour', seconds: 86400 },
  '1w': { label: '1 Semaine', seconds: 604800 },
  '1M': { label: '1 Mois', seconds: 2592000 }
};

// Configuration des indicateurs techniques
export const TECHNICAL_INDICATORS = {
  rsi: {
    name: 'RSI',
    description: 'Relative Strength Index',
    defaultPeriod: 14,
    overbought: 70,
    oversold: 30
  },
  macd: {
    name: 'MACD',
    description: 'Moving Average Convergence Divergence',
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9
  },
  bollinger: {
    name: 'Bollinger Bands',
    description: 'Bollinger Bands',
    period: 20,
    standardDeviations: 2
  },
  sma: {
    name: 'SMA',
    description: 'Simple Moving Average',
    periods: [20, 50, 100, 200]
  },
  ema: {
    name: 'EMA',
    description: 'Exponential Moving Average',
    periods: [12, 26, 50, 200]
  },
  stoch: {
    name: 'Stochastic',
    description: 'Stochastic Oscillator',
    kPeriod: 14,
    dPeriod: 3
  }
};

// Configuration des stratégies de trading
export const TRADING_STRATEGIES = {
  swing: {
    name: 'Swing Trading',
    description: 'Trading sur plusieurs jours à semaines',
    timeframe: '1d',
    riskLevel: 'medium',
    expectedReturn: 15,
    maxDrawdown: 10
  },
  scalping: {
    name: 'Scalping',
    description: 'Trading très court terme',
    timeframe: '1m',
    riskLevel: 'high',
    expectedReturn: 25,
    maxDrawdown: 15
  },
  position: {
    name: 'Position Trading',
    description: 'Trading long terme',
    timeframe: '1w',
    riskLevel: 'low',
    expectedReturn: 8,
    maxDrawdown: 5
  },
  day: {
    name: 'Day Trading',
    description: 'Trading intraday',
    timeframe: '1h',
    riskLevel: 'high',
    expectedReturn: 20,
    maxDrawdown: 12
  }
};

// Configuration des limites et quotas
export const TRADING_LIMITS = {
  maxTradesPerDay: parseInt(process.env.MAX_TRADES_PER_DAY || '50'),
  maxInvestmentAmount: parseFloat(process.env.MAX_INVESTMENT_AMOUNT || '10000000'),
  maxPositionSize: parseFloat(process.env.AI_MAX_POSITION_SIZE || '0.1'),
  minTradeAmount: 1000,
  maxLeverage: 10,
  stopLossPercentage: 2,
  takeProfitPercentage: 6
};

// Configuration des alertes
export const ALERT_TYPES = {
  priceTarget: {
    name: 'Objectif de Prix',
    description: 'Alerte quand le prix atteint un niveau spécifique'
  },
  stopLoss: {
    name: 'Stop Loss',
    description: 'Alerte pour protéger contre les pertes'
  },
  technicalSignal: {
    name: 'Signal Technique',
    description: 'Alerte basée sur les indicateurs techniques'
  },
  newsImpact: {
    name: 'Impact Actualités',
    description: 'Alerte basée sur les actualités importantes'
  },
  volumeSpike: {
    name: 'Pic de Volume',
    description: 'Alerte pour les mouvements de volume anormaux'
  }
};

// Configuration des notifications
export const NOTIFICATION_CONFIG = {
  email: {
    enabled: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
    provider: 'resend',
    templates: {
      tradeExecuted: 'trade-executed',
      alertTriggered: 'alert-triggered',
      dailyReport: 'daily-report',
      weeklyReport: 'weekly-report'
    }
  },
  sms: {
    enabled: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
    provider: 'twilio',
    emergencyOnly: true
  },
  push: {
    enabled: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
    provider: 'firebase'
  }
};

// Configuration de la sécurité
export const SECURITY_CONFIG = {
  enable2FA: process.env.ENABLE_2FA === 'true',
  sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '3600'),
  maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5'),
  passwordMinLength: parseInt(process.env.PASSWORD_MIN_LENGTH || '8'),
  apiRateLimit: {
    window: 900, // 15 minutes
    max: 1000
  }
};

// Configuration du cache
export const CACHE_CONFIG = {
  enabled: process.env.ENABLE_CACHE === 'true',
  ttl: parseInt(process.env.CACHE_TTL || '3600'),
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    maxRetries: 3,
    retryDelay: 1000
  }
};

// Configuration des logs
export const LOG_CONFIG = {
  level: process.env.LOG_LEVEL || 'info',
  format: process.env.LOG_FORMAT || 'json',
  enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING === 'true',
  file: {
    enabled: true,
    path: 'logs/trading',
    maxSize: '10m',
    maxFiles: 5
  }
};

// Fonctions utilitaires
export function getAPIByPriority(): APIConfig[] {
  return Object.values(API_CONFIGS)
    .filter(config => config.enabled)
    .sort((a, b) => a.priority - b.priority);
}

export function getProviderForAsset(asset: string): MarketDataProvider | null {
  const assetType = getAssetType(asset);
  
  return MARKET_DATA_PROVIDERS.find(provider => 
    provider.supportedAssets.includes(assetType)
  ) || null;
}

export function getAssetType(symbol: string): string {
  if (SUPPORTED_ASSETS.stocks.includes(symbol)) return 'stocks';
  if (SUPPORTED_ASSETS.crypto.includes(symbol)) return 'crypto';
  if (SUPPORTED_ASSETS.forex.includes(symbol)) return 'forex';
  if (SUPPORTED_ASSETS.commodities.includes(symbol)) return 'commodities';
  if (SUPPORTED_ASSETS.indices.includes(symbol)) return 'indices';
  return 'unknown';
}

export function isAssetSupported(symbol: string): boolean {
  return getAssetType(symbol) !== 'unknown';
}

export function getTimeframeSeconds(timeframe: string): number {
  return TIMEFRAMES[timeframe as keyof typeof TIMEFRAMES]?.seconds || 86400;
}

export function validateAPIKey(apiName: string): boolean {
  const config = API_CONFIGS[apiName];
  return !!(config && typeof config.apiKey === 'string' && config.apiKey.length > 0);
}

export function getEnabledAPIs(): APIConfig[] {
  return Object.values(API_CONFIGS).filter(config => 
    config.enabled && validateAPIKey(config.name.toLowerCase().replace(' ', ''))
  );
} 