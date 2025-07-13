'use client';

import { HelpCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import OnboardingGuide from './OnboardingGuide';

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [canRelaunch, setCanRelaunch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Pour les tests, afficher l'onboarding par défaut
    // localStorage.removeItem('dl_onboarding_seen'); // Décommenter pour forcer l'affichage
    const seen = localStorage.getItem('dl_onboarding_seen');
    
    // Temporairement afficher l'onboarding pour tous les utilisateurs
    setShowOnboarding(true);
    setCanRelaunch(true);
    
    // Logique normale (commentée pour les tests)
    // if (!seen) {
    //   setShowOnboarding(true);
    //   setCanRelaunch(true);
    // } else {
    //   setCanRelaunch(true);
    // }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setCanRelaunch(true);
    if (mounted) {
      localStorage.setItem('dl_onboarding_seen', '1');
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setCanRelaunch(true);
    if (mounted) {
      localStorage.setItem('dl_onboarding_seen', '1');
    }
  };

  const handleRelaunchOnboarding = () => {
    setShowOnboarding(true);
  };

  // Ne pas rendre les éléments interactifs tant que le composant n'est pas monté
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {canRelaunch && (
        <button
          onClick={handleRelaunchOnboarding}
          className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          title="Relancer l'onboarding"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      )}
      
      <OnboardingGuide
        isVisible={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
      
      {children}
    </>
  );
} 