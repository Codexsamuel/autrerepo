"use client";

import { useState } from 'react';

export default function DLTransportApp() {
  const [showQRCode, setShowQRCode] = useState(false);

  const appFeatures = [
    {
      icon: "🚗",
      title: "Réservation Instantanée",
      description: "Réservez votre véhicule en quelques clics"
    },
    {
      icon: "📍",
      title: "Suivi GPS en Temps Réel",
      description: "Suivez votre chauffeur minute par minute"
    },
    {
      icon: "💳",
      title: "Paiement Sécurisé",
      description: "Paiement en ligne ou en espèces"
    },
    {
      icon: "⭐",
      title: "Évaluation & Commentaires",
      description: "Notez votre expérience et laissez des commentaires"
    },
    {
      icon: "📞",
      title: "Support 24/7",
      description: "Assistance clientèle disponible jour et nuit"
    },
    {
      icon: "🎯",
      title: "Tarifs Transparents",
      description: "Prix fixes, pas de surprise"
    }
  ];

  const handleDownload = (platform: 'ios' | 'android') => {
    if (platform === 'ios') {
      // Lien vers App Store (à remplacer par le vrai lien)
      window.open('https://apps.apple.com/app/dl-transport', '_blank');
    } else {
      // Lien vers Google Play (à remplacer par le vrai lien)
      window.open('https://play.google.com/store/apps/details?id=com.dlsolutions.transport', '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Application Mobile <span className="text-blue-400">DL-Transport</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Téléchargez notre application pour une expérience de transport premium. 
            Réservation en un clic, suivi en temps réel, paiement sécurisé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* App Screenshots & Download */}
          <div className="space-y-8">
            {/* Mockup App */}
            <div className="relative">
              <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold mb-2">DL-Transport</h3>
                  <p className="text-blue-100">Votre chauffeur personnel</p>
                </div>
                
                {/* App Features Preview */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Chauffeur en route - 5 min</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Peugeot 3008 - Jean-Pierre</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">⭐ 4.9 - 8 ans d'expérience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <button 
                onClick={() => handleDownload('ios')}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Télécharger sur</div>
                  <div className="text-lg">App Store</div>
                </div>
              </button>
              
              <button 
                onClick={() => handleDownload('android')}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Télécharger sur</div>
                  <div className="text-lg">Google Play</div>
                </div>
              </button>

              <button 
                onClick={() => setShowQRCode(!showQRCode)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                📱 Scanner le QR Code
              </button>
            </div>

            {/* QR Code */}
            {showQRCode && (
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-gray-200 rounded-lg p-4 inline-block">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">QR Code</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 text-sm">Scannez pour télécharger l'app</p>
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Fonctionnalités de l'Application</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appFeatures.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* App Stats */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mt-8">
              <h4 className="text-xl font-bold mb-4">Statistiques de l'Application</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">4.8⭐</div>
                  <div className="text-sm text-gray-300">Note moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">1000+</div>
                  <div className="text-sm text-gray-300">Téléchargements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">500+</div>
                  <div className="text-sm text-gray-300">Courses réalisées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">24/7</div>
                  <div className="text-sm text-gray-300">Support disponible</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Avis Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                <span className="ml-2 text-sm text-gray-300">Il y a 2 jours</span>
              </div>
              <p className="text-gray-300 mb-4">
                "Service exceptionnel ! Le chauffeur était ponctuel et professionnel. 
                L'application est très intuitive."
              </p>
              <div className="font-semibold">- Marie K.</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                <span className="ml-2 text-sm text-gray-300">Il y a 1 semaine</span>
              </div>
              <p className="text-gray-300 mb-4">
                "Parfait pour mes déplacements professionnels. 
                Véhicules propres et chauffeurs courtois."
              </p>
              <div className="font-semibold">- Pierre M.</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                <span className="ml-2 text-sm text-gray-300">Il y a 3 jours</span>
              </div>
              <p className="text-gray-300 mb-4">
                "Le suivi GPS en temps réel est génial ! 
                Je sais exactement quand mon chauffeur arrive."
              </p>
              <div className="font-semibold">- Sarah L.</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Prêt à essayer DL-Transport ?</h3>
          <p className="text-gray-300 mb-6">
            Téléchargez l'application maintenant et profitez d'un service de transport premium
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => handleDownload('ios')}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              📱 App Store
            </button>
            <button 
              onClick={() => handleDownload('android')}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              🤖 Google Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 