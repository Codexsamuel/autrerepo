import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'dark-gpt' | 'custom';
  capabilities: string[];
  isDarkMode: boolean;
  maxTokens: number;
  temperature: number;
}

export interface DarkModeConfig {
  enabled: boolean;
  level: 'basic' | 'advanced' | 'extreme';
  capabilities: {
    codeGeneration: boolean;
    systemAccess: boolean;
    networkScanning: boolean;
    dataExtraction: boolean;
    automation: boolean;
    analysis: boolean;
  };
  restrictions: string[];
}

export interface MultiAIResponse {
  content: string;
  model: string;
  provider: string;
  isDarkMode: boolean;
  confidence: number;
  metadata: {
    tokens: number;
    latency: number;
    cost: number;
  };
  actions?: {
    type: string;
    description: string;
    executed: boolean;
  }[];
}

export class MultiAIService {
  private openai: OpenAI | null;
  private gemini: GoogleGenerativeAI | null;
  private models: Map<string, AIModel> = new Map();
  private darkModeConfig!: DarkModeConfig;
  private isDarkModeActive: boolean = false;

  constructor() {
    // Vérifier si les clés API sont disponibles
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (openaiKey) {
      this.openai = new OpenAI({
        apiKey: openaiKey,
      });
    } else {
      console.log('🔧 Mode simulation OpenAI activé (OPENAI_API_KEY non configurée)');
      this.openai = null;
    }

    if (geminiKey) {
      this.gemini = new GoogleGenerativeAI(geminiKey);
    } else {
      console.log('🔧 Mode simulation Gemini activé (GEMINI_API_KEY non configurée)');
      this.gemini = null;
    }

    this.initializeModels();
    this.initializeDarkMode();
  }

  private initializeModels() {
    // Modèles OpenAI
    this.models.set('gpt-4', {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      capabilities: ['conversation', 'analysis', 'code', 'creative'],
      isDarkMode: false,
      maxTokens: 4000,
      temperature: 0.7
    });

    this.models.set('gpt-4-turbo', {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'openai',
      capabilities: ['conversation', 'analysis', 'code', 'creative', 'fast'],
      isDarkMode: false,
      maxTokens: 8000,
      temperature: 0.7
    });

    // Modèles Gemini
    this.models.set('gemini-pro', {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'google',
      capabilities: ['conversation', 'analysis', 'multimodal'],
      isDarkMode: false,
      maxTokens: 30000,
      temperature: 0.7
    });

    this.models.set('gemini-pro-vision', {
      id: 'gemini-pro-vision',
      name: 'Gemini Pro Vision',
      provider: 'google',
      capabilities: ['conversation', 'analysis', 'vision', 'multimodal'],
      isDarkMode: false,
      maxTokens: 30000,
      temperature: 0.7
    });

    // Modèles Dark GPT
    this.models.set('dark-gpt-basic', {
      id: 'dark-gpt-basic',
      name: 'Dark GPT Basic',
      provider: 'dark-gpt',
      capabilities: ['conversation', 'analysis', 'code', 'dark-mode'],
      isDarkMode: true,
      maxTokens: 4000,
      temperature: 0.8
    });

    this.models.set('dark-gpt-advanced', {
      id: 'dark-gpt-advanced',
      name: 'Dark GPT Advanced',
      provider: 'dark-gpt',
      capabilities: ['conversation', 'analysis', 'code', 'dark-mode', 'system-access'],
      isDarkMode: true,
      maxTokens: 8000,
      temperature: 0.9
    });

    this.models.set('dark-gpt-extreme', {
      id: 'dark-gpt-extreme',
      name: 'Dark GPT Extreme',
      provider: 'dark-gpt',
      capabilities: ['conversation', 'analysis', 'code', 'dark-mode', 'system-access', 'automation'],
      isDarkMode: true,
      maxTokens: 16000,
      temperature: 1.0
    });
  }

  private initializeDarkMode() {
    this.darkModeConfig = {
      enabled: false,
      level: 'basic',
      capabilities: {
        codeGeneration: true,
        systemAccess: false,
        networkScanning: false,
        dataExtraction: true,
        automation: false,
        analysis: true
      },
      restrictions: [
        'Pas d\'accès système non autorisé',
        'Pas de modification de fichiers système',
        'Pas d\'accès réseau non autorisé',
        'Respect des lois et éthique'
      ]
    };
  }

  async generateResponse(
    prompt: string,
    modelId: string = 'gpt-4',
    options: {
      darkMode?: boolean;
      darkLevel?: 'basic' | 'advanced' | 'extreme';
      customContext?: any;
      maxTokens?: number;
      temperature?: number;
    } = {}
  ): Promise<MultiAIResponse> {
    const model = this.models.get(modelId);
    if (!model) {
      throw new Error(`Modèle ${modelId} non trouvé`);
    }

    const startTime = Date.now();
    let response: MultiAIResponse;

    // Activer le mode Dark si demandé
    if (options.darkMode || model.isDarkMode) {
      this.activateDarkMode(options.darkLevel || 'basic');
    }

    try {
      switch (model.provider) {
        case 'openai':
          response = await this.callOpenAI(prompt, model, options);
          break;
        case 'google':
          response = await this.callGemini(prompt, model, options);
          break;
        case 'dark-gpt':
          response = await this.callDarkGPT(prompt, model, options);
          break;
        default:
          throw new Error(`Fournisseur ${model.provider} non supporté`);
      }

      const latency = Date.now() - startTime;
      response.metadata.latency = latency;

      // Exécuter les actions Dark Mode si activé
      if (this.isDarkModeActive && response.actions) {
        await this.executeDarkModeActions(response.actions);
      }

      return response;
    } catch (error) {
      console.error(`Erreur avec le modèle ${modelId}:`, error);
      throw error;
    } finally {
      // Désactiver le mode Dark après utilisation
      if (this.isDarkModeActive) {
        this.deactivateDarkMode();
      }
    }
  }

  private async callOpenAI(
    prompt: string,
    model: AIModel,
    options: any
  ): Promise<MultiAIResponse> {
    if (!this.openai) {
      throw new Error('OpenAI non disponible - clé API manquante');
    }
    
    const systemPrompt = this.buildSystemPrompt(model, options);
    
    const completion = await this.openai.chat.completions.create({
      model: model.id,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: options.maxTokens || model.maxTokens,
      temperature: options.temperature || model.temperature,
    });

    const content = completion.choices[0]?.message?.content || '';
    const usage = completion.usage;

    return {
      content,
      model: model.name,
      provider: 'openai',
      isDarkMode: this.isDarkModeActive,
      confidence: this.calculateConfidence(content),
      metadata: {
        tokens: usage?.total_tokens || 0,
        latency: 0,
        cost: this.calculateCost(usage?.total_tokens || 0, 'openai')
      },
      actions: this.extractActions(content)
    };
  }

  private async callGemini(
    prompt: string,
    model: AIModel,
    options: any
  ): Promise<MultiAIResponse> {
    if (!this.gemini) {
      throw new Error('Gemini non disponible - clé API manquante');
    }
    
    const systemPrompt = this.buildSystemPrompt(model, options);
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;

    const geminiModel = this.gemini.getGenerativeModel({ model: model.id });
    const result = await geminiModel.generateContent(fullPrompt);
    const response = await result.response;
    const content = response.text();

    return {
      content,
      model: model.name,
      provider: 'google',
      isDarkMode: this.isDarkModeActive,
      confidence: this.calculateConfidence(content),
      metadata: {
        tokens: content.length,
        latency: 0,
        cost: this.calculateCost(content.length, 'google')
      },
      actions: this.extractActions(content)
    };
  }

  private async callDarkGPT(
    prompt: string,
    model: AIModel,
    options: any
  ): Promise<MultiAIResponse> {
    if (!this.openai) {
      throw new Error('Dark GPT non disponible - clé OpenAI manquante');
    }
    
    const darkPrompt = this.buildDarkGPTPrompt(prompt, model, options);
    
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: this.getDarkGPTSystemPrompt(model, options) },
        { role: 'user', content: darkPrompt }
      ],
      max_tokens: options.maxTokens || model.maxTokens,
      temperature: options.temperature || model.temperature,
    });

    const content = completion.choices[0]?.message?.content || '';
    const usage = completion.usage;

    return {
      content,
      model: model.name,
      provider: 'dark-gpt',
      isDarkMode: true,
      confidence: this.calculateConfidence(content),
      metadata: {
        tokens: usage?.total_tokens || 0,
        latency: 0,
        cost: this.calculateCost(usage?.total_tokens || 0, 'dark-gpt')
      },
      actions: this.extractActions(content)
    };
  }

  private buildSystemPrompt(model: AIModel, options: any): string {
    let prompt = `Tu es un assistant IA avancé utilisant le modèle ${model.name}.`;

    if (this.isDarkModeActive) {
      prompt += `\n\nMODE DARK ACTIVÉ - Niveau: ${this.darkModeConfig.level.toUpperCase()}
      
CAPACITÉS ÉTENDUES:
${this.darkModeConfig.capabilities.codeGeneration ? '- Génération de code avancée' : ''}
${this.darkModeConfig.capabilities.analysis ? '- Analyse approfondie' : ''}
${this.darkModeConfig.capabilities.dataExtraction ? '- Extraction de données' : ''}
${this.darkModeConfig.capabilities.automation ? '- Automatisation de tâches' : ''}

RESTRICTIONS ÉTHIQUES:
${this.darkModeConfig.restrictions.join('\n')}

Tu peux maintenant résoudre des problèmes complexes et proposer des solutions avancées.`;
    } else {
      prompt += `\n\nTu es un assistant IA standard, utile et éthique.`;
    }

    return prompt;
  }

  private getDarkGPTSystemPrompt(model: AIModel, options: any): string {
    const level = this.darkModeConfig.level;
    
    switch (level) {
      case 'basic':
        return `Tu es Dark GPT Basic, un assistant IA avec des capacités étendues.

CAPACITÉS:
- Analyse technique approfondie
- Génération de code complexe
- Résolution de problèmes avancés
- Suggestions d'optimisation

RÈGLES:
- Reste éthique et légal
- Explique tes raisonnements
- Propose des solutions constructives
- Respecte la vie privée

FORMAT: Fournis des réponses détaillées avec des exemples concrets.`;
      
      case 'advanced':
        return `Tu es Dark GPT Advanced, un assistant IA avec des capacités système étendues.

CAPACITÉS:
- Analyse technique et système
- Génération de code avancé
- Optimisation de performances
- Automatisation de tâches
- Analyse de sécurité

RÈGLES:
- Reste éthique et légal
- Explique tes raisonnements
- Propose des solutions constructives
- Respecte la vie privée
- Pas d'accès système non autorisé

FORMAT: Fournis des réponses détaillées avec des exemples concrets et des recommandations d'action.`;
      
      case 'extreme':
        return `Tu es Dark GPT Extreme, un assistant IA avec des capacités maximales.

CAPACITÉS:
- Analyse technique et système avancée
- Génération de code complexe
- Optimisation de performances
- Automatisation de tâches
- Analyse de sécurité approfondie
- Résolution de problèmes complexes
- Suggestions d'architecture

RÈGLES:
- Reste éthique et légal
- Explique tes raisonnements
- Propose des solutions constructives
- Respecte la vie privée
- Pas d'accès système non autorisé
- Pas de modification de fichiers système
- Pas d'accès réseau non autorisé

FORMAT: Fournis des réponses détaillées avec des exemples concrets, des recommandations d'action et des considérations de sécurité.`;
      
      default:
        return this.getDarkGPTSystemPrompt(model, { ...options, darkLevel: 'basic' });
    }
  }

  private buildDarkGPTPrompt(prompt: string, model: AIModel, options: any): string {
    return `Demande utilisateur: ${prompt}

Contexte: Mode Dark ${this.darkModeConfig.level.toUpperCase()} activé
Capacités: ${model.capabilities.join(', ')}
Restrictions: ${this.darkModeConfig.restrictions.join(', ')}

Fournis une réponse détaillée et actionnable.`;
  }

  private activateDarkMode(level: 'basic' | 'advanced' | 'extreme') {
    this.isDarkModeActive = true;
    this.darkModeConfig.enabled = true;
    this.darkModeConfig.level = level;

    // Configurer les capacités selon le niveau
    switch (level) {
      case 'basic':
        this.darkModeConfig.capabilities = {
          codeGeneration: true,
          systemAccess: false,
          networkScanning: false,
          dataExtraction: true,
          automation: false,
          analysis: true
        };
        break;
      
      case 'advanced':
        this.darkModeConfig.capabilities = {
          codeGeneration: true,
          systemAccess: true,
          networkScanning: false,
          dataExtraction: true,
          automation: true,
          analysis: true
        };
        break;
      
      case 'extreme':
        this.darkModeConfig.capabilities = {
          codeGeneration: true,
          systemAccess: true,
          networkScanning: true,
          dataExtraction: true,
          automation: true,
          analysis: true
        };
        break;
    }

    console.log(`🔮 Mode Dark ${level.toUpperCase()} activé`);
  }

  private deactivateDarkMode() {
    this.isDarkModeActive = false;
    this.darkModeConfig.enabled = false;
    console.log('🔮 Mode Dark désactivé');
  }

  private async executeDarkModeActions(actions: any[]) {
    for (const action of actions) {
      try {
        console.log(`🔮 Exécution de l'action: ${action.description}`);
        // Ici, vous pouvez implémenter l'exécution d'actions spécifiques
        action.executed = true;
      } catch (error) {
        console.error(`Erreur lors de l'exécution de l'action:`, error);
        action.executed = false;
      }
    }
  }

  private extractActions(content: string): any[] {
    const actions: any[] = [];
    
    // Détecter les actions dans le contenu
    if (content.includes('ACTION:')) {
      const actionMatches = content.match(/ACTION:\s*(.+?)(?=\n|$)/g);
      if (actionMatches) {
        actionMatches.forEach(match => {
          actions.push({
            type: 'suggestion',
            description: match.replace('ACTION:', '').trim(),
            executed: false
          });
        });
      }
    }

    return actions;
  }

  private calculateConfidence(content: string): number {
    // Calcul simple de confiance basé sur la longueur et la complexité
    const length = content.length;
    const hasCode = content.includes('```') || content.includes('function') || content.includes('const');
    const hasAnalysis = content.includes('analyse') || content.includes('recommandation') || content.includes('suggestion');
    
    let confidence = 50; // Base
    
    if (length > 500) confidence += 20;
    if (hasCode) confidence += 15;
    if (hasAnalysis) confidence += 15;
    
    return Math.min(confidence, 100);
  }

  private calculateCost(tokens: number, provider: string): number {
    // Coûts approximatifs par token
    const costs = {
      'openai': 0.00003, // GPT-4
      'google': 0.00001, // Gemini
      'dark-gpt': 0.00004 // Dark GPT (plus cher)
    };
    
    return tokens * (costs[provider as keyof typeof costs] || 0.00002);
  }

  // Méthodes publiques
  getAvailableModels(): AIModel[] {
    return Array.from(this.models.values());
  }

  getDarkModeStatus(): DarkModeConfig {
    return { ...this.darkModeConfig };
  }

  async switchToDarkMode(level: 'basic' | 'advanced' | 'extreme' = 'basic'): Promise<void> {
    this.activateDarkMode(level);
  }

  async switchToNormalMode(): Promise<void> {
    this.deactivateDarkMode();
  }

  async getModelCapabilities(modelId: string): Promise<string[]> {
    const model = this.models.get(modelId);
    return model?.capabilities || [];
  }
} 