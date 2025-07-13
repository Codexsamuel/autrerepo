import { NextRequest, NextResponse } from 'next/server';

// Types pour les données de trading
interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

interface CryptoData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

interface ForexData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

interface PortfolioData {
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    marketValue: number;
    unrealizedPnL: number;
    unrealizedPnLPercent: number;
  }>;
}

// Configuration Alpha Vantage
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Configuration CoinGecko (Gratuit - 50 appels/minute)
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Configuration Exchange Rate (Gratuit - 1000 appels/mois)
const EXCHANGE_RATE_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

// Fonction pour récupérer les données d'actions depuis Alpha Vantage
async function fetchStockData(symbol: string): Promise<StockData | null> {
  if (!ALPHA_VANTAGE_API_KEY) {
    console.warn('ALPHA_VANTAGE_API_KEY non configurée, utilisation des données simulées');
    return null;
  }

  try {
    const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Erreur Alpha Vantage pour ${symbol}:`, response.status);
      return null;
    }

    const data = await response.json();
    
    if (data['Error Message'] || data['Note']) {
      console.error(`Erreur Alpha Vantage pour ${symbol}:`, data['Error Message'] || data['Note']);
      return null;
    }

    const quote = data['Global Quote'];
    if (!quote || !quote['05. price']) {
      console.error(`Données invalides pour ${symbol}:`, data);
      return null;
    }

    const price = parseFloat(quote['05. price']);
    const change = parseFloat(quote['09. change']);
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
    const volume = parseInt(quote['06. volume']);
    const previousClose = parseFloat(quote['08. previous close']);

    return {
      symbol: symbol,
      price: price,
      change: change,
      changePercent: changePercent,
      volume: volume,
      high: price + Math.random() * 2, // Simulation pour les données non disponibles
      low: price - Math.random() * 2,
      open: previousClose + (Math.random() - 0.5) * 1,
      previousClose: previousClose
    };

  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
    return null;
  }
}

// Fonction pour récupérer les données de cryptos depuis CoinGecko
async function fetchCryptoData(symbol: string): Promise<CryptoData | null> {
  try {
    // Mapping des symboles vers les IDs CoinGecko
    const coinMapping: Record<string, string> = {
      'bitcoin': 'bitcoin',
      'ethereum': 'ethereum',
      'cardano': 'cardano',
      'solana': 'solana',
      'bnb': 'binancecoin',
      'xrp': 'ripple',
      'doge': 'dogecoin',
      'ada': 'cardano',
      'dot': 'polkadot',
      'matic': 'matic-network'
    };

    const coinId = coinMapping[symbol.toLowerCase()];
    if (!coinId) {
      console.warn(`Symbole crypto non supporté: ${symbol}`);
      return null;
    }

    const url = `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Erreur CoinGecko pour ${symbol}:`, response.status);
      return null;
    }

    const data = await response.json();
    
    if (!data[coinId]) {
      console.error(`Données invalides pour ${symbol}:`, data);
      return null;
    }

    const coinData = data[coinId];
    const price = coinData.usd;
    const changePercent = coinData.usd_24h_change || 0;
    const volume = coinData.usd_24h_vol || 0;
    const marketCap = coinData.usd_market_cap || 0;
    const change = price * (changePercent / 100);

    return {
      symbol: symbol,
      price: price,
      change: change,
      changePercent: changePercent,
      volume: volume,
      marketCap: marketCap,
      high: price * (1 + Math.abs(changePercent) / 100), // Estimation
      low: price * (1 - Math.abs(changePercent) / 100),
      open: price - change,
      previousClose: price - change
    };

  } catch (error) {
    console.error(`Erreur lors de la récupération des données crypto pour ${symbol}:`, error);
    return null;
  }
}

// Fonction pour récupérer les données de devises depuis Exchange Rate API
async function fetchForexData(symbol: string): Promise<ForexData | null> {
  try {
    // Extraction de la devise de base et de la devise cible
    const [base, target] = symbol.split('/');
    if (!base || !target) {
      console.warn(`Format de devise invalide: ${symbol}`);
      return null;
    }

    const url = `${EXCHANGE_RATE_BASE_URL}/${base.toUpperCase()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Erreur Exchange Rate pour ${symbol}:`, response.status);
      return null;
    }

    const data = await response.json();
    
    if (!data.rates || !data.rates[target.toUpperCase()]) {
      console.error(`Données invalides pour ${symbol}:`, data);
      return null;
    }

    const price = data.rates[target.toUpperCase()];
    // Simulation des variations pour les devises (Exchange Rate API ne fournit que le taux actuel)
    const changePercent = (Math.random() - 0.5) * 2; // Variation aléatoire entre -1% et +1%
    const change = price * (changePercent / 100);

    return {
      symbol: symbol,
      price: price,
      change: change,
      changePercent: changePercent,
      high: price * 1.001, // Estimation
      low: price * 0.999,
      open: price - change,
      previousClose: price - change
    };

  } catch (error) {
    console.error(`Erreur lors de la récupération des données forex pour ${symbol}:`, error);
    return null;
  }
}

// Données simulées de fallback pour les actions
const fallbackStockData: Record<string, StockData> = {
  AAPL: {
    symbol: 'AAPL',
    price: 185.92,
    change: 2.45,
    changePercent: 1.33,
    volume: 45678900,
    marketCap: 2900000000000,
    high: 187.50,
    low: 183.20,
    open: 184.10,
    previousClose: 183.47
  },
  TSLA: {
    symbol: 'TSLA',
    price: 245.67,
    change: -3.21,
    changePercent: -1.29,
    volume: 23456700,
    marketCap: 780000000000,
    high: 248.90,
    low: 243.10,
    open: 247.20,
    previousClose: 248.88
  },
  MSFT: {
    symbol: 'MSFT',
    price: 378.45,
    change: 4.67,
    changePercent: 1.25,
    volume: 34567800,
    marketCap: 2810000000000,
    high: 380.20,
    low: 375.80,
    open: 376.10,
    previousClose: 373.78
  },
  GOOGL: {
    symbol: 'GOOGL',
    price: 142.56,
    change: 1.23,
    changePercent: 0.87,
    volume: 23456700,
    marketCap: 1790000000000,
    high: 143.80,
    low: 141.90,
    open: 142.20,
    previousClose: 141.33
  },
  AMZN: {
    symbol: 'AMZN',
    price: 145.24,
    change: 2.89,
    changePercent: 2.03,
    volume: 45678900,
    marketCap: 1510000000000,
    high: 146.50,
    low: 143.80,
    open: 144.10,
    previousClose: 142.35
  },
  NVDA: {
    symbol: 'NVDA',
    price: 485.09,
    change: 8.76,
    changePercent: 1.84,
    volume: 56789000,
    marketCap: 1190000000000,
    high: 488.20,
    low: 480.50,
    open: 481.20,
    previousClose: 476.33
  },
  META: {
    symbol: 'META',
    price: 334.67,
    change: 3.45,
    changePercent: 1.04,
    volume: 34567800,
    marketCap: 850000000000,
    high: 336.80,
    low: 332.10,
    open: 333.20,
    previousClose: 331.22
  },
  NFLX: {
    symbol: 'NFLX',
    price: 567.89,
    change: -5.67,
    changePercent: -0.99,
    volume: 12345600,
    marketCap: 245000000000,
    high: 572.40,
    low: 565.20,
    open: 568.90,
    previousClose: 573.56
  }
};

// Données simulées de fallback pour les cryptos
const fallbackCryptoData: Record<string, CryptoData> = {
  bitcoin: {
    symbol: 'bitcoin',
    price: 43250.67,
    change: 1250.34,
    changePercent: 2.98,
    volume: 23456789000,
    marketCap: 845000000000,
    high: 43500.20,
    low: 42800.50,
    open: 42900.10,
    previousClose: 42000.33
  },
  ethereum: {
    symbol: 'ethereum',
    price: 2650.45,
    change: 45.67,
    changePercent: 1.75,
    volume: 12345678000,
    marketCap: 318000000000,
    high: 2670.80,
    low: 2630.20,
    open: 2640.30,
    previousClose: 2604.78
  },
  cardano: {
    symbol: 'cardano',
    price: 0.4567,
    change: 0.0123,
    changePercent: 2.77,
    volume: 2345678000,
    marketCap: 16000000000,
    high: 0.4620,
    low: 0.4510,
    open: 0.4530,
    previousClose: 0.4444
  },
  solana: {
    symbol: 'solana',
    price: 98.76,
    change: 2.34,
    changePercent: 2.43,
    volume: 3456789000,
    marketCap: 42000000000,
    high: 99.80,
    low: 97.20,
    open: 97.80,
    previousClose: 96.42
  }
};

// Données simulées de fallback pour les devises
const fallbackForexData: Record<string, ForexData> = {
  'EUR/USD': {
    symbol: 'EUR/USD',
    price: 1.0876,
    change: 0.0023,
    changePercent: 0.21,
    high: 1.0890,
    low: 1.0860,
    open: 1.0870,
    previousClose: 1.0853
  },
  'GBP/USD': {
    symbol: 'GBP/USD',
    price: 1.2654,
    change: -0.0012,
    changePercent: -0.09,
    high: 1.2670,
    low: 1.2640,
    open: 1.2650,
    previousClose: 1.2666
  },
  'USD/JPY': {
    symbol: 'USD/JPY',
    price: 148.23,
    change: 0.45,
    changePercent: 0.30,
    high: 148.50,
    low: 147.90,
    open: 148.00,
    previousClose: 147.78
  }
};

// Données simulées pour le portfolio
const portfolioData: PortfolioData = {
  totalValue: 125000.00,
  totalChange: 2345.67,
  totalChangePercent: 1.91,
  positions: [
    {
      symbol: 'AAPL',
      quantity: 50,
      avgPrice: 175.20,
      currentPrice: 185.92,
      marketValue: 9296.00,
      unrealizedPnL: 536.00,
      unrealizedPnLPercent: 6.12
    },
    {
      symbol: 'TSLA',
      quantity: 30,
      avgPrice: 220.50,
      currentPrice: 245.67,
      marketValue: 7370.10,
      unrealizedPnL: 755.10,
      unrealizedPnLPercent: 11.41
    },
    {
      symbol: 'bitcoin',
      quantity: 0.5,
      avgPrice: 42000.00,
      currentPrice: 43250.67,
      marketValue: 21625.34,
      unrealizedPnL: 625.34,
      unrealizedPnLPercent: 2.98
    },
    {
      symbol: 'MSFT',
      quantity: 25,
      avgPrice: 350.00,
      currentPrice: 378.45,
      marketValue: 9461.25,
      unrealizedPnL: 711.25,
      unrealizedPnLPercent: 8.13
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbolsParam = searchParams.get('symbols');
    const portfolioParam = searchParams.get('portfolio');

    if (!symbolsParam) {
      return NextResponse.json(
        { error: 'Le paramètre symbols est requis' },
        { status: 400 }
      );
    }

    const symbols = symbolsParam.split(',').map(s => s.trim());
    const includePortfolio = portfolioParam === 'true';

    const result: {
      stocks?: StockData[];
      cryptos?: CryptoData[];
      forex?: ForexData[];
      portfolio?: PortfolioData;
      timestamp: string;
      dataSource: string;
    } = {
      timestamp: new Date().toISOString(),
      dataSource: 'Alpha Vantage (Actions) + CoinGecko (Crypto) + Exchange Rate (Forex)'
    };

    // Filtrer les données selon les symboles demandés
    const stocks: StockData[] = [];
    const cryptos: CryptoData[] = [];
    const forex: ForexData[] = [];

    // Traitement des symboles en parallèle
    const promises = symbols.map(async (symbol) => {
      const upperSymbol = symbol.toUpperCase();
      
      if (fallbackStockData[upperSymbol]) {
        // Essayer d'abord Alpha Vantage pour les actions
        const realData = await fetchStockData(upperSymbol);
        if (realData) {
          stocks.push(realData);
        } else {
          // Fallback vers les données simulées
          stocks.push(fallbackStockData[upperSymbol]);
        }
      } else if (fallbackCryptoData[symbol.toLowerCase()]) {
        // Essayer d'abord CoinGecko pour les cryptos
        const realData = await fetchCryptoData(symbol);
        if (realData) {
          cryptos.push(realData);
        } else {
          // Fallback vers les données simulées
          cryptos.push(fallbackCryptoData[symbol.toLowerCase()]);
        }
      } else if (fallbackForexData[symbol]) {
        // Essayer d'abord Exchange Rate pour les devises
        const realData = await fetchForexData(symbol);
        if (realData) {
          forex.push(realData);
        } else {
          // Fallback vers les données simulées
          forex.push(fallbackForexData[symbol]);
        }
      }
    });

    await Promise.all(promises);

    if (stocks.length > 0) result.stocks = stocks;
    if (cryptos.length > 0) result.cryptos = cryptos;
    if (forex.length > 0) result.forex = forex;
    if (includePortfolio) result.portfolio = portfolioData;

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur API trading:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 