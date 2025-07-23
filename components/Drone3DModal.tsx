"use client";

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface Drone3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

// Composant 3D du drone (placeholder pour l'instant)
function DroneModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 0.2, 1]} />
      <meshStandardMaterial color="#2a2a2a" />
      
      {/* Corps principal */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Bras du drone */}
      {[0, 90, 180, 270].map((angle, index) => (
        <mesh key={index} position={[Math.cos(angle * Math.PI / 180) * 0.4, 0, Math.sin(angle * Math.PI / 180) * 0.4]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#333" />
          
          {/* Hélices */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 8]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        </mesh>
      ))}
      
      {/* Caméra */}
      <mesh position={[0, -0.1, 0.3]}>
        <boxGeometry args={[0.1, 0.05, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </mesh>
  );
}

export default function Drone3DModal({ isOpen, onClose, children }: Drone3DModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-[#0b0f17] rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 bg-gradient-to-b from-black/50 to-transparent">
              <h2 className="text-2xl font-bold text-white">Visualisation 3D - Drone Atlas X1</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Contenu 3D */}
            <div className="w-full h-full">
              <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <Stage environment="city" intensity={0.6}>
                  <DroneModel />
                </Stage>
                
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>

            {/* Contrôles */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
                <span>🖱️ Rotation automatique</span>
                <span>🔍 Zoom avec molette</span>
                <span>✋ Déplacer avec clic</span>
              </div>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 