'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    Shield
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DroneState {
  battery: number;
  altitude: number;
  speed: number;
  heading: number;
  status: string;
  mode: string;
}

interface FlightControlsProps {
  droneState: DroneState;
  onStateChange: (state: Partial<DroneState>) => void;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
}

export default function FlightControls({ 
  droneState, 
  onStateChange, 
  isPlaying, 
  onPlayPause 
}: FlightControlsProps) {
  const [throttle, setThrottle] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [isArmed, setIsArmed] = useState(false);
  const [flightMode, setFlightMode] = useState<'manual' | 'auto' | 'mission'>('manual');

  const joystickRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

  // Gestion du joystick virtuel
  const handleJoystickStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    updateJoystickPosition(e);
  };

  const handleJoystickMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      updateJoystickPosition(e);
    }
  };

  const handleJoystickEnd = () => {
    setIsDragging(false);
    setJoystickPosition({ x: 0, y: 0 });
    setPitch(0);
    setRoll(0);
  };

  const updateJoystickPosition = (e: React.MouseEvent | React.TouchEvent) => {
    if (!joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const maxDistance = rect.width / 2 - 20;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedDistance = Math.min(distance, maxDistance) / maxDistance;

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * normalizedDistance;
    const y = Math.sin(angle) * normalizedDistance;

    setJoystickPosition({ x, y });
    setRoll(x);
    setPitch(-y);
  };

  // Mise à jour de l'état du drone basée sur les contrôles
  useEffect(() => {
    if (isPlaying && isArmed) {
      const interval = setInterval(() => {
        onStateChange({
          altitude: Math.max(0, droneState.altitude + throttle * 0.5),
          heading: (droneState.heading + yaw * 2) % 360,
          speed: Math.max(0, Math.min(30, droneState.speed + (pitch + roll) * 0.1)),
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isArmed, throttle, yaw, pitch, roll, onStateChange, droneState]);

  const armDrone = () => {
    setIsArmed(true);
    onStateChange({ status: 'armed' });
  };

  const disarmDrone = () => {
    setIsArmed(false);
    onStateChange({ status: 'idle' });
  };

  const takeoff = () => {
    if (isArmed) {
      onStateChange({ status: 'takeoff' });
      setTimeout(() => {
        onStateChange({ status: 'flying' });
      }, 3000);
    }
  };

  const land = () => {
    onStateChange({ status: 'landing' });
    setTimeout(() => {
      onStateChange({ status: 'idle' });
      setIsArmed(false);
    }, 3000);
  };

  const emergencyStop = () => {
    onStateChange({ status: 'error', mode: 'emergency' });
    setIsArmed(false);
    onPlayPause(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Joystick principal */}
      <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
        <h4 className="text-sm font-semibold mb-4 text-center">Contrôles de Vol</h4>
        
        <div className="flex justify-center mb-4">
          <div
            ref={joystickRef}
            className="relative w-32 h-32 bg-slate-800 rounded-full border-2 border-slate-600 cursor-pointer"
            onMouseDown={handleJoystickStart}
            onMouseMove={handleJoystickMove}
            onMouseUp={handleJoystickEnd}
            onMouseLeave={handleJoystickEnd}
            onTouchStart={handleJoystickStart}
            onTouchMove={handleJoystickMove}
            onTouchEnd={handleJoystickEnd}
          >
            {/* Centre du joystick */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-slate-400 rounded-full" />
            </div>
            
            {/* Poignée du joystick */}
            <motion.div
              className="absolute w-8 h-8 bg-blue-500 rounded-full shadow-lg"
              animate={{
                x: joystickPosition.x * 40,
                y: joystickPosition.y * 40,
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            
            {/* Indicateurs de direction */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-xs text-slate-400 space-y-8">
                <div>↑</div>
                <div className="flex justify-between w-16">
                  <span>←</span>
                  <span>→</span>
                </div>
                <div>↓</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-center">
          <div>
            <span className="text-slate-400">Pitch:</span>
            <span className="ml-1">{pitch.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400">Roll:</span>
            <span className="ml-1">{roll.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Contrôles de throttle et yaw */}
      <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
        <h4 className="text-sm font-semibold mb-4 text-center">Throttle & Yaw</h4>
        
        <div className="space-y-4">
          {/* Throttle */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">Throttle</label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={throttle}
              onChange={(e) => setThrottle(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>↓</span>
              <span>{throttle.toFixed(1)}</span>
              <span>↑</span>
            </div>
          </div>
          
          {/* Yaw */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">Yaw</label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={yaw}
              onChange={(e) => setYaw(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>←</span>
              <span>{yaw.toFixed(1)}</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles de système */}
      <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
        <h4 className="text-sm font-semibold mb-4 text-center">Système</h4>
        
        <div className="space-y-3">
          {/* Arm/Disarm */}
          <div className="flex space-x-2">
            <button
              onClick={armDrone}
              disabled={isArmed || !isPlaying}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                isArmed 
                  ? 'bg-green-600 text-white cursor-not-allowed' 
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              }`}
            >
              <Shield className="w-3 h-3 inline mr-1" />
              ARM
            </button>
            <button
              onClick={disarmDrone}
              disabled={!isArmed}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                !isArmed 
                  ? 'bg-red-600 text-white cursor-not-allowed' 
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              }`}
            >
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              DISARM
            </button>
          </div>
          
          {/* Takeoff/Land */}
          <div className="flex space-x-2">
            <button
              onClick={takeoff}
              disabled={!isArmed || droneState.status === 'flying'}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                !isArmed || droneState.status === 'flying'
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <ArrowUp className="w-3 h-3 inline mr-1" />
              TAKEOFF
            </button>
            <button
              onClick={land}
              disabled={droneState.status !== 'flying'}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                droneState.status !== 'flying'
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                  : 'bg-yellow-600 hover:bg-yellow-500 text-white'
              }`}
            >
              <ArrowDown className="w-3 h-3 inline mr-1" />
              LAND
            </button>
          </div>
          
          {/* Mode de vol */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">Mode de Vol</label>
            <select
              value={flightMode}
              onChange={(e) => setFlightMode(e.target.value as any)}
              className="w-full p-2 rounded-lg bg-slate-600 border border-slate-500 text-white text-xs"
            >
              <option value="manual">Manuel</option>
              <option value="auto">Auto</option>
              <option value="mission">Mission</option>
            </select>
          </div>
          
          {/* Emergency Stop */}
          <button
            onClick={emergencyStop}
            className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors"
          >
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            EMERGENCY STOP
          </button>
        </div>
      </div>
    </div>
  );
} 