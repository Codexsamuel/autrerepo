'use client';

import { useState, useEffect } from 'react';

export default function PrivacyMessage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Afficher le message de confidentialité après 5 secondes
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-2xl shadow-2xl max-w-sm border border-blue-400/30 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 mr-2 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <h4 className="font-bold text-lg">Confidentialité</h4>
          </div>
          <p className="text-sm leading-relaxed text-blue-50">
            Vos données sont protégées et utilisées uniquement pour améliorer votre expérience.
          </p>
        </div>
        <button 
          onClick={() => setVisible(false)}
          className="ml-4 text-blue-200 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
} 