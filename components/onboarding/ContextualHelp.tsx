'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, X, Lightbulb, BookOpen, Users, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n/translations';

const ContextualHelp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const { language } = useLanguage();
  const t = getTranslation(language);

  const helpTips = t.contextualHelp.tips.map((tip, index) => ({
    ...tip,
    icon: [
      <Zap key="quick-start" className="w-6 h-6 text-yellow-500" />,
      <Settings key="solutions" className="w-6 h-6 text-blue-500" />,
      <Settings key="novacore" className="w-6 h-6 text-purple-500" />,
      <BookOpen key="formations" className="w-6 h-6 text-orange-500" />,
      <Users key="community" className="w-6 h-6 text-pink-500" />,
      <Lightbulb key="ai-assistant" className="w-6 h-6 text-green-500" />
    ][index]
  }));

  useEffect(() => {
    // Affiche l'aide contextuelle après 30 secondes sur la page
    const timer = setTimeout(() => {
      const hasSeenHelp = localStorage.getItem('dl_contextual_help_seen');
      if (!hasSeenHelp) {
        setIsVisible(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('dl_contextual_help_seen', '1');
  };

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % helpTips.length);
  };

  const handlePrev = () => {
    setCurrentTip((prev) => (prev - 1 + helpTips.length) % helpTips.length);
  };

  const currentTipData = helpTips[currentTip];

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-24 right-6 z-40"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Card className="w-80 bg-white shadow-2xl border border-gray-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {t.contextualHelp.navigation.tip} {currentTip + 1} {t.contextualHelp.navigation.of} {helpTips.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              {currentTipData.icon}
              <h3 className="font-semibold text-gray-900">
                {currentTipData.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentTipData.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="text-xs"
            >
              {t.contextualHelp.navigation.previous}
            </Button>

            <div className="flex space-x-1">
              {helpTips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              size="sm"
              onClick={handleNext}
              className="text-xs"
            >
              {t.contextualHelp.navigation.next}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextualHelp; 