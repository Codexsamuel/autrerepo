// Service d'IA pour les recommandations de trading
// Intégration avec OpenAI pour l'analyse et les conseils

import { MarketDataPoint, TechnicalIndicators, NewsItem } from './marketData';

export interface TradingRecommendation {
  id: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: 'short' | 'medium' | 'long';
  targetPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  strategy: string;
  marketConditions: string;
  newsImpact: string;
  technicalAnalysis: string;
  fundamentalAnalysis: string;
  timestamp: Date;
  aiInsights: string[];
  riskRewardRatio: number;
  expectedReturn: number;
  volatility: number;
}

export interface MarketAnalysis {
  overallTrend: 'bullish' | 'bearish' | 'neutral';
  volatility: 'low' | 'medium' | 'high';
  opportunities: number;
  risks: string[];
  sectors: {
    [key: string]: {
      performance: number;
      trend: 'up' | 'down' | 'stable';
      recommendation: string;
    };
  };
  globalFactors: string[];
  economicIndicators: {
    [key: string]: {
      value: number;
      trend: 'up' | 'down' | 'stable';
      impact: 'positive' | 'negative' | 'neutral';
    };
  };
  aiSummary: string;
  marketSentiment: 'optimistic' | 'pessimistic' | 'neutral';
  recommendedAllocation: {
    stocks: number;
    crypto: number;
    forex: number;
    commodities: number;
    cash: number;
  };
}

export interface PortfolioOptimization {
  recommendedAssets: {
    symbol: string;
    allocation: number;
    expectedReturn: number;
    risk: number;
    reasoning: string;
  }[];
  totalExpectedReturn: number;
  totalRisk: number;
  sharpeRatio: number;
  maxDrawdown: number;
  rebalancingFrequency: string;
  aiRecommendations: string[];
}

class AITradingService {
  private openaiApiKey = process.env.OPENAI_API_KEY;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  // Générer des recommandations de trading
  async generateTradingRecommendations(
    marketData: MarketDataPoint[],
    technicalIndicators: { [symbol: string]: TechnicalIndicators },
    news: NewsItem[],
    userPreferences?: {
      riskTolerance: 'low' | 'medium' | 'high';
      investmentAmount: number;
      timeframe: 'short' | 'medium' | 'long';
      preferredAssets: string[];
    }
  ): Promise<TradingRecommendation[]> {
    try {
      const prompt = this.buildTradingPrompt(marketData, technicalIndicators, news, userPreferences);
      const response = await this.callOpenAI(prompt);
      
      return this.parseTradingRecommendations(response);
    } catch (error) {
      console.error('Erreur lors de la génération des recommandations:', error);
      return this.generateFallbackRecommendations(marketData);
    }
  }

  // Analyser le marché global
  async analyzeMarket(
    marketData: MarketDataPoint[],
    news: NewsItem[],
    economicData?: any
  ): Promise<MarketAnalysis> {
    try {
      const prompt = this.buildMarketAnalysisPrompt(marketData, news, economicData);
      const response = await this.callOpenAI(prompt);
      
      return this.parseMarketAnalysis(response, marketData);
    } catch (error) {
      console.error('Erreur lors de l\'analyse de marché:', error);
      return this.generateFallbackMarketAnalysis(marketData);
    }
  }

  // Optimiser un portefeuille
  async optimizePortfolio(
    currentPortfolio: { [symbol: string]: number },
    marketData: MarketDataPoint[],
    userPreferences: {
      investmentAmount: number;
      riskTolerance: 'low' | 'medium' | 'high';
      goals: string[];
      timeframe: 'short' | 'medium' | 'long';
    }
  ): Promise<PortfolioOptimization> {
    try {
      const prompt = this.buildPortfolioOptimizationPrompt(
        currentPortfolio,
        marketData,
        userPreferences
      );
      const response = await this.callOpenAI(prompt);
      
      return this.parsePortfolioOptimization(response, marketData);
    } catch (error) {
      console.error('Erreur lors de l\'optimisation du portefeuille:', error);
      return this.generateFallbackPortfolioOptimization(currentPortfolio, marketData);
    }
  }

  // Analyser un actif spécifique
  async analyzeAsset(
    symbol: string,
    marketData: MarketDataPoint,
    technicalIndicators: TechnicalIndicators,
    news: NewsItem[]
  ): Promise<TradingRecommendation> {
    try {
      const prompt = this.buildAssetAnalysisPrompt(symbol, marketData, technicalIndicators, news);
      const response = await this.callOpenAI(prompt);
      
      return this.parseAssetAnalysis(response, symbol, marketData);
    } catch (error) {
      console.error(`Erreur lors de l'analyse de ${symbol}:`, error);
      return this.generateFallbackAssetAnalysis(symbol, marketData);
    }
  }

  // Générer des insights personnalisés
  async generatePersonalizedInsights(
    userHistory: {
      trades: any[];
      preferences: any;
      performance: any;
    },
    marketData: MarketDataPoint[]
  ): Promise<string[]> {
    try {
      const prompt = this.buildPersonalizedInsightsPrompt(userHistory, marketData);
      const response = await this.callOpenAI(prompt);
      
      return this.parsePersonalizedInsights(response);
    } catch (error) {
      console.error('Erreur lors de la génération d\'insights:', error);
      return ['Analyse en cours...'];
    }
  }

  // Méthodes privées pour la construction des prompts
  private buildTradingPrompt(
    marketData: MarketDataPoint[],
    technicalIndicators: { [symbol: string]: TechnicalIndicators },
    news: NewsItem[],
    userPreferences?: any
  ): string {
    return `
Tu es un expert en trading IA. Analyse les données de marché suivantes et génère des recommandations de trading intelligentes.

DONNÉES DE MARCHÉ:
${marketData.map(asset => `
- ${asset.symbol}: $${asset.price} (${asset.changePercent > 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%)
  Volume: ${asset.volume.toLocaleString()}
  Type: ${asset.type}
  Tendance: ${asset.trend}
`).join('')}

INDICATEURS TECHNIQUES:
${Object.entries(technicalIndicators).map(([symbol, indicators]) => `
- ${symbol}:
  RSI: ${indicators.rsi.toFixed(2)}
  MACD: ${indicators.macd.macd.toFixed(4)}
  Support: $${indicators.support.toFixed(2)}
  Résistance: $${indicators.resistance.toFixed(2)}
`).join('')}

ACTUALITÉS RÉCENTES:
${news.slice(0, 5).map(item => `
- ${item.title} (${item.sentiment}, impact: ${item.impact})
`).join('')}

PRÉFÉRENCES UTILISATEUR:
${userPreferences ? `
- Tolérance au risque: ${userPreferences.riskTolerance}
- Montant d'investissement: ${userPreferences.investmentAmount.toLocaleString()} FCFA
- Horizon temporel: ${userPreferences.timeframe}
- Actifs préférés: ${userPreferences.preferredAssets.join(', ')}
` : 'Non spécifiées'}

Génère 3-5 recommandations de trading au format JSON avec:
- action (buy/sell/hold)
- confidence (0-100)
- reasoning (explication détaillée)
- riskLevel (low/medium/high)
- timeframe (short/medium/long)
- targetPrice, stopLoss, takeProfit
- strategy (nom de la stratégie)
- aiInsights (liste d'insights IA)
- riskRewardRatio
- expectedReturn
- volatility
`;
  }

  private buildMarketAnalysisPrompt(
    marketData: MarketDataPoint[],
    news: NewsItem[],
    economicData?: any
  ): string {
    return `
Tu es un analyste de marché IA. Analyse les conditions de marché actuelles et fournis une analyse complète.

DONNÉES DE MARCHÉ:
${marketData.map(asset => `
- ${asset.symbol}: ${asset.changePercent > 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%
`).join('')}

ACTUALITÉS:
${news.slice(0, 10).map(item => `
- ${item.title} (${item.sentiment})
`).join('')}

Donne une analyse complète au format JSON avec:
- overallTrend (bullish/bearish/neutral)
- volatility (low/medium/high)
- opportunities (nombre)
- risks (liste des risques)
- sectors (performance par secteur)
- globalFactors (facteurs globaux)
- economicIndicators (indicateurs économiques)
- aiSummary (résumé IA)
- marketSentiment (optimistic/pessimistic/neutral)
- recommendedAllocation (allocation recommandée)
`;
  }

  private buildPortfolioOptimizationPrompt(
    currentPortfolio: { [symbol: string]: number },
    marketData: MarketDataPoint[],
    userPreferences: any
  ): string {
    return `
Tu es un gestionnaire de portefeuille IA. Optimise ce portefeuille selon les préférences utilisateur.

PORTEFEUILLE ACTUEL:
${Object.entries(currentPortfolio).map(([symbol, quantity]) => `
- ${symbol}: ${quantity} unités
`).join('')}

DONNÉES DE MARCHÉ:
${marketData.map(asset => `
- ${asset.symbol}: $${asset.price} (${asset.changePercent > 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%)
`).join('')}

PRÉFÉRENCES:
- Montant: ${userPreferences.investmentAmount.toLocaleString()} FCFA
- Risque: ${userPreferences.riskTolerance}
- Objectifs: ${userPreferences.goals.join(', ')}
- Horizon: ${userPreferences.timeframe}

Optimise le portefeuille au format JSON avec:
- recommendedAssets (liste d'actifs recommandés)
- totalExpectedReturn
- totalRisk
- sharpeRatio
- maxDrawdown
- rebalancingFrequency
- aiRecommendations (liste de recommandations)
`;
  }

  private buildAssetAnalysisPrompt(
    symbol: string,
    marketData: MarketDataPoint,
    technicalIndicators: TechnicalIndicators,
    news: NewsItem[]
  ): string {
    return `
Analyse complète de l'actif ${symbol}:

DONNÉES:
- Prix: $${marketData.price}
- Variation: ${marketData.changePercent > 0 ? '+' : ''}${marketData.changePercent.toFixed(2)}%
- Volume: ${marketData.volume.toLocaleString()}

TECHNIQUE:
- RSI: ${technicalIndicators.rsi.toFixed(2)}
- MACD: ${technicalIndicators.macd.macd.toFixed(4)}
- Support: $${technicalIndicators.support.toFixed(2)}
- Résistance: $${technicalIndicators.resistance.toFixed(2)}

ACTUALITÉS:
${news.filter(item => item.symbols.includes(symbol)).map(item => `
- ${item.title} (${item.sentiment})
`).join('')}

Donne une recommandation détaillée au format JSON.
`;
  }

  private buildPersonalizedInsightsPrompt(userHistory: any, marketData: MarketDataPoint[]): string {
    return `
Génère des insights personnalisés basés sur l'historique de trading:

HISTORIQUE:
${userHistory.trades.slice(-10).map((trade: any) => `
- ${trade.symbol}: ${trade.action} ${trade.quantity} @ $${trade.price}
`).join('')}

PERFORMANCE:
- Rendement total: ${userHistory.performance.totalReturn}%
- Trades gagnants: ${userHistory.performance.winningTrades}
- Trades perdants: ${userHistory.performance.losingTrades}

MARCHÉ ACTUEL:
${marketData.map(asset => `
- ${asset.symbol}: ${asset.changePercent > 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%
`).join('')}

Génère 5 insights personnalisés au format JSON.
`;
  }

  // Appel à l'API OpenAI
  private async callOpenAI(prompt: string): Promise<string> {
    if (!this.openaiApiKey) {
      throw new Error('Clé API OpenAI manquante');
    }

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en trading et analyse financière. Réponds toujours en français et fournis des analyses détaillées et précises.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Parsing des réponses
  private parseTradingRecommendations(response: string): TradingRecommendation[] {
    try {
      const recommendations = JSON.parse(response);
      return recommendations.map((rec: any) => ({
        ...rec,
        id: `rec_${Date.now()}_${Math.random()}`,
        timestamp: new Date()
      }));
    } catch (error) {
      console.error('Erreur parsing recommandations:', error);
      return [];
    }
  }

  private parseMarketAnalysis(response: string, marketData: MarketDataPoint[]): MarketAnalysis {
    try {
      const analysis = JSON.parse(response);
      return {
        ...analysis,
        aiSummary: analysis.aiSummary || 'Analyse IA en cours...'
      };
    } catch (error) {
      console.error('Erreur parsing analyse marché:', error);
      return this.generateFallbackMarketAnalysis(marketData);
    }
  }

  private parsePortfolioOptimization(response: string, marketData: MarketDataPoint[]): PortfolioOptimization {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Erreur parsing optimisation portefeuille:', error);
      return this.generateFallbackPortfolioOptimization({}, marketData);
    }
  }

  private parseAssetAnalysis(response: string, symbol: string, marketData: MarketDataPoint): TradingRecommendation {
    try {
      const analysis = JSON.parse(response);
      return {
        ...analysis,
        id: `asset_${symbol}_${Date.now()}`,
        symbol,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Erreur parsing analyse actif:', error);
      return this.generateFallbackAssetAnalysis(symbol, marketData);
    }
  }

  private parsePersonalizedInsights(response: string): string[] {
    try {
      const insights = JSON.parse(response);
      return Array.isArray(insights) ? insights : [insights];
    } catch (error) {
      console.error('Erreur parsing insights:', error);
      return ['Analyse en cours...'];
    }
  }

  // Méthodes de fallback
  private generateFallbackRecommendations(marketData: MarketDataPoint[]): TradingRecommendation[] {
    return marketData.slice(0, 3).map(asset => ({
      id: `fallback_${asset.symbol}`,
      symbol: asset.symbol,
      action: asset.changePercent > 0 ? 'buy' : 'hold',
      confidence: Math.abs(asset.changePercent) > 5 ? 75 : 50,
      reasoning: `Analyse basée sur la variation de ${asset.changePercent.toFixed(2)}%`,
      riskLevel: asset.volatility > 1.5 ? 'high' : 'medium',
      timeframe: 'medium',
      strategy: 'Trend Following',
      marketConditions: 'Analyse en cours',
      newsImpact: 'Impact neutre',
      technicalAnalysis: 'Indicateurs en cours de calcul',
      fundamentalAnalysis: 'Analyse fondamentale en cours',
      timestamp: new Date(),
      aiInsights: ['Analyse IA en cours de développement'],
      riskRewardRatio: 1.5,
      expectedReturn: Math.abs(asset.changePercent),
      volatility: asset.volatility
    }));
  }

  private generateFallbackMarketAnalysis(marketData: MarketDataPoint[]): MarketAnalysis {
    const avgChange = marketData.reduce((sum, asset) => sum + asset.changePercent, 0) / marketData.length;
    
    return {
      overallTrend: avgChange > 1 ? 'bullish' : avgChange < -1 ? 'bearish' : 'neutral',
      volatility: 'medium',
      opportunities: Math.max(1, Math.floor(marketData.length / 2)),
      risks: ['Analyse des risques en cours'],
      sectors: {},
      globalFactors: ['Facteurs globaux en cours d\'analyse'],
      economicIndicators: {},
      aiSummary: 'Analyse IA en cours de développement',
      marketSentiment: 'neutral',
      recommendedAllocation: {
        stocks: 40,
        crypto: 20,
        forex: 20,
        commodities: 10,
        cash: 10
      }
    };
  }

  private generateFallbackPortfolioOptimization(
    currentPortfolio: { [symbol: string]: number },
    marketData: MarketDataPoint[]
  ): PortfolioOptimization {
    return {
      recommendedAssets: marketData.slice(0, 5).map(asset => ({
        symbol: asset.symbol,
        allocation: 20,
        expectedReturn: Math.abs(asset.changePercent),
        risk: asset.volatility,
        reasoning: 'Recommandation basée sur les données de marché'
      })),
      totalExpectedReturn: 5,
      totalRisk: 0.15,
      sharpeRatio: 0.33,
      maxDrawdown: 0.1,
      rebalancingFrequency: 'Mensuel',
      aiRecommendations: ['Optimisation IA en cours de développement']
    };
  }

  private generateFallbackAssetAnalysis(symbol: string, marketData: MarketDataPoint): TradingRecommendation {
    const asset = marketData.find(a => a.symbol === symbol) || marketData[0];
    
    return {
      id: `fallback_${symbol}`,
      symbol,
      action: asset.changePercent > 0 ? 'buy' : 'hold',
      confidence: 60,
      reasoning: 'Analyse basée sur les données de marché disponibles',
      riskLevel: 'medium',
      timeframe: 'medium',
      strategy: 'Market Analysis',
      marketConditions: 'Conditions de marché stables',
      newsImpact: 'Impact neutre',
      technicalAnalysis: 'Analyse technique en cours',
      fundamentalAnalysis: 'Analyse fondamentale en cours',
      timestamp: new Date(),
      aiInsights: ['Analyse IA en cours de développement'],
      riskRewardRatio: 1.2,
      expectedReturn: Math.abs(asset.changePercent),
      volatility: asset.volatility
    };
  }
}

// Instance singleton
export const aiTradingService = new AITradingService();

// Fonctions utilitaires pour l'export
export const generateTradingRecommendations = (marketData: MarketDataPoint[], technicalIndicators: any, news: NewsItem[], userPreferences?: any) => 
  aiTradingService.generateTradingRecommendations(marketData, technicalIndicators, news, userPreferences);

export const analyzeMarket = (marketData: MarketDataPoint[], news: NewsItem[], economicData?: any) => 
  aiTradingService.analyzeMarket(marketData, news, economicData);

export const optimizePortfolio = (currentPortfolio: any, marketData: MarketDataPoint[], userPreferences: any) => 
  aiTradingService.optimizePortfolio(currentPortfolio, marketData, userPreferences);

export const analyzeAsset = (symbol: string, marketData: MarketDataPoint, technicalIndicators: TechnicalIndicators, news: NewsItem[]) => 
  aiTradingService.analyzeAsset(symbol, marketData, technicalIndicators, news);

export const generatePersonalizedInsights = (userHistory: any, marketData: MarketDataPoint[]) => 
  aiTradingService.generatePersonalizedInsights(userHistory, marketData); 