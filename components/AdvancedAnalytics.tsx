"use client";

import { useEffect, useState } from 'react';

interface AnalyticsData {
  label: string;
  value: number;
  unit: string;
  change: number;
  color: string;
}

export default function AdvancedAnalytics() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentData, setCurrentData] = useState<AnalyticsData[]>([
    { label: "Temps de vol", value: 0, unit: "min", change: 12.5, color: "text-blue-500" },
    { label: "Distance parcourue", value: 0, unit: "km", change: 8.2, color: "text-green-500" },
    { label: "Altitude max", value: 0, unit: "m", change: -3.1, color: "text-purple-500" },
    { label: "Vitesse moyenne", value: 0, unit: "km/h", change: 15.7, color: "text-orange-500" },
    { label: "Batterie restante", value: 0, unit: "%", change: -2.3, color: "text-red-500" },
    { label: "Signal GPS", value: 0, unit: "satellites", change: 1.8, color: "text-cyan-500" }
  ]);

  useEffect(() => {
    setIsVisible(true);
    
    // Animation des valeurs
    const intervals = currentData.map((item, index) => {
      const targetValue = Math.floor(Math.random() * 100) + 20;
      const duration = 2000 + index * 500;
      const steps = 60;
      const increment = targetValue / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
        }
        
        setCurrentData(prev => prev.map((data, i) => 
          i === index ? { ...data, value: Math.floor(currentValue) } : data
        ));
      }, duration / steps);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className={`w-full max-w-6xl mx-auto p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Avancées</h2>
          <p className="text-blue-100">Données en temps réel du drone</p>
        </div>

        {/* Analytics Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.map((item, index) => (
              <div
                key={item.label}
                className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-${item.color.split('-')[1]}-500/20`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-300">{item.label}</h3>
                  <div className={`w-3 h-3 rounded-full bg-${item.color.split('-')[1]}-500 animate-pulse`} />
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-3xl font-bold ${item.color}`}>
                    {item.value}
                  </span>
                  <span className="text-gray-400 text-lg">{item.unit}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </span>
                  <span className="text-gray-500 text-sm">vs hier</span>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r from-${item.color.split('-')[1]}-500 to-${item.color.split('-')[1]}-600 transition-all duration-1000`}
                    style={{ width: `${Math.min(100, (item.value / 100) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time status */}
        <div className="bg-gray-800 border-t border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Système opérationnel</span>
            </div>
            <div className="text-gray-400 text-sm">
              Dernière mise à jour: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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