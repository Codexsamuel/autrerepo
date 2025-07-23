"use client";

import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const FeatureDetailModal = dynamic(() => import("@/components/FeatureDetailModal"));
const DronePrototypeImages = dynamic(() => import("@/components/DronePrototypeImages"));

const featuresSentinel = [
  {
    label: 'Vision nocturne thermique',
    description: 'Permet de voir dans l\'obscurité totale grâce à une caméra thermique embarquée. Idéal pour les missions de nuit ou en conditions difficiles.',
    icon: '🌙',
  },
  {
    label: 'Détection de mines',
    description: 'Détecte les mines et explosifs grâce à des capteurs spécialisés et à l\'IA embarquée.',
    icon: '💣',
  },
  {
    label: 'Mode kamikaze avec charge explosive',
    description: 'Option tactique permettant au drone de neutraliser une cible en mode kamikaze (fonction désactivée par défaut, usage militaire strict).',
    icon: '⚡',
  },
  {
    label: 'Pilotage FPV casque + télécommande',
    description: 'Contrôle immersif via casque FPV et radiocommande longue portée, pour une précision maximale.',
    icon: '🎮',
  },
  {
    label: 'Portée 20 km, autonomie 40 minutes',
    description: 'Permet des missions longues distances avec une autonomie optimisée et une portée de communication jusqu\'à 20 km.',
    icon: '🛰️',
  },
];
const featuresAtlas = [
  {
    label: 'Pulvérisation d\'engrais et pesticides',
    description: 'Système de pulvérisation intelligent pour l\'agriculture de précision, avec réservoir intégré.',
    icon: '🌾',
  },
  {
    label: 'Analyse sous-sol pétrolier',
    description: 'Capteurs avancés pour l\'analyse géologique et la détection de ressources souterraines.',
    icon: '🛢️',
  },
  {
    label: 'Transport médical d\'urgence',
    description: 'Capacité à transporter du matériel médical ou des échantillons en urgence, même dans des zones difficiles d\'accès.',
    icon: '🚑',
  },
  {
    label: 'Caméra 4K stabilisée + IA embarquée',
    description: 'Caméra ultra haute définition avec stabilisation et analyse d\'image en temps réel par IA.',
    icon: '📷',
  },
  {
    label: 'Charge utile jusqu\'à 3 kg',
    description: 'Peut transporter des charges lourdes pour des missions industrielles ou logistiques.',
    icon: '📦',
  },
];

export default function Drones3DPage() {
  const { user, loading } = useAuth();
  const [show3D, setShow3D] = useState(false);
  const [featureDetail, setFeatureDetail] = useState<null | { label: string; description: string; icon: string }>(null);

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
          <p className="mb-6 text-lg">Cette page premium est réservée aux membres inscrits.<br/>Merci de vous connecter ou de créer un compte pour découvrir le projet drone en détail.</p>
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

  if (user.role !== 'super_admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f17] text-white">
        <div className="bg-[#181f2a] rounded-2xl shadow-xl p-10 max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Accès restreint</h2>
          <p className="mb-6 text-lg">Cette page est réservée aux administrateurs.<br/>Contactez-nous pour plus d'informations.</p>
          <Link href="/" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Drones 3D - Projets Avancés
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez nos prototypes de drones nouvelle génération avec visualisation 3D interactive
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Sentinel Drone */}
        <div className="mb-16 animate-fade-in">
          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-red-400">Sentinel X1 - Drone Tactique</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Drone tactique haute performance conçu pour les missions de sécurité et de surveillance avancée.
                </p>
                <div className="space-y-3 mb-6">
                  {featuresSentinel.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      onClick={() => setFeatureDetail(feature)}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShow3D(true)}
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300"
                >
                  Voir en 3D
                </button>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🚁</div>
                <h3 className="text-xl font-bold mb-2">Sentinel X1</h3>
                <p className="text-gray-400">Drone tactique</p>
              </div>
            </div>
          </div>
        </div>

        {/* Atlas Drone */}
        <div className="mb-16 animate-fade-in">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border border-blue-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 text-center">
                  <div className="text-6xl mb-4">🛸</div>
                  <h3 className="text-xl font-bold mb-2">Atlas X1</h3>
                  <p className="text-gray-400">Drone industriel</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-4 text-blue-400">Atlas X1 - Drone Industriel</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Drone industriel polyvalent pour l'agriculture, la logistique et l'analyse environnementale.
                </p>
                <div className="space-y-3 mb-6">
                  {featuresAtlas.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      onClick={() => setFeatureDetail(feature)}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShow3D(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                >
                  Voir en 3D
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Visualization */}
        {show3D && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-[#181f2a] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Visualisation 3D</h3>
                <button 
                  onClick={() => setShow3D(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center">
                <div className="text-8xl mb-6 animate-bounce">🚁</div>
                <h4 className="text-xl font-bold mb-4">Simulation 3D Interactive</h4>
                <p className="text-gray-400 mb-6">
                  Interface de contrôle en temps réel avec visualisation 3D des drones
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎮</div>
                    <h5 className="font-semibold mb-2">Contrôles de vol</h5>
                    <p className="text-sm text-gray-400">Pilotage en temps réel</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl mb-2">📊</div>
                    <h5 className="font-semibold mb-2">Télémetrie</h5>
                    <p className="text-sm text-gray-400">Données en temps réel</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl mb-2">🗺️</div>
                    <h5 className="font-semibold mb-2">Planification</h5>
                    <p className="text-sm text-gray-400">Missions automatisées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Detail Modal */}
        {featureDetail && (
          <FeatureDetailModal 
            isOpen={!!featureDetail}
            feature={featureDetail} 
            onClose={() => setFeatureDetail(null)} 
          />
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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