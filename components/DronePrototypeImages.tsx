"use client";

import { useState } from 'react';

interface DronePrototypeImagesProps {
  droneType: 'atlas' | 'sentinel';
}

export default function DronePrototypeImages({ droneType }: DronePrototypeImagesProps) {
  const [selectedView, setSelectedView] = useState<'3d' | 'technical' | 'exploded' | 'components'>('3d');

  const views = [
    { id: '3d', label: 'Vue 3D', icon: '🎯' },
    { id: 'technical', label: 'Diagramme Technique', icon: '📐' },
    { id: 'exploded', label: 'Vue Éclatée', icon: '💥' },
    { id: 'components', label: 'Composants', icon: '🔧' },
  ];

  const renderAtlasX1Technical = () => (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <defs>
        <linearGradient id="atlasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0066cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#004499', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Fond */}
      <rect width="800" height="600" fill="#0b0f17"/>
      
      {/* Grille technique */}
      <g stroke="#333" strokeWidth="1" opacity="0.3">
        {Array.from({ length: 20 }, (_, i) => (
          <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="600"/>
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line key={i} x1="0" y1={i * 40} x2="800" y2={i * 40}/>
        ))}
      </g>

      {/* Corps principal */}
      <ellipse cx="400" cy="300" rx="120" ry="80" fill="url(#atlasGradient)" stroke="#fff" strokeWidth="2"/>
      
      {/* Bras du drone */}
      {[0, 90, 180, 270].map((angle, i) => {
        const x = 400 + Math.cos(angle * Math.PI / 180) * 140;
        const y = 300 + Math.sin(angle * Math.PI / 180) * 140;
        return (
          <g key={i}>
            <line x1="400" y1="300" x2={x} y2={y} stroke="#666" strokeWidth="3"/>
            <circle cx={x} cy={y} r="15" fill="#333" stroke="#fff" strokeWidth="2"/>
            {/* Hélices */}
            <g transform={`translate(${x}, ${y})`}>
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#999" strokeWidth="2"/>
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#999" strokeWidth="2"/>
            </g>
          </g>
        );
      })}

      {/* Caméra */}
      <rect x="380" y="220" width="40" height="25" fill="#000" stroke="#fff" strokeWidth="2"/>
      <circle cx="400" cy="232" r="8" fill="#333" stroke="#fff" strokeWidth="1"/>
      
      {/* Réservoir */}
      <ellipse cx="400" cy="380" rx="40" ry="25" fill="#0066cc" stroke="#fff" strokeWidth="2" opacity="0.8"/>
      <rect x="395" y="380" width="10" height="30" fill="#333" stroke="#fff" strokeWidth="1"/>
      
      {/* Antennes */}
      <line x1="480" y1="280" x2="480" y2="200" stroke="#666" strokeWidth="2"/>
      <line x1="320" y1="280" x2="320" y2="200" stroke="#666" strokeWidth="2"/>
      
      {/* Capteurs */}
      <circle cx="480" cy="280" r="8" fill="#ff6600" stroke="#fff" strokeWidth="1" filter="url(#glow)"/>
      <circle cx="320" cy="280" r="8" fill="#00ffff" stroke="#fff" strokeWidth="1" filter="url(#glow)"/>
      
      {/* Batterie */}
      <rect x="360" y="280" width="80" height="20" fill="#222" stroke="#fff" strokeWidth="2"/>
      <rect x="440" y="285" width="5" height="10" fill="#00ff00" stroke="#fff" strokeWidth="1"/>
      
      {/* Labels */}
      <text x="400" y="150" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">ATLAS X1 - DIAGRAMME TECHNIQUE</text>
      <text x="400" y="500" textAnchor="middle" fill="#fff" fontSize="16">Échelle: 1:10 | Dimensions: 800mm x 600mm</text>
      
      {/* Spécifications */}
      <g fontSize="12" fill="#ccc">
        <text x="50" y="50">Autonomie: 45 min</text>
        <text x="50" y="70">Charge utile: 3kg</text>
        <text x="50" y="90">Portée: 20km</text>
        <text x="50" y="110">Vitesse max: 72 km/h</text>
        <text x="50" y="130">Altitude max: 4000m</text>
      </g>
    </svg>
  );

  const renderSentinelV1Technical = () => (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <defs>
        <linearGradient id="sentinelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#cc0000', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#990000', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glowRed">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Fond */}
      <rect width="800" height="600" fill="#0b0f17"/>
      
      {/* Grille technique */}
      <g stroke="#333" strokeWidth="1" opacity="0.3">
        {Array.from({ length: 20 }, (_, i) => (
          <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="600"/>
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line key={i} x1="0" y1={i * 40} x2="800" y2={i * 40}/>
        ))}
      </g>

      {/* Corps principal - forme furtive */}
      <ellipse cx="400" cy="300" rx="100" ry="60" fill="url(#sentinelGradient)" stroke="#fff" strokeWidth="2"/>
      
      {/* Bras du drone - plus courts */}
      {[0, 90, 180, 270].map((angle, i) => {
        const x = 400 + Math.cos(angle * Math.PI / 180) * 120;
        const y = 300 + Math.sin(angle * Math.PI / 180) * 120;
        return (
          <g key={i}>
            <line x1="400" y1="300" x2={x} y2={y} stroke="#666" strokeWidth="4"/>
            <circle cx={x} cy={y} r="12" fill="#333" stroke="#fff" strokeWidth="2"/>
            {/* Hélices 3 pales */}
            <g transform={`translate(${x}, ${y})`}>
              {[0, 120, 240].map((rot, j) => (
                <line 
                  key={j}
                  x1={-10 * Math.cos(rot * Math.PI / 180)} 
                  y1={-10 * Math.sin(rot * Math.PI / 180)}
                  x2={10 * Math.cos(rot * Math.PI / 180)} 
                  y2={10 * Math.sin(rot * Math.PI / 180)}
                  stroke="#999" 
                  strokeWidth="2"
                />
              ))}
            </g>
          </g>
        );
      })}

      {/* Caméra thermique */}
      <rect x="380" y="240" width="40" height="20" fill="#000" stroke="#fff" strokeWidth="2"/>
      <circle cx="400" cy="250" r="6" fill="#ff4400" stroke="#fff" strokeWidth="1" filter="url(#glowRed)"/>
      
      {/* Module de détection */}
      <ellipse cx="400" cy="360" rx="30" ry="20" fill="#333" stroke="#fff" strokeWidth="2"/>
      <line x1="400" y1="360" x2="400" y2="420" stroke="#666" strokeWidth="2"/>
      <circle cx="400" cy="420" r="8" fill="#ff0000" stroke="#fff" strokeWidth="1" filter="url(#glowRed)"/>
      
      {/* Charge explosive */}
      <ellipse cx="400" cy="320" rx="20" ry="15" fill="#ff0000" stroke="#fff" strokeWidth="2" opacity="0.8"/>
      <circle cx="400" cy="305" r="5" fill="#ffff00" stroke="#fff" strokeWidth="1" filter="url(#glowRed)"/>
      
      {/* Antennes */}
      <line x1="460" y1="280" x2="460" y2="200" stroke="#666" strokeWidth="2"/>
      <line x1="340" y1="280" x2="340" y2="200" stroke="#666" strokeWidth="2"/>
      
      {/* Capteurs */}
      <circle cx="460" cy="280" r="6" fill="#00ff00" stroke="#fff" strokeWidth="1" filter="url(#glowRed)"/>
      <circle cx="340" cy="280" r="6" fill="#00ff00" stroke="#fff" strokeWidth="1" filter="url(#glowRed)"/>
      
      {/* Batterie */}
      <rect x="360" y="280" width="80" height="15" fill="#222" stroke="#fff" strokeWidth="2"/>
      
      {/* Labels */}
      <text x="400" y="150" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">SENTINEL V1 - DIAGRAMME TECHNIQUE</text>
      <text x="400" y="500" textAnchor="middle" fill="#fff" fontSize="16">Échelle: 1:10 | Dimensions: 700mm x 500mm</text>
      
      {/* Spécifications */}
      <g fontSize="12" fill="#ccc">
        <text x="50" y="50">Autonomie: 45 min</text>
        <text x="50" y="70">Charge utile: 900g</text>
        <text x="50" y="90">Portée: 20km</text>
        <text x="50" y="110">Vitesse max: 85 km/h</text>
        <text x="50" y="130">Altitude max: 5000m</text>
        <text x="50" y="150">Furtivité: Niveau militaire</text>
      </g>
    </svg>
  );

  const renderExplodedView = () => (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <defs>
        <linearGradient id="explodedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#444', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#222', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Fond */}
      <rect width="800" height="600" fill="#0b0f17"/>
      
      {/* Lignes de séparation */}
      <g stroke="#666" strokeWidth="2" strokeDasharray="5,5">
        <line x1="400" y1="0" x2="400" y2="600"/>
        <line x1="0" y1="300" x2="800" y2="300"/>
      </g>

      {/* Composants éclatés */}
      <g>
        {/* Corps principal */}
        <ellipse cx="400" cy="200" rx="80" ry="50" fill="url(#explodedGradient)" stroke="#fff" strokeWidth="2"/>
        <text x="400" y="270" textAnchor="middle" fill="#fff" fontSize="14">Corps Principal</text>
        
        {/* Bras */}
        {[0, 90, 180, 270].map((angle, i) => {
          const x = 400 + Math.cos(angle * Math.PI / 180) * 150;
          const y = 200 + Math.sin(angle * Math.PI / 180) * 150;
          return (
            <g key={i}>
              <rect x={x-15} y={y-5} width="30" height="10" fill="#333" stroke="#fff" strokeWidth="1"/>
              <text x={x} y={y+25} textAnchor="middle" fill="#fff" fontSize="12">Bras {i+1}</text>
            </g>
          );
        })}
        
        {/* Hélices */}
        {[0, 90, 180, 270].map((angle, i) => {
          const x = 400 + Math.cos(angle * Math.PI / 180) * 200;
          const y = 200 + Math.sin(angle * Math.PI / 180) * 200;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="12" fill="#666" stroke="#fff" strokeWidth="1"/>
              <text x={x} y={y+25} textAnchor="middle" fill="#fff" fontSize="12">Hélice {i+1}</text>
            </g>
          );
        })}
        
        {/* Caméra */}
        <rect x="380" y="400" width="40" height="25" fill="#000" stroke="#fff" strokeWidth="2"/>
        <text x="400" y="440" textAnchor="middle" fill="#fff" fontSize="14">Caméra {droneType === 'atlas' ? '4K' : 'Thermique'}</text>
        
        {/* Réservoir/Module */}
        <ellipse cx="400" cy="500" rx="35" ry="20" fill={droneType === 'atlas' ? '#0066cc' : '#333'} stroke="#fff" strokeWidth="2"/>
        <text x="400" y="530" textAnchor="middle" fill="#fff" fontSize="14">
          {droneType === 'atlas' ? 'Réservoir Pulvérisation' : 'Module Détection'}
        </text>
        
        {/* Batterie */}
        <rect x="200" y="400" width="60" height="20" fill="#222" stroke="#fff" strokeWidth="2"/>
        <text x="230" y="440" textAnchor="middle" fill="#fff" fontSize="14">Batterie</text>
        
        {/* Électronique */}
        <rect x="200" y="300" width="60" height="30" fill="#333" stroke="#fff" strokeWidth="2"/>
        <text x="230" y="340" textAnchor="middle" fill="#fff" fontSize="14">Électronique</text>
        
        {/* Antennes */}
        <line x1="600" y1="400" x2="600" y2="300" stroke="#666" strokeWidth="3"/>
        <text x="620" y="350" fill="#fff" fontSize="14">Antennes</text>
        
        <line x1="600" y1="500" x2="600" y2="400" stroke="#666" strokeWidth="3"/>
        <text x="620" y="450" fill="#fff" fontSize="14">GPS</text>
      </g>
      
      {/* Titre */}
      <text x="400" y="50" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">
        VUE ÉCLATÉE - {droneType === 'atlas' ? 'ATLAS X1' : 'SENTINEL V1'}
      </text>
    </svg>
  );

  const renderComponentsView = () => (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Composants principaux */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Composants Principaux</h3>
        
        <div className="bg-[#181f2a] rounded-lg p-4">
          <h4 className="text-lg font-semibold text-blue-400 mb-2">🛠️ Structure</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Corps principal en composite</li>
            <li>• Bras articulés en aluminium</li>
            <li>• Jointures renforcées</li>
            <li>• Revêtement anti-corrosion</li>
          </ul>
        </div>
        
        <div className="bg-[#181f2a] rounded-lg p-4">
          <h4 className="text-lg font-semibold text-green-400 mb-2">🔋 Propulsion</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• 4 moteurs brushless</li>
            <li>• Hélices carbone</li>
            <li>• Contrôleur de vol</li>
            <li>• Batterie LiPo 6S</li>
          </ul>
        </div>
        
        <div className="bg-[#181f2a] rounded-lg p-4">
          <h4 className="text-lg font-semibold text-purple-400 mb-2">📡 Communication</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Module GPS haute précision</li>
            <li>• Antenne 2.4GHz</li>
            <li>• Télécommande longue portée</li>
            <li>• Système FPV</li>
          </ul>
        </div>
      </div>
      
      {/* Composants spécialisés */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Composants Spécialisés</h3>
        
        {droneType === 'atlas' ? (
          <>
            <div className="bg-[#181f2a] rounded-lg p-4">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">🌾 Agriculture</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Réservoir 3L</li>
                <li>• Pompe de pulvérisation</li>
                <li>• Buses ajustables</li>
                <li>• Capteurs de sol</li>
              </ul>
            </div>
            
            <div className="bg-[#181f2a] rounded-lg p-4">
              <h4 className="text-lg font-semibold text-orange-400 mb-2">📦 Transport</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Crochet de transport</li>
                <li>• Système de largage</li>
                <li>• Capteurs de charge</li>
                <li>• Stabilisation avancée</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#181f2a] rounded-lg p-4">
              <h4 className="text-lg font-semibold text-red-400 mb-2">🎯 Militaire</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Caméra thermique</li>
                <li>• Détecteur de mines</li>
                <li>• Charge explosive</li>
                <li>• Furtivité radar</li>
              </ul>
            </div>
            
            <div className="bg-[#181f2a] rounded-lg p-4">
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">🛡️ Sécurité</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Cryptage militaire</li>
                <li>• Mode furtif</li>
                <li>• Autodestruction</li>
                <li>• Traçabilité</li>
              </ul>
            </div>
          </>
        )}
        
        <div className="bg-[#181f2a] rounded-lg p-4">
          <h4 className="text-lg font-semibold text-pink-400 mb-2">🤖 IA & Capteurs</h4>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Processeur embarqué</li>
            <li>• Caméra haute résolution</li>
            <li>• Capteurs environnementaux</li>
            <li>• Système de navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#0b0f17] rounded-lg overflow-hidden">
      {/* Navigation des vues */}
      <div className="flex gap-2 p-4 bg-[#181f2a] border-b border-gray-700">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setSelectedView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedView === view.id
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <span>{view.icon}</span>
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      {/* Contenu de la vue sélectionnée */}
      <div className="h-full">
        {selectedView === '3d' && (
          <div className="flex items-center justify-center h-full text-white/50">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <div className="text-xl">Vue 3D Interactive</div>
              <div className="text-sm">Utilisez le bouton 3D pour voir le modèle interactif</div>
            </div>
          </div>
        )}
        
        {selectedView === 'technical' && (
          <div className="h-full">
            {droneType === 'atlas' ? renderAtlasX1Technical() : renderSentinelV1Technical()}
          </div>
        )}
        
        {selectedView === 'exploded' && (
          <div className="h-full">
            {renderExplodedView()}
          </div>
        )}
        
        {selectedView === 'components' && (
          <div className="h-full overflow-y-auto">
            {renderComponentsView()}
          </div>
        )}
      </div>
    </div>
  );
} 