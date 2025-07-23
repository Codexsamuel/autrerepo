'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    Award,
    BarChart3,
    CheckCircle,
    Globe,
    Maximize2,
    Pause,
    Play,
    Rocket,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Dynamic imports for heavy components
const Drone3DViewer = dynamic(() => import('@/components/drone/Drone3DViewer'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Chargement du simulateur 3D...</p>
      </div>
    </div>
  )
});

const FlightControls = dynamic(() => import('@/components/drone/FlightControls'));

const MissionPlanner = dynamic(() => import('@/components/drone/MissionPlanner'));

const WeatherSystem = dynamic(() => import('@/components/drone/WeatherSystem'));

const TelemetryDisplay = dynamic(() => import('@/components/drone/TelemetryDisplay'));



interface DemoSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  metrics?: { label: string; value: string; change: string }[];
}

const demoSections: DemoSection[] = [
  {
    id: 'simulation',
    title: 'Simulation Réaliste',
    description: 'Simulateur de drones professionnel avec physique avancée et environnements 3D réalistes',
    icon: Rocket,
    features: [
      'Physique de vol réaliste avec moteur physique',
      'Environnements 3D haute fidélité',
      'Support multi-drones simultanés',
      'Intégration météo en temps réel',
      'Simulation de capteurs et télémetrie'
    ],
    metrics: [
      { label: 'Précision Simulation', value: '99.8%', change: '+2.3%' },
      { label: 'Temps de Latence', value: '<5ms', change: '-15%' },
      { label: 'Environnements', value: '50+', change: '+12' }
    ]
  },
  {
    id: 'ai',
    title: 'Intelligence Artificielle',
    description: 'IA avancée pour navigation autonome, reconnaissance d\'objets et planification de missions',
    icon: Zap,
    features: [
      'Navigation autonome avec évitement d\'obstacles',
      'Reconnaissance d\'objets en temps réel',
      'Planification intelligente de missions',
      'Apprentissage automatique des patterns',
      'Prédiction de maintenance préventive'
    ],
    metrics: [
      { label: 'Précision IA', value: '96.5%', change: '+4.2%' },
      { label: 'Temps de Traitement', value: '0.8ms', change: '-25%' },
      { label: 'Modèles IA', value: '15+', change: '+3' }
    ]
  },
  {
    id: 'vr',
    title: 'Réalité Virtuelle',
    description: 'Expérience VR immersive pour formation pilotes et simulation avancée',
    icon: Globe,
    features: [
      'Support VR/AR complet (Oculus, HTC Vive)',
      'Contrôles haptiques réalistes',
      'Environnements immersifs',
      'Formation pilotes en VR',
      'Collaboration multi-utilisateurs VR'
    ],
    metrics: [
      { label: 'Compatibilité VR', value: '100%', change: '+5%' },
      { label: 'Latence VR', value: '<2ms', change: '-30%' },
      { label: 'Environnements VR', value: '25+', change: '+8' }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics Avancés',
    description: 'Plateforme d\'analyse de données pour optimisation des opérations et reporting',
    icon: BarChart3,
    features: [
      'Dashboard en temps réel',
      'Analytics prédictifs',
      'Reporting automatisé',
      'Intégration API multiples',
      'Visualisation 3D des données'
    ],
    metrics: [
      { label: 'Temps de Traitement', value: '<100ms', change: '-40%' },
      { label: 'Précision Prédictive', value: '94.2%', change: '+6.1%' },
      { label: 'Sources de Données', value: '200+', change: '+45' }
    ]
  }
];

export default function InvestorDemoPage() {
  const [activeSection, setActiveSection] = useState('simulation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [droneType, setDroneType] = useState<'sentinel' | 'atlas'>('sentinel');

  const [droneState, setDroneState] = useState({
    battery: 85,
    altitude: 120,
    speed: 15.5,
    heading: 45,
    gps: { lat: 3.8480, lng: 11.5021 },
    status: 'flying',
    mode: 'autonomous',
    signal: 92,
    temperature: 25.5,
    windSpeed: 8.2,
    windDirection: 180
  });

  const [weatherData, setWeatherData] = useState({
    temperature: 25.5,
    windSpeed: 8.2,
    windDirection: 180
  });

  const [missions] = useState([
    {
      id: '1',
      name: 'Reconnaissance Zone Industrielle',
      type: 'reconnaissance' as const,
      waypoints: [
        { lat: 3.8480, lng: 11.5021, altitude: 100, action: 'Décollage' },
        { lat: 3.8500, lng: 11.5040, altitude: 150, action: 'Surveillance' },
        { lat: 3.8520, lng: 11.5060, altitude: 200, action: 'Cartographie' }
      ],
      status: 'active' as const
    },
    {
      id: '2',
      name: 'Inspection Infrastructure',
      type: 'inspection' as const,
      waypoints: [
        { lat: 3.8480, lng: 11.5021, altitude: 50, action: 'Décollage' },
        { lat: 3.8490, lng: 11.5030, altitude: 80, action: 'Inspection' },
        { lat: 3.8500, lng: 11.5040, altitude: 100, action: 'Documentation' }
      ],
      status: 'pending' as const
    }
  ]);

  // Auto-demo rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoSections.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Real-time simulation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDroneState(prev => ({
          ...prev,
          battery: Math.max(0, prev.battery - 0.05),
          altitude: prev.altitude + (Math.random() - 0.5) * 1,
          speed: Math.max(0, Math.min(30, prev.speed + (Math.random() - 0.5) * 0.5)),
          heading: (prev.heading + (Math.random() - 0.5) * 1) % 360,
          gps: {
            lat: prev.gps.lat + (Math.random() - 0.5) * 0.0005,
            lng: prev.gps.lng + (Math.random() - 0.5) * 0.0005
          }
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleStateChange = (newState: any) => {
    setDroneState(prev => ({ ...prev, ...newState }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Header */}
      <header className="relative z-20 bg-black/60 backdrop-blur-xl border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DL Solutions - Plateforme Drone
                </h1>
                <p className="text-lg text-slate-300">Démonstration Investisseurs - Simulation Avancée</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-400">LIVE</span>
              </div>
              
              <button
                onClick={() => setShowVR(!showVR)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
              >
                {showVR ? 'Mode Desktop' : 'Mode VR'}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-slate-600/50"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sections */}
      <nav className="bg-slate-800/30 border-b border-slate-700/50">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 py-4">
            {demoSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        
        {/* Hero Section with Auto-Demo */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      {React.createElement(demoSections[currentDemo].icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {demoSections[currentDemo].title}
                      </h2>
                      <p className="text-xl text-slate-300 mt-2">
                        {demoSections[currentDemo].description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {demoSections[currentDemo].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {demoSections[currentDemo].metrics && (
                    <div className="grid grid-cols-3 gap-4 pt-6">
                      {demoSections[currentDemo].metrics!.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
                        >
                          <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                          <div className="text-sm text-slate-400">{metric.label}</div>
                          <div className="text-xs text-green-500 mt-1">{metric.change}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative">
              {showVR ? (
                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-center h-96 text-slate-400">
                    Mode VR - En développement
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                  <Drone3DViewer
                    droneType={droneType}
                    viewMode="external"
                    droneState={droneState}
                    isPlaying={isPlaying}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Demo Sections */}
        <div className="space-y-12">
          
          {/* Simulation Controls */}
          {activeSection === 'simulation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Simulateur en Temps Réel</h3>
                    <div className="flex items-center space-x-4">
                      <select
                        value={droneType}
                        onChange={(e) => setDroneType(e.target.value as 'sentinel' | 'atlas')}
                        className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                      >
                        <option value="sentinel">Sentinel V1</option>
                        <option value="atlas">Atlas X1</option>
                      </select>
                      
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                          isPlaying
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isPlaying ? 'Pause' : 'Démarrer'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 rounded-xl overflow-hidden">
                    <Drone3DViewer
                      droneType={droneType}
                      viewMode="external"
                      droneState={droneState}
                      isPlaying={isPlaying}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <FlightControls
                  droneState={droneState}
                  onStateChange={handleStateChange}
                  isPlaying={isPlaying}
                  onPlayPause={setIsPlaying}
                />
              </div>
            </motion.div>
          )}

          {/* Mission Planning */}
          {activeSection === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Planification de Missions IA</h3>
              <MissionPlanner
                missions={missions}
                activeMission={missions[0]}
                onStartMission={() => setIsPlaying(true)}
                onCancelMission={() => setIsPlaying(false)}
              />
            </motion.div>
          )}

          {/* Weather System */}
          {activeSection === 'vr' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Système Météorologique</h3>
              <WeatherSystem
                temperature={weatherData.temperature}
                windSpeed={weatherData.windSpeed}
                windDirection={weatherData.windDirection}
              />
            </motion.div>
          )}

          {/* Analytics Dashboard */}
          {activeSection === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Dashboard Analytics</h3>
              <TelemetryDisplay droneState={droneState} />
            </motion.div>
          )}
        </div>

        {/* Investment Highlights */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-blue-500/20 p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Points Clés d'Investissement</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold">Croissance Rapide</h4>
              <p className="text-slate-300">Marché en expansion de 25% par an</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold">Clientèle Premium</h4>
              <p className="text-slate-300">Plus de 500 clients entreprises</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold">Technologie Avancée</h4>
              <p className="text-slate-300">15 brevets déposés</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 