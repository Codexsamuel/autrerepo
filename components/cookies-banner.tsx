'use client';

import { useEffect, useState } from 'react';

export default function CookiesBanner() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Vérifier si les cookies ont déjà été acceptés
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const firstVisit = localStorage.getItem('dl_first_visit');
    
    if (!cookiesAccepted) {
      setVisible(true);
    }
    
    // Marquer la première visite si ce n'est pas déjà fait
    if (!firstVisit) {
      localStorage.setItem('dl_first_visit', new Date().toISOString());
      localStorage.setItem('dl_visit_count', '1');
    } else {
      // Incrémenter le compteur de visites
      const visitCount = parseInt(localStorage.getItem('dl_visit_count') || '0') + 1;
      localStorage.setItem('dl_visit_count', visitCount.toString());
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setVisible(false);
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('dl_cookies_accepted_at', new Date().toISOString());
    
    // Activer les fonctionnalités après acceptation des cookies
    localStorage.setItem('dl_features_enabled', 'true');
  };
  
  const handleRefuse = () => {
    setAccepted(false);
    setVisible(false);
    localStorage.setItem('cookiesAccepted', 'false');
    localStorage.setItem('dl_cookies_refused_at', new Date().toISOString());
    
    // Désactiver les fonctionnalités après refus des cookies
    localStorage.setItem('dl_features_enabled', 'false');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-2xl">
      <div className="mb-2 md:mb-0">
        Ce site utilise des cookies pour améliorer votre expérience et collecter des données de navigation. <a href="/politique-confidentialite" className="underline">En savoir plus</a>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleAccept} className="bg-green-500 px-4 py-2 rounded font-semibold hover:bg-green-600">Accepter</button>
        <button onClick={handleRefuse} className="bg-red-500 px-4 py-2 rounded font-semibold hover:bg-red-600">Refuser</button>
      </div>
    </div>
  );
} 