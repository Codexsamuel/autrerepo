"use client";

import { useEffect, useState } from 'react';

interface Drone3DVisualizationProps {
  droneType: 'sentinel' | 'atlas' | 'fpv' | 'recon';
  className?: string;
}

export default function Drone3DVisualization({ droneType, className = '' }: Drone3DVisualizationProps) {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getDroneSVG = () => {
    switch (droneType) {
      case 'sentinel':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Fuselage principal */}
            <ellipse cx="100" cy="100" rx="40" ry="15" fill="#2c3e50" stroke="#34495e" strokeWidth="2"/>
            
            {/* Ailes principales */}
            <ellipse cx="100" cy="85" rx="80" ry="8" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
            <ellipse cx="100" cy="115" rx="80" ry="8" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
            
            {/* Ailettes de queue */}
            <polygon points="60,100 40,90 40,110" fill="#e74c3c" stroke="#c0392b" strokeWidth="1"/>
            <polygon points="140,100 160,90 160,110" fill="#e74c3c" stroke="#c0392b" strokeWidth="1"/>
            
            {/* Moteurs */}
            <circle cx="60" cy="85" r="8" fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1"/>
            <circle cx="140" cy="85" r="8" fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1"/>
            <circle cx="60" cy="115" r="8" fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1"/>
            <circle cx="140" cy="115" r="8" fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1"/>
            
            {/* Caméras */}
            <circle cx="100" cy="95" r="5" fill="#f39c12" stroke="#e67e22" strokeWidth="1"/>
            <circle cx="100" cy="105" r="5" fill="#9b59b6" stroke="#8e44ad" strokeWidth="1"/>
            
            {/* Antennes GPS */}
            <line x1="100" y1="80" x2="100" y2="70" stroke="#2c3e50" strokeWidth="2"/>
            <line x1="95" y1="75" x2="105" y2="75" stroke="#2c3e50" strokeWidth="2"/>
          </svg>
        );

      case 'atlas':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Corps principal hexagonal */}
            <polygon points="100,60 140,80 140,120 100,140 60,120 60,80" fill="#34495e" stroke="#2c3e50" strokeWidth="2"/>
            
            {/* Bras de support */}
            <rect x="40" y="95" width="20" height="10" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            <rect x="140" y="95" width="20" height="10" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            <rect x="95" y="40" width="10" height="20" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            <rect x="95" y="140" width="10" height="20" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            
            {/* Moteurs */}
            <circle cx="50" cy="100" r="12" fill="#e74c3c" stroke="#c0392b" strokeWidth="2"/>
            <circle cx="150" cy="100" r="12" fill="#e74c3c" stroke="#c0392b" strokeWidth="2"/>
            <circle cx="100" cy="50" r="12" fill="#e74c3c" stroke="#c0392b" strokeWidth="2"/>
            <circle cx="100" cy="150" r="12" fill="#e74c3c" stroke="#c0392b" strokeWidth="2"/>
            
            {/* Module de transport central */}
            <rect x="85" y="90" width="30" height="20" fill="#27ae60" stroke="#229954" strokeWidth="2"/>
            <rect x="90" y="95" width="20" height="10" fill="#2ecc71" stroke="#27ae60" strokeWidth="1"/>
            
            {/* Caméra centrale */}
            <circle cx="100" cy="100" r="8" fill="#f39c12" stroke="#e67e22" strokeWidth="2"/>
            <circle cx="100" cy="100" r="4" fill="#ecf0f1" stroke="#bdc3c7" strokeWidth="1"/>
            
            {/* Antennes */}
            <line x1="100" y1="60" x2="100" y2="50" stroke="#2c3e50" strokeWidth="2"/>
            <line x1="95" y1="55" x2="105" y2="55" stroke="#2c3e50" strokeWidth="2"/>
          </svg>
        );

      case 'fpv':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Corps principal en X */}
            <polygon points="100,60 120,80 120,120 100,140 80,120 80,80" fill="#e74c3c" stroke="#c0392b" strokeWidth="3"/>
            
            {/* Bras en croix */}
            <rect x="30" y="95" width="40" height="10" fill="#2c3e50" stroke="#34495e" strokeWidth="2"/>
            <rect x="130" y="95" width="40" height="10" fill="#2c3e50" stroke="#34495e" strokeWidth="2"/>
            <rect x="95" y="30" width="10" height="40" fill="#2c3e50" stroke="#34495e" strokeWidth="2"/>
            <rect x="95" y="130" width="10" height="40" fill="#2c3e50" stroke="#34495e" strokeWidth="2"/>
            
            {/* Moteurs */}
            <circle cx="50" cy="100" r="10" fill="#e67e22" stroke="#d35400" strokeWidth="2"/>
            <circle cx="150" cy="100" r="10" fill="#e67e22" stroke="#d35400" strokeWidth="2"/>
            <circle cx="100" cy="50" r="10" fill="#e67e22" stroke="#d35400" strokeWidth="2"/>
            <circle cx="100" cy="150" r="10" fill="#e67e22" stroke="#d35400" strokeWidth="2"/>
            
            {/* Caméra FPV */}
            <circle cx="100" cy="100" r="12" fill="#2c3e50" stroke="#34495e" strokeWidth="3"/>
            <circle cx="100" cy="100" r="8" fill="#ecf0f1" stroke="#bdc3c7" strokeWidth="2"/>
            <circle cx="100" cy="100" r="4" fill="#000000" stroke="#2c3e50" strokeWidth="1"/>
            
            {/* Antennes FPV */}
            <line x1="100" y1="60" x2="100" y2="45" stroke="#f39c12" strokeWidth="3"/>
            <line x1="100" y1="140" x2="100" y2="155" stroke="#f39c12" strokeWidth="3"/>
            
            {/* Indicateurs LED */}
            <circle cx="85" cy="85" r="3" fill="#e74c3c"/>
            <circle cx="115" cy="85" r="3" fill="#e74c3c"/>
            <circle cx="85" cy="115" r="3" fill="#e74c3c"/>
            <circle cx="115" cy="115" r="3" fill="#e74c3c"/>
          </svg>
        );

      case 'recon':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Corps principal arrondi */}
            <ellipse cx="100" cy="100" rx="35" ry="20" fill="#34495e" stroke="#2c3e50" strokeWidth="2"/>
            
            {/* Bras de support */}
            <rect x="25" y="95" width="30" height="10" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            <rect x="145" y="95" width="30" height="10" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            <rect x="95" y="25" width="10" height="30" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            <rect x="95" y="145" width="10" height="30" fill="#7f8c8d" stroke="#95a5a6" strokeWidth="1"/>
            
            {/* Moteurs */}
            <circle cx="40" cy="100" r="10" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
            <circle cx="160" cy="100" r="10" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
            <circle cx="100" cy="40" r="10" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
            <circle cx="100" cy="160" r="10" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
            
            {/* Caméra de reconnaissance */}
            <circle cx="100" cy="100" r="15" fill="#9b59b6" stroke="#8e44ad" strokeWidth="3"/>
            <circle cx="100" cy="100" r="10" fill="#ecf0f1" stroke="#bdc3c7" strokeWidth="2"/>
            <circle cx="100" cy="100" r="6" fill="#2c3e50" stroke="#34495e" strokeWidth="1"/>
            
            {/* Capteurs Lidar */}
            <circle cx="85" cy="85" r="5" fill="#f39c12" stroke="#e67e22" strokeWidth="1"/>
            <circle cx="115" cy="85" r="5" fill="#f39c12" stroke="#e67e22" strokeWidth="1"/>
            <circle cx="85" cy="115" r="5" fill="#f39c12" stroke="#e67e22" strokeWidth="1"/>
            <circle cx="115" cy="115" r="5" fill="#f39c12" stroke="#e67e22" strokeWidth="1"/>
            
            {/* Antennes de communication */}
            <line x1="100" y1="60" x2="100" y2="45" stroke="#27ae60" strokeWidth="2"/>
            <line x1="100" y1="140" x2="100" y2="155" stroke="#27ae60" strokeWidth="2"/>
            <line x1="60" y1="100" x2="45" y2="100" stroke="#27ae60" strokeWidth="2"/>
            <line x1="140" y1="100" x2="155" y2="100" stroke="#27ae60" strokeWidth="2"/>
            
            {/* Indicateurs de statut */}
            <circle cx="75" cy="75" r="3" fill="#27ae60"/>
            <circle cx="125" cy="75" r="3" fill="#27ae60"/>
            <circle cx="75" cy="125" r="3" fill="#27ae60"/>
            <circle cx="125" cy="125" r="3" fill="#27ae60"/>
          </svg>
        );

      default:
        return null;
    }
  };

  const getDroneInfo = () => {
    switch (droneType) {
      case 'sentinel':
        return { name: 'DL-Sentinel V1', type: 'Drone à aile fixe', color: 'from-blue-500 to-blue-700' };
      case 'atlas':
        return { name: 'DL-ATLAS X1', type: 'Drone de transport', color: 'from-green-500 to-green-700' };
      case 'fpv':
        return { name: 'DL-FPV Tactical V1', type: 'Drone kamikaze', color: 'from-red-500 to-red-700' };
      case 'recon':
        return { name: 'DL-ReconX', type: 'Drone de reconnaissance', color: 'from-purple-500 to-purple-700' };
      default:
        return { name: 'Drone', type: 'Type inconnu', color: 'from-gray-500 to-gray-700' };
    }
  };

  const droneInfo = getDroneInfo();

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conteneur 3D */}
      <div 
        className="relative w-48 h-48 mx-auto perspective-1000"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Drone SVG */}
        <div className="absolute inset-0">
          {getDroneSVG()}
        </div>
        
        {/* Ombres et effets */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 rounded-full blur-sm -z-10" />
        
        {/* Effet de lueur */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${droneInfo.color} opacity-20 blur-xl rounded-full -z-20`}
          style={{
            animation: isHovered ? 'pulse 2s infinite' : 'none'
          }}
        />
      </div>

      {/* Informations du drone */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-white mb-1">{droneInfo.name}</h3>
        <p className="text-sm text-gray-300">{droneInfo.type}</p>
      </div>

      {/* Effet de particules au survol */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
} 