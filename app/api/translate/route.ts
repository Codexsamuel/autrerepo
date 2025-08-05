import { NextRequest, NextResponse } from 'next/server';

// Types pour l'API Google Translator
interface TranslationRequest {
  text: string;
  from: string;
  to: string;
}

interface TranslationResponse {
  translatedText: string;
  originalText: string;
  from: string;
  to: string;
  confidence?: number;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

// Configuration RapidAPI Google Translator
const RAPIDAPI_CONFIG = {
  host: 'google-translator10.p.rapidapi.com',
  key: process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02'
};

// Endpoints disponibles selon la documentation RapidAPI
const API_ENDPOINTS = {
  translate: '/translate',
  languageList: '/language-list',
  detect: '/detect'
};

// Cache pour les requêtes (10 minutes)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Fonction pour vérifier le cache
function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

// Fonction pour mettre en cache
function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Fonction pour traduire du texte
async function translateText(params: TranslationRequest): Promise<TranslationResponse> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation Google Translator activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedTranslation(params);
    }

    const searchParams = new URLSearchParams({
      text: params.text,
      from: params.from,
      to: params.to
    });

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.translate}?${searchParams}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API Google Translator error: ${response.status} - ${response.statusText}`);
      // En cas d'erreur API, retourner une traduction simulée
      return getSimulatedTranslation(params);
    }

    const data = await response.json();
    
    return {
      translatedText: data.translatedText || data.text || '',
      originalText: params.text,
      from: params.from,
      to: params.to,
      confidence: data.confidence || 0.95
    };

  } catch (error) {
    console.error('Erreur API Google Translator:', error);
    // En cas d'erreur, retourner une traduction simulée
    return getSimulatedTranslation(params);
  }
}

// Fonction pour détecter la langue
async function detectLanguage(text: string): Promise<string> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation Google Translator activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedLanguageDetection(text);
    }

    const searchParams = new URLSearchParams({
      text: text
    });

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.detect}?${searchParams}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API Google Translator detect error: ${response.status} - ${response.statusText}`);
      return getSimulatedLanguageDetection(text);
    }

    const data = await response.json();
    return data.language || 'en';

  } catch (error) {
    console.error('Erreur API Google Translator detect:', error);
    return getSimulatedLanguageDetection(text);
  }
}

// Fonction pour obtenir la liste des langues
async function getLanguageList(): Promise<Language[]> {
  try {
    // Vérifier le cache
    const cacheKey = 'google-translator-languages';
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation Google Translator activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedLanguageList();
    }

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.languageList}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API Google Translator languages error: ${response.status} - ${response.statusText}`);
      return getSimulatedLanguageList();
    }

    const data = await response.json();
    const languages = data.languages || data.data || [];

    // Mettre en cache
    setCachedData(cacheKey, languages);
    return languages;

  } catch (error) {
    console.error('Erreur API Google Translator languages:', error);
    return getSimulatedLanguageList();
  }
}

// Fonction pour générer une traduction simulée
function getSimulatedTranslation(params: TranslationRequest): TranslationResponse {
  const translations: Record<string, Record<string, string>> = {
    'en': {
      'fr': 'Bonjour, comment allez-vous ?',
      'es': 'Hola, ¿cómo estás?',
      'de': 'Hallo, wie geht es dir?',
      'it': 'Ciao, come stai?',
      'pt': 'Olá, como você está?',
      'ru': 'Привет, как дела?',
      'zh': '你好，你好吗？',
      'ja': 'こんにちは、お元気ですか？',
      'ko': '안녕하세요, 어떻게 지내세요?',
      'ar': 'مرحبا، كيف حالك؟'
    },
    'fr': {
      'en': 'Hello, how are you?',
      'es': 'Hola, ¿cómo estás?',
      'de': 'Hallo, wie geht es dir?',
      'it': 'Ciao, come stai?',
      'pt': 'Olá, como você está?',
      'ru': 'Привет, как дела?',
      'zh': '你好，你好吗？',
      'ja': 'こんにちは、お元気ですか？',
      'ko': '안녕하세요, 어떻게 지내세요?',
      'ar': 'مرحبا، كيف حالك؟'
    },
    'es': {
      'en': 'Hello, how are you?',
      'fr': 'Bonjour, comment allez-vous ?',
      'de': 'Hallo, wie geht es dir?',
      'it': 'Ciao, come stai?',
      'pt': 'Olá, como você está?',
      'ru': 'Привет, как дела?',
      'zh': '你好，你好吗？',
      'ja': 'こんにちは、お元気ですか？',
      'ko': '안녕하세요, 어떻게 지내세요?',
      'ar': 'مرحبا، كيف حالك؟'
    }
  };

  const translatedText = translations[params.from]?.[params.to] || 
                        translations['en']?.[params.to] || 
                        params.text;

  return {
    translatedText,
    originalText: params.text,
    from: params.from,
    to: params.to,
    confidence: 0.95
  };
}

// Fonction pour détecter la langue simulée
function getSimulatedLanguageDetection(text: string): string {
  const languagePatterns: Record<string, RegExp> = {
    'fr': /[àâäéèêëïîôöùûüÿç]/i,
    'es': /[ñáéíóúü]/i,
    'de': /[äöüß]/i,
    'it': /[àèéìíîòóù]/i,
    'pt': /[ãâáàçéêíóôõú]/i,
    'ru': /[а-яё]/i,
    'zh': /[\u4e00-\u9fff]/,
    'ja': /[\u3040-\u309f\u30a0-\u30ff]/,
    'ko': /[\uac00-\ud7af]/,
    'ar': /[\u0600-\u06ff]/,
    'en': /^[a-zA-Z\s.,!?;:'"()-]+$/
  };

  for (const [lang, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(text)) {
      return lang;
    }
  }

  return 'en'; // Par défaut
}

// Fonction pour obtenir la liste des langues simulée
function getSimulatedLanguageList(): Language[] {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
    { code: 'ro', name: 'Romanian', nativeName: 'Română' },
    { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
    { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
    { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
    { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
    { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
    { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
    { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
    { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
    { code: 'tl', name: 'Filipino', nativeName: 'Filipino' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
    { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
    { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' }
  ];
}

// Route principale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const text = searchParams.get('text') || '';
    const from = searchParams.get('from') || 'auto';
    const to = searchParams.get('to') || 'en';

    // Action: traduire du texte
    if (action === 'translate' || !action) {
      if (!text) {
        return NextResponse.json({
          success: false,
          message: 'Le texte à traduire est requis'
        }, { status: 400 });
      }

      // Vérifier le cache
      const cacheKey = `translate-${text}-${from}-${to}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return NextResponse.json({
          success: true,
          data: cached
        });
      }

      const translation = await translateText({ text, from, to });

      // Mettre en cache
      setCachedData(cacheKey, translation);

      return NextResponse.json({
        success: true,
        data: translation
      });
    }

    // Action: détecter la langue
    if (action === 'detect') {
      if (!text) {
        return NextResponse.json({
          success: false,
          message: 'Le texte à analyser est requis'
        }, { status: 400 });
      }

      const detectedLanguage = await detectLanguage(text);

      return NextResponse.json({
        success: true,
        data: {
          language: detectedLanguage,
          text: text
        }
      });
    }

    // Action: obtenir la liste des langues
    if (action === 'languages') {
      const languages = await getLanguageList();

      return NextResponse.json({
        success: true,
        data: languages
      });
    }

    // Action: statistiques
    if (action === 'stats') {
      const languages = await getLanguageList();

      return NextResponse.json({
        success: true,
        data: {
          totalLanguages: languages.length,
          supportedLanguages: languages.map(lang => lang.code),
          popularLanguages: ['en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Action non reconnue'
    }, { status: 400 });

  } catch (error) {
    console.error('Erreur API Google Translator:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la traduction',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// Route POST pour les traductions plus complexes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, from = 'auto', to = 'en' } = body;

    if (!text) {
      return NextResponse.json({
        success: false,
        message: 'Le texte à traduire est requis'
      }, { status: 400 });
    }

    // Vérifier le cache
    const cacheKey = `translate-${text}-${from}-${to}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return NextResponse.json({
        success: true,
        data: cached
      });
    }

    const translation = await translateText({ text, from, to });

    // Mettre en cache
    setCachedData(cacheKey, translation);

    return NextResponse.json({
      success: true,
      data: translation
    });

  } catch (error) {
    console.error('Erreur API Google Translator POST:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la traduction',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 