'use client';

import { useState } from 'react';

interface Waypoint {
  lat: number;
  lng: number;
  altitude: number;
  action: string;
}

interface Mission {
  id: string;
  name: string;
  type: 'reconnaissance' | 'inspection' | 'mapping' | 'delivery';
  waypoints: Waypoint[];
  status: 'pending' | 'active' | 'completed' | 'failed';
}

interface MissionPlannerProps {
  missions: Mission[];
  activeMission: Mission | null;
  onStartMission: (mission: Mission) => void;
  onCancelMission: () => void;
}

export default function MissionPlanner({ 
  missions, 
  activeMission, 
  onStartMission, 
  onCancelMission 
}: MissionPlannerProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [newMission, setNewMission] = useState({
    name: '',
    type: 'reconnaissance' as const,
    waypoints: [] as Waypoint[]
  });

  const getMissionTypeColor = (type: string) => {
    switch (type) {
      case 'reconnaissance': return 'bg-blue-600';
      case 'inspection': return 'bg-green-600';
      case 'mapping': return 'bg-purple-600';
      case 'delivery': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'completed': return 'bg-blue-600';
      case 'failed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const addWaypoint = () => {
    const newWaypoint: Waypoint = {
      lat: 3.8480 + (Math.random() - 0.5) * 0.01,
      lng: 11.5021 + (Math.random() - 0.5) * 0.01,
      altitude: Math.floor(Math.random() * 200) + 50,
      action: 'Surveillance'
    };
    setNewMission(prev => ({
      ...prev,
      waypoints: [...prev.waypoints, newWaypoint]
    }));
  };

  const removeWaypoint = (index: number) => {
    setNewMission(prev => ({
      ...prev,
      waypoints: prev.waypoints.filter((_, i) => i !== index)
    }));
  };

  const saveMission = () => {
    if (newMission.name && newMission.waypoints.length > 0) {
      const mission: Mission = {
        id: Date.now().toString(),
        name: newMission.name,
        type: newMission.type,
        waypoints: newMission.waypoints,
        status: 'pending'
      };
      // Ici vous pourriez ajouter la mission à la liste
      setNewMission({ name: '', type: 'reconnaissance', waypoints: [] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Missions existantes */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Missions Disponibles</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((mission) => (
            <div 
              key={mission.id}
              className={`bg-slate-700/50 rounded-lg p-4 border border-slate-600 cursor-pointer transition-all duration-200 hover:bg-slate-600/50 ${
                selectedMission?.id === mission.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMission(mission)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-white">{mission.name}</h5>
                <span className={`px-2 py-1 rounded text-xs ${getMissionTypeColor(mission.type)}`}>
                  {mission.type.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">
                  {mission.waypoints.length} waypoints
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(mission.status)}`}>
                  {mission.status.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2">
                {mission.waypoints.slice(0, 3).map((waypoint, index) => (
                  <div key={index} className="text-xs text-gray-400">
                    WP{index + 1}: {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)} 
                    ({waypoint.altitude}m - {waypoint.action})
                  </div>
                ))}
                {mission.waypoints.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{mission.waypoints.length - 3} autres waypoints
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartMission(mission);
                  }}
                  disabled={mission.status === 'active' || activeMission?.id === mission.id}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    mission.status === 'active' || activeMission?.id === mission.id
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  Démarrer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission active */}
      {activeMission && (
        <div className="bg-green-600/20 border border-green-500 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-green-400">
              Mission Active: {activeMission.name}
            </h4>
            <button
              onClick={onCancelMission}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
            >
              Annuler
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Type:</span>
              <div className="text-white font-medium">{activeMission.type}</div>
            </div>
            <div>
              <span className="text-gray-300">Waypoints:</span>
              <div className="text-white font-medium">{activeMission.waypoints.length}</div>
            </div>
            <div>
              <span className="text-gray-300">Statut:</span>
              <div className="text-green-400 font-medium">EN COURS</div>
            </div>
            <div>
              <span className="text-gray-300">Progression:</span>
              <div className="text-white font-medium">2/5 waypoints</div>
            </div>
          </div>
        </div>
      )}

      {/* Créer une nouvelle mission */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-lg font-semibold text-white mb-4">Créer une Nouvelle Mission</h4>
        
        <div className="space-y-4">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Nom de la mission</label>
              <input
                type="text"
                value={newMission.name}
                onChange={(e) => setNewMission(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Reconnaissance Zone A"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Type de mission</label>
              <select
                value={newMission.type}
                onChange={(e) => setNewMission(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="reconnaissance">Reconnaissance</option>
                <option value="inspection">Inspection</option>
                <option value="mapping">Cartographie</option>
                <option value="delivery">Livraison</option>
              </select>
            </div>
          </div>

          {/* Waypoints */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-gray-300">Waypoints</label>
              <button
                onClick={addWaypoint}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                + Ajouter
              </button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {newMission.waypoints.map((waypoint, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-slate-600 rounded">
                  <span className="text-xs text-gray-300 w-8">WP{index + 1}</span>
                  <span className="text-xs text-white flex-1">
                    {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)} ({waypoint.altitude}m)
                  </span>
                  <button
                    onClick={() => removeWaypoint(index)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {newMission.waypoints.length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  Aucun waypoint ajouté
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setNewMission({ name: '', type: 'reconnaissance', waypoints: [] })}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={saveMission}
              disabled={!newMission.name || newMission.waypoints.length === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !newMission.name || newMission.waypoints.length === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>

      {/* Détails de la mission sélectionnée */}
      {selectedMission && (
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h4 className="text-lg font-semibold text-white mb-4">
            Détails: {selectedMission.name}
          </h4>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-300">Type:</span>
                <div className="text-white">{selectedMission.type}</div>
              </div>
              <div>
                <span className="text-gray-300">Statut:</span>
                <div className="text-white">{selectedMission.status}</div>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-300">Waypoints détaillés:</span>
              <div className="mt-2 space-y-1">
                {selectedMission.waypoints.map((waypoint, index) => (
                  <div key={index} className="text-xs text-gray-400 bg-slate-600 p-2 rounded">
                    <strong>WP{index + 1}:</strong> {waypoint.lat.toFixed(6)}, {waypoint.lng.toFixed(6)}<br/>
                    Altitude: {waypoint.altitude}m | Action: {waypoint.action}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 