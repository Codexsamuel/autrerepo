import axios from 'axios';


export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap?: number;
  high24h: number;
  low24h: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  volatility: number;
  lastUpdated: Date;
}

export interface TradingOpportunity {
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  timeframe: string;
  riskLevel: 'low' | 'medium' | 'high';
  marketData: MarketData;
}

export class MarketDataService {
  private coinGeckoApi = 'https://api.coingecko.com/api/v3';
  private binanceApi = 'https://api.binance.com/api/v3';
  private alphaVantageApi = 'https://www.alphavantage.co/query';

  // Obtenir les données de marché depuis CoinGecko
  async getCryptoMarketData(symbols: string[]): Promise<MarketData[]> {
    try {
      const response = await axios.get(`${this.coinGeckoApi}/simple/price`, {
        params: {
          ids: symbols.join(','),
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_24hr_vol: true,
          include_market_cap: true,
          include_24hr_high: true,
          include_24hr_low: true,
        },
      });

      const marketData: MarketData[] = [];
      
      for (const [id, data] of Object.entries(response.data)) {
        const symbol = this.getSymbolFromId(id);
        if (symbol) {
          marketData.push({
            symbol,
            price: data.usd,
            change24h: data.usd_24h_change || 0,
            volume24h: data.usd_24h_vol || 0,
            marketCap: data.usd_market_cap,
            high24h: data.usd_24h_high || data.usd,
            low24h: data.usd_24h_low || data.usd,
            trend: this.calculateTrend(data.usd_24h_change),
            volatility: this.calculateVolatility(data.usd_24h_high, data.usd_24h_low, data.usd),
            lastUpdated: new Date(),
          });
        }
      }

      return marketData;
    } catch (error) {
      console.error('Erreur récupération données crypto:', error);
      return [];
    }
  }

  // Obtenir les données Forex depuis Alpha Vantage
  async getForexData(symbols: string[]): Promise<MarketData[]> {
    try {
      const marketData: MarketData[] = [];

      for (const symbol of symbols) {
        try {
          const response = await axios.get(this.alphaVantageApi, {
            params: {
              function: 'FX_DAILY',
              from_symbol: symbol.split('/')[0],
              to_symbol: symbol.split('/')[1],
              apikey: process.env.ALPHA_VANTAGE_API_KEY || 'demo',
            },
          });

          if (response.data['Time Series FX (Daily)']) {
            const timeSeries = response.data['Time Series FX (Daily)'];
            const dates = Object.keys(timeSeries).sort().reverse();
            const latest = timeSeries[dates[0]];
            const previous = timeSeries[dates[1]];

            const currentPrice = parseFloat(latest['4. close']);
            const previousPrice = parseFloat(previous['4. close']);
            const change24h = ((currentPrice - previousPrice) / previousPrice) * 100;

            marketData.push({
              symbol,
              price: currentPrice,
              change24h,
              volume24h: 0, // Alpha Vantage ne fournit pas le volume pour Forex
              high24h: parseFloat(latest['2. high']),
              low24h: parseFloat(latest['3. low']),
              trend: this.calculateTrend(change24h),
              volatility: this.calculateVolatility(
                parseFloat(latest['2. high']),
                parseFloat(latest['3. low']),
                currentPrice
              ),
              lastUpdated: new Date(),
            });
          }
        } catch (error) {
          console.error(`Erreur pour ${symbol}:`, error);
        }
      }

      return marketData;
    } catch (error) {
      console.error('Erreur récupération données Forex:', error);
      return [];
    }
  }

  // Obtenir les données de Binance
  async getBinanceData(symbols: string[]): Promise<MarketData[]> {
    try {
      const marketData: MarketData[] = [];

      for (const symbol of symbols) {
        try {
          const tickerResponse = await axios.get(`${this.binanceApi}/ticker/24hr`, {
            params: { symbol: symbol.replace('/', '') },
          });

          const ticker = tickerResponse.data;
          
          marketData.push({
            symbol,
            price: parseFloat(ticker.lastPrice),
            change24h: parseFloat(ticker.priceChangePercent),
            volume24h: parseFloat(ticker.volume),
            high24h: parseFloat(ticker.highPrice),
            low24h: parseFloat(ticker.lowPrice),
            trend: this.calculateTrend(parseFloat(ticker.priceChangePercent)),
            volatility: this.calculateVolatility(
              parseFloat(ticker.highPrice),
              parseFloat(ticker.lowPrice),
              parseFloat(ticker.lastPrice)
            ),
            lastUpdated: new Date(),
          });
        } catch (error) {
          console.error(`Erreur Binance pour ${symbol}:`, error);
        }
      }

      return marketData;
    } catch (error) {
      console.error('Erreur récupération données Binance:', error);
      return [];
    }
  }

  // Analyser les opportunités de trading
  async analyzeTradingOpportunities(marketData: MarketData[]): Promise<TradingOpportunity[]> {
    const opportunities: TradingOpportunity[] = [];

    for (const data of marketData) {
      const opportunity = this.generateTradingOpportunity(data);
      if (opportunity) {
        opportunities.push(opportunity);
      }
    }

    // Trier par niveau de confiance décroissant
    return opportunities.sort((a, b) => b.confidence - a.confidence);
  }

  // Générer une opportunité de trading basée sur les données
  private generateTradingOpportunity(data: MarketData): TradingOpportunity | null {
    const { symbol, price, change24h, trend, volatility } = data;

    // Critères pour identifier les opportunités
    const isHighVolume = data.volume24h > 1000000; // Volume minimum
    const isSignificantChange = Math.abs(change24h) > 2; // Changement > 2%
    const isReasonableVolatility = volatility > 0.01 && volatility < 0.5; // Volatilité raisonnable

    if (!isHighVolume || !isSignificantChange || !isReasonableVolatility) {
      return null;
    }

    let action: 'buy' | 'sell' | 'hold' = 'hold';
    let confidence = 0.5;
    let reasoning = '';
    let targetPrice = price;
    let stopLoss = price;

    // Logique de trading basée sur les indicateurs
    if (trend === 'bullish' && change24h > 5) {
      action = 'buy';
      confidence = Math.min(0.9, 0.5 + (change24h / 20));
      reasoning = `Tendance haussière forte (+${change24h.toFixed(2)}% en 24h) avec volume élevé`;
      targetPrice = price * (1 + (change24h / 100) * 0.5);
      stopLoss = price * 0.95;
    } else if (trend === 'bearish' && change24h < -5) {
      action = 'sell';
      confidence = Math.min(0.9, 0.5 + (Math.abs(change24h) / 20));
      reasoning = `Tendance baissière forte (${change24h.toFixed(2)}% en 24h) avec volume élevé`;
      targetPrice = price * (1 + (change24h / 100) * 0.3);
      stopLoss = price * 1.05;
    } else if (Math.abs(change24h) < 2 && volatility > 0.02) {
      action = 'hold';
      confidence = 0.7;
      reasoning = 'Marché stable avec volatilité modérée - attendre un signal plus clair';
    }

    // Ajuster la confiance selon la volatilité
    if (volatility > 0.1) {
      confidence *= 0.8; // Réduire la confiance si très volatile
    }

    return {
      symbol,
      action,
      confidence,
      reasoning,
      entryPrice: price,
      targetPrice,
      stopLoss,
      timeframe: '4h',
      riskLevel: this.calculateRiskLevel(volatility, confidence),
      marketData: data,
    };
  }

  // Obtenir les symboles populaires
  getPopularSymbols(): string[] {
    return [
      // Crypto populaires
      'bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana',
      'ripple', 'polkadot', 'dogecoin', 'avalanche-2', 'chainlink',
      
      // Forex populaires
      'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD',
      'USD/CAD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
      
      // Paires Binance populaires
      'BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'SOL/USDT',
      'DOT/USDT', 'LINK/USDT', 'LTC/USDT', 'BCH/USDT', 'XRP/USDT',
    ];
  }

  // Méthodes utilitaires privées
  private calculateTrend(change24h: number): 'bullish' | 'bearish' | 'neutral' {
    if (change24h > 2) return 'bullish';
    if (change24h < -2) return 'bearish';
    return 'neutral';
  }

  private calculateVolatility(high: number, low: number, current: number): number {
    return (high - low) / current;
  }

  private calculateRiskLevel(volatility: number, confidence: number): 'low' | 'medium' | 'high' {
    if (volatility < 0.02 && confidence > 0.7) return 'low';
    if (volatility > 0.1 || confidence < 0.5) return 'high';
    return 'medium';
  }

  private getSymbolFromId(id: string): string | null {
    const symbolMap: { [key: string]: string } = {
      'bitcoin': 'BTC/USD',
      'ethereum': 'ETH/USD',
      'binancecoin': 'BNB/USD',
      'cardano': 'ADA/USD',
      'solana': 'SOL/USD',
      'ripple': 'XRP/USD',
      'polkadot': 'DOT/USD',
      'dogecoin': 'DOGE/USD',
      'avalanche-2': 'AVAX/USD',
      'chainlink': 'LINK/USD',
    };
    return symbolMap[id] || null;
  }

  // Obtenir des données de marché combinées
  async getCombinedMarketData(): Promise<MarketData[]> {
    const popularSymbols = this.getPopularSymbols();
    const cryptoIds = popularSymbols.slice(0, 10); // Premiers 10 sont des cryptos
    const forexSymbols = popularSymbols.slice(10, 20); // Suivants sont du Forex
    const binanceSymbols = popularSymbols.slice(0, 10).map(id => this.getSymbolFromId(id)).filter(Boolean) as string[];

    const [cryptoData, forexData, binanceData] = await Promise.allSettled([
      this.getCryptoMarketData(cryptoIds),
      this.getForexData(forexSymbols),
      this.getBinanceData(binanceSymbols),
    ]);

    const allData: MarketData[] = [];
    
    if (cryptoData.status === 'fulfilled') allData.push(...cryptoData.value);
    if (forexData.status === 'fulfilled') allData.push(...forexData.value);
    if (binanceData.status === 'fulfilled') allData.push(...binanceData.value);

    return allData;
  }
}

// Instance singleton
export const marketDataService = new MarketDataService(); 