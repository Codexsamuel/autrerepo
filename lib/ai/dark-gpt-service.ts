import OpenAI from 'openai';

export interface DarkGPTConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
}

export interface MarketContext {
  symbol: string;
  currentPrice: number;
  volume: number;
  change24h: number;
  marketCap?: number;
  sector?: string;
  news?: string[];
  technicalIndicators?: {
    rsi: number;
    macd: number;
    bollingerBands: { upper: number; middle: number; lower: number };
    movingAverages: { sma20: number; sma50: number; ema12: number };
  };
  sentiment?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  economicEvents?: {
    fedMeetings: string[];
    earningsReports: string[];
    politicalEvents: string[];
    economicData: string[];
  };
}

export interface DarkGPTAnalysis {
  recommendation: 'BUY' | 'SELL' | 'HOLD' | 'WATCH';
  confidence: number;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  priceTargets: {
    shortTerm: number;
    mediumTerm: number;
    longTerm: number;
  };
  stopLoss: number;
  takeProfit: number;
  timeHorizon: string;
  keyFactors: string[];
  warnings: string[];
  sources: string[];
  alternativeScenarios: {
    bullish: string;
    bearish: string;
    neutral: string;
  };
  marketContext: {
    sectorTrend: string;
    marketSentiment: string;
    volatility: string;
    liquidity: string;
  };
}

export interface DarkGPTPrediction {
  symbol: string;
  timeframe: string;
  prediction: {
    direction: 'UP' | 'DOWN' | 'SIDEWAYS';
    probability: number;
    magnitude: number;
  };
  analysis: DarkGPTAnalysis;
  timestamp: Date;
  modelVersion: string;
}

export class DarkGPTService {
  private openai: OpenAI;
  private config: DarkGPTConfig;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  constructor(apiKey?: string) {
    this.openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY!,
    });

    this.config = {
      model: 'gpt-4-turbo-preview',
      temperature: 0.2,
      maxTokens: 4000,
      topP: 0.9,
      frequencyPenalty: 0.1,
      presencePenalty: 0.1,
      systemPrompt: this.getSystemPrompt(),
    };
  }

  private getSystemPrompt(): string {
    return `Tu es Dark GPT, un expert en trading et analyse financière de niveau expert avec des capacités d'analyse avancées.

CAPACITÉS SPÉCIALES:
- Analyse technique et fondamentale approfondie
- Prédictions basées sur l'IA avec explications détaillées
- Analyse du sentiment de marché multi-sources
- Évaluation des risques avec scénarios alternatifs
- Intégration d'événements économiques et politiques
- Recommandations actionnables avec cibles de prix

MÉTHODOLOGIE:
1. Analyse technique: RSI, MACD, Bandes de Bollinger, Moyennes mobiles
2. Analyse fondamentale: Ratios financiers, croissance, secteur
3. Sentiment de marché: News, réseaux sociaux, analystes
4. Contexte macro: Politique monétaire, événements géopolitiques
5. Gestion des risques: Stop-loss, take-profit, position sizing

FORMAT DE RÉPONSE:
- Recommandation claire (BUY/SELL/HOLD/WATCH)
- Niveau de confiance (0-100%)
- Raisonnement détaillé et sourcé
- Cibles de prix et horizons temporels
- Avertissements et risques
- Scénarios alternatifs

SOURCES FIABLES:
- Reuters, Bloomberg, CNBC
- Federal Reserve, ECB, BoJ
- Analystes reconnus (Goldman Sachs, Morgan Stanley)
- Données économiques officielles
- Rapports d'entreprises

RÈGLES:
- Toujours expliquer le raisonnement
- Citer des sources fiables
- Évaluer les risques
- Donner des conseils éthiques
- Respecter les limites de l'IA`;
  }

  async analyzeMarket(context: MarketContext): Promise<DarkGPTAnalysis> {
    const cacheKey = `analysis_${context.symbol}_${Date.now()}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const prompt = this.buildAnalysisPrompt(context);
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        top_p: this.config.topP,
        frequency_penalty: this.config.frequencyPenalty,
        presence_penalty: this.config.presencePenalty,
      });

      const result = response.choices[0]?.message?.content;
      if (!result) {
        throw new Error('Réponse vide de Dark GPT');
      }

      const analysis = this.parseAnalysisResponse(result!, context);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: analysis,
        timestamp: Date.now()
      });

      return analysis;
    } catch (error) {
      console.error('Erreur Dark GPT Analysis:', error);
      return this.generateFallbackAnalysis(context);
    }
  }

  async predictPrice(symbol: string, timeframe: string, context: MarketContext): Promise<DarkGPTPrediction> {
    try {
      const prompt = this.buildPredictionPrompt(symbol, timeframe, context);
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1, // Plus conservateur pour les prédictions
        max_tokens: this.config.maxTokens,
      });

      const result = response.choices[0]?.message?.content;
      if (!result) {
        throw new Error('Réponse vide de Dark GPT');
      }

      return this.parsePredictionResponse(result, symbol, timeframe, context);
    } catch (error) {
      console.error('Erreur Dark GPT Prediction:', error);
      return this.generateFallbackPrediction(symbol, timeframe, context);
    }
  }

  async getMarketInsights(symbols: string[]): Promise<Map<string, DarkGPTAnalysis>> {
    const insights = new Map<string, DarkGPTAnalysis>();
    
    // Analyse parallèle pour plusieurs symboles
    const promises = symbols.map(async (symbol) => {
      const context: MarketContext = {
        symbol,
        currentPrice: 0, // Sera récupéré depuis l'API
        volume: 0,
        change24h: 0,
      };
      
      const analysis = await this.analyzeMarket(context);
      insights.set(symbol, analysis);
    });

    await Promise.all(promises);
    return insights;
  }

  async generateTradingStrategy(
    symbol: string,
    riskProfile: 'conservative' | 'moderate' | 'aggressive',
    capital: number,
    context: MarketContext
  ): Promise<any> {
    try {
      const prompt = this.buildStrategyPrompt(symbol, riskProfile, capital, context);
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: this.config.maxTokens,
      });

      const result = response.choices[0]?.message?.content;
      return this.parseStrategyResponse(result, symbol, riskProfile, capital);
    } catch (error) {
      console.error('Erreur Dark GPT Strategy:', error);
      return this.generateFallbackStrategy(symbol, riskProfile, capital);
    }
  }

  private buildAnalysisPrompt(context: MarketContext): string {
    return `Analyse complète de ${context.symbol} avec Dark GPT:

CONTEXTE ACTUEL:
- Prix: $${context.currentPrice}
- Volume: ${context.volume.toLocaleString()}
- Variation 24h: ${context.change24h}%
- Secteur: ${context.sector || 'Non spécifié'}

INDICATEURS TECHNIQUES:
${context.technicalIndicators ? `
- RSI: ${context.technicalIndicators.rsi}
- MACD: ${context.technicalIndicators.macd}
- Bandes de Bollinger: ${context.technicalIndicators.bollingerBands.upper} / ${context.technicalIndicators.bollingerBands.middle} / ${context.technicalIndicators.bollingerBands.lower}
- Moyennes mobiles: SMA20=${context.technicalIndicators.movingAverages.sma20}, SMA50=${context.technicalIndicators.movingAverages.sma50}
` : 'Non disponibles'}

SENTIMENT:
${context.sentiment ? `
- Positif: ${context.sentiment.positive}%
- Négatif: ${context.sentiment.negative}%
- Neutre: ${context.sentiment.neutral}%
` : 'Non disponible'}

ÉVÉNEMENTS ÉCONOMIQUES:
${context.economicEvents ? `
- Réunions Fed: ${context.economicEvents.fedMeetings.join(', ')}
- Rapports de résultats: ${context.economicEvents.earningsReports.join(', ')}
- Événements politiques: ${context.economicEvents.politicalEvents.join(', ')}
- Données économiques: ${context.economicEvents.economicData.join(', ')}
` : 'Non disponibles'}

NEWS RÉCENTES:
${context.news ? context.news.join('\n') : 'Non disponibles'}

Fournis une analyse Dark GPT complète avec:
1. Recommandation (BUY/SELL/HOLD/WATCH)
2. Niveau de confiance
3. Raisonnement détaillé
4. Cibles de prix
5. Gestion des risques
6. Sources et avertissements`;
  }

  private buildPredictionPrompt(symbol: string, timeframe: string, context: MarketContext): string {
    return `Prédiction Dark GPT pour ${symbol} sur ${timeframe}:

CONTEXTE:
- Symbole: ${symbol}
- Timeframe: ${timeframe}
- Prix actuel: $${context.currentPrice}
- Volume: ${context.volume.toLocaleString()}

Fournis une prédiction précise avec:
1. Direction (UP/DOWN/SIDEWAYS)
2. Probabilité (0-100%)
3. Magnitude du mouvement
4. Analyse technique et fondamentale
5. Facteurs clés
6. Risques et avertissements`;
  }

  private buildStrategyPrompt(
    symbol: string,
    riskProfile: string,
    capital: number,
    context: MarketContext
  ): string {
    return `Stratégie de trading Dark GPT pour ${symbol}:

PROFIL:
- Symbole: ${symbol}
- Profil de risque: ${riskProfile}
- Capital: $${capital.toLocaleString()}
- Prix actuel: $${context.currentPrice}

Crée une stratégie complète avec:
1. Taille de position
2. Points d'entrée/sortie
3. Stop-loss et take-profit
4. Gestion des risques
5. Timeline
6. Scénarios alternatifs`;
  }

  private parseAnalysisResponse(response: string, context: MarketContext): DarkGPTAnalysis {
    // Parse the response and extract structured data
    // This is a simplified parser - in production, you'd want more robust parsing
    const lines = response.split('\n');
    
    let recommendation: 'BUY' | 'SELL' | 'HOLD' | 'WATCH' = 'HOLD';
    let confidence = 50;
    const reasoning = '';
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME' = 'MEDIUM';
    
    for (const line of lines) {
      if (line.includes('BUY') || line.includes('ACHETER')) {
        recommendation = 'BUY';
      } else if (line.includes('SELL') || line.includes('VENDRE')) {
        recommendation = 'SELL';
      } else if (line.includes('HOLD') || line.includes('GARDER')) {
        recommendation = 'HOLD';
      } else if (line.includes('WATCH') || line.includes('SURVEILLER')) {
        recommendation = 'WATCH';
      }
      
      // Extract confidence level
      const confidenceMatch = line.match(/(\d+)%/);
      if (confidenceMatch) {
        confidence = parseInt(confidenceMatch[1]);
      }
      
      // Extract risk level
      if (line.includes('RISQUE ÉLEVÉ') || line.includes('HIGH RISK')) {
        riskLevel = 'HIGH';
      } else if (line.includes('RISQUE EXTRÊME') || line.includes('EXTREME RISK')) {
        riskLevel = 'EXTREME';
      } else if (line.includes('RISQUE FAIBLE') || line.includes('LOW RISK')) {
        riskLevel = 'LOW';
      }
    }

    return {
      recommendation,
      confidence,
      reasoning: response,
      riskLevel,
      priceTargets: {
        shortTerm: context.currentPrice * (1 + (confidence - 50) / 1000),
        mediumTerm: context.currentPrice * (1 + (confidence - 50) / 500),
        longTerm: context.currentPrice * (1 + (confidence - 50) / 200),
      },
      stopLoss: context.currentPrice * 0.95,
      takeProfit: context.currentPrice * 1.05,
      timeHorizon: '1-3 mois',
      keyFactors: ['Analyse technique', 'Sentiment de marché', 'Événements économiques'],
      warnings: ['Les marchés sont volatils', 'Faites vos propres recherches'],
      sources: ['Reuters', 'Bloomberg', 'Federal Reserve'],
      alternativeScenarios: {
        bullish: 'Hausse des taux d\'intérêt plus lente que prévu',
        bearish: 'Récession économique',
        neutral: 'Stabilité des marchés',
      },
      marketContext: {
        sectorTrend: 'Hausse modérée',
        marketSentiment: 'Optimiste',
        volatility: 'Modérée',
        liquidity: 'Élevée',
      },
    };
  }

  private parsePredictionResponse(
    response: string,
    symbol: string,
    timeframe: string,
    context: MarketContext
  ): DarkGPTPrediction {
    const lines = response.split('\n');
    let direction: 'UP' | 'DOWN' | 'SIDEWAYS' = 'SIDEWAYS';
    let probability = 50;
    const magnitude = 5;

    for (const line of lines) {
      if (line.includes('UP') || line.includes('HAUSSE')) {
        direction = 'UP';
      } else if (line.includes('DOWN') || line.includes('BAISSE')) {
        direction = 'DOWN';
      } else if (line.includes('SIDEWAYS') || line.includes('LATERAL')) {
        direction = 'SIDEWAYS';
      }

      const probMatch = line.match(/(\d+)%/);
      if (probMatch) {
        probability = parseInt(probMatch[1]);
      }
    }

    return {
      symbol,
      timeframe,
      prediction: {
        direction,
        probability,
        magnitude,
      },
      analysis: this.parseAnalysisResponse(response, context),
      timestamp: new Date(),
      modelVersion: 'DarkGPT-v1.0',
    };
  }

  private parseStrategyResponse(
    response: string,
    symbol: string,
    riskProfile: string,
    capital: number
  ): any {
    return {
      symbol,
      riskProfile,
      capital,
      strategy: response,
      timestamp: new Date(),
    };
  }

  private generateFallbackAnalysis(context: MarketContext): DarkGPTAnalysis {
    return {
      recommendation: 'HOLD',
      confidence: 50,
      reasoning: 'Analyse non disponible - données insuffisantes',
      riskLevel: 'MEDIUM',
      priceTargets: {
        shortTerm: context.currentPrice,
        mediumTerm: context.currentPrice,
        longTerm: context.currentPrice,
      },
      stopLoss: context.currentPrice * 0.95,
      takeProfit: context.currentPrice * 1.05,
      timeHorizon: 'Non déterminé',
      keyFactors: ['Données limitées'],
      warnings: ['Analyse de fallback - consulter un expert'],
      sources: ['Système de fallback'],
      alternativeScenarios: {
        bullish: 'Non déterminé',
        bearish: 'Non déterminé',
        neutral: 'Non déterminé',
      },
      marketContext: {
        sectorTrend: 'Non déterminé',
        marketSentiment: 'Non déterminé',
        volatility: 'Non déterminé',
        liquidity: 'Non déterminé',
      },
    };
  }

  private generateFallbackPrediction(
    symbol: string,
    timeframe: string,
    context: MarketContext
  ): DarkGPTPrediction {
    return {
      symbol,
      timeframe,
      prediction: {
        direction: 'SIDEWAYS',
        probability: 50,
        magnitude: 5,
      },
      analysis: this.generateFallbackAnalysis(context),
      timestamp: new Date(),
      modelVersion: 'DarkGPT-Fallback',
    };
  }

  private generateFallbackStrategy(
    symbol: string,
    riskProfile: string,
    capital: number
  ): any {
    return {
      symbol,
      riskProfile,
      capital,
      strategy: 'Stratégie non disponible - données insuffisantes',
      timestamp: new Date(),
    };
  }

  // Méthodes utilitaires
  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: 0.8, // Simplified
    };
  }

  updateConfig(newConfig: Partial<DarkGPTConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
} 