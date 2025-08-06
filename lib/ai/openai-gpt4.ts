// OpenAI GPT-4 Integration Service
// Pour NovaIA et Sentinel Zero - DL Solutions SARL

import OpenAI from 'openai';

// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Modèles disponibles
export const GPT_MODELS = {
  GPT4O: 'gpt-4o',
  GPT4_TURBO: 'gpt-4-turbo',
  GPT35_TURBO: 'gpt-3.5-turbo'
} as const;

// Service GPT-4 pour NovaIA
export class NovaIAGPT4Service {
  private model: string;
  private openai: OpenAI;

  constructor(model: keyof typeof GPT_MODELS = 'GPT4O') {
    this.model = GPT_MODELS[model];
    this.openai = openai;
  }

  // Chat simple avec GPT-4
  async chat(messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      });

      return {
        success: true,
        content: completion.choices[0].message.content,
        usage: completion.usage,
        model: this.model
      };
    } catch (error) {
      console.error('Erreur GPT-4:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  // Assistant NovaIA spécialisé
  async novaIAAssistant(userMessage: string, context?: string) {
    const systemPrompt = `Tu es NovaIA, l'assistant IA avancé de DL Solutions. 
Tu es spécialisé dans :
- Analyse de données et business intelligence
- Marketing digital et e-commerce
- Développement web et applications
- Cybersécurité et protection des données
- Solutions innovantes pour l'Afrique

${context ? `Contexte actuel : ${context}` : ''}

Réponds de manière professionnelle, précise et adaptée au marché africain.`;

    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ]);
  }

  // Assistant Sentinel Zero (mode militaire)
  async sentinelZeroAssistant(threatData: {
    ip: string;
    type: string;
    level: 'low' | 'medium' | 'high' | 'critical';
    description: string;
  }) {
    const systemPrompt = `Tu es Sentinel Zero, agent IA de cybersécurité militaire de DL Solutions.
Tu es spécialisé dans :
- Analyse de menaces cybernétiques
- Stratégies de défense proactive
- Contre-mesures automatisées
- Intelligence artificielle militaire

Niveau d'autorisation : MILITAIRE
Protocole : DÉFENSIF ET CONTRE-OFFENSIF AUTORISÉ

Analyse la menace et propose une stratégie de réponse.`;

    const userPrompt = `Menace détectée :
- IP : ${threatData.ip}
- Type : ${threatData.type}
- Niveau : ${threatData.level}
- Description : ${threatData.description}

Que recommandes-tu comme action ?`;

    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  // Génération de contenu marketing
  async generateMarketingContent(brief: {
    type: 'post' | 'email' | 'ad' | 'landing';
    topic: string;
    target: string;
    tone: 'professional' | 'casual' | 'urgent' | 'friendly';
    language: 'fr' | 'en';
  }) {
    const systemPrompt = `Tu es un expert en marketing digital spécialisé pour le marché africain.
Génère du contenu ${brief.type} en ${brief.language} pour ${brief.target}.
Ton : ${brief.tone}

Conseils :
- Adapte le contenu au contexte africain
- Utilise des références culturelles appropriées
- Inclus des appels à l'action clairs
- Optimise pour les réseaux sociaux si applicable`;

    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Sujet : ${brief.topic}` }
    ]);
  }

  // Analyse de données business
  async analyzeBusinessData(data: any, question: string) {
    const systemPrompt = `Tu es un analyste business IA spécialisé dans l'analyse de données.
Analyse les données fournies et réponds à la question posée.
Sois précis, utilise des chiffres et propose des recommandations actionnables.`;

    return this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Données : ${JSON.stringify(data)}\n\nQuestion : ${question}` }
    ]);
  }
}

// Instances par défaut
export const novaIAGPT4 = new NovaIAGPT4Service('GPT4O');

// Utilitaire pour vérifier la configuration
export async function testGPT4Connection() {
  try {
    const result = await novaIAGPT4.chat([
      { role: 'user', content: 'Test de connexion GPT-4' }
    ]);
    
    return {
      success: result.success,
      message: result.success ? 'Connexion GPT-4 réussie' : 'Erreur de connexion',
      details: result
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erreur de test GPT-4',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
} 