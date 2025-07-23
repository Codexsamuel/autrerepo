"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DronePrototypeImagesProps {
  droneType: 'sentinel' | 'atlas';
}

export default function DronePrototypeImages({ droneType }: DronePrototypeImagesProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const droneData = {
    sentinel: {
      name: "Sentinel V1",
      color: "#2563eb",
      features: ["Vision nocturne", "IA embarquée", "Port de charge", "Cryptage militaire"],
      description: "Drone militaire tactique avec capacités avancées de surveillance et neutralisation."
    },
    atlas: {
      name: "Atlas X1", 
      color: "#059669",
      features: ["Pulvérisation précise", "Capteurs de sol", "Transport médical", "Autonomie 45 min"],
      description: "Drone industriel polyvalent pour agriculture et secours d'urgence."
    }
  };

  const currentDrone = droneData[droneType];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Drone principal */}
      <motion.div
        className="relative z-10 text-center"
        animate={{
          y: isAnimating ? [-10, 10, -10] : 0,
          rotateY: isAnimating ? [0, 5, -5, 0] : 0
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity
        }}
      >
        {/* Icône du drone */}
        <div 
          className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-6xl"
          style={{ 
            background: `linear-gradient(135deg, ${currentDrone.color}20, ${currentDrone.color}40)`,
            border: `2px solid ${currentDrone.color}`
          }}
        >
          {droneType === 'sentinel' ? '🛰️' : '🏭'}
        </div>

        {/* Nom du drone */}
        <h3 
          className="text-2xl font-bold mb-4"
          style={{ color: currentDrone.color }}
        >
          {currentDrone.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 mb-6 max-w-md mx-auto text-sm">
          {currentDrone.description}
        </p>

        {/* Caractéristiques */}
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {currentDrone.features.map((feature, index) => (
            <motion.div
              key={feature}
              className="bg-gray-800 rounded-lg p-3 text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentDrone.color }}
                />
                {feature}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indicateurs de statut */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.div
            className="flex items-center gap-2"
            animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Système actif</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2"
            animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Connecté</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Particules flottantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Grille de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
} 