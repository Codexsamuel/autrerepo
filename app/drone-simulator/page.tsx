'use client';

import {
    Activity,
    Cloud,
    Gamepad2,
    Map,
    Maximize2,
    Pause,
    Play,
    RotateCcw,
    Satellite,
    Settings,
    Volume2,
    VolumeX
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import dynamique des composants 3D
const Drone3DViewer = dynamic(() => import('@/components/drone/Drone3DViewer'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg">Chargement du simulateur 3D...</div>
});

const FlightControls = dynamic(() => import('@/components/drone/FlightControls'));

const MissionPlanner = dynamic(() => import('@/components/drone/MissionPlanner'));

const WeatherSystem = dynamic(() => import('@/components/drone/WeatherSystem'));

const TelemetryDisplay = dynamic(() => import('@/components/drone/TelemetryDisplay'));

export default function DroneSimulatorPage() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [droneType, setDroneType] = useState<'sentinel' | 'atlas'>('sentinel');
  const [viewMode, setViewMode] = useState<'cockpit' | 'external' | 'map' | 'thermal'>('external');

  const [droneState, setDroneState] = useState({
    battery: 85,
    altitude: 120,
    speed: 15.5,
    heading: 45,
    gps: { lat: 3.8480, lng: 11.5021 },
    status: 'flying',
    mode: 'manual',
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
      name: 'Reconnaissance Zone A',
      type: 'reconnaissance' as const,
      waypoints: [
        { lat: 3.8480, lng: 11.5021, altitude: 100, action: 'Décollage' },
        { lat: 3.8500, lng: 11.5040, altitude: 150, action: 'Surveillance' },
        { lat: 3.8520, lng: 11.5060, altitude: 200, action: 'Cartographie' }
      ],
      status: 'pending' as const
    },
    {
      id: '2',
      name: 'Inspection Industrielle',
      type: 'inspection' as const,
      waypoints: [
        { lat: 3.8480, lng: 11.5021, altitude: 50, action: 'Décollage' },
        { lat: 3.8490, lng: 11.5030, altitude: 80, action: 'Inspection' },
        { lat: 3.8500, lng: 11.5040, altitude: 100, action: 'Documentation' }
      ],
      status: 'pending' as const
    }
  ]);

  const [activeMission, setActiveMission] = useState<any>(null);

  // Simulation en temps réel
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDroneState(prev => ({
          ...prev,
          battery: Math.max(0, prev.battery - 0.1),
          altitude: prev.altitude + (Math.random() - 0.5) * 2,
          speed: Math.max(0, Math.min(30, prev.speed + (Math.random() - 0.5) * 1)),
          heading: (prev.heading + (Math.random() - 0.5) * 2) % 360,
          gps: {
            lat: prev.gps.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.gps.lng + (Math.random() - 0.5) * 0.001
          }
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleStateChange = (newState: any) => {
    setDroneState(prev => ({ ...prev, ...newState }));
  };

  const handleStartMission = (mission: any) => {
    setActiveMission(mission);
    setIsPlaying(true);
  };

  const handleCancelMission = () => {
    setActiveMission(null);
    setIsPlaying(false);
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

  const tabs = [
    { id: 'simulator', label: 'Simulateur', icon: Gamepad2 },
    { id: 'missions', label: 'Missions', icon: Map },
    { id: 'weather', label: 'Météo', icon: Cloud },
    { id: 'telemetry', label: 'Télémetrie', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Header */}
      <header className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Simulateur de Drones DL Solutions
                </h1>
                <p className="text-sm text-slate-400">Simulation professionnelle en temps réel</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation des onglets */}
      <nav className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-slate-700 text-white border-b-2 border-blue-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6">
        
        {/* Onglet Simulateur */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Contrôles de simulation */}
            <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isPlaying
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Démarrer'}</span>
                </button>
                
                <button
                  onClick={() => setDroneState(prev => ({ ...prev, battery: 100, altitude: 0, speed: 0 }))}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={droneType}
                  onChange={(e) => setDroneType(e.target.value as 'sentinel' | 'atlas')}
                  className="px-3 py-2 rounded-lg bg-slate-600 border border-slate-500 text-white"
                >
                  <option value="sentinel">Sentinel V1</option>
                  <option value="atlas">Atlas X1</option>
                </select>
                
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as any)}
                  className="px-3 py-2 rounded-lg bg-slate-600 border border-slate-500 text-white"
                >
                  <option value="external">Vue externe</option>
                  <option value="cockpit">Cockpit</option>
                  <option value="map">Carte</option>
                  <option value="thermal">Thermique</option>
                </select>
              </div>
            </div>

            {/* Visualisation 3D */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
                  <Drone3DViewer
                    droneType={droneType}
                    viewMode={viewMode}
                    droneState={droneState}
                    isPlaying={isPlaying}
                  />
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
            </div>
          </div>
        )}

        {/* Onglet Missions */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
              <h2 className="text-2xl font-bold mb-6">Planification de Missions</h2>
              <MissionPlanner
                missions={missions}
                activeMission={activeMission}
                onStartMission={handleStartMission}
                onCancelMission={handleCancelMission}
              />
            </div>
          </div>
        )}

        {/* Onglet Météo */}
        {activeTab === 'weather' && (
          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
              <h2 className="text-2xl font-bold mb-6">Conditions Météorologiques</h2>
              <WeatherSystem
                temperature={weatherData.temperature}
                windSpeed={weatherData.windSpeed}
                windDirection={weatherData.windDirection}
              />
            </div>
          </div>
        )}

        {/* Onglet Télémetrie */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
              <h2 className="text-2xl font-bold mb-6">Données de Télémetrie</h2>
              <TelemetryDisplay droneState={droneState} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 