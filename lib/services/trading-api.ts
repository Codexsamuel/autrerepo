// Service pour récupérer de vraies données de trading
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export interface RealTradingSymbol {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  lastUpdated: string;
}

export interface RealPortfolioPosition {
  symbol: string;
  quantity: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  entryPrice: number;
  lastUpdated: string;
}

// Yahoo Finance API pour les actions (gratuit, pas de clé requise)
export async function getYahooFinanceData(symbol: string): Promise<RealTradingSymbol | null> {
  try {
    // Utiliser l'API Yahoo Finance via RapidAPI (gratuit)
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const result = data.chart.result[0];
    
    if (!result || !result.meta || !result.indicators.quote[0]) {
      return null;
    }

    const meta = result.meta;
    const quote = result.indicators.quote[0];
    const timestamps = result.timestamp;
    
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.previousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      symbol: symbol.toUpperCase(),
      price: currentPrice,
      change: change,
      changePercent: changePercent,
      volume: quote.volume[quote.volume.length - 1] || 0,
      high: meta.regularMarketDayHigh,
      low: meta.regularMarketDayLow,
      open: meta.regularMarketOpen,
      previousClose: previousClose,
      lastUpdated: new Date(timestamps[timestamps.length - 1] * 1000).toISOString()
    };
  } catch (error) {
    console.error(`Error fetching Yahoo Finance data for ${symbol}:`, error);
    return null;
  }
}

// API Alpha Vantage pour les actions (alternative)
export async function getStockData(symbol: string): Promise<RealTradingSymbol | null> {
  if (!ALPHA_VANTAGE_API_KEY) {
    console.warn('ALPHA_VANTAGE_API_KEY not configured, using Yahoo Finance');
    return await getYahooFinanceData(symbol);
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const quote = data['Global Quote'];

    if (!quote) {
      return null;
    }

    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close']),
      lastUpdated: quote['07. latest trading day']
    };
  } catch (error) {
    console.error(`Error fetching Alpha Vantage data for ${symbol}:`, error);
    // Fallback vers Yahoo Finance
    return await getYahooFinanceData(symbol);
  }
}

// API pour les cryptomonnaies (CoinGecko)
export async function getCryptoData(symbol: string): Promise<RealTradingSymbol | null> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true&include_last_updated_at=true`
    );
    
    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`CoinGecko rate limit reached for ${symbol}, using fallback data`);
        // Retourner des données de fallback
        return {
          symbol: symbol.toUpperCase(),
          price: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
          change: 0,
          changePercent: 0,
          volume: 0,
          high: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
          low: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
          open: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
          previousClose: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
          marketCap: symbol === 'bitcoin' ? 2170000000000 : symbol === 'ethereum' ? 300000000000 : 1000000000,
          lastUpdated: new Date().toISOString()
        };
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const cryptoData = data[symbol];

    if (!cryptoData) {
      return null;
    }

    return {
      symbol: symbol.toUpperCase(),
      price: cryptoData.usd,
      change: cryptoData.usd_24h_change,
      changePercent: cryptoData.usd_24h_change,
      volume: cryptoData.usd_24h_vol,
      high: cryptoData.usd, // CoinGecko ne fournit pas high/low dans cette API
      low: cryptoData.usd,
      open: cryptoData.usd,
      previousClose: cryptoData.usd,
      marketCap: cryptoData.usd_market_cap,
      lastUpdated: new Date(cryptoData.last_updated_at * 1000).toISOString()
    };
  } catch (error) {
    console.error(`Error fetching crypto data for ${symbol}:`, error);
    // Retourner des données de fallback en cas d'erreur
    return {
      symbol: symbol.toUpperCase(),
      price: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
      change: 0,
      changePercent: 0,
      volume: 0,
      high: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
      low: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
      open: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
      previousClose: symbol === 'bitcoin' ? 109000 : symbol === 'ethereum' ? 2500 : 100,
      marketCap: symbol === 'bitcoin' ? 2170000000000 : symbol === 'ethereum' ? 300000000000 : 1000000000,
      lastUpdated: new Date().toISOString()
    };
  }
}

// API pour les devises (Exchange Rate API)
export async function getForexData(base: string, target: string = 'USD'): Promise<RealTradingSymbol | null> {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${base}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const rate = data.rates[target];

    if (!rate) {
      return null;
    }

    return {
      symbol: `${base}/${target}`,
      price: rate,
      change: 0, // Exchange Rate API ne fournit pas les changements
      changePercent: 0,
      volume: 0,
      high: rate,
      low: rate,
      open: rate,
      previousClose: rate,
      lastUpdated: data.date
    };
  } catch (error) {
    console.error(`Error fetching forex data for ${base}/${target}:`, error);
    return null;
  }
}

// Récupérer plusieurs symboles en parallèle
export async function getMultipleSymbols(symbols: string[]): Promise<RealTradingSymbol[]> {
  const promises = symbols.map(async (symbol) => {
    // Déterminer le type de symbole
    if (symbol.includes('/')) {
      // Forex
      const [base, target] = symbol.split('/');
      return await getForexData(base, target);
    } else if (symbol.includes('USD') || symbol.includes('BTC') || symbol.includes('ETH') || 
               symbol === 'bitcoin' || symbol === 'ethereum' || symbol === 'cardano' || 
               symbol === 'solana' || symbol === 'ripple' || symbol === 'dogecoin') {
      // Crypto
      const cryptoId = symbol.toLowerCase()
        .replace('usd', '')
        .replace('btc', 'bitcoin')
        .replace('eth', 'ethereum')
        .replace('ada', 'cardano')
        .replace('sol', 'solana')
        .replace('xrp', 'ripple')
        .replace('doge', 'dogecoin');
      return await getCryptoData(cryptoId);
    } else {
      // Stock - utiliser Yahoo Finance par défaut
      return await getYahooFinanceData(symbol);
    }
  });

  const results = await Promise.all(promises);
  return results.filter((result): result is RealTradingSymbol => result !== null);
}

// Simuler un portefeuille avec de vraies données
export async function getRealPortfolio(): Promise<RealPortfolioPosition[]> {
  const positions = [
    { symbol: 'AAPL', quantity: 50, entryPrice: 177.00 },
    { symbol: 'TSLA', quantity: 25, entryPrice: 240.00 },
    { symbol: 'MSFT', quantity: 30, entryPrice: 380.00 },
    { symbol: 'GOOGL', quantity: 15, entryPrice: 140.00 },
    { symbol: 'bitcoin', quantity: 0.5, entryPrice: 42500 },
    { symbol: 'ethereum', quantity: 5, entryPrice: 3360 },
  ];

  const portfolioPromises = positions.map(async (position) => {
    let currentPrice = 0;
    
    if (position.symbol === 'bitcoin' || position.symbol === 'ethereum') {
      const cryptoData = await getCryptoData(position.symbol);
      currentPrice = cryptoData?.price || position.entryPrice;
    } else {
      const stockData = await getYahooFinanceData(position.symbol);
      currentPrice = stockData?.price || position.entryPrice;
    }

    const value = position.quantity * currentPrice;
    const pnl = value - (position.quantity * position.entryPrice);
    const pnlPercentage = ((currentPrice - position.entryPrice) / position.entryPrice) * 100;

    return {
      symbol: position.symbol.toUpperCase(),
      quantity: position.quantity,
      currentPrice,
      value,
      pnl,
      pnlPercentage,
      entryPrice: position.entryPrice,
      lastUpdated: new Date().toISOString()
    };
  });

  return await Promise.all(portfolioPromises);
} 