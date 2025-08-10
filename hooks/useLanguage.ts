'use client';

import { Language, getLanguageFromLocale } from '@/lib/i18n/translations';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    // Détecter la langue depuis localStorage ou le navigateur
    const savedLanguage = localStorage.getItem('dl_language') as Language;
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage && ['fr', 'en', 'es', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const detectedLanguage = getLanguageFromLocale(browserLanguage);
      setLanguage(detectedLanguage);
      localStorage.setItem('dl_language', detectedLanguage);
    }
    
    setIsLoading(false);
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // Only use localStorage and document on client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('dl_language', newLanguage);
      
      // Mettre à jour la direction du texte pour l'arabe
      if (newLanguage === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
      } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = newLanguage;
      }
    }
  };

  const getLanguageName = (lang: Language): string => {
    const names = {
      fr: 'Français',
      en: 'English',
      es: 'Español',
      ar: 'العربية'
    };
    return names[lang];
  };

  const getLanguageFlag = (lang: Language): string => {
    const flags = {
      fr: '🇫🇷',
      en: '🇺🇸',
      es: '🇪🇸',
      ar: '🇸🇦'
    };
    return flags[lang];
  };

  return {
    language,
    changeLanguage,
    getLanguageName,
    getLanguageFlag,
    isLoading
  };
}; 