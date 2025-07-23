'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Camera,
    CheckCircle,
    Clock,
    Eye,
    Map,
    Package,
    Play,
    Target,
    X
} from 'lucide-react';
import { useState } from 'react';

interface Mission {
  id: string;
  name: string;
  type: 'reconnaissance' | 'mapping' | 'delivery' | 'inspection' | 'surveillance';
  waypoints: Array<{
    lat: number;
    lng: number;
    altitude: number;
    action: string;
  }>;
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
  const [showNewMission, setShowNewMission] = useState(false);

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'reconnaissance':
        return <Eye className="w-4 h-4" />;
      case 'mapping':
        return <Map className="w-4 h-4" />;
      case 'delivery':
        return <Package className="w-4 h-4" />;
      case 'inspection':
        return <Camera className="w-4 h-4" />;
      case 'surveillance':
        return <Target className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Liste des missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedMission?.id === mission.id
                ? 'bg-blue-600/20 border-blue-500'
                : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
            }`}
            onClick={() => setSelectedMission(mission)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getMissionIcon(mission.type)}
                <h4 className="font-semibold text-sm">{mission.name}</h4>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(mission.status)}`}>
                {getStatusIcon(mission.status)}
                <span className="text-xs">{mission.status}</span>
              </div>
            </div>
            
            <div className="text-xs text-slate-400 mb-3">
              <div>Type: {mission.type}</div>
              <div>Waypoints: {mission.waypoints.length}</div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartMission(mission);
                }}
                disabled={mission.status === 'active' || activeMission !== null}
                className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${
                  mission.status === 'active' || activeMission !== null
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-white'
                }`}
              >
                <Play className="w-3 h-3 inline mr-1" />
                Démarrer
              </button>
              
              {mission.status === 'active' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancelMission();
                  }}
                  className="flex-1 py-1 px-2 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors"
                >
                  <X className="w-3 h-3 inline mr-1" />
                  Annuler
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Détails de la mission sélectionnée */}
      {selectedMission && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center space-x-2">
              {getMissionIcon(selectedMission.type)}
              <span>{selectedMission.name}</span>
            </h3>
            <button
              onClick={() => setSelectedMission(null)}
              className="p-1 rounded hover:bg-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Informations</h4>
              <div className="space-y-1 text-xs text-slate-300">
                <div>Type: {selectedMission.type}</div>
                <div>Status: {selectedMission.status}</div>
                <div>Waypoints: {selectedMission.waypoints.length}</div>
                <div>Distance estimée: {selectedMission.waypoints.length * 0.5} km</div>
                <div>Temps estimé: {selectedMission.waypoints.length * 2} min</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Waypoints</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedMission.waypoints.map((waypoint, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div>Lat: {waypoint.lat.toFixed(6)}</div>
                      <div>Lng: {waypoint.lng.toFixed(6)}</div>
                    </div>
                    <div className="text-right">
                      <div>{waypoint.altitude}m</div>
                      <div className="text-slate-400">{waypoint.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {selectedMission.status === 'pending' && (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => onStartMission(selectedMission)}
                disabled={activeMission !== null}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeMission !== null
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-white'
                }`}
              >
                <Play className="w-4 h-4 inline mr-2" />
                Démarrer la Mission
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Mission active */}
      {activeMission && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-600/20 border border-blue-500 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-400 flex items-center space-x-2">
              <Play className="w-4 h-4 animate-pulse" />
              <span>Mission Active: {activeMission.name}</span>
            </h3>
            <button
              onClick={onCancelMission}
              className="py-1 px-3 rounded bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
            >
              <X className="w-4 h-4 inline mr-1" />
              Annuler
            </button>
          </div>
          
          <div className="text-sm text-blue-300">
            <div>Progression: En cours...</div>
            <div>Waypoint actuel: 1/{activeMission.waypoints.length}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 