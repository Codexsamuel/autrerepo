"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DronesPresentationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Vision Nocturne",
      description: "Caméra thermique haute résolution pour surveillance 24h/24",
      icon: "🌙",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "IA Embarquée",
      description: "Intelligence artificielle pour reconnaissance automatique",
      icon: "🤖",
      color: "from-green-600 to-blue-600"
    },
    {
      title: "Autonomie Étendue",
      description: "Jusqu'à 45 minutes de vol avec batterie optimisée",
      icon: "⚡",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Contrôle FPV",
      description: "Pilotage immersif avec casque et radiocommande",
      icon: "🎮",
      color: "from-orange-600 to-red-600"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-blue-900/50" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Drones Militaires
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Technologies de pointe pour la défense et la surveillance avancée
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
              <Link 
                href="/drones-3d"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Voir en 3D
              </Link>
              <Link 
                href="/drone-simulator"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Simulateur
              </Link>
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                Demander un Devis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8">Caractéristiques Avancées</h2>
            
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-500 ${
                  index === currentFeature 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 transform scale-105' 
                    : 'bg-gray-800/50 border border-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🚁</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {features[currentFeature].description}
                </p>
                <div className="flex justify-center space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeature ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drone Models */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Nos Modèles de Drones</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl mb-4">🛰️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Sentinel V1</h3>
                <p className="text-gray-300 mb-6">
                  Drone militaire tactique avec capacités avancées de surveillance et neutralisation.
                </p>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>• Vision nocturne thermique</li>
                  <li>• Détection de mines</li>
                  <li>• Mode kamikaze (optionnel)</li>
                  <li>• Portée 20 km</li>
                  <li>• Autonomie 40 minutes</li>
                </ul>
                <Link 
                  href="/drones-3d"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Découvrir
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl mb-4">🏭</div>
                <h3 className="text-2xl font-bold text-white mb-4">Atlas X1</h3>
                <p className="text-gray-300 mb-6">
                  Drone industriel polyvalent pour agriculture, logistique et analyse environnementale.
                </p>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>• Pulvérisation d'engrais</li>
                  <li>• Analyse sous-sol</li>
                  <li>• Transport médical</li>
                  <li>• Caméra 4K stabilisée</li>
                  <li>• Charge utile 3 kg</li>
                </ul>
                <Link 
                  href="/drones-3d"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Adopter les Technologies de Demain ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos drones militaires offrent des capacités inégalées pour la défense et la surveillance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Nous Contacter
            </Link>
            <Link 
              href="/devis"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-900 transition-colors"
            >
              Demander un Devis
            </Link>
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
        
        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s both;
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