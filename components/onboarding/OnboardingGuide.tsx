'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, BookOpen, Search, Users, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n/translations';

interface OnboardingGuideProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  isVisible,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const { language } = useLanguage();
  const t = getTranslation(language);

  const steps = t.onboarding.steps.map((step, index) => ({
    ...step,
    icon: [
      <Zap key="welcome" className="w-6 h-6 text-blue-500" />,
      <Search key="solutions" className="w-6 h-6 text-green-500" />,
      <Settings key="novacore" className="w-6 h-6 text-purple-500" />,
      <BookOpen key="formations" className="w-6 h-6 text-orange-500" />,
      <Users key="community" className="w-6 h-6 text-pink-500" />
    ][index],
    target: [
      'body',
      '[data-onboarding="solutions"]',
      '[data-onboarding="novacore"]',
      '[data-onboarding="formations"]',
      '[data-onboarding="community"]'
    ][index],
    position: ['top', 'bottom', 'left', 'right', 'top'][index] as 'top' | 'bottom' | 'left' | 'right',
    action: step.actionLabel ? {
      label: step.actionLabel,
      onClick: () => {
        const urls = [
          undefined,
          undefined,
          '/novacore',
          '/formations',
          '/novaworld'
        ];
        const url = urls[index];
        if (url) {
          window.location.href = url;
        } else if (index === 1) {
          const element = document.querySelector('[data-onboarding="solutions"]');
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } : undefined
  }));

  useEffect(() => {
    if (isVisible && currentStep < steps.length) {
      highlightTarget(steps[currentStep].target);
    }
  }, [isVisible, currentStep, steps.length]);

  const highlightTarget = (target: string) => {
    setIsHighlighting(true);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setIsHighlighting(false), 500);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Overlay background */}
      <div className="absolute inset-0" />
      
      {/* Highlight overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {currentStepData && (
            <div
              className="absolute inset-0 bg-blue-500/20 rounded-lg transition-opacity duration-500"
              style={{
                opacity: isHighlighting ? 0.3 : 0,
                top: '10%',
                left: '10%',
                right: '10%',
                bottom: '10%'
              }}
            />
          )}
        </div>
      </div>

      {/* Onboarding card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {currentStepData.icon}
                  <span className="text-sm font-medium text-muted-foreground">
                    {t.onboarding.navigation.step} {currentStep + 1} {t.onboarding.navigation.of} {steps.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {currentStepData.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Action button */}
              {currentStepData.action && (
                <div className="mt-6">
                  <Button
                    onClick={currentStepData.action.onClick}
                    className="w-full"
                    size="lg"
                  >
                    {currentStepData.action.label}
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.onboarding.navigation.previous}</span>
                </Button>

                <div className="flex space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>
                    {currentStep === steps.length - 1 ? t.onboarding.navigation.finish : t.onboarding.navigation.next}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide; 