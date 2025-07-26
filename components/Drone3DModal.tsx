'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Maximize, Minimize, Pause, Play, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';

interface Drone3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  droneModel?: string;
}

export default function Drone3DModal({ isOpen, onClose, droneModel = 'default' }: Drone3DModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    // Reset 3D model rotation
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Simulation 3D - Drone {droneModel}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="flex items-center space-x-1"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center space-x-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullscreen}
                className="flex items-center space-x-1"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Close</span>
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 bg-gray-900 relative">
          {/* Placeholder pour le modèle 3D */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modèle 3D Drone</h3>
              <p className="text-gray-300 mb-4">
                Simulation interactive du drone {droneModel}
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Utilisez la souris pour faire pivoter le modèle</p>
                <p>• Molette pour zoomer/dézoomer</p>
                <p>• Clic droit pour déplacer la caméra</p>
              </div>
            </div>
          </div>
          
          {/* Contrôles de simulation */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-sm text-gray-300">Vitesse:</span>
                    <span className="ml-2 font-semibold">Normal</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-300">Altitude:</span>
                    <span className="ml-2 font-semibold">150m</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-300">Batterie:</span>
                    <span className="ml-2 font-semibold text-green-400">85%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    Démarrer Mission
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    Plan de Vol
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 