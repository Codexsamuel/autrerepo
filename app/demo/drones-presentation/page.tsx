"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

const technicalSpecs = {
  sentinel: {
    name: "Sentinel X1",
    type: "Drone Tactique",
    dimensions: "120cm x 120cm x 40cm",
    weight: "2.5 kg",
    maxPayload: "2 kg",
    maxSpeed: "120 km/h",
    maxAltitude: "4000m",
    range: "20 km",
    endurance: "40 minutes",
    battery: "LiPo 6S 5000mAh",
    motors: "4x Brushless 3508 380KV",
    propellers: "4x 12x4.5 pouces",
    camera: "4K 30fps + Caméra thermique",
    sensors: ["GPS", "IMU", "Baromètre", "Compass", "Télémétrie"],
    features: [
      "Vision nocturne thermique",
      "Détection de mines",
      "Mode kamikaze (optionnel)",
      "Pilotage FPV",
      "Retour vidéo HD",
      "Autopilote avancé"
    ]
  },
  atlas: {
    name: "Atlas X1",
    type: "Drone Industriel",
    dimensions: "150cm x 150cm x 50cm",
    weight: "4.2 kg",
    maxPayload: "3 kg",
    maxSpeed: "80 km/h",
    maxAltitude: "3000m",
    range: "15 km",
    endurance: "60 minutes",
    battery: "LiPo 6S 8000mAh",
    motors: "4x Brushless 4014 320KV",
    propellers: "4x 14x5 pouces",
    camera: "4K 60fps + Caméra multispectrale",
    sensors: ["GPS", "IMU", "Baromètre", "Compass", "Télémétrie", "Lidar"],
    features: [
      "Pulvérisation d'engrais",
      "Analyse sous-sol",
      "Transport médical",
      "Cartographie 3D",
      "Inspection industrielle",
      "Agriculture de précision"
    ]
  }
};

export default function DronesPresentationPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('sentinel');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <span className="text-xl">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f17] text-white">
        <div className="bg-[#181f2a] rounded-2xl shadow-xl p-10 max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Accès réservé</h2>
          <p className="mb-6 text-lg">Cette documentation technique est réservée aux membres inscrits.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Se connecter
            </Link>
            <Link href="/sign-up" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentSpecs = technicalSpecs[activeTab as keyof typeof technicalSpecs];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Documentation Technique - Drones
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Spécifications techniques détaillées et fiches techniques complètes de nos drones
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link href="/drones-3d" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
                🚁 Retour aux drones 3D
              </Link>
              <Link href="/demo/drone-simulator" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                🎮 Simulateur de vol
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#181f2a] rounded-lg p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('sentinel')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'sentinel'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🚁 Sentinel X1
            </button>
            <button
              onClick={() => setActiveTab('atlas')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'atlas'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🛸 Atlas X1
            </button>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image and Overview */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center">
              <div className="text-8xl mb-6">🚁</div>
              <h2 className="text-3xl font-bold mb-4">{currentSpecs.name}</h2>
              <p className="text-xl text-gray-400 mb-6">{currentSpecs.type}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="font-semibold text-blue-400">Portée</div>
                  <div>{currentSpecs.range}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="font-semibold text-green-400">Autonomie</div>
                  <div>{currentSpecs.endurance}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="font-semibold text-purple-400">Vitesse max</div>
                  <div>{currentSpecs.maxSpeed}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="font-semibold text-orange-400">Charge utile</div>
                  <div>{currentSpecs.maxPayload}</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Fonctionnalités Avancées</h3>
              <div className="space-y-2">
                {currentSpecs.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-green-400">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Spécifications Techniques</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Dimensions</div>
                    <div className="font-semibold">{currentSpecs.dimensions}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Poids</div>
                    <div className="font-semibold">{currentSpecs.weight}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Altitude max</div>
                    <div className="font-semibold">{currentSpecs.maxAltitude}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Batterie</div>
                    <div className="font-semibold">{currentSpecs.battery}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Système de Propulsion</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Moteurs</div>
                  <div className="font-semibold">{currentSpecs.motors}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Hélices</div>
                  <div className="font-semibold">{currentSpecs.propellers}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Système de Capteurs</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Caméra</div>
                  <div className="font-semibold">{currentSpecs.camera}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Capteurs</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentSpecs.sensors.map((sensor, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                        {sensor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Applications et Utilisations</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="text-lg font-bold mb-2">Sécurité & Surveillance</h4>
                <p className="text-gray-400 text-sm">
                  Surveillance de zones sensibles, patrouilles automatisées, détection d'intrusion
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🌾</div>
                <h4 className="text-lg font-bold mb-2">Agriculture</h4>
                <p className="text-gray-400 text-sm">
                  Pulvérisation de précision, analyse des cultures, cartographie des champs
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🏭</div>
                <h4 className="text-lg font-bold mb-2">Industrie</h4>
                <p className="text-gray-400 text-sm">
                  Inspection d'infrastructures, maintenance préventive, cartographie 3D
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-4">Intéressé par nos drones ?</h3>
            <p className="text-gray-300 mb-6">
              Contactez-nous pour une démonstration personnalisée ou pour obtenir un devis
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                📞 Nous contacter
              </Link>
              <Link href="/devis" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
                💰 Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 