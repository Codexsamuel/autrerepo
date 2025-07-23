'use client';

import { useEffect, useState } from 'react';

interface WeatherSystemProps {
  temperature: number;
  windSpeed: number;
  windDirection: number;
}

export default function WeatherSystem({ temperature, windSpeed, windDirection }: WeatherSystemProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherConditions, setWeatherConditions] = useState({
    visibility: 10.5,
    humidity: 65,
    pressure: 1013.25,
    uvIndex: 3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getWindDirectionText = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 30) return 'text-red-400';
    if (temp > 20) return 'text-orange-400';
    if (temp > 10) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getWindSpeedColor = (speed: number) => {
    if (speed > 15) return 'text-red-400';
    if (speed > 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getVisibilityColor = (visibility: number) => {
    if (visibility < 5) return 'text-red-400';
    if (visibility < 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec timestamp */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Conditions Météorologiques</h3>
        <div className="text-sm text-gray-400">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Conditions principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Température */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Température</span>
            <span className={`text-2xl font-bold ${getTemperatureColor(temperature)}`}>
              {temperature.toFixed(1)}°C
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getTemperatureColor(temperature).replace('text-', 'bg-')}`}
              style={{ width: `${Math.min(100, ((temperature + 20) / 60) * 100)}%` }}
            />
          </div>
        </div>

        {/* Vitesse du vent */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Vitesse du vent</span>
            <span className={`text-2xl font-bold ${getWindSpeedColor(windSpeed)}`}>
              {windSpeed.toFixed(1)} m/s
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getWindSpeedColor(windSpeed).replace('text-', 'bg-')}`}
              style={{ width: `${Math.min(100, (windSpeed / 20) * 100)}%` }}
            />
          </div>
        </div>

        {/* Direction du vent */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Direction du vent</span>
            <span className="text-2xl font-bold text-blue-400">
              {getWindDirectionText(windDirection)}
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(windDirection / 360) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 text-center mt-1">
            {windDirection.toFixed(0)}°
          </div>
        </div>

        {/* Visibilité */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Visibilité</span>
            <span className={`text-2xl font-bold ${getVisibilityColor(weatherConditions.visibility)}`}>
              {weatherConditions.visibility.toFixed(1)} km
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getVisibilityColor(weatherConditions.visibility).replace('text-', 'bg-')}`}
              style={{ width: `${Math.min(100, (weatherConditions.visibility / 15) * 100)}%` }}
            />
          </div>
        </div>

        {/* Humidité */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Humidité</span>
            <span className="text-2xl font-bold text-cyan-400">
              {weatherConditions.humidity.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${weatherConditions.humidity}%` }}
            />
          </div>
        </div>

        {/* Pression atmosphérique */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Pression</span>
            <span className="text-2xl font-bold text-purple-400">
              {weatherConditions.pressure.toFixed(1)} hPa
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="h-2 bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, ((weatherConditions.pressure - 950) / 100) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rose des vents */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-md font-semibold text-white mb-4">Rose des Vents</h4>
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            {/* Cercle de base */}
            <div className="absolute inset-0 border-2 border-slate-600 rounded-full"></div>
            
            {/* Flèche de direction du vent */}
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-12 bg-blue-400 rounded-full origin-bottom transition-transform duration-500"
              style={{ 
                transform: `translate(-50%, -50%) rotate(${windDirection}deg)`,
              }}
            />
            
            {/* Points cardinaux */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">N</div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">S</div>
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">O</div>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">E</div>
          </div>
        </div>
        <div className="text-center mt-4 text-sm text-gray-300">
          Direction: {getWindDirectionText(windDirection)} ({windDirection.toFixed(0)}°)
        </div>
      </div>

      {/* Conditions de vol */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-md font-semibold text-white mb-4">Conditions de Vol</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Vol autorisé</span>
              <span className={`px-2 py-1 rounded text-xs ${
                windSpeed < 15 && weatherConditions.visibility > 5 ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {windSpeed < 15 && weatherConditions.visibility > 5 ? 'OUI' : 'NON'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Risque de turbulence</span>
              <span className={`px-2 py-1 rounded text-xs ${
                windSpeed > 10 ? 'bg-yellow-600' : 'bg-green-600'
              }`}>
                {windSpeed > 10 ? 'ÉLEVÉ' : 'FAIBLE'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Qualité de l'air</span>
              <span className="px-2 py-1 rounded text-xs bg-green-600">BONNE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Indice UV</span>
              <span className="px-2 py-1 rounded text-xs bg-yellow-600">
                {weatherConditions.uvIndex}/10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prévisions */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-md font-semibold text-white mb-4">Prévisions (3h)</h4>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((hour) => (
            <div key={hour} className="text-center">
              <div className="text-sm text-gray-300 mb-2">+{hour}h</div>
              <div className={`text-lg font-bold ${getTemperatureColor(temperature + hour * 0.5)}`}>
                {(temperature + hour * 0.5).toFixed(1)}°C
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {(windSpeed + hour * 0.2).toFixed(1)} m/s
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 