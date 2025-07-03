// Service de données de marché en temps réel
// Intégration avec Yahoo Finance, Alpha Vantage, et autres APIs

export interface MarketDataPoint {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high24h: number;
  low24h: number;
  open: number;
  previousClose: number;
  timestamp: Date;
  type: 'stock' | 'crypto' | 'forex' | 'commodity' | 'index';
  exchange?: string;
  currency?: string;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    sma200: number;
  };
  support: number;
  resistance: number;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  symbols: string[];
}

class MarketDataService {
  private yahooFinanceBaseUrl = 'https://query1.finance.yahoo.com/v8/finance';
  private alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;
  private newsApiKey = process.env.NEWS_API_KEY;

  // Récupérer les données de base d'un actif
  async getMarketData(symbol: string): Promise<MarketDataPoint | null> {
    try {
      // Essayer Yahoo Finance d'abord
      const yahooData = await this.getYahooFinanceData(symbol);
      if (yahooData) return yahooData;

      // Fallback vers Alpha Vantage
      const alphaData = await this.getAlphaVantageData(symbol);
      if (alphaData) return alphaData;

      return null;
    } catch (error) {
      console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
      return null;
    }
  }

  // Récupérer les données de plusieurs actifs
  async getMultipleMarketData(symbols: string[]): Promise<MarketDataPoint[]> {
    const promises = symbols.map(symbol => this.getMarketData(symbol));
    const results = await Promise.allSettled(promises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<MarketDataPoint> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  }

  // Récupérer les données historiques
  async getHistoricalData(
    symbol: string, 
    period: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max' = '1y'
  ): Promise<{ date: Date; price: number; volume: number }[]> {
    try {
      const response = await fetch(
        `${this.yahooFinanceBaseUrl}/chart/${symbol}?interval=1d&range=${period}`
      );
      
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();
      const timestamps = data.chart.result[0].timestamp;
      const prices = data.chart.result[0].indicators.quote[0].close;
      const volumes = data.chart.result[0].indicators.quote[0].volume;

      return timestamps.map((timestamp: number, index: number) => ({
        date: new Date(timestamp * 1000),
        price: prices[index] || 0,
        volume: volumes[index] || 0
      })).filter((point: { date: Date; price: number; volume: number }) => point.price > 0);
    } catch (error) {
      console.error(`Erreur lors de la récupération des données historiques pour ${symbol}:`, error);
      return [];
    }
  }

  // Calculer les indicateurs techniques
  async getTechnicalIndicators(symbol: string): Promise<TechnicalIndicators | null> {
    try {
      const historicalData = await this.getHistoricalData(symbol, '1y');
      if (historicalData.length < 50) return null;

      const prices = historicalData.map(d => d.price).filter(p => p > 0);
      
      return {
        rsi: this.calculateRSI(prices),
        macd: this.calculateMACD(prices),
        bollingerBands: this.calculateBollingerBands(prices),
        movingAverages: this.calculateMovingAverages(prices),
        support: this.findSupport(prices),
        resistance: this.findResistance(prices)
      };
    } catch (error) {
      console.error(`Erreur lors du calcul des indicateurs pour ${symbol}:`, error);
      return null;
    }
  }

  // Récupérer les actualités financières
  async getFinancialNews(symbols?: string[]): Promise<NewsItem[]> {
    try {
      const query = symbols ? symbols.join(' OR ') : 'finance OR trading OR stocks';
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=fr&sortBy=publishedAt&apiKey=${this.newsApiKey}`
      );

      if (!response.ok) throw new Error('Erreur API News');

      const data = await response.json();
      
      return data.articles.map((article: { title: string; description: string; url: string; publishedAt: string; source: { name: string } }, index: number) => ({
        id: `news_${index}`,
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: new Date(article.publishedAt),
        source: article.source.name,
        sentiment: this.analyzeSentiment(article.title + ' ' + article.description),
        impact: this.assessImpact(article.title, symbols),
        symbols: this.extractSymbols(article.title + ' ' + article.description)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des actualités:', error);
      return [];
    }
  }

  // Rechercher des actifs
  async searchAssets(query: string): Promise<{ symbol: string; name: string; type: string }[]> {
    try {
      const response = await fetch(
        `${this.yahooFinanceBaseUrl}/lookup?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error('Erreur recherche');

      const data = await response.json();
      
      return data.quotes.map((quote: { symbol: string; shortname?: string; longname?: string; quoteType?: string }) => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname,
        type: this.determineAssetType(quote.symbol, quote.quoteType)
      }));
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      return [];
    }
  }

  // Méthodes privées pour Yahoo Finance
  private async getYahooFinanceData(symbol: string): Promise<MarketDataPoint | null> {
    try {
      const response = await fetch(
        `${this.yahooFinanceBaseUrl}/chart/${symbol}?interval=1d&range=1d`
      );

      if (!response.ok) return null;

      const data = await response.json();
      const result = data.chart.result[0];
      const quote = result.indicators.quote[0];
      const meta = result.meta;

      return {
        symbol: symbol,
        name: meta.symbol,
        price: meta.regularMarketPrice,
        change: meta.regularMarketPrice - meta.previousClose,
        changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
        volume: quote.volume[quote.volume.length - 1] || 0,
        marketCap: meta.marketCap,
        high24h: Math.max(...quote.high.filter((h: number) => h > 0)),
        low24h: Math.min(...quote.low.filter((l: number) => l > 0)),
        open: quote.open[quote.open.length - 1] || 0,
        previousClose: meta.previousClose,
        timestamp: new Date(meta.regularMarketTime * 1000),
        type: this.determineAssetType(symbol, meta.quoteType),
        exchange: meta.exchangeName,
        currency: meta.currency
      };
    } catch (error) {
      console.error('Erreur Yahoo Finance:', error);
      return null;
    }
  }

  // Méthodes privées pour Alpha Vantage
  private async getAlphaVantageData(symbol: string): Promise<MarketDataPoint | null> {
    if (!this.alphaVantageApiKey) return null;

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageApiKey}`
      );

      if (!response.ok) return null;

      const data = await response.json();
      const quote = data['Global Quote'];

      if (!quote) return null;

      return {
        symbol: quote['01. symbol'],
        name: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        high24h: parseFloat(quote['03. high']),
        low24h: parseFloat(quote['04. low']),
        open: parseFloat(quote['02. open']),
        previousClose: parseFloat(quote['08. previous close']),
        timestamp: new Date(),
        type: this.determineAssetType(symbol, 'EQUITY')
      };
    } catch (error) {
      console.error('Erreur Alpha Vantage:', error);
      return null;
    }
  }

  // Calculs techniques
  private calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;
    
    return 100 - (100 / (1 + rs));
  }

  private calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    const macd = ema12 - ema26;
    const signal = this.calculateEMA([...Array(prices.length - 26).fill(0), macd], 9);
    const histogram = macd - signal;

    return { macd, signal, histogram };
  }

  private calculateEMA(prices: number[], period: number): number {
    const multiplier = 2 / (period + 1);
    let ema = prices[0];

    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }

    return ema;
  }

  private calculateBollingerBands(prices: number[], period: number = 20): { upper: number; middle: number; lower: number } {
    const sma = prices.slice(-period).reduce((sum: number, price: number) => sum + price, 0) / period;
    const variance = prices.slice(-period).reduce((sum: number, price: number) => sum + Math.pow(price - sma, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    return {
      upper: sma + (2 * stdDev),
      middle: sma,
      lower: sma - (2 * stdDev)
    };
  }

  private calculateMovingAverages(prices: number[]): { sma20: number; sma50: number; sma200: number } {
    return {
      sma20: prices.slice(-20).reduce((sum: number, price: number) => sum + price, 0) / 20,
      sma50: prices.slice(-50).reduce((sum: number, price: number) => sum + price, 0) / 50,
      sma200: prices.slice(-200).reduce((sum: number, price: number) => sum + price, 0) / 200
    };
  }

  private findSupport(prices: number[]): number {
    const recentPrices = prices.slice(-20);
    return Math.min(...recentPrices);
  }

  private findResistance(prices: number[]): number {
    const recentPrices = prices.slice(-20);
    return Math.max(...recentPrices);
  }

  // Analyse de sentiment simple
  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['hausse', 'croissance', 'profit', 'gain', 'succès', 'positif', 'amélioration'];
    const negativeWords = ['baisse', 'perte', 'déclin', 'négatif', 'problème', 'risque', 'crise'];

    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // Évaluation de l'impact
  private assessImpact(title: string, symbols?: string[]): 'high' | 'medium' | 'low' {
    const importantWords = ['fed', 'banque centrale', 'crise', 'récession', 'inflation', 'taux'];
    const lowerTitle = title.toLowerCase();
    
    const hasImportantWord = importantWords.some(word => lowerTitle.includes(word));
    const hasSymbol = symbols?.some(symbol => lowerTitle.includes(symbol));
    
    if (hasImportantWord && hasSymbol) return 'high';
    if (hasImportantWord || hasSymbol) return 'medium';
    return 'low';
  }

  // Extraction des symboles d'actifs
  private extractSymbols(text: string): string[] {
    const symbolPattern = /\b[A-Z]{1,5}\b/g;
    return text.match(symbolPattern) || [];
  }

  // Détermination du type d'actif
  private determineAssetType(symbol: string, quoteType?: string): 'stock' | 'crypto' | 'forex' | 'commodity' | 'index' {
    if (quoteType === 'CRYPTOCURRENCY') return 'crypto';
    if (symbol.includes('/')) return 'forex';
    if (['GOLD', 'SILVER', 'OIL', 'GAS'].includes(symbol)) return 'commodity';
    if (['SPY', 'QQQ', 'IWM', 'DIA'].includes(symbol)) return 'index';
    return 'stock';
  }
}

// Instance singleton
export const marketDataService = new MarketDataService();

// Fonctions utilitaires pour l'export
export const getMarketData = (symbol: string) => marketDataService.getMarketData(symbol);
export const getMultipleMarketData = (symbols: string[]) => marketDataService.getMultipleMarketData(symbols);
export const getHistoricalData = (symbol: string, period?: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max') => marketDataService.getHistoricalData(symbol, period);
export const getTechnicalIndicators = (symbol: string) => marketDataService.getTechnicalIndicators(symbol);
export const getFinancialNews = (symbols?: string[]) => marketDataService.getFinancialNews(symbols);
export const searchAssets = (query: string) => marketDataService.searchAssets(query); 