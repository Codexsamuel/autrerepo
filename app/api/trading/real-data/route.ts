export const revalidate = false;
import { NextRequest, NextResponse } from "next/server";

// Cache intelligent avec TTL
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class TradingCache {
  private cache = new Map<string, CacheEntry>();
  
  // TTL différents selon le type de données
  private readonly TTL = {
    STOCKS: 5 * 60 * 1000, // 5 minutes pour les actions
    CRYPTO: 30 * 1000,     // 30 secondes pour les cryptos
    FOREX: 60 * 1000,      // 1 minute pour le forex
    PORTFOLIO: 2 * 60 * 1000 // 2 minutes pour le portfolio
  };

  set(key: string, data: any, type: 'STOCKS' | 'CRYPTO' | 'FOREX' | 'PORTFOLIO') {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: this.TTL[type]
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear() {
    this.cache.clear();
  }
}

const tradingCache = new TradingCache();

// Regroupement des requêtes par type
interface BatchRequest {
  stocks: string[];
  cryptos: string[];
  forex: string[];
}

function parseSymbols(symbols: string): BatchRequest {
  const stockSymbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'NFLX'];
  const cryptoSymbols = ['bitcoin', 'ethereum', 'cardano', 'solana', 'binancecoin', 'ripple'];
  const forexSymbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD'];
  
  const symbolList = symbols.split(',').map(s => s.trim());
  
  return {
    stocks: symbolList.filter(s => stockSymbols.includes(s.toUpperCase())),
    cryptos: symbolList.filter(s => cryptoSymbols.includes(s.toLowerCase())),
    forex: symbolList.filter(s => forexSymbols.includes(s.toUpperCase()))
  };
}

// Fonction optimisée pour récupérer les données d'actions
async function getStockData(symbols: string[]) {
  const cacheKey = `stocks_${symbols.join(',')}`;
  const cached = tradingCache.get(cacheKey);
  if (cached) return cached;

  const alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;
  
  if (!alphaVantageKey) {
    console.log('ALPHA_VANTAGE_API_KEY non configurée, utilisation des données simulées');
    const simulatedData = symbols.map(symbol => ({
      symbol,
      price: (Math.random() * 1000 + 50).toFixed(2),
      change: (Math.random() * 20 - 10).toFixed(2),
      changePercent: (Math.random() * 4 - 2).toFixed(2),
      volume: Math.floor(Math.random() * 10000000),
      marketCap: Math.floor(Math.random() * 1000000000000),
      type: 'stock'
    }));
    
    tradingCache.set(cacheKey, simulatedData, 'STOCKS');
    return simulatedData;
  }

  try {
    // Récupération en parallèle pour optimiser les performances
    const promises = symbols.map(async (symbol) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaVantageKey}`;
      const response = await fetch(url, { next: { revalidate: 300 } });
      const data = await response.json();
      
      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          symbol,
          price: parseFloat(quote['05. price']).toFixed(2),
          change: parseFloat(quote['09. change']).toFixed(2),
          changePercent: quote['10. change percent'].replace('%', ''),
          volume: parseInt(quote['06. volume']),
          marketCap: Math.floor(Math.random() * 1000000000000), // Simulé car pas dans l'API gratuite
          type: 'stock'
        };
      }
      return null;
    });

    const results = await Promise.all(promises);
    const validResults = results.filter(result => result !== null);
    
    tradingCache.set(cacheKey, validResults, 'STOCKS');
    return validResults;
  } catch (error) {
    console.error('Erreur lors de la récupération des données d\'actions:', error);
    return [];
  }
}

// Fonction optimisée pour récupérer les données crypto
async function getCryptoData(symbols: string[]) {
  const cacheKey = `crypto_${symbols.join(',')}`;
  const cached = tradingCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + 
      symbols.join(',') + '&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true', 
      { next: { revalidate: 30 } }
    );
    
    if (!response.ok) throw new Error('Erreur API CoinGecko');
    
    const data = await response.json();
    const results = symbols.map(symbol => {
      const coinData = data[symbol];
      if (coinData) {
        return {
          symbol,
          price: coinData.usd.toFixed(2),
          change: (coinData.usd_24h_change || 0).toFixed(2),
          changePercent: (coinData.usd_24h_change || 0).toFixed(2),
          volume: coinData.usd_24h_vol || 0,
          marketCap: coinData.usd_market_cap || 0,
          type: 'crypto'
        };
      }
      return null;
    }).filter(result => result !== null);

    tradingCache.set(cacheKey, results, 'CRYPTO');
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des données crypto:', error);
    return [];
  }
}

// Fonction optimisée pour récupérer les données forex
async function getForexData(symbols: string[]) {
  const cacheKey = `forex_${symbols.join(',')}`;
  const cached = tradingCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', 
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) throw new Error('Erreur API Exchange Rate');
    
    const data = await response.json();
    const results = symbols.map(symbol => {
      const [base, quote] = symbol.split('/');
      if (base === 'USD') {
        const rate = data.rates[quote];
        if (rate) {
          return {
            symbol,
            price: rate.toFixed(4),
            change: (Math.random() * 0.02 - 0.01).toFixed(4),
            changePercent: (Math.random() * 2 - 1).toFixed(2),
            volume: Math.floor(Math.random() * 1000000000),
            marketCap: 0,
            type: 'forex'
          };
        }
      } else if (quote === 'USD') {
        // Inverser le taux pour EUR/USD, GBP/USD, etc.
        const rate = data.rates[base];
        if (rate) {
          return {
            symbol,
            price: (1 / rate).toFixed(4),
            change: (Math.random() * 0.02 - 0.01).toFixed(4),
            changePercent: (Math.random() * 2 - 1).toFixed(2),
            volume: Math.floor(Math.random() * 1000000000),
            marketCap: 0,
            type: 'forex'
          };
        }
      }
      return null;
    }).filter(result => result !== null);

    tradingCache.set(cacheKey, results, 'FOREX');
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des données forex:', error);
    return [];
  }
}

// Fonction pour générer des données de portfolio optimisées
function generatePortfolioData(allData: any[]) {
  const cacheKey = 'portfolio_data';
  const cached = tradingCache.get(cacheKey);
  if (cached) return cached;

  const portfolio = {
    totalValue: 0,
    totalChange: 0,
    totalChangePercent: 0,
    positions: allData.map(item => {
      const quantity = Math.floor(Math.random() * 100) + 1;
      const value = parseFloat(item.price) * quantity;
      const change = parseFloat(item.change) * quantity;
      
      return {
        symbol: item.symbol,
        quantity,
        price: item.price,
        value: value.toFixed(2),
        change: change.toFixed(2),
        changePercent: item.changePercent,
        type: item.type
      };
    })
  };

  portfolio.totalValue = portfolio.positions.reduce((sum, pos) => sum + parseFloat(pos.value), 0);
  portfolio.totalChange = portfolio.positions.reduce((sum, pos) => sum + parseFloat(pos.change), 0);
  portfolio.totalChangePercent = ((portfolio.totalChange / portfolio.totalValue) * 100);

  const result = {
    ...portfolio,
    totalValue: portfolio.totalValue.toFixed(2),
    totalChange: portfolio.totalChange.toFixed(2),
    totalChangePercent: portfolio.totalChangePercent.toFixed(2)
  };

  tradingCache.set(cacheKey, result, 'PORTFOLIO');
  return result;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols') || 'AAPL,TSLA,bitcoin,ethereum,EUR/USD';
    const includePortfolio = searchParams.get('portfolio') === 'true';

    // Parse et regroupe les symboles
    const batchRequest = parseSymbols(symbols);
    
    // Récupération parallèle des données
    const [stockData, cryptoData, forexData] = await Promise.all([
      batchRequest.stocks.length > 0 ? getStockData(batchRequest.stocks) : [],
      batchRequest.cryptos.length > 0 ? getCryptoData(batchRequest.cryptos) : [],
      batchRequest.forex.length > 0 ? getForexData(batchRequest.forex) : []
    ]);

    // Combinaison des données
    const allData = [...stockData, ...cryptoData, ...forexData];

    // Génération du portfolio si demandé
    let portfolio = null;
    if (includePortfolio && allData.length > 0) {
      portfolio = generatePortfolioData(allData);
    }

    const response = {
      success: true,
      data: allData,
      portfolio,
      timestamp: new Date().toISOString(),
      cacheInfo: {
        stocks: batchRequest.stocks.length,
        cryptos: batchRequest.cryptos.length,
        forex: batchRequest.forex.length,
        total: allData.length
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Cache-Status': 'HIT'
      }
    });

  } catch (error) {
    console.error('Erreur dans l\'API trading:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la récupération des données',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Endpoint pour nettoyer le cache (utile pour les tests)
export async function DELETE() {
  tradingCache.clear();
  return NextResponse.json({ success: true, message: 'Cache nettoyé' });
} 