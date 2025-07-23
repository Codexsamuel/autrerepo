'use client';

import { useEffect, useState } from 'react';

interface TelemetryDisplayProps {
  droneState: {
    battery: number;
    altitude: number;
    speed: number;
    heading: number;
    gps: { lat: number; lng: number };
    status: string;
    mode: string;
    signal: number;
    temperature: number;
    windSpeed: number;
    windDirection: number;
  };
}

export default function TelemetryDisplay({ droneState }: TelemetryDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalColor = (level: number) => {
    if (level > 80) return 'text-green-400';
    if (level > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flying': return 'text-green-400';
      case 'armed': return 'text-yellow-400';
      case 'emergency': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec timestamp */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Télémetrie en Temps Réel</h3>
        <div className="text-sm text-gray-400">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Grille principale des données */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Batterie */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Batterie</span>
            <span className={`text-lg font-bold ${getBatteryColor(droneState.battery)}`}>
              {droneState.battery.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                droneState.battery > 60 ? 'bg-green-500' :
                droneState.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${droneState.battery}%` }}
            />
          </div>
        </div>

        {/* Altitude */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Altitude</span>
            <span className="text-lg font-bold text-blue-400">
              {droneState.altitude.toFixed(0)}m
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (droneState.altitude / 500) * 100)}%` }}
            />
          </div>
        </div>

        {/* Vitesse */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Vitesse</span>
            <span className="text-lg font-bold text-purple-400">
              {droneState.speed.toFixed(1)}m/s
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (droneState.speed / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cap */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Cap</span>
            <span className="text-lg font-bold text-green-400">
              {droneState.heading.toFixed(0)}°
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${(droneState.heading / 360) * 100}%` }}
            />
          </div>
        </div>

        {/* Signal GPS */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Signal GPS</span>
            <span className={`text-lg font-bold ${getSignalColor(droneState.signal)}`}>
              {droneState.signal.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                droneState.signal > 80 ? 'bg-green-500' :
                droneState.signal > 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${droneState.signal}%` }}
            />
          </div>
        </div>

        {/* Température */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Température</span>
            <span className="text-lg font-bold text-orange-400">
              {droneState.temperature.toFixed(1)}°C
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, ((droneState.temperature + 20) / 80) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Coordonnées GPS */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-md font-semibold text-white mb-3">Position GPS</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-300">Latitude</span>
            <div className="text-lg font-mono text-cyan-400">
              {droneState.gps.lat.toFixed(6)}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-300">Longitude</span>
            <div className="text-lg font-mono text-cyan-400">
              {droneState.gps.lng.toFixed(6)}
            </div>
          </div>
        </div>
      </div>

      {/* Conditions météo */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-md font-semibold text-white mb-3">Conditions Météo</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-300">Vitesse du vent</span>
            <div className="text-lg font-bold text-blue-400">
              {droneState.windSpeed.toFixed(1)} m/s
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-300">Direction du vent</span>
            <div className="text-lg font-bold text-blue-400">
              {droneState.windDirection.toFixed(0)}°
            </div>
          </div>
        </div>
      </div>

      {/* Statut du système */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-md font-semibold text-white mb-3">Statut du Système</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-300">Mode de vol</span>
            <div className="text-lg font-bold text-white">
              {droneState.mode.toUpperCase()}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-300">Statut</span>
            <div className={`text-lg font-bold ${getStatusColor(droneState.status)}`}>
              {droneState.status.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

             {/* Graphique de tendance (simplifié) */}
       <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
         <h4 className="text-md font-semibold text-white mb-3">Tendance Altitude</h4>
         <div className="h-20 bg-slate-800 rounded-lg p-2">
           <div className="flex items-end justify-between h-full space-x-1">
             {Array.from({ length: 20 }).map((_, i) => {
               const height = Math.random() * 60 + 20; // Simulation de données
               return (
                 <div
                   key={i}
                   className="flex-1 bg-blue-500 rounded-t transition-all duration-300"
                   style={{ height: `${height}%` }}
                 />
               );
             })}
           </div>
         </div>
       </div>
     </div>
   );
 } 