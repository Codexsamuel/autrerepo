'use client';

import { useEffect, useState } from 'react';

interface Drone3DViewerProps {
  droneType: 'sentinel' | 'atlas';
  viewMode: 'cockpit' | 'external' | 'map' | 'thermal';
  droneState: {
    battery: number;
    altitude: number;
    speed: number;
    heading: number;
    status: string;
    mode: string;
  };
  isPlaying: boolean;
}

function DroneModel({ droneType, droneState, isPlaying }: { 
  droneType: 'sentinel' | 'atlas'; 
  droneState: any;
  isPlaying: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Animation frame counter for hover effects
  useEffect(() => {
    if (isPlaying && droneState.status === 'flying') {
      const interval = setInterval(() => {
        setAnimationFrame(prev => prev + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying, droneState.status]);

  const droneColor = droneType === 'sentinel' ? '#4ade80' : '#3b82f6';
  const droneSize = droneType === 'sentinel' ? 1.2 : 1.8;

  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
        hovered ? 'scale-110' : 'scale-100'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: `scale(${hovered ? 1.1 : 1})`,
      }}
    >
      <div 
        className={`relative transition-all duration-300`}
        style={{
          width: `${droneSize * 100}px`,
          height: `${droneSize * 100}px`,
          transform: isPlaying && droneState.status === 'flying' 
            ? `translateY(${Math.sin(animationFrame * 0.1) * 5}px) rotateZ(${Math.sin(animationFrame * 0.05) * 2}deg)`
            : 'none',
        }}
      >
        {/* Corps principal du drone */}
        <div 
          className="absolute inset-0 rounded-lg shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: hovered ? droneColor : '#1e293b',
            border: `2px solid ${droneColor}`,
            transform: 'rotate(45deg)',
          }}
        />
        
        {/* Bras des moteurs */}
        {[0, 90, 180, 270].map((angle, index) => (
          <div
            key={index}
            className="absolute w-16 h-2 bg-gray-600 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${droneSize * 40}px)`,
            }}
          />
        ))}
        
        {/* Hélices animées */}
        {[0, 90, 180, 270].map((angle, index) => (
          <div
            key={`prop-${index}`}
            className={`absolute w-8 h-1 bg-gray-400 rounded-full transition-all duration-100 ${
              isPlaying && droneState.status === 'flying' ? 'animate-spin' : ''
            }`}
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${droneSize * 50}px)`,
              animationDuration: '0.1s',
            }}
          />
        ))}
        
        {/* Caméra principale */}
        <div 
          className="absolute w-4 h-4 bg-black rounded-full border-2 border-gray-600"
          style={{
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* LED de statut */}
        <div 
          className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
            droneState.status === 'flying' ? 'bg-green-500' : 'bg-yellow-500'
          } shadow-lg`}
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: droneState.status === 'flying' 
              ? '0 0 10px #10b981' 
              : '0 0 10px #f59e0b',
          }}
        />
        
        {/* Capteurs */}
        <div 
          className="absolute w-6 h-1 bg-blue-500 rounded"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
}

function Scene({ droneType, viewMode, droneState, isPlaying }: Drone3DViewerProps) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      {/* Grille de fond */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-slate-600" />
          ))}
        </div>
      </div>
      
      {/* Drone */}
      <DroneModel 
        droneType={droneType} 
        droneState={droneState} 
        isPlaying={isPlaying} 
      />
      
      {/* Particules d'effet (si en vol) */}
      {isPlaying && droneState.status === 'flying' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Overlay d'information */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            {droneType === 'sentinel' ? 'Sentinel V1' : 'Atlas X1'}
          </span>
          <span className={`px-2 py-1 rounded text-xs ${
            droneState.status === 'flying' ? 'bg-green-600' : 'bg-yellow-600'
          }`}>
            {droneState.status.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-300">
          <span>Alt: {droneState.altitude.toFixed(0)}m</span>
          <span>Spd: {droneState.speed.toFixed(1)}m/s</span>
          <span>Bat: {droneState.battery.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Drone3DViewer(props: Drone3DViewerProps) {
  return (
    <div className="w-full h-full">
      <Scene {...props} />
    </div>
  );
} 