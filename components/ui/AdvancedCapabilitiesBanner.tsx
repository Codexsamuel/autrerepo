"use client";

import { useEffect, useState } from 'react';

interface AdvancedCapabilitiesBannerProps {
  title: string;
  subtitle: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function AdvancedCapabilitiesBanner({ title, subtitle, features }: AdvancedCapabilitiesBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className={`w-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-fade-in-delay">
            {subtitle}
          </p>
        </div>

        {/* Features Showcase */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-8">Fonctionnalités Avancées</h2>
              
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`p-6 rounded-2xl transition-all duration-500 ${
                    index === currentFeature 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 transform scale-105' 
                      : 'bg-gray-800/50 border border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <div className="text-center">
                  <div className="text-8xl mb-6 animate-bounce">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {features[currentFeature]?.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {features[currentFeature]?.description}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeature(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentFeature ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-800 border-t border-gray-700 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Prêt à Découvrir Nos Capacités ?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Explorez nos technologies de pointe et découvrez comment nous pouvons transformer votre entreprise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Découvrir Plus
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Nous Contacter
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 