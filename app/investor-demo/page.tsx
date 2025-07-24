"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InvestorDemoPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Plateforme de Trading Avancée",
      description: "Système de trading automatisé avec IA et analyse prédictive",
      image: "/images/trading-platform.jpg",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Simulation Drone Militaire",
      description: "Technologies de pointe pour la défense et la surveillance",
      image: "/images/drone-military.jpg", 
      color: "from-green-600 to-blue-600"
    },
    {
      title: "Intelligence Artificielle",
      description: "Solutions IA pour l'optimisation et l'automatisation",
      image: "/images/ai-solutions.jpg",
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Demo Investisseur
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Découvrez nos technologies de pointe et notre vision du futur
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
              <Link 
                href="/trading"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Trading Avancé
              </Link>
              <Link 
                href="/drones-3d"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Drones Militaires
              </Link>
              <Link 
                href="/advanced-intelligence"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                IA Avancée
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-white mb-4">Trading Automatisé</h3>
            <p className="text-gray-300 mb-6">
              Système de trading avec IA prédictive, analyse technique avancée et gestion des risques automatisée.
            </p>
            <Link 
              href="/trading"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Découvrir
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🚁</div>
            <h3 className="text-2xl font-bold text-white mb-4">Drones Militaires</h3>
            <p className="text-gray-300 mb-6">
              Technologies de surveillance avancées, drones tactiques et systèmes de défense de nouvelle génération.
            </p>
            <Link 
              href="/drones-3d"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Explorer
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-white mb-4">Intelligence Artificielle</h3>
            <p className="text-gray-300 mb-6">
              Solutions IA pour l'optimisation, l'automatisation et l'analyse prédictive dans tous les secteurs.
            </p>
            <Link 
              href="/advanced-intelligence"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Investir dans le Futur ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez-nous dans cette révolution technologique et participez à la construction du monde de demain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Nous Contacter
            </Link>
            <Link 
              href="/devis"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
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