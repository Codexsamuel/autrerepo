import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIPrediction {
  id: string;
  symbol: string;
  direction: 'up' | 'down';
  confidence: number;
  reasoning: string;
  timeframe: string;
  expiresAt: Date;
  source: 'openai' | 'gemini' | 'huggingface';
}

export interface MarketAnalysis {
  symbol: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  keyFactors: string[];
  recommendation: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface TradingSignal {
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  strength: number;
  stopLoss?: number;
  takeProfit?: number;
  reasoning: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AIConfig {
  model: string;
  temperature: number;
  max_tokens: number;
}

export class AIService {
  private openai: OpenAI;
  private gemini: GoogleGenerativeAI;
  private openaiApiKey: string;
  private geminiApiKey: string;
  private huggingfaceApiKey: string;
  private defaultConfig: AIConfig = {
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 1000
  };

  constructor(apiKey?: string) {
    this.openaiApiKey = process.env.OPENAI_API_KEY!;
    this.geminiApiKey = process.env.GEMINI_API_KEY!;
    this.huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY!;

    this.openai = new OpenAI({
      apiKey: apiKey || this.openaiApiKey,
    });

    this.gemini = new GoogleGenerativeAI(this.geminiApiKey);
  }

  // Générer une prédiction avec OpenAI
  async generateOpenAIPrediction(symbol: string, marketData?: any): Promise<AIPrediction | null> {
    try {
      const prompt = this.buildPredictionPrompt(symbol, marketData);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en trading et analyse de marché. Tu dois fournir des prédictions précises basées sur l\'analyse technique et fondamentale.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const result = response.choices[0]?.message?.content;
      if (!result) return null;

      return this.parsePredictionResponse(result, symbol, 'openai');
    } catch (error) {
      console.error('Erreur OpenAI:', error);
      return null;
    }
  }

  // Générer une prédiction avec Gemini
  async generateGeminiPrediction(symbol: string, marketData?: any): Promise<AIPrediction | null> {
    try {
      const prompt = this.buildPredictionPrompt(symbol, marketData);
      const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) return null;

      return this.parsePredictionResponse(text, symbol, 'gemini');
    } catch (error) {
      console.error('Erreur Gemini:', error);
      return null;
    }
  }

  // Analyser le sentiment du marché
  async analyzeMarketSentiment(symbol: string, newsData?: any[]): Promise<MarketAnalysis | null> {
    try {
      const prompt = `
        Analyse le sentiment du marché pour ${symbol}.
        
        ${newsData ? `Actualités récentes:
        ${newsData.map(news => `- ${news.title}: ${news.sentiment}`).join('\n')}` : ''}
        
        Fournis une analyse structurée avec:
        - Sentiment (bullish/bearish/neutral)
        - Niveau de confiance (0-1)
        - Facteurs clés
        - Recommandation
        - Niveau de risque
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un analyste de sentiment de marché expert.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 400,
      });

      const result = response.choices[0]?.message?.content;
      if (!result) return null;

      return this.parseSentimentResponse(result, symbol);
    } catch (error) {
      console.error('Erreur analyse sentiment:', error);
      return null;
    }
  }

  // Générer un signal de trading
  async generateTradingSignal(symbol: string, marketData?: any): Promise<TradingSignal | null> {
    try {
      const prompt = `
        Génère un signal de trading pour ${symbol}.
        
        ${marketData ? `Données de marché:
        - Prix actuel: ${marketData.price}
        - Volume: ${marketData.volume}
        - Tendance: ${marketData.trend}` : ''}
        
        Fournis:
        - Action (buy/sell/hold)
        - Force du signal (0-1)
        - Stop loss recommandé
        - Take profit recommandé
        - Raisonnement
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un trader expert qui génère des signaux de trading précis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 300,
      });

      const result = response.choices[0]?.message?.content;
      if (!result) return null;

      return this.parseTradingSignalResponse(result, symbol);
    } catch (error) {
      console.error('Erreur signal trading:', error);
      return null;
    }
  }

  // Analyser les patterns techniques
  async analyzeTechnicalPatterns(symbol: string, priceData: any[]): Promise<any> {
    try {
      const prompt = `
        Analyse les patterns techniques pour ${symbol}.
        
        Données de prix (derniers 20 points):
        ${priceData.map((data, i) => `${i + 1}. Prix: ${data.price}, Volume: ${data.volume}`).join('\n')}
        
        Identifie:
        - Patterns de support/résistance
        - Indicateurs techniques (RSI, MACD, etc.)
        - Niveaux de pivot
        - Zones de consolidation
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en analyse technique.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 400,
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error('Erreur analyse technique:', error);
      return null;
    }
  }

  // Prédiction combinée (ensemble de modèles)
  async generateEnsemblePrediction(symbol: string, marketData?: any): Promise<AIPrediction | null> {
    try {
      const predictions = await Promise.allSettled([
        this.generateOpenAIPrediction(symbol, marketData),
        this.generateGeminiPrediction(symbol, marketData),
      ]);

      const validPredictions = predictions
        .filter((result): result is PromiseFulfilledResult<AIPrediction> => 
          result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value);

      if (validPredictions.length === 0) return null;

      // Combiner les prédictions (moyenne pondérée)
      const avgConfidence = validPredictions.reduce((sum: number, pred: any) => sum + pred.confidence, 0) / validPredictions.length;
      const upVotes = validPredictions.filter(pred => pred.direction === 'up').length;
      const downVotes = validPredictions.filter(pred => pred.direction === 'down').length;
      
      const direction = upVotes > downVotes ? 'up' : 'down';
      const confidence = avgConfidence * (Math.max(upVotes, downVotes) / validPredictions.length);

      return {
        id: `ensemble_${Date.now()}`,
        symbol,
        direction,
        confidence,
        reasoning: `Prédiction basée sur ${validPredictions.length} modèles IA`,
        timeframe: '5m',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        source: 'openai', // Source principale
      };
    } catch (error) {
      console.error('Erreur prédiction ensemble:', error);
      return null;
    }
  }

  // Méthodes privées utilitaires

  private buildPredictionPrompt(symbol: string, marketData?: any): string {
    return `
      Génère une prédiction de trading pour ${symbol}.
      
      ${marketData ? `Données de marché disponibles:
      - Prix actuel: ${marketData.price}
      - Volume: ${marketData.volume}
      - Tendance: ${marketData.trend}
      - Volatilité: ${marketData.volatility}` : ''}
      
      Fournis une réponse structurée avec:
      - Direction (UP/DOWN)
      - Niveau de confiance (0.0-1.0)
      - Raisonnement détaillé
      - Timeframe recommandé
      
      Format de réponse:
      DIRECTION: [UP/DOWN]
      CONFIDENCE: [0.0-1.0]
      REASONING: [explication détaillée]
      TIMEFRAME: [5m/15m/1h/4h/1d]
    `;
  }

  private parsePredictionResponse(response: string, symbol: string, source: 'openai' | 'gemini' | 'huggingface'): AIPrediction {
    const lines = response.split('\n').map(line => line.trim());
    
    let direction: 'up' | 'down' = 'up';
    let confidence = 0.5;
    let reasoning = 'Analyse IA';
    let timeframe = '5m';

    for (const line of lines) {
      if (line.startsWith('DIRECTION:')) {
        const dir = line.split(':')[1]?.trim().toLowerCase();
        direction = dir === 'down' ? 'down' : 'up';
      } else if (line.startsWith('CONFIDENCE:')) {
        const conf = parseFloat(line.split(':')[1]?.trim() || '0.5');
        confidence = Math.max(0, Math.min(1, conf));
      } else if (line.startsWith('REASONING:')) {
        reasoning = line.split(':')[1]?.trim() || 'Analyse IA';
      } else if (line.startsWith('TIMEFRAME:')) {
        timeframe = line.split(':')[1]?.trim() || '5m';
      }
    }

    return {
      id: `${source}_${Date.now()}`,
      symbol,
      direction,
      confidence,
      reasoning,
      timeframe,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      source,
    };
  }

  private parseSentimentResponse(response: string, symbol: string): MarketAnalysis {
    const lines = response.split('\n').map(line => line.trim());
    
    let sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    let confidence = 0.5;
    const keyFactors: string[] = [];
    const recommendation = 'Attendre';
    const riskLevel: 'low' | 'medium' | 'high' = 'medium';

    for (const line of lines) {
      if (line.toLowerCase().includes('bullish')) sentiment = 'bullish';
      else if (line.toLowerCase().includes('bearish')) sentiment = 'bearish';
      else if (line.toLowerCase().includes('neutral')) sentiment = 'neutral';
      
      if (line.toLowerCase().includes('confiance') || line.toLowerCase().includes('confidence')) {
        const match = line.match(/(\d+(?:\.\d+)?)/);
        if (match) confidence = Math.max(0, Math.min(1, parseFloat(match[1]) / 100));
      }
    }

    return {
      symbol,
      sentiment,
      confidence,
      keyFactors,
      recommendation,
      riskLevel,
    };
  }

  private parseTradingSignalResponse(response: string, symbol: string): TradingSignal {
    const lines = response.split('\n').map(line => line.trim());
    
    let action: 'buy' | 'sell' | 'hold' = 'hold';
    const strength = 0.5;
    let stopLoss: number | undefined;
    let takeProfit: number | undefined;
    const reasoning = 'Analyse technique';

    for (const line of lines) {
      if (line.toLowerCase().includes('buy')) action = 'buy';
      else if (line.toLowerCase().includes('sell')) action = 'sell';
      else if (line.toLowerCase().includes('hold')) action = 'hold';
    }

    return {
      symbol,
      action,
      strength,
      stopLoss,
      takeProfit,
      reasoning,
    };
  }

  // Vérifier la santé des services IA
  async checkAIServicesHealth(): Promise<{ openai: boolean; gemini: boolean; huggingface: boolean }> {
    const health = {
      openai: false,
      gemini: false,
      huggingface: false,
    };

    try {
      // Test OpenAI
      await this.openai.models.list();
      health.openai = true;
    } catch (error) {
      console.error('OpenAI non disponible:', error);
    }

    try {
      // Test Gemini
      const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
      await model.generateContent('Test');
      health.gemini = true;
    } catch (error) {
      console.error('Gemini non disponible:', error);
    }

    // HuggingFace nécessite une implémentation spécifique
    health.huggingface = !!this.huggingfaceApiKey;

    return health;
  }

  async generateResponse(
    prompt: string,
    config: Partial<AIConfig> = {}
  ): Promise<AIResponse> {
    try {
      const finalConfig = { ...this.defaultConfig, ...config };
      
      const completion = await this.openai.chat.completions.create({
        model: finalConfig.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: finalConfig.temperature,
        max_tokens: finalConfig.max_tokens,
      });

      const response = completion.choices[0]?.message?.content || '';
      
      return {
        content: response,
        usage: completion.usage ? {
          prompt_tokens: completion.usage.prompt_tokens,
          completion_tokens: completion.usage.completion_tokens,
          total_tokens: completion.usage.total_tokens,
        } : undefined
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateTradingAnalysis(
    marketData: any,
    strategy: string
  ): Promise<AIResponse> {
    const prompt = `
      Analysez les données de marché suivantes et fournissez des recommandations de trading:
      
      Données de marché: ${JSON.stringify(marketData)}
      Stratégie: ${strategy}
      
      Veuillez fournir:
      1. Analyse technique
      2. Recommandations d'action
      3. Niveaux de risque
      4. Points d'entrée/sortie suggérés
    `;

    return this.generateResponse(prompt, {
      model: 'gpt-4',
      temperature: 0.3,
      max_tokens: 1500
    });
  }

  async generateContent(
    contentType: 'blog' | 'social' | 'email' | 'ad',
    topic: string,
    tone: string = 'professional'
  ): Promise<AIResponse> {
    const prompt = `
      Générez du contenu ${contentType} sur le sujet: "${topic}"
      Ton: ${tone}
      
      Format requis:
      - Titre accrocheur
      - Contenu principal
      - Call-to-action approprié
    `;

    return this.generateResponse(prompt, {
      model: 'gpt-4',
      temperature: 0.8,
      max_tokens: 2000
    });
  }

  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    keywords: string[];
  }> {
    const prompt = `
      Analysez le sentiment du texte suivant et fournissez:
      1. Sentiment (positive/negative/neutral)
      2. Niveau de confiance (0-1)
      3. Mots-clés importants
      
      Texte: "${text}"
      
      Répondez au format JSON.
    `;

    const response = await this.generateResponse(prompt, {
      model: 'gpt-4',
      temperature: 0.1,
      max_tokens: 500
    });

    try {
      return JSON.parse(response.content);
    } catch {
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        keywords: []
      };
    }
  }
}

// Instance singleton
export const aiService = new AIService(); 