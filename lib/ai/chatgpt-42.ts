import axios from 'axios';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration ChatGPT-42 API
const CHATGPT_42_CONFIG = {
  host: 'chatgpt-42.p.rapidapi.com',
  baseURL: 'https://chatgpt-42.p.rapidapi.com',
  key: RAPID_API_KEY
};

// Interfaces pour les requêtes et réponses
export interface ChatGPT42Request {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

export interface ChatGPT42Response {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatGPT42Error {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

/**
 * 🔧 Fonction utilitaire pour faire des requêtes à ChatGPT-42
 * @param endpoint Endpoint à appeler
 * @param data Données à envoyer
 * @param method Méthode HTTP (POST par défaut)
 * @returns Réponse de l'API
 */
export async function makeChatGPT42Request(
  endpoint: string,
  data: any,
  method: 'GET' | 'POST' = 'POST'
): Promise<any> {
  try {
    const url = `${CHATGPT_42_CONFIG.baseURL}${endpoint}`;
    
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': CHATGPT_42_CONFIG.key,
        'X-RapidAPI-Host': CHATGPT_42_CONFIG.host,
      },
      data: method === 'POST' ? data : undefined,
      params: method === 'GET' ? data : undefined,
      timeout: 30000 // 30 secondes
    };

    const response = await axios(config);
    return response.data;
    
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.message || 'Erreur inconnue';
    
    console.error(`❌ ChatGPT-42 API (${endpoint}): ${status ? `HTTP ${status}` : message}`);
    
    // Remonter l'erreur pour gestion
    throw error;
  }
}

/**
 * 🤖 Générer une réponse avec ChatGPT-42
 * @param messages Messages de conversation
 * @param options Options de génération
 * @returns Réponse générée
 */
export async function generateChatGPT42Response(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stream?: boolean;
  } = {}
): Promise<ChatGPT42Response> {
  try {
    console.log(`🤖 ChatGPT-42: Génération de réponse (${messages.length} messages)`);
    
    const requestData: ChatGPT42Request = {
      messages,
      model: options.model || 'gpt-4',
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      top_p: options.top_p || 1,
      frequency_penalty: options.frequency_penalty || 0,
      presence_penalty: options.presence_penalty || 0,
      stream: options.stream || false
    };
    
    const response = await makeChatGPT42Request('/v1/chat/completions', requestData);
    
    console.log(`✅ ChatGPT-42: Réponse générée (${response.usage?.total_tokens || 0} tokens)`);
    return response;
    
  } catch (error: any) {
    console.error(`❌ ChatGPT-42: Erreur génération`, error.message);
    throw error;
  }
}

/**
 * 💬 Conversation simple avec ChatGPT-42
 * @param message Message utilisateur
 * @param systemPrompt Prompt système (optionnel)
 * @param options Options de génération
 * @returns Réponse de l'IA
 */
export async function chatWithChatGPT42(
  message: string,
  systemPrompt?: string,
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> {
  try {
    const messages = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: message });
    
    const response = await generateChatGPT42Response(messages, options);
    
    return response.choices[0]?.message?.content || 'Aucune réponse générée';
    
  } catch (error: any) {
    console.error(`❌ ChatGPT-42 Chat: Erreur`, error.message);
    throw error;
  }
}

/**
 * 📝 Générer du contenu avec ChatGPT-42
 * @param prompt Prompt de génération
 * @param contentType Type de contenu
 * @param options Options de génération
 * @returns Contenu généré
 */
export async function generateContentWithChatGPT42(
  prompt: string,
  contentType: 'article' | 'email' | 'social' | 'code' | 'creative' = 'creative',
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> {
  try {
    const systemPrompts = {
      article: 'Tu es un rédacteur professionnel. Génère un article de qualité, informatif et engageant.',
      email: 'Tu es un expert en communication professionnelle. Rédige un email clair, concis et efficace.',
      social: 'Tu es un expert en marketing digital. Crée du contenu engageant pour les réseaux sociaux.',
      code: 'Tu es un développeur expert. Génère du code propre, commenté et fonctionnel.',
      creative: 'Tu es un créateur d\'idées innovantes. Génère du contenu créatif et original.'
    };
    
    const systemPrompt = systemPrompts[contentType];
    
    return await chatWithChatGPT42(prompt, systemPrompt, options);
    
  } catch (error: any) {
    console.error(`❌ ChatGPT-42 Content: Erreur`, error.message);
    throw error;
  }
}

/**
 * 🔍 Analyser du texte avec ChatGPT-42
 * @param text Texte à analyser
 * @param analysisType Type d'analyse
 * @param options Options de génération
 * @returns Analyse générée
 */
export async function analyzeTextWithChatGPT42(
  text: string,
  analysisType: 'sentiment' | 'summary' | 'keywords' | 'tone' | 'complexity' = 'summary',
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> {
  try {
    const analysisPrompts = {
      sentiment: 'Analyse le sentiment de ce texte. Identifie s\'il est positif, négatif ou neutre.',
      summary: 'Fais un résumé concis et structuré de ce texte en gardant les points essentiels.',
      keywords: 'Extrais les mots-clés et concepts principaux de ce texte.',
      tone: 'Analyse le ton et le style de ce texte. Identifie s\'il est formel, informel, technique, etc.',
      complexity: 'Évalue la complexité de ce texte. Identifie le niveau de lecture requis.'
    };
    
    const prompt = `${analysisPrompts[analysisType]}\n\nTexte à analyser:\n${text}`;
    
    return await chatWithChatGPT42(prompt, 'Tu es un expert en analyse de texte.', options);
    
  } catch (error: any) {
    console.error(`❌ ChatGPT-42 Analysis: Erreur`, error.message);
    throw error;
  }
}

/**
 * 🎯 Générer des suggestions avec ChatGPT-42
 * @param context Contexte pour les suggestions
 * @param suggestionType Type de suggestions
 * @param count Nombre de suggestions
 * @param options Options de génération
 * @returns Suggestions générées
 */
export async function generateSuggestionsWithChatGPT42(
  context: string,
  suggestionType: 'ideas' | 'titles' | 'topics' | 'solutions' | 'improvements' = 'ideas',
  count: number = 5,
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string[]> {
  try {
    const suggestionPrompts = {
      ideas: `Génère ${count} idées créatives basées sur ce contexte:`,
      titles: `Génère ${count} titres accrocheurs pour ce contenu:`,
      topics: `Suggère ${count} sujets de discussion liés à ce thème:`,
      solutions: `Propose ${count} solutions pour ce problème:`,
      improvements: `Suggère ${count} améliorations pour ce projet:`
    };
    
    const prompt = `${suggestionPrompts[suggestionType]}\n\nContexte: ${context}\n\nFormat: Liste numérotée simple`;
    
    const response = await chatWithChatGPT42(prompt, 'Tu es un expert en génération d\'idées.', options);
    
    // Parser la réponse en liste
    const lines = response.split('\n').filter(line => line.trim());
    const suggestions = lines
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(suggestion => suggestion.length > 0)
      .slice(0, count);
    
    return suggestions;
    
  } catch (error: any) {
    console.error(`❌ ChatGPT-42 Suggestions: Erreur`, error.message);
    throw error;
  }
}

/**
 * 📊 Obtenir des statistiques sur l'API ChatGPT-42
 */
export function getChatGPT42Stats() {
  return {
    name: 'ChatGPT-42',
    description: 'API ChatGPT avancée via RapidAPI',
    host: CHATGPT_42_CONFIG.host,
    features: [
      'Génération de réponses conversationnelles',
      'Génération de contenu spécialisé',
      'Analyse de texte',
      'Génération de suggestions',
      'Support multi-modèles',
      'Paramètres configurables'
    ],
    supportedModels: [
      'gpt-4',
      'gpt-4-turbo',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k'
    ],
    supportedOperations: [
      'generateChatGPT42Response',
      'chatWithChatGPT42',
      'generateContentWithChatGPT42',
      'analyzeTextWithChatGPT42',
      'generateSuggestionsWithChatGPT42'
    ],
    rateLimits: {
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      maxTokensPerRequest: 4000
    }
  };
}

// Export par défaut pour compatibilité
export default {
  generateChatGPT42Response,
  chatWithChatGPT42,
  generateContentWithChatGPT42,
  analyzeTextWithChatGPT42,
  generateSuggestionsWithChatGPT42,
  getChatGPT42Stats
}; 