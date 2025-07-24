"use client";

import { useEffect, useState } from 'react';

interface TechnicalCapabilitiesSummaryProps {
  capabilities: Array<{
    title: string;
    description: string;
    icon: string;
    level: number;
  }>;
}

export default function TechnicalCapabilitiesSummary({ capabilities }: TechnicalCapabilitiesSummaryProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`w-full max-w-6xl mx-auto p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-3xl font-bold text-white mb-2">Capacités Techniques</h2>
          <p className="text-blue-100">Expertise et technologies maîtrisées</p>
        </div>

        {/* Capabilities Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={capability.title}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{capability.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">{capability.level}%</div>
                    <div className="text-sm text-gray-400">Maîtrise</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{capability.title}</h3>
                <p className="text-gray-300 mb-4">{capability.description}</p>
                
                {/* Progress bar */}
                <div className="bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                    style={{ width: `${capability.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gray-800 border-t border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {capabilities.length}+
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">
                {Math.round(capabilities.reduce((acc, cap) => acc + cap.level, 0) / capabilities.length)}%
              </div>
              <div className="text-gray-400">Moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {capabilities.filter(cap => cap.level >= 90).length}
              </div>
              <div className="text-gray-400">Expert</div>
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