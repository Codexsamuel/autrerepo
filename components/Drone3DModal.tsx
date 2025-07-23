"use client";

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Drone3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

// Composant 3D du drone Atlas X1 - Modèle détaillé
function DroneAtlasX1() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Corps principal - Forme aérodynamique */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.3, 0.15, 12]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>

      {/* Couvercle supérieur avec logo */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 12]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.6} 
          roughness={0.3}
        />
      </mesh>

      {/* Bras du drone - 4 bras articulés */}
      {[0, 90, 180, 270].map((angle, index) => {
        const x = Math.cos(angle * Math.PI / 180) * 0.45;
        const z = Math.sin(angle * Math.PI / 180) * 0.45;
        
        return (
          <group key={index} position={[x, 0, z]}>
            {/* Bras principal */}
            <mesh castShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
              <meshStandardMaterial 
                color="#333" 
                metalness={0.7} 
                roughness={0.3}
              />
            </mesh>

            {/* Jointure articulée */}
            <mesh position={[0, 0.2, 0]} castShadow>
              <sphereGeometry args={[0.035, 8, 6]} />
              <meshStandardMaterial 
                color="#444" 
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>

            {/* Support d'hélice */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.05, 8]} />
              <meshStandardMaterial 
                color="#555" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>

            {/* Hélice - 2 pales */}
            <group position={[0, 0.3, 0]}>
              {/* Pale 1 */}
              <mesh castShadow rotation={[0, 0, 0]}>
                <boxGeometry args={[0.25, 0.01, 0.05]} />
                <meshStandardMaterial 
                  color="#666" 
                  metalness={0.5} 
                  roughness={0.4}
                />
              </mesh>
              {/* Pale 2 */}
              <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.25, 0.01, 0.05]} />
                <meshStandardMaterial 
                  color="#666" 
                  metalness={0.5} 
                  roughness={0.4}
                />
              </mesh>
              {/* Centre de l'hélice */}
              <mesh castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
                <meshStandardMaterial 
                  color="#777" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Caméra principale 4K */}
      <group position={[0, -0.1, 0.25]}>
        {/* Corps de la caméra */}
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.08, 0.15]} />
          <meshStandardMaterial 
            color="#000" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        {/* Objectif */}
        <mesh position={[0, 0, 0.08]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
          <meshStandardMaterial 
            color="#111" 
            metalness={0.95} 
            roughness={0.05}
          />
        </mesh>
        {/* Lentille */}
        <mesh position={[0, 0, 0.09]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.005, 12]} />
          <meshStandardMaterial 
            color="#333" 
            metalness={0.8} 
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Réservoir de pulvérisation */}
      <group position={[0, -0.15, -0.2]}>
        {/* Réservoir principal */}
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 12]} />
          <meshStandardMaterial 
            color="#0066cc" 
            metalness={0.3} 
            roughness={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Buse de pulvérisation */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
          <meshStandardMaterial 
            color="#333" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Indicateur de niveau */}
        <mesh position={[0.12, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
          <meshStandardMaterial 
            color="#00ff00" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#00ff00"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Capteurs et antennes */}
      <group position={[0, 0.1, 0]}>
        {/* Antenne GPS */}
        <mesh position={[0.1, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
          <meshStandardMaterial 
            color="#666" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Capteur de proximité */}
        <mesh position={[-0.1, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.02, 8, 6]} />
          <meshStandardMaterial 
            color="#ff6600" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#ff6600"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Capteur de température */}
        <mesh position={[0, 0.05, 0.1]} castShadow>
          <sphereGeometry args={[0.015, 8, 6]} />
          <meshStandardMaterial 
            color="#00ffff" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#00ffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* Batterie et électronique */}
      <group position={[0, -0.05, 0]}>
        {/* Batterie principale */}
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.08, 0.15]} />
          <meshStandardMaterial 
            color="#222" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>
        {/* Indicateur de batterie */}
        <mesh position={[0.13, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.06, 0.02]} />
          <meshStandardMaterial 
            color="#00ff00" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#00ff00"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Logo DL Solutions */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.001, 12]} />
        <meshStandardMaterial 
          color="#0066ff" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#0066ff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

// Composant 3D du drone Sentinel V1 - Modèle militaire
function DroneSentinelV1() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Corps principal - Forme furtive */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.25, 0.12, 8]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Couvercle supérieur avec revêtement furtif */}
      <mesh position={[0, 0.07, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 8]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Bras du drone - 4 bras courts et robustes */}
      {[0, 90, 180, 270].map((angle, index) => {
        const x = Math.cos(angle * Math.PI / 180) * 0.4;
        const z = Math.sin(angle * Math.PI / 180) * 0.4;
        
        return (
          <group key={index} position={[x, 0, z]}>
            {/* Bras principal */}
            <mesh castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
              <meshStandardMaterial 
                color="#222" 
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>

            {/* Support d'hélice renforcé */}
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.06, 8]} />
              <meshStandardMaterial 
                color="#333" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>

            {/* Hélice - 3 pales */}
            <group position={[0, 0.28, 0]}>
              {[0, 120, 240].map((rot, i) => (
                <mesh key={i} castShadow rotation={[0, 0, rot * Math.PI / 180]}>
                  <boxGeometry args={[0.2, 0.008, 0.04]} />
                  <meshStandardMaterial 
                    color="#444" 
                    metalness={0.6} 
                    roughness={0.3}
                  />
                </mesh>
              ))}
              {/* Centre de l'hélice */}
              <mesh castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
                <meshStandardMaterial 
                  color="#555" 
                  metalness={0.9} 
                  roughness={0.1}
                />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Caméra thermique */}
      <group position={[0, -0.08, 0.2]}>
        {/* Corps de la caméra */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.06, 0.12]} />
          <meshStandardMaterial 
            color="#000" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        {/* Objectif thermique */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
          <meshStandardMaterial 
            color="#111" 
            metalness={0.95} 
            roughness={0.05}
          />
        </mesh>
        {/* Lentille thermique */}
        <mesh position={[0, 0, 0.07]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.005, 12]} />
          <meshStandardMaterial 
            color="#ff4400" 
            metalness={0.8} 
            roughness={0.2}
            transparent
            opacity={0.7}
            emissive="#ff4400"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Module de détection de mines */}
      <group position={[0, -0.12, -0.15]}>
        {/* Scanner principal */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
          <meshStandardMaterial 
            color="#333" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>
        {/* Antenne de détection */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
          <meshStandardMaterial 
            color="#666" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Indicateur de détection */}
        <mesh position={[0.06, 0, 0]} castShadow>
          <sphereGeometry args={[0.015, 8, 6]} />
          <meshStandardMaterial 
            color="#ff0000" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#ff0000"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Charge explosive (optionnelle) */}
      <group position={[0, -0.1, 0]}>
        {/* Corps de la charge */}
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
          <meshStandardMaterial 
            color="#ff0000" 
            metalness={0.6} 
            roughness={0.4}
            emissive="#ff0000"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Détonateur */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.02, 8, 6]} />
          <meshStandardMaterial 
            color="#ffff00" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#ffff00"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Antennes et capteurs */}
      <group position={[0, 0.08, 0]}>
        {/* Antenne GPS */}
        <mesh position={[0.08, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.12, 8]} />
          <meshStandardMaterial 
            color="#666" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Antenne de communication */}
        <mesh position={[-0.08, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.12, 8]} />
          <meshStandardMaterial 
            color="#666" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Capteur de mouvement */}
        <mesh position={[0, 0.03, 0.08]} castShadow>
          <sphereGeometry args={[0.015, 8, 6]} />
          <meshStandardMaterial 
            color="#00ff00" 
            metalness={0.5} 
            roughness={0.5}
            emissive="#00ff00"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Logo Sentinel */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.001, 8]} />
        <meshStandardMaterial 
          color="#ff0000" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#ff0000"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function Drone3DModal({ isOpen, onClose, children }: Drone3DModalProps) {
  const [selectedDrone, setSelectedDrone] = useState<'atlas' | 'sentinel'>('atlas');

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
            className="relative bg-[#0b0f17] rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-bold text-white">Visualisation 3D - Prototypes DL Drones</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDrone('atlas')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedDrone === 'atlas' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Atlas X1
                  </button>
                  <button
                    onClick={() => setSelectedDrone('sentinel')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedDrone === 'sentinel' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Sentinel V1
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Contenu 3D */}
            <div className="w-full h-full">
              <Canvas camera={{ position: [4, 3, 4], fov: 45 }} shadows>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.6} />
                <pointLight position={[0, 10, 0]} intensity={0.8} castShadow />
                
                <Stage environment="city" intensity={0.8} shadows>
                  {selectedDrone === 'atlas' ? <DroneAtlasX1 /> : <DroneSentinelV1 />}
                </Stage>
                
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={true}
                  autoRotateSpeed={0.3}
                  minDistance={2}
                  maxDistance={10}
                />
              </Canvas>
            </div>

            {/* Contrôles et informations */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-between text-white/80 text-sm">
                <div className="flex items-center gap-6">
                  <span>🖱️ Rotation automatique</span>
                  <span>🔍 Zoom avec molette</span>
                  <span>✋ Déplacer avec clic</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {selectedDrone === 'atlas' ? 'Atlas X1 - Industriel' : 'Sentinel V1 - Militaire'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {selectedDrone === 'atlas' 
                      ? 'Pulvérisation, transport, analyse' 
                      : 'Surveillance, détection, tactique'
                    }
                  </div>
                </div>
              </div>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 