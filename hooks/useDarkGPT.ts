import { useCallback, useState } from 'react';

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

export interface DarkGPTStrategy {
  symbol: string;
  riskProfile: string;
  capital: number;
  strategy: string;
  timestamp: Date;
}

export interface DarkGPTCacheStats {
  size: number;
  hitRate: number;
}

export interface UseDarkGPTOptions {
  autoCache?: boolean;
  cacheTTL?: number;
  retryAttempts?: number;
  timeout?: number;
}

export function useDarkGPT(options: UseDarkGPTOptions = {}) {
  const {
    autoCache = true,
    cacheTTL = 5 * 60 * 1000, // 5 minutes
    retryAttempts = 3,
    timeout = 30000, // 30 seconds
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cacheStats, setCacheStats] = useState<DarkGPTCacheStats>({ size: 0, hitRate: 0 });
  const [lastAnalysis, setLastAnalysis] = useState<DarkGPTAnalysis | null>(null);
  const [lastPrediction, setLastPrediction] = useState<DarkGPTPrediction | null>(null);
  const [lastStrategy, setLastStrategy] = useState<DarkGPTStrategy | null>(null);

  const makeRequest = useCallback(async (
    endpoint: string,
    data: any,
    retryCount = 0
  ): Promise<any> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`/api/trading/dark-gpt${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'analyse Dark GPT');
      }

      return result;
    } catch (err) {
      if (retryCount < retryAttempts && err instanceof Error && err.name === 'AbortError') {
        console.warn(`Tentative ${retryCount + 1} échouée, nouvelle tentative...`);
        return makeRequest(endpoint, data, retryCount + 1);
      }
      throw err;
    }
  }, [retryAttempts, timeout]);

  const analyzeMarket = useCallback(async (
    symbol: string,
    customContext?: any
  ): Promise<DarkGPTAnalysis> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeRequest('', {
        symbol,
        action: 'analyze',
        customContext,
      });

      const analysis = result.data;
      setLastAnalysis(analysis);
      setCacheStats(result.metadata.cacheStats);

      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw new Error(`Erreur analyse Dark GPT: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

  const predictPrice = useCallback(async (
    symbol: string,
    timeframe: string = '1D',
    customContext?: any
  ): Promise<DarkGPTPrediction> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeRequest('', {
        symbol,
        action: 'predict',
        timeframe,
        customContext,
      });

      const prediction = result.data;
      setLastPrediction(prediction);
      setCacheStats(result.metadata.cacheStats);

      return prediction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw new Error(`Erreur prédiction Dark GPT: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

  const generateStrategy = useCallback(async (
    symbol: string,
    riskProfile: 'conservative' | 'moderate' | 'aggressive' = 'moderate',
    capital: number = 10000,
    customContext?: any
  ): Promise<DarkGPTStrategy> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeRequest('', {
        symbol,
        action: 'strategy',
        riskProfile,
        capital,
        customContext,
      });

      const strategy = result.data;
      setLastStrategy(strategy);
      setCacheStats(result.metadata.cacheStats);

      return strategy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw new Error(`Erreur stratégie Dark GPT: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

  const getMarketInsights = useCallback(async (
    symbols: string[]
  ): Promise<Map<string, DarkGPTAnalysis>> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeRequest('', {
        symbol: symbols,
        action: 'batch',
      });

      const insights = new Map(Object.entries(result.data)) as Map<string, DarkGPTAnalysis>;
      setCacheStats(result.metadata.cacheStats);

      return insights;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw new Error(`Erreur insights Dark GPT: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

  const clearCache = useCallback(async (): Promise<void> => {
    try {
      await fetch('/api/trading/dark-gpt', { method: 'DELETE' });
      setCacheStats({ size: 0, hitRate: 0 });
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      throw new Error(`Erreur vidage cache: ${errorMessage}`);
    }
  }, []);

  const getRecommendationColor = useCallback((recommendation: string): string => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-white';
      case 'WATCH': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }, []);

  const getRiskColor = useCallback((riskLevel: string): string => {
    switch (riskLevel) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'EXTREME': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const formatAnalysisResponse = useCallback((analysis: DarkGPTAnalysis, symbol: string): string => {
    return `🔍 **Analyse Dark GPT pour ${symbol}**

📊 **Recommandation**: ${analysis.recommendation}
🎯 **Confiance**: ${analysis.confidence}%
⚠️ **Niveau de risque**: ${analysis.riskLevel}

💰 **Cibles de prix**:
- Court terme: $${analysis.priceTargets.shortTerm.toFixed(2)}
- Moyen terme: $${analysis.priceTargets.mediumTerm.toFixed(2)}
- Long terme: $${analysis.priceTargets.longTerm.toFixed(2)}

🛡️ **Gestion des risques**:
- Stop-loss: $${analysis.stopLoss.toFixed(2)}
- Take-profit: $${analysis.takeProfit.toFixed(2)}

📈 **Facteurs clés**: ${analysis.keyFactors.join(', ')}

⚠️ **Avertissements**: ${analysis.warnings.join(', ')}

📰 **Sources**: ${analysis.sources.join(', ')}

${analysis.reasoning}`;
  }, []);

  const formatPredictionResponse = useCallback((prediction: DarkGPTPrediction): string => {
    return `🔮 **Prédiction Dark GPT pour ${prediction.symbol}**

📈 **Direction**: ${prediction.prediction.direction}
🎯 **Probabilité**: ${prediction.prediction.probability}%
📊 **Magnitude**: ${prediction.prediction.magnitude}%

${prediction.analysis.reasoning}`;
  }, []);

  const formatStrategyResponse = useCallback((strategy: DarkGPTStrategy): string => {
    return `⚡ **Stratégie Dark GPT pour ${strategy.symbol}**

${strategy.strategy}

💰 **Capital**: $${strategy.capital.toLocaleString()}
🎯 **Profil de risque**: ${strategy.riskProfile}`;
  }, []);

  return {
    // État
    isLoading,
    error,
    cacheStats,
    lastAnalysis,
    lastPrediction,
    lastStrategy,

    // Actions principales
    analyzeMarket,
    predictPrice,
    generateStrategy,
    getMarketInsights,
    clearCache,

    // Utilitaires
    getRecommendationColor,
    getRiskColor,
    formatAnalysisResponse,
    formatPredictionResponse,
    formatStrategyResponse,

    // Options
    options: {
      autoCache,
      cacheTTL,
      retryAttempts,
      timeout,
    },
  };
} 