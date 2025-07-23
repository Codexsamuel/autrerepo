"use client";

import { Environment, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

interface BlenderModelViewerProps {
  modelPath: string;
  droneType: 'sentinel' | 'atlas';
  isRunning?: boolean;
  showControls?: boolean;
}

function DroneModel({ modelPath, isRunning = false }: { modelPath: string; isRunning?: boolean }) {
  const gltf = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current && isRunning) {
      // Animation de flottement
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotation lente
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene} 
      scale={0.5}
      position={[0, 0, 0]}
    />
  );
}

export default function BlenderModelViewer({ 
  modelPath, 
  droneType, 
  isRunning = false, 
  showControls = true 
}: BlenderModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError("Erreur de chargement du modèle 3D");
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-sm">Chargement du modèle 3D...</p>
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center bg-red-900/50 p-6 rounded-lg">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <p className="text-gray-400 text-xs">
              Modèle Blender non trouvé. Utilisez le script d'export pour générer le fichier GLB.
            </p>
          </div>
        </div>
      )}

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={handleLoad}
        onError={handleError}
      >
        {/* Éclairage professionnel */}
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4444ff" />

        {/* Modèle 3D */}
        <Stage environment="sunset" intensity={0.6}>
          <DroneModel modelPath={modelPath} isRunning={isRunning} />
        </Stage>

        {/* Contrôles de caméra */}
        {showControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isRunning}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        )}

        {/* Plan de sol */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
        </mesh>
      </Canvas>

      {/* Overlay d'informations */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <h3 className="text-white font-bold text-sm mb-1">
            {droneType === 'sentinel' ? 'Sentinel V1' : 'Atlas X1'}
          </h3>
          <p className="text-gray-300 text-xs">Modèle Blender</p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-gray-500'}`} />
            <span className="text-xs text-gray-400">
              {isRunning ? 'Animation active' : 'Statique'}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <p className="text-gray-400 text-xs mb-1">🖱️ Clic + glisser: Rotation</p>
          <p className="text-gray-400 text-xs mb-1">🔄 Molette: Zoom</p>
          <p className="text-gray-400 text-xs">⌨️ Maintenir Shift: Pan</p>
        </div>
      </div>
    </div>
  );
} 