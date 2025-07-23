'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Cloud,
    CloudLightning,
    CloudRain,
    Droplets,
    Eye,
    Sun,
    Thermometer,
    Wind
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeatherSystemProps {
  temperature: number;
  windSpeed: number;
  windDirection: number;
}

export default function WeatherSystem({ 
  temperature, 
  windSpeed, 
  windDirection 
}: WeatherSystemProps) {
  const [weatherCondition, setWeatherCondition] = useState<'clear' | 'cloudy' | 'rain' | 'storm'>('clear');
  const [humidity, setHumidity] = useState(65);
  const [pressure, setPressure] = useState(1013);
  const [visibility, setVisibility] = useState(10);

  // Simuler les changements météo
  useEffect(() => {
    const interval = setInterval(() => {
      // Changement aléatoire des conditions météo
      const conditions: Array<'clear' | 'cloudy' | 'rain' | 'storm'> = ['clear', 'cloudy', 'rain', 'storm'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      if (Math.random() < 0.1) { // 10% de chance de changement
        setWeatherCondition(randomCondition);
      }
      
      // Mise à jour de l'humidité
      setHumidity(prev => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      
      // Mise à jour de la pression
      setPressure(prev => Math.max(980, Math.min(1030, prev + (Math.random() - 0.5) * 5)));
      
      // Mise à jour de la visibilité
      setVisibility(prev => Math.max(1, Math.min(20, prev + (Math.random() - 0.5) * 2)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weatherCondition) {
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      case 'storm':
        return <CloudLightning className="w-6 h-6 text-purple-400" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-400" />;
    }
  };

  const getWindDirectionArrow = () => {
    const rotation = windDirection;
    return (
      <div 
        className="inline-block transition-transform duration-300"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        ↑
      </div>
    );
  };

  const getFlightSafety = () => {
    let safety = 'green';
    let message = 'Conditions optimales';
    
    if (windSpeed > 15) {
      safety = 'yellow';
      message = 'Vent modéré - Prudence';
    }
    
    if (windSpeed > 25) {
      safety = 'red';
      message = 'Vent fort - Vol déconseillé';
    }
    
    if (weatherCondition === 'storm') {
      safety = 'red';
      message = 'Orage - Vol interdit';
    }
    
    if (visibility < 3) {
      safety = 'yellow';
      message = 'Visibilité réduite';
    }
    
    return { safety, message };
  };

  const { safety, message } = getFlightSafety();

  return (
    <div className="space-y-4">
      
      {/* Conditions actuelles */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm">Conditions Actuelles</h4>
          {getWeatherIcon()}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-red-400" />
            <span>{temperature.toFixed(1)}°C</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>{humidity.toFixed(0)}%</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>{windSpeed.toFixed(1)} km/h</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400">{getWindDirectionArrow()}</span>
            <span>{windDirection.toFixed(0)}°</span>
          </div>
        </div>
      </div>

      {/* Indicateur de sécurité */}
      <div className={`rounded-lg p-4 border ${
        safety === 'green' ? 'bg-green-600/20 border-green-500' :
        safety === 'yellow' ? 'bg-yellow-600/20 border-yellow-500' :
        'bg-red-600/20 border-red-500'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          {safety === 'green' ? (
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          ) : safety === 'yellow' ? (
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          )}
          <span className={`font-semibold text-sm ${
            safety === 'green' ? 'text-green-400' :
            safety === 'yellow' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            Sécurité de Vol
          </span>
        </div>
        <p className={`text-xs ${
          safety === 'green' ? 'text-green-300' :
          safety === 'yellow' ? 'text-yellow-300' :
          'text-red-300'
        }`}>
          {message}
        </p>
      </div>

      {/* Détails météo */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="font-semibold text-sm mb-3">Détails Météo</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Pression atmosphérique</span>
            <span className="text-sm font-medium">{pressure} hPa</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Visibilité</span>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-slate-400" />
              <span className="text-sm font-medium">{visibility.toFixed(1)} km</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Conditions</span>
            <span className="text-sm font-medium capitalize">{weatherCondition}</span>
          </div>
        </div>
      </div>

      {/* Prévisions */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="font-semibold text-sm mb-3">Prévisions (3h)</h4>
        
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((hour) => (
            <div key={hour} className="text-center p-2 rounded bg-slate-600/50">
              <div className="text-xs text-slate-400">+{hour}h</div>
              <div className="text-sm font-medium">
                {(temperature + (Math.random() - 0.5) * 5).toFixed(0)}°C
              </div>
              <div className="text-xs text-slate-400">
                {(windSpeed + (Math.random() - 0.5) * 3).toFixed(0)} km/h
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertes météo */}
      {(windSpeed > 20 || weatherCondition === 'storm' || visibility < 5) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600/20 border border-red-500 rounded-lg p-3"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">Alerte Météo</span>
          </div>
          <p className="text-xs text-red-300 mt-1">
            Conditions météorologiques défavorables détectées. 
            Vérifiez les conditions avant le décollage.
          </p>
        </motion.div>
      )}
    </div>
  );
} 