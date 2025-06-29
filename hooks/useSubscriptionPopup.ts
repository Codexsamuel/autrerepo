import { useState, useEffect } from 'react';

interface UseSubscriptionPopupProps {
  delayMinutes?: number;
  onShow?: () => void;
}

export function useSubscriptionPopup({ 
  delayMinutes = 5, 
  onShow 
}: UseSubscriptionPopupProps = {}) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Vérifier si le popup a déjà été affiché dans cette session
    const hasShownPopup = sessionStorage.getItem('subscription-popup-shown');
    
    if (hasShownPopup) {
      setHasShown(true);
      return;
    }

    // Timer pour afficher le popup après le délai spécifié
    const timer = setTimeout(() => {
      if (!hasShown) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('subscription-popup-shown', 'true');
        onShow?.();
      }
    }, delayMinutes * 60 * 1000);

    return () => clearTimeout(timer);
  }, [delayMinutes, hasShown, onShow]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const resetPopup = () => {
    setShowPopup(false);
    setHasShown(false);
    sessionStorage.removeItem('subscription-popup-shown');
  };

  return {
    showPopup,
    closePopup,
    resetPopup,
    hasShown
  };
} 