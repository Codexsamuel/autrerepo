"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import {
    AlertTriangle,
    Battery,
    Cloud,
    CloudLightning,
    CloudRain,
    Download,
    Droplets,
    Loader2,
    Maximize2,
    Minimize2,
    Moon,
    Pause,
    Play,
    RotateCcw,
    Shield,
    Sun,
    Thermometer,
    Trash2,
    Volume2,
    VolumeX,
    Wifi,
    Wind
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Drone3DModal = dynamic(() => import("@/components/Drone3DModal"), { ssr: false });
const DronePrototypeImages = dynamic(() => import("@/components/DronePrototypeImages"), { ssr: false });
const DroneFlightChart = dynamic(() => import("@/components/DroneFlightChart"), { ssr: false });

interface SimulationState {
  isRunning: boolean;
  droneType: 'sentinel' | 'atlas';
  altitude: number;
  speed: number;
  battery: number;
  signal: number;
  temperature: number;
  windSpeed: number;
  weather: 'clear' | 'cloudy' | 'rain' | 'storm';
  timeOfDay: 'day' | 'night';
  autoRotate: boolean;
  showTrajectory: boolean;
  showSensors: boolean;
  showGrid: boolean;
  soundEnabled: boolean;
  fullscreen: boolean;
}

interface FlightData {
  timestamp: number;
  altitude: number;
  speed: number;
  battery: number;
  signal: number;
  temperature: number;
  coordinates: { x: number; y: number; z: number };
}

export default function DroneSimulatorPage() {
  const { user, loading } = useAuth();
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    droneType: 'sentinel',
    altitude: 50,
    speed: 25,
    battery: 100,
    signal: 95,
    temperature: 25,
    windSpeed: 5,
    weather: 'clear',
    timeOfDay: 'day',
    autoRotate: true,
    showTrajectory: true,
    showSensors: true,
    showGrid: true,
    soundEnabled: true,
    fullscreen: false,
  });

  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [show3D, setShow3D] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<'sentinel' | 'atlas'>('sentinel');
  const [simulationTime, setSimulationTime] = useState(0);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const simulationInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(Date.now());

  // Simulation loop
  useEffect(() => {
    if (simulationState.isRunning) {
      simulationInterval.current = setInterval(() => {
        const elapsed = (Date.now() - startTime.current) / 1000;
        setSimulationTime(elapsed);

        // Update flight data
        const newData: FlightData = {
          timestamp: Date.now(),
          altitude: simulationState.altitude + Math.sin(elapsed * 0.1) * 2,
          speed: simulationState.speed + Math.random() * 5 - 2.5,
          battery: Math.max(0, simulationState.battery - 0.1),
          signal: simulationState.signal + Math.random() * 10 - 5,
          temperature: simulationState.temperature + Math.sin(elapsed * 0.05) * 2,
          coordinates: {
            x: Math.sin(elapsed * 0.2) * 100,
            y: Math.cos(elapsed * 0.2) * 100,
            z: simulationState.altitude
          }
        };

        setFlightData(prev => [...prev.slice(-50), newData]);

        // Update simulation state
        setSimulationState(prev => ({
          ...prev,
          battery: newData.battery,
          signal: Math.max(0, Math.min(100, newData.signal)),
          temperature: newData.temperature
        }));

        // Generate alerts
        if (newData.battery < 20 && !alerts.includes('Battery low')) {
          setAlerts(prev => [...prev, 'Battery low']);
        }
        if (newData.signal < 30 && !alerts.includes('Signal weak')) {
          setAlerts(prev => [...prev, 'Signal weak']);
        }
        if (newData.temperature > 40 && !alerts.includes('Temperature high')) {
          setAlerts(prev => [...prev, 'Temperature high']);
        }
      }, 100);
    } else {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    }

    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, [simulationState.isRunning, simulationState.altitude, simulationState.speed, simulationState.battery, simulationState.signal, simulationState.temperature, alerts]);

  const startSimulation = () => {
    setSimulationState(prev => ({ ...prev, isRunning: true }));
    startTime.current = Date.now();
    setFlightData([]);
    setAlerts([]);
  };

  const stopSimulation = () => {
    setSimulationState(prev => ({ ...prev, isRunning: false }));
  };

  const resetSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isRunning: false,
      altitude: 50,
      speed: 25,
      battery: 100,
      signal: 95,
      temperature: 25,
    }));
    setFlightData([]);
    setAlerts([]);
    setSimulationTime(0);
  };

  const exportFlightData = async () => {
    setIsExporting(true);
    try {
      const data = {
        droneType: simulationState.droneType,
        simulationTime,
        flightData,
        parameters: simulationState,
        timestamp: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `drone-simulation-${simulationState.droneType}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f17] text-white">
        <div className="bg-[#181f2a] rounded-2xl shadow-xl p-10 max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Accès réservé</h2>
          <p className="mb-6 text-lg">Le simulateur de drones est réservé aux membres inscrits.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition">Se connecter</Link>
            <Link href="/sign-up" className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition">Créer un compte</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Header */}
      <header className="bg-[#181f2a] border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">🛰️ DL Drone Simulator</h1>
            <Badge variant={simulationState.isRunning ? "default" : "secondary"}>
              {simulationState.isRunning ? "SIMULATION ACTIVE" : "EN PAUSE"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSimulationState(prev => ({ ...prev, fullscreen: !prev.fullscreen }))}
              variant="outline"
              size="sm"
            >
              {simulationState.fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => setSimulationState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
              variant="outline"
              size="sm"
            >
              {simulationState.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Simulation Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* 3D Visualization */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Visualisation 3D - {simulationState.droneType === 'sentinel' ? 'Sentinel V1' : 'Atlas X1'}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShow3D(true)}
                      size="sm"
                      variant="outline"
                    >
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Plein écran
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden bg-black">
                  <DronePrototypeImages droneType={simulationState.droneType} />
                </div>
              </CardContent>
            </Card>

            {/* Flight Controls */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <CardTitle>Contrôles de vol</CardTitle>
                <CardDescription>Pilotez votre drone en temps réel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Altitude (m)</label>
                    <Slider
                      value={[simulationState.altitude]}
                      onValueChange={([value]) => setSimulationState(prev => ({ ...prev, altitude: value }))}
                      max={200}
                      min={0}
                      step={1}
                      disabled={simulationState.isRunning}
                    />
                    <span className="text-xs text-gray-400">{simulationState.altitude}m</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vitesse (km/h)</label>
                    <Slider
                      value={[simulationState.speed]}
                      onValueChange={([value]) => setSimulationState(prev => ({ ...prev, speed: value }))}
                      max={100}
                      min={0}
                      step={5}
                      disabled={simulationState.isRunning}
                    />
                    <span className="text-xs text-gray-400">{simulationState.speed} km/h</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Batterie (%)</label>
                    <Slider
                      value={[simulationState.battery]}
                      onValueChange={([value]) => setSimulationState(prev => ({ ...prev, battery: value }))}
                      max={100}
                      min={0}
                      step={1}
                      disabled={simulationState.isRunning}
                    />
                    <span className="text-xs text-gray-400">{simulationState.battery}%</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Signal (%)</label>
                    <Slider
                      value={[simulationState.signal]}
                      onValueChange={([value]) => setSimulationState(prev => ({ ...prev, signal: value }))}
                      max={100}
                      min={0}
                      step={1}
                      disabled={simulationState.isRunning}
                    />
                    <span className="text-xs text-gray-400">{simulationState.signal}%</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={startSimulation}
                    disabled={simulationState.isRunning}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Démarrer
                  </Button>
                  <Button
                    onClick={stopSimulation}
                    disabled={!simulationState.isRunning}
                    variant="outline"
                    className="flex-1"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={resetSimulation}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Data */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <CardTitle>Données en temps réel</CardTitle>
                <CardDescription>Temps de simulation: {simulationTime.toFixed(1)}s</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Battery className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-2xl font-bold">{simulationState.battery.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Batterie</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Wifi className="h-6 w-6 mx-auto mb-2 text-green-400" />
                    <div className="text-2xl font-bold">{simulationState.signal.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Signal</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-400" />
                    <div className="text-2xl font-bold">{simulationState.temperature.toFixed(1)}°C</div>
                    <div className="text-xs text-gray-400">Température</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Wind className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                    <div className="text-2xl font-bold">{simulationState.windSpeed} km/h</div>
                    <div className="text-xs text-gray-400">Vent</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Charts */}
            {flightData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DroneFlightChart
                  flightData={flightData}
                  title="Altitude"
                  dataKey="altitude"
                  color="#3B82F6"
                  unit="m"
                  minValue={0}
                  maxValue={200}
                />
                <DroneFlightChart
                  flightData={flightData}
                  title="Vitesse"
                  dataKey="speed"
                  color="#10B981"
                  unit=" km/h"
                  minValue={0}
                  maxValue={100}
                />
                <DroneFlightChart
                  flightData={flightData}
                  title="Batterie"
                  dataKey="battery"
                  color="#F59E0B"
                  unit="%"
                  minValue={0}
                  maxValue={100}
                />
                <DroneFlightChart
                  flightData={flightData}
                  title="Signal"
                  dataKey="signal"
                  color="#EF4444"
                  unit="%"
                  minValue={0}
                  maxValue={100}
                />
              </div>
            )}
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* Drone Selection */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <CardTitle>Sélection du drone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    onClick={() => setSimulationState(prev => ({ ...prev, droneType: 'sentinel' }))}
                    variant={simulationState.droneType === 'sentinel' ? 'default' : 'outline'}
                    className="w-full justify-start"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Sentinel V1
                    <Badge className="ml-auto" variant="secondary">Militaire</Badge>
                  </Button>
                  
                  <Button
                    onClick={() => setSimulationState(prev => ({ ...prev, droneType: 'atlas' }))}
                    variant={simulationState.droneType === 'atlas' ? 'default' : 'outline'}
                    className="w-full justify-start"
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    Atlas X1
                    <Badge className="ml-auto" variant="secondary">Industriel</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Environment Settings */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <CardTitle>Environnement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Météo</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setSimulationState(prev => ({ ...prev, weather: 'clear' }))}
                      variant={simulationState.weather === 'clear' ? 'default' : 'outline'}
                      size="sm"
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setSimulationState(prev => ({ ...prev, weather: 'cloudy' }))}
                      variant={simulationState.weather === 'cloudy' ? 'default' : 'outline'}
                      size="sm"
                    >
                      <Cloud className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setSimulationState(prev => ({ ...prev, weather: 'rain' }))}
                      variant={simulationState.weather === 'rain' ? 'default' : 'outline'}
                      size="sm"
                    >
                      <CloudRain className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setSimulationState(prev => ({ ...prev, weather: 'storm' }))}
                      variant={simulationState.weather === 'storm' ? 'default' : 'outline'}
                      size="sm"
                    >
                      <CloudLightning className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Moment de la journée</label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSimulationState(prev => ({ ...prev, timeOfDay: 'day' }))}
                      variant={simulationState.timeOfDay === 'day' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setSimulationState(prev => ({ ...prev, timeOfDay: 'night' }))}
                      variant={simulationState.timeOfDay === 'night' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Vitesse du vent</label>
                  <Slider
                    value={[simulationState.windSpeed]}
                    onValueChange={([value]) => setSimulationState(prev => ({ ...prev, windSpeed: value }))}
                    max={50}
                    min={0}
                    step={1}
                  />
                  <span className="text-xs text-gray-400">{simulationState.windSpeed} km/h</span>
                </div>
              </CardContent>
            </Card>

            {/* Display Options */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <CardTitle>Options d'affichage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Rotation auto</label>
                  <Switch
                    checked={simulationState.autoRotate}
                    onCheckedChange={(checked) => setSimulationState(prev => ({ ...prev, autoRotate: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Trajectoire</label>
                  <Switch
                    checked={simulationState.showTrajectory}
                    onCheckedChange={(checked) => setSimulationState(prev => ({ ...prev, showTrajectory: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Capteurs</label>
                  <Switch
                    checked={simulationState.showSensors}
                    onCheckedChange={(checked) => setSimulationState(prev => ({ ...prev, showSensors: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Grille</label>
                  <Switch
                    checked={simulationState.showGrid}
                    onCheckedChange={(checked) => setSimulationState(prev => ({ ...prev, showGrid: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            {alerts.length > 0 && (
              <Card className="bg-[#181f2a] border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-400">Alertes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {alerts.map((alert, index) => (
                      <div key={index} className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{alert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Export Controls */}
            <Card className="bg-[#181f2a] border-gray-700">
              <CardHeader>
                <CardTitle>Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={exportFlightData}
                  disabled={isExporting || flightData.length === 0}
                  className="w-full"
                  variant="outline"
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Exporter les données
                </Button>
                
                <Button
                  onClick={() => setFlightData([])}
                  disabled={flightData.length === 0}
                  className="w-full"
                  variant="outline"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Effacer l'historique
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 3D Modal */}
      <Drone3DModal isOpen={show3D} onClose={() => setShow3D(false)} />
    </div>
  );
} 