"use client";

import { useAuth } from "@/hooks/useAuth";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";

const Drone3DModal = dynamic(() => import("@/components/Drone3DModal"), { ssr: false });
const DronePrototypeImages = dynamic(() => import("@/components/DronePrototypeImages"), { ssr: false });

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const menuItems: MenuItem[] = [
  { id: "accueil", label: "Accueil", icon: "🏠", description: "Présentation du projet" },
  { id: "contexte", label: "Contexte", icon: "🌍", description: "Objectifs stratégiques" },
  { id: "sentinel", label: "Sentinel V1", icon: "🛰️", description: "Drone militaire tactique" },
  { id: "atlas", label: "Atlas X1", icon: "🏭", description: "Drone industriel" },
  { id: "composants", label: "Composants", icon: "⚙️", description: "Technologie embarquée" },
  { id: "controle", label: "Système de contrôle", icon: "🎮", description: "Casque & télécommande" },
  { id: "applications", label: "Applications", icon: "🔬", description: "Cas d'usage concrets" },
  { id: "comparatif", label: "Comparatif", icon: "📊", description: "Modèles 3D interactifs" },
  { id: "business", label: "Business Plan", icon: "💼", description: "Modèle économique" },
  { id: "faq", label: "FAQ", icon: "❓", description: "Questions & réponses" },
  { id: "contact", label: "Contact", icon: "📞", description: "Proposition commerciale" },
  { id: "simulator", label: "Simulateur", icon: "🎮", description: "Simulation en temps réel" },
];

const faqItems = [
  {
    question: "Quelle est l'autonomie réelle en condition de guerre ?",
    answer: "L'autonomie du Sentinel V1 varie de 35-40 minutes en conditions normales, mais peut descendre à 25-30 minutes en mode tactique (vitesse élevée, charge utile). L'Atlas X1 maintient 30-45 minutes même avec réservoir plein."
  },
  {
    question: "Quelle est la précision des capteurs IA ?",
    answer: "Les capteurs IA offrent une précision de détection de 95% pour les cibles humaines, 98% pour les véhicules, et 92% pour les mines. Le système d'analyse d'image en temps réel traite 30 images/seconde."
  },
  {
    question: "Le drone peut-il être armé ?",
    answer: "Le Sentinel V1 dispose d'un système de charge explosive optionnel (mode désactivé par défaut). L'activation nécessite une autorisation militaire et un code de sécurité multi-niveaux."
  },
  {
    question: "Peut-on le fabriquer localement ?",
    answer: "Oui, DL Solutions prévoit une fabrication locale au Cameroun avec sourcing de composants depuis la Chine. La structure, l'assemblage et les tests seront réalisés localement pour 60% de la valeur ajoutée."
  },
  {
    question: "Est-il compatible avec d'autres systèmes ?",
    answer: "Les drones utilisent des protocoles standards (MAVLink, DJI) et peuvent s'intégrer avec des systèmes de contrôle existants. Des APIs sont disponibles pour développement d'applications tierces."
  }
];

export default function DronesPresentationPage() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("accueil");
  const [show3D, setShow3D] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<'atlas' | 'sentinel'>('sentinel');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
          <p className="mb-6 text-lg">Cette présentation est réservée aux membres inscrits.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition">Se connecter</Link>
            <Link href="/sign-up" className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition">Créer un compte</Link>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "accueil":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DL DRONES
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                L'excellence technologique pour la défense, l'industrie et l'agriculture de demain
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#181f2a] rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🛰️</div>
                <h3 className="text-xl font-bold mb-2">Sentinel V1</h3>
                <p className="text-gray-300">Drone militaire tactique pour reconnaissance et missions spéciales</p>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-xl font-bold mb-2">Atlas X1</h3>
                <p className="text-gray-300">Drone industriel pour agriculture et transport médical</p>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-300">IA embarquée, fabrication locale, solutions sur mesure</p>
              </div>
            </div>
          </motion.div>
        );

      case "contexte":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">Contexte & Objectifs Stratégiques</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#181f2a] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-red-400">🚨 Urgences Sécuritaires</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Cameroun, Burkina Faso, Sahel</li>
                  <li>• Besoin de reconnaissance avancée</li>
                  <li>• Détection de mines et explosifs</li>
                  <li>• Intervention rapide et précise</li>
                </ul>
              </div>
              
              <div className="bg-[#181f2a] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-green-400">🌾 Autonomie Agricole</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Agriculture de précision</li>
                  <li>• Analyse de sous-sol</li>
                  <li>• Transport médical en terrain difficile</li>
                  <li>• Cartographie environnementale</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );

      case "sentinel":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">Sentinel V1 - Drone Militaire Tactique</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Spécifications Techniques</h3>
                <div className="bg-[#181f2a] rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Poids:</span>
                    <span className="font-bold">1.4 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autonomie:</span>
                    <span className="font-bold">35-40 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitesse max:</span>
                    <span className="font-bold">85 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portée:</span>
                    <span className="font-bold">15 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Charge utile:</span>
                    <span className="font-bold">900g</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4">Capacités</h3>
                <div className="bg-[#181f2a] rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌙</span>
                    <span>Vision nocturne thermique</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💣</span>
                    <span>Détection de mines</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>Mode kamikaze (optionnel)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎮</span>
                    <span>Pilotage FPV casque</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛰️</span>
                    <span>Portée 20 km</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] rounded-xl overflow-hidden">
              <DronePrototypeImages droneType="sentinel" />
            </div>
          </motion.div>
        );

      case "atlas":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">Atlas X1 - Drone Industriel</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Spécifications Techniques</h3>
                <div className="bg-[#181f2a] rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Poids:</span>
                    <span className="font-bold">2.8 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autonomie:</span>
                    <span className="font-bold">30-45 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitesse max:</span>
                    <span className="font-bold">72 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portée:</span>
                    <span className="font-bold">12 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Charge utile:</span>
                    <span className="font-bold">3 kg</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4">Applications</h3>
                <div className="bg-[#181f2a] rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌾</span>
                    <span>Pulvérisation d'engrais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛢️</span>
                    <span>Analyse sous-sol pétrolier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚑</span>
                    <span>Transport médical d'urgence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📷</span>
                    <span>Caméra 4K stabilisée</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📦</span>
                    <span>Charge utile jusqu'à 3 kg</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] rounded-xl overflow-hidden">
              <DronePrototypeImages droneType="atlas" />
            </div>
          </motion.div>
        );

      case "comparatif":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">Comparatif - Modèles 3D Interactifs</h2>
            
            <div className="flex gap-4 justify-center mb-8">
              <button
                onClick={() => setSelectedDrone('sentinel')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedDrone === 'sentinel' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Sentinel V1
              </button>
              <button
                onClick={() => setSelectedDrone('atlas')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedDrone === 'atlas' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Atlas X1
              </button>
            </div>
            
            <div className="h-[500px] rounded-xl overflow-hidden">
              <Drone3DModal isOpen={show3D} onClose={() => setShow3D(false)} />
            </div>
            
            <button
              onClick={() => setShow3D(true)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              🎯 Voir en 3D Interactif
            </button>
          </motion.div>
        );

      case "faq":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-center mb-8">Questions & Réponses</h2>
            
            {faqItems.map((item, index) => (
              <div key={index} className="bg-[#181f2a] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-[#1a2233] transition-colors"
                >
                  <span className="font-semibold text-lg">{item.question}</span>
                  <span className="text-2xl">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6 text-gray-300"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        );

      case "contact":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">Contact & Proposition Commerciale</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#181f2a] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">📞 Contact DL Solutions</h3>
                <div className="space-y-3 text-gray-300">
                  <p>📍 Yaoundé – Cameroun</p>
                  <p>📧 contact@dl-solutions.tech</p>
                  <p>📞 +237 6 89 67 29 32</p>
                  <p>🌐 Site en développement</p>
                </div>
              </div>
              
              <div className="bg-[#181f2a] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">💼 Services Proposés</h3>
                <div className="space-y-3 text-gray-300">
                  <p>• Démonstration en conditions réelles</p>
                  <p>• Formation des opérateurs</p>
                  <p>• Maintenance et support technique</p>
                  <p>• Développement sur mesure</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform">
                📋 Demander une démonstration
              </button>
            </div>
          </motion.div>
        );

      case "simulator":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">🎮 Simulateur de Drones</h2>
            
            <div className="bg-[#181f2a] rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Simulation en Temps Réel</h3>
              <p className="text-gray-300 mb-8">
                Testez nos drones dans un environnement virtuel réaliste. 
                Contrôlez l'altitude, la vitesse, et observez les données en temps réel.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-4xl mb-4">🛰️</div>
                  <h4 className="text-lg font-bold mb-2">Sentinel V1</h4>
                  <p className="text-gray-400">Simulation militaire avec vision nocturne</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-4xl mb-4">🏭</div>
                  <h4 className="text-lg font-bold mb-2">Atlas X1</h4>
                  <p className="text-gray-400">Simulation industrielle avec capteurs</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-bold mb-2">Données en Temps Réel</h4>
                  <p className="text-gray-400">Graphiques et métriques détaillées</p>
                </div>
              </div>
              
              <Link 
                href="/drone-simulator" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
              >
                🚀 Lancer le Simulateur
              </Link>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Section en développement</h2>
            <p className="text-gray-300">Cette section sera bientôt disponible.</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white" ref={containerRef}>
      {/* Navigation latérale */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#181f2a] border-r border-gray-700 overflow-y-auto z-50">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">DL Drones</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {renderSection()}
        </div>
      </div>

      {/* Indicateur de progression */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: scrollYProgress.get() * 100 + "%" }}
        />
      </div>
    </div>
  );
} 