'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Battery,
    CheckCircle,
    Clock,
    Compass,
    Target,
    TrendingDown,
    TrendingUp,
    Wifi,
    XCircle,
    Zap
} from 'lucide-react';
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
  const [telemetryHistory, setTelemetryHistory] = useState<Array<{
    timestamp: number;
    altitude: number;
    speed: number;
    battery: number;
  }>>([]);

  // Mise à jour de l'historique de télémetrie
  useEffect(() => {
    const newData = {
      timestamp: Date.now(),
      altitude: droneState.altitude,
      speed: droneState.speed,
      battery: droneState.battery,
    };

    setTelemetryHistory(prev => {
      const updated = [...prev, newData];
      // Garder seulement les 50 derniers points
      return updated.slice(-50);
    });
  }, [droneState.altitude, droneState.speed, droneState.battery]);

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalColor = (level: number) => {
    if (level > 80) return 'text-green-400';
    if (level > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flying':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'landing':
      case 'takeoff':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flying':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      case 'landing':
      case 'takeoff':
        return <Clock className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getAltitudeTrend = () => {
    if (telemetryHistory.length < 2) return 'stable';
    const recent = telemetryHistory.slice(-5);
    const first = recent[0].altitude;
    const last = recent[recent.length - 1].altitude;
    const diff = last - first;
    
    if (Math.abs(diff) < 1) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  const getSpeedTrend = () => {
    if (telemetryHistory.length < 2) return 'stable';
    const recent = telemetryHistory.slice(-5);
    const first = recent[0].speed;
    const last = recent[recent.length - 1].speed;
    const diff = last - first;
    
    if (Math.abs(diff) < 0.5) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  const altitudeTrend = getAltitudeTrend();
  const speedTrend = getSpeedTrend();

  return (
    <div className="space-y-4">
      
      {/* Données principales */}
      <div className="grid grid-cols-2 gap-3">
        {/* Batterie */}
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <Battery className="w-4 h-4 text-green-400" />
            <span className={`text-sm font-semibold ${getBatteryColor(droneState.battery)}`}>
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

        {/* Signal */}
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <Wifi className="w-4 h-4 text-blue-400" />
            <span className={`text-sm font-semibold ${getSignalColor(droneState.signal)}`}>
              {droneState.signal.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                droneState.signal > 80 ? 'bg-green-500' :
                droneState.signal > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${droneState.signal}%` }}
            />
          </div>
        </div>

        {/* Altitude */}
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold">{droneState.altitude.toFixed(0)}m</span>
              {altitudeTrend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
              {altitudeTrend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
            </div>
          </div>
          <div className="text-xs text-slate-400">
            {altitudeTrend === 'up' ? 'Montée' : altitudeTrend === 'down' ? 'Descente' : 'Stable'}
          </div>
        </div>

        {/* Vitesse */}
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold">{droneState.speed.toFixed(1)}m/s</span>
              {speedTrend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
              {speedTrend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
            </div>
          </div>
          <div className="text-xs text-slate-400">
            {speedTrend === 'up' ? 'Accélération' : speedTrend === 'down' ? 'Décélération' : 'Constante'}
          </div>
        </div>
      </div>

      {/* Statut et GPS */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="font-semibold text-sm mb-3">Statut & Position</h4>
        
        <div className="space-y-3">
          {/* Statut du drone */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Statut</span>
            <div className={`flex items-center space-x-1 ${getStatusColor(droneState.status)}`}>
              {getStatusIcon(droneState.status)}
              <span className="text-sm font-medium">{droneState.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Mode de vol */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Mode</span>
            <span className="text-sm font-medium text-blue-400">{droneState.mode.toUpperCase()}</span>
          </div>

          {/* Cap */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Cap</span>
            <div className="flex items-center space-x-1">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span className="text-sm font-medium">{droneState.heading.toFixed(0)}°</span>
            </div>
          </div>

          {/* GPS */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">GPS</span>
            <div className="text-right">
              <div className="text-sm font-medium">{droneState.gps.lat.toFixed(6)}</div>
              <div className="text-sm font-medium">{droneState.gps.lng.toFixed(6)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique en temps réel */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="font-semibold text-sm mb-3">Télémetrie en Temps Réel</h4>
        
        <div className="space-y-2">
          {/* Altitude */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Altitude</span>
              <span>{droneState.altitude.toFixed(0)}m</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1">
              <div 
                className="h-1 bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (droneState.altitude / 200) * 100)}%` }}
              />
            </div>
          </div>

          {/* Vitesse */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Vitesse</span>
              <span>{droneState.speed.toFixed(1)}m/s</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1">
              <div 
                className="h-1 bg-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (droneState.speed / 30) * 100)}%` }}
              />
            </div>
          </div>

          {/* Température */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Température</span>
              <span>{droneState.temperature.toFixed(1)}°C</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-1">
              <div 
                className="h-1 bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, ((droneState.temperature - 10) / 40) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alertes */}
      {(droneState.battery < 20 || droneState.signal < 30 || droneState.status === 'error') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600/20 border border-red-500 rounded-lg p-3"
        >
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">Alertes Système</span>
          </div>
          <div className="space-y-1 text-xs text-red-300">
            {droneState.battery < 20 && <div>• Batterie faible: {droneState.battery.toFixed(0)}%</div>}
            {droneState.signal < 30 && <div>• Signal faible: {droneState.signal.toFixed(0)}%</div>}
            {droneState.status === 'error' && <div>• Erreur système détectée</div>}
          </div>
        </motion.div>
      )}
    </div>
  );
} 