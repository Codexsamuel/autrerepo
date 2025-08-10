import React, { useState, useEffect } from 'react';

const SentinelZeroHome: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Sentinel Zero</h2>
          <p className="text-red-400">Initialisation du système...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 relative overflow-hidden">
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-lg mr-3"></div>
              <h1 className="text-2xl font-bold text-white">Sentinel Zero</h1>
            </div>
            <div className="hidden md:block">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Accès Sécurisé
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Sentinel Zero
            </h1>
            <p className="text-xl md:text-2xl text-red-400 mb-8 max-w-3xl mx-auto">
              Agent Red Team IA Ultra-Avancé
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Système d'intelligence artificielle offensive pour la cybersécurité souveraine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Accès Super Admin
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-red-500/30 transition-colors duration-200">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SentinelZeroHome;
