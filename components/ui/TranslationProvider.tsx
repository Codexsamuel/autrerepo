"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';

// Types pour la traduction
interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  translate: (text: string, from?: string, to?: string) => Promise<string>;
  detectLanguage: (text: string) => Promise<string>;
  availableLanguages: Language[];
  isLoading: boolean;
}

// Langues par défaut
const DEFAULT_LANGUAGES: Language[] = [
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

// Cache pour les traductions
const translationCache = new Map<string, string>();

// Créer le contexte
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Composant principal du provider
interface TranslationProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

export function TranslationProvider({ 
  children, 
  defaultLanguage = 'fr' 
}: TranslationProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>(DEFAULT_LANGUAGES);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les langues disponibles depuis l'API
  useEffect(() => {
    async function loadLanguages() {
      try {
        const response = await fetch('/api/translate?action=languages');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAvailableLanguages(data.data);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des langues:', error);
        // Utiliser les langues par défaut en cas d'erreur
        setAvailableLanguages(DEFAULT_LANGUAGES);
      }
    }

    loadLanguages();
  }, []);

  // Fonction pour changer de langue
  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    // Sauvegarder dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  };

  // Fonction pour traduire du texte
  const translate = async (text: string, from?: string, to?: string): Promise<string> => {
    if (!text.trim()) return text;

    const targetLang = to || currentLanguage;
    const sourceLang = from || 'auto';

    // Vérifier le cache
    const cacheKey = `${text}-${sourceLang}-${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // Si la langue source est la même que la langue cible, pas besoin de traduire
    if (sourceLang !== 'auto' && sourceLang === targetLang) {
      return text;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/translate?text=${encodeURIComponent(text)}&from=${sourceLang}&to=${targetLang}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const translatedText = data.data.translatedText;
          
          // Mettre en cache
          translationCache.set(cacheKey, translatedText);
          
          return translatedText;
        }
      }
      
      // En cas d'erreur, retourner le texte original
      return text;
    } catch (error) {
      console.error('Erreur de traduction:', error);
      return text;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour détecter la langue
  const detectLanguage = async (text: string): Promise<string> => {
    if (!text.trim()) return 'en';

    try {
      const response = await fetch(`/api/translate?action=detect&text=${encodeURIComponent(text)}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          return data.data.language;
        }
      }
      
      return 'en'; // Langue par défaut
    } catch (error) {
      console.error('Erreur de détection de langue:', error);
      return 'en';
    }
  };

  // Charger la langue préférée depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const value: TranslationContextType = {
    currentLanguage,
    setLanguage,
    translate,
    detectLanguage,
    availableLanguages,
    isLoading
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Composant de sélection de langue
interface LanguageSelectorProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'compact';
}

export function LanguageSelector({ 
  className = '', 
  showIcon = true, 
  variant = 'default' 
}: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, availableLanguages, isLoading } = useTranslation();

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  if (variant === 'compact') {
    return (
      <Select value={currentLanguage} onValueChange={setLanguage} disabled={isLoading}>
        <SelectTrigger className={`w-20 ${className}`}>
          <SelectValue>
            {showIcon && <Globe className="h-3 w-3 mr-1" />}
            {currentLang?.code.toUpperCase()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{language.code.toUpperCase()}</span>
                <span className="text-xs text-gray-500">({language.nativeName})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select value={currentLanguage} onValueChange={setLanguage} disabled={isLoading}>
      <SelectTrigger className={`w-48 ${className}`}>
        <SelectValue>
          <div className="flex items-center space-x-2">
            {showIcon && <Languages className="h-4 w-4" />}
            <span>{currentLang?.nativeName || currentLang?.name}</span>
            <span className="text-gray-500">({currentLang?.code.toUpperCase()})</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableLanguages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-gray-500">({language.name})</span>
              </div>
              <span className="text-xs text-gray-400">{language.code.toUpperCase()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Composant pour traduire automatiquement du texte
interface TranslatedTextProps {
  text: string;
  from?: string;
  to?: string;
  fallback?: string;
  className?: string;
  showLoading?: boolean;
}

export function TranslatedText({ 
  text, 
  from, 
  to, 
  fallback, 
  className = '',
  showLoading = false 
}: TranslatedTextProps) {
  const { translate, isLoading } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    async function performTranslation() {
      if (text) {
        const result = await translate(text, from, to);
        setTranslatedText(result);
      }
    }

    performTranslation();
  }, [text, from, to, translate]);

  if (isLoading && showLoading) {
    return <span className={`${className} animate-pulse`}>Traduction...</span>;
  }

  return (
    <span className={className}>
      {translatedText || fallback || text}
    </span>
  );
} 