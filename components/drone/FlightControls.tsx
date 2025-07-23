'use client';

import { useState } from 'react';

interface FlightControlsProps {
  droneState: any;
  onStateChange: (newState: any) => void;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
}

export default function FlightControls({ droneState, onStateChange, isPlaying, onPlayPause }: FlightControlsProps) {
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [throttle, setThrottle] = useState(0);
  const [yaw, setYaw] = useState(0);

  const handlePitchChange = (value: number) => {
    setPitch(value);
    onStateChange({ pitch: value });
  };

  const handleRollChange = (value: number) => {
    setRoll(value);
    onStateChange({ roll: value });
  };

  const handleThrottleChange = (value: number) => {
    setThrottle(value);
    onStateChange({ throttle: value });
  };

  const handleYawChange = (value: number) => {
    setYaw(value);
    onStateChange({ yaw: value });
  };

  const handleArm = () => {
    onStateChange({ status: 'armed' });
  };

  const handleDisarm = () => {
    onStateChange({ status: 'disarmed' });
  };

  const handleTakeoff = () => {
    onStateChange({ status: 'flying', altitude: 50 });
  };

  const handleLand = () => {
    onStateChange({ status: 'landed', altitude: 0 });
  };

  const handleEmergencyStop = () => {
    onStateChange({ 
      status: 'emergency', 
      altitude: 0, 
      speed: 0, 
      pitch: 0, 
      roll: 0, 
      throttle: 0, 
      yaw: 0 
    });
    setPitch(0);
    setRoll(0);
    setThrottle(0);
    setYaw(0);
  };

  return (
    <div className="space-y-6">
      {/* Contrôles de Vol */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 text-white">Contrôles de Vol</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Pitch */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Pitch</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePitchChange(Math.max(-1, pitch - 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                ↑
              </button>
              <div className="flex-1 bg-slate-600 rounded h-2 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all duration-200"
                  style={{ width: `${((pitch + 1) / 2) * 100}%` }}
                />
              </div>
              <button
                onClick={() => handlePitchChange(Math.min(1, pitch + 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                ↓
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center">{pitch.toFixed(2)}</div>
          </div>

          {/* Roll */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Roll</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRollChange(Math.max(-1, roll - 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                ←
              </button>
              <div className="flex-1 bg-slate-600 rounded h-2 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 rounded transition-all duration-200"
                  style={{ width: `${((roll + 1) / 2) * 100}%` }}
                />
              </div>
              <button
                onClick={() => handleRollChange(Math.min(1, roll + 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                →
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center">{roll.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Throttle & Yaw */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 text-white">Throttle & Yaw</h3>
        
        <div className="space-y-4">
          {/* Throttle */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Throttle</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleThrottleChange(Math.max(0, throttle - 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                ↓
              </button>
              <div className="flex-1 bg-slate-600 rounded h-2 relative">
                <div 
                  className="absolute bottom-0 left-0 w-full bg-red-500 rounded transition-all duration-200"
                  style={{ height: `${throttle * 100}%` }}
                />
              </div>
              <button
                onClick={() => handleThrottleChange(Math.min(1, throttle + 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                ↑
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center">{throttle.toFixed(1)}</div>
          </div>

          {/* Yaw */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Yaw</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleYawChange(Math.max(-1, yaw - 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                ←
              </button>
              <div className="flex-1 bg-slate-600 rounded h-2 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-purple-500 rounded transition-all duration-200"
                  style={{ width: `${((yaw + 1) / 2) * 100}%` }}
                />
              </div>
              <button
                onClick={() => handleYawChange(Math.min(1, yaw + 0.1))}
                className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white transition-colors"
                disabled={!isPlaying}
              >
                →
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center">{yaw.toFixed(1)}</div>
          </div>
        </div>
      </div>

      {/* Système */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 text-white">Système</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleArm}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            disabled={droneState.status === 'armed' || droneState.status === 'flying'}
          >
            ARM
          </button>
          
          <button
            onClick={handleDisarm}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            disabled={droneState.status === 'disarmed'}
          >
            DISARM
          </button>
          
          <button
            onClick={handleTakeoff}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            disabled={droneState.status !== 'armed'}
          >
            TAKEOFF
          </button>
          
          <button
            onClick={handleLand}
            className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
            disabled={droneState.status !== 'flying'}
          >
            LAND
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Mode de Vol</span>
            <span className="text-white font-medium">{droneState.mode}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Statut</span>
            <span className={`px-2 py-1 rounded text-xs ${
              droneState.status === 'flying' ? 'bg-green-600' :
              droneState.status === 'armed' ? 'bg-yellow-600' :
              droneState.status === 'emergency' ? 'bg-red-600' :
              'bg-gray-600'
            }`}>
              {droneState.status.toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={handleEmergencyStop}
          className="w-full mt-4 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold transition-colors"
        >
          EMERGENCY STOP
        </button>
      </div>
    </div>
  );
} 