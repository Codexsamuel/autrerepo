"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

const technicalSpecs = {
  designation: {
    nom: "DL-FPV Tactical V1",
    type: "Drone FPV kamikaze léger",
    usage: "Frappe ciblée, neutralisation, appui terrain",
    fabrication: "Semi-locale (châssis imprimé 3D + composants importés)"
  },
  composants: {
    chassis: "Carbone 5 pouces, résistant aux chocs",
    moteurs: "4 x Brushless 2207 2400KV",
    esc: "4-en-1 35A BLHeli_S",
    controleur: "F4/F7 avec gyroscope MPU6000",
    camera: "CMOS 1200TVL, objectif 2.1mm (angle large)",
    vtx: "5.8GHz analogique (800mW)",
    antenne: "RHCP ou Pagoda 2 (longue portée)",
    recepteur: "TBS Nano Rx (2.4GHz ou Crossfire)",
    batterie: "LiPo 4S / 6S 1300 à 1500mAh 100C",
    charge: "Charge explosive déclenchable / charge inerte"
  },
  dimensions: {
    taille: "5 pouces (127mm)",
    poids: "450-550g (sans charge)",
    chargeMax: "200-300g",
    vitesse: "120-150 km/h",
    altitude: "100-500m",
    portee: "2-5 km",
    autonomie: "8-12 minutes"
  },
  performances: {
    acceleration: "0-100 km/h en 2-3 secondes",
    manoeuvrabilite: "Taux de roulis/pitch 800-1200°/s",
    stabilite: "Mode acro et angle",
    resistance: "Chocs jusqu'à 50G",
    temperature: "-10°C à +50°C"
  }
};

export default function FPVKamikazePage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-b border-red-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              DL-FPV Tactical V1
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Drone FPV kamikaze tactique à bas coût - Frappe ciblée et neutralisation
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link href="/drones-3d" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
                🚁 Retour aux drones 3D
              </Link>
              <Link href="/demo/drone-codes" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                💻 Codes
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
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              📋 Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'specs'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              ⚙️ Spécifications
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'components'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🔧 Composants
            </button>
            <button
              onClick={() => setActiveTab('missions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'missions'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🎯 Missions
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image and Overview */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 text-center border border-red-500/20">
                <div className="text-8xl mb-6">🚁</div>
                <h2 className="text-3xl font-bold mb-4 text-red-400">DL-FPV Tactical V1</h2>
                <p className="text-xl text-gray-400 mb-6">Drone FPV Kamikaze Tactique</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-semibold text-red-400">Portée</div>
                    <div>2-5 km</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-semibold text-orange-400">Autonomie</div>
                    <div>8-12 min</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-semibold text-yellow-400">Vitesse max</div>
                    <div>150 km/h</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-semibold text-red-400">Charge utile</div>
                    <div>200-300g</div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Caractéristiques Clés</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-red-400">⚡</span>
                    <span>Accélération 0-100 km/h en 2-3 secondes</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-red-400">🎮</span>
                    <span>Pilotage FPV immersif</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-red-400">💥</span>
                    <span>Charge explosive déclenchable</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-red-400">🛡️</span>
                    <span>Résistance aux chocs jusqu'à 50G</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                    <span className="text-red-400">🌡️</span>
                    <span>Opérationnel -10°C à +50°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Overview */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Désignation</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Nom</div>
                    <div className="font-semibold">{technicalSpecs.designation.nom}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Type</div>
                    <div className="font-semibold">{technicalSpecs.designation.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Usage</div>
                    <div className="font-semibold">{technicalSpecs.designation.usage}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Fabrication</div>
                    <div className="font-semibold">{technicalSpecs.designation.fabrication}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Dimensions & Caractéristiques</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Taille</div>
                    <div className="font-semibold">{technicalSpecs.dimensions.taille}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Poids</div>
                    <div className="font-semibold">{technicalSpecs.dimensions.poids}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Charge max</div>
                    <div className="font-semibold">{technicalSpecs.dimensions.chargeMax}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Vitesse</div>
                    <div className="font-semibold">{technicalSpecs.dimensions.vitesse}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Altitude</div>
                    <div className="font-semibold">{technicalSpecs.dimensions.altitude}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Portée</div>
                    <div className="font-semibold">{technicalSpecs.dimensions.portee}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Spécifications Techniques Détaillées</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-red-400">Performances de Vol</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Accélération</span>
                      <span className="font-semibold">{technicalSpecs.performances.acceleration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Manœuvrabilité</span>
                      <span className="font-semibold">{technicalSpecs.performances.manoeuvrabilite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stabilité</span>
                      <span className="font-semibold">{technicalSpecs.performances.stabilite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Résistance aux chocs</span>
                      <span className="font-semibold">{technicalSpecs.performances.resistance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Température opérationnelle</span>
                      <span className="font-semibold">{technicalSpecs.performances.temperature}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-red-400">Caractéristiques Physiques</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Autonomie</span>
                      <span className="font-semibold">{technicalSpecs.dimensions.autonomie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Altitude maximale</span>
                      <span className="font-semibold">{technicalSpecs.dimensions.altitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portée de communication</span>
                      <span className="font-semibold">{technicalSpecs.dimensions.portee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vitesse maximale</span>
                      <span className="font-semibold">{technicalSpecs.dimensions.vitesse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Charge utile maximale</span>
                      <span className="font-semibold">{technicalSpecs.dimensions.chargeMax}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Composants Techniques</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Châssis</h4>
                    <p>{technicalSpecs.composants.chassis}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Moteurs</h4>
                    <p>{technicalSpecs.composants.moteurs}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">ESC</h4>
                    <p>{technicalSpecs.composants.esc}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Contrôleur de vol</h4>
                    <p>{technicalSpecs.composants.controleur}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Caméra FPV</h4>
                    <p>{technicalSpecs.composants.camera}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Émetteur vidéo (VTx)</h4>
                    <p>{technicalSpecs.composants.vtx}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Antenne</h4>
                    <p>{technicalSpecs.composants.antenne}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Récepteur radio</h4>
                    <p>{technicalSpecs.composants.recepteur}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Batterie</h4>
                    <p>{technicalSpecs.composants.batterie}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Charge utile</h4>
                    <p>{technicalSpecs.composants.charge}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'missions' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Types de Missions</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-lg font-bold mb-2">Frappe Ciblée</h4>
                  <p className="text-gray-400 mb-4">Neutralisation précise de cibles spécifiques</p>
                  <ul className="text-sm space-y-1">
                    <li>• Véhicules ennemis</li>
                    <li>• Positions fortifiées</li>
                    <li>• Équipements stratégiques</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h4 className="text-lg font-bold mb-2">Anti-Terrorisme</h4>
                  <p className="text-gray-400 mb-4">Opérations de sécurité et de protection</p>
                  <ul className="text-sm space-y-1">
                    <li>• Neutralisation de menaces</li>
                    <li>• Protection de convois</li>
                    <li>• Sécurisation de zones</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="text-4xl mb-4">⚔️</div>
                  <h4 className="text-lg font-bold mb-2">Appui Tactique</h4>
                  <p className="text-gray-400 mb-4">Support aux forces terrestres</p>
                  <ul className="text-sm space-y-1">
                    <li>• Appui feu</li>
                    <li>• Reconnaissance</li>
                    <li>• Éclairage de cibles</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="text-4xl mb-4">🚨</div>
                  <h4 className="text-lg font-bold mb-2">Urgence Tactique</h4>
                  <p className="text-gray-400 mb-4">Interventions rapides et décisives</p>
                  <ul className="text-sm space-y-1">
                    <li>• Situations critiques</li>
                    <li>• Évacuation d'urgence</li>
                    <li>• Contre-attaque</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-500/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Avantages Tactiques</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-bold mb-2">Coût réduit</h4>
                  <p className="text-sm text-gray-400">Fabrication semi-locale, composants accessibles</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-bold mb-2">Rapidité</h4>
                  <p className="text-sm text-gray-400">Déploiement et intervention ultra-rapides</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-bold mb-2">Précision</h4>
                  <p className="text-sm text-gray-400">Frappe ciblée avec dommages collatéraux minimaux</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-500/20">
          <h3 className="text-2xl font-bold mb-4">Intéressé par ce drone tactique ?</h3>
          <p className="text-gray-300 mb-6">
            Contactez-nous pour une démonstration ou pour obtenir un devis personnalisé
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300">
              📞 Nous contacter
            </Link>
            <Link href="/devis" className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300">
              💰 Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 