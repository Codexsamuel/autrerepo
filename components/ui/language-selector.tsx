'use client';

import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/i18n/translations';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'dropdown',
  className = ''
}) => {
  const { language, changeLanguage, getLanguageName, getLanguageFlag } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['fr', 'en', 'es', 'ar'];

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    setIsOpen(false);
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {languages.map((lang) => (
          <Button
            key={lang}
            variant={language === lang ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center space-x-2 min-w-[80px]"
          >
            <span className="text-lg">{getLanguageFlag(lang)}</span>
            <span className="hidden sm:inline text-xs">
              {getLanguageName(lang)}
            </span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[100px]"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{getLanguageFlag(language)}</span>
        <span className="hidden sm:inline text-xs">
          {getLanguageName(language)}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                language === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              } ${lang === 'ar' ? 'text-right' : 'text-left'}`}
            >
              <span className="text-lg">{getLanguageFlag(lang)}</span>
              <span className="text-sm font-medium">{getLanguageName(lang)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay pour fermer le dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector; 