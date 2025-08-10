import React, { useState } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">NovaAgent AI</h1>
            </div>
            <div className="hidden md:block">
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              NovaAgent AI
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Agent IA Commercial & Communication Digitale
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Transformez votre communication digitale avec notre IA avancée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                {isLoading ? 'Connexion...' : 'Commencer maintenant'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
