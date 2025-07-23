"use client";

import { Float, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

// Composant pour les hélices rotatives
function RotatingPropeller({ position, rotation, speed = 1, color = "#444444" }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
  color?: string;
}) {
  const propellerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (propellerRef.current) {
      propellerRef.current.rotation.y += 0.5 * speed;
    }
  });

  return (
    <group ref={propellerRef} position={position} rotation={rotation}>
      {/* Lames d'hélice */}
      {[0, 1, 2, 3].map((blade) => (
        <mesh key={blade} rotation={[0, (blade * Math.PI) / 2, 0]}>
          <boxGeometry args={[0.8, 0.02, 0.08]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Hub central */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.05]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Composant pour les LED clignotantes
function BlinkingLED({ position, color = "#ff0000", blinkSpeed = 1 }: {
  position: [number, number, number];
  color?: string;
  blinkSpeed?: number;
}) {
  const ledRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ledRef.current) {
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * blinkSpeed) * 0.7;
      (ledRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <mesh ref={ledRef} position={position}>
      <sphereGeometry args={[0.05]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Modèle Sentinel V1 avancé
function SentinelV1Model({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, isRunning = false }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isRunning?: boolean;
}) {
  const droneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (droneRef.current && isRunning) {
      // Effet de flottement
      droneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Légère oscillation
      droneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={droneRef} position={position} rotation={rotation} scale={scale}>
        {/* Corps principal */}
        <group>
          {/* Hub central */}
          <mesh>
            <cylinderGeometry args={[0.8, 1.2, 0.4, 8]} />
            <meshStandardMaterial color="#2563eb" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Couverture supérieure */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.1, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Compartiment batterie */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.8]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        {/* Bras et moteurs */}
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
            {/* Bras */}
            <mesh position={[1.5, 0, 0]}>
              <boxGeometry args={[1.2, 0.15, 0.15]} />
              <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Moteur */}
            <mesh position={[2.2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.3, 0.4, 12]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Hélice rotative */}
            <RotatingPropeller
              position={[2.2, 0.25, 0]}
              speed={isRunning ? 15 : 0}
              color={i % 2 === 0 ? "#444444" : "#666666"}
            />

            {/* LED de navigation */}
            <BlinkingLED
              position={[1.8, -0.1, 0]}
              color={i < 2 ? "#ff0000" : "#00ff00"}
              blinkSpeed={2 + i * 0.5}
            />
          </group>
        ))}

        {/* Gimbal caméra */}
        <group position={[0, -0.4, 0.6]}>
          <mesh>
            <sphereGeometry args={[0.25]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Objectif caméra */}
          <mesh position={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1]} />
            <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
          </mesh>

          {/* Verre d'objectif */}
          <mesh position={[0, 0, 0.25]}>
            <cylinderGeometry args={[0.12, 0.12, 0.02]} />
            <meshStandardMaterial 
              color="#4444ff" 
              metalness={0.1} 
              roughness={0.1} 
              transparent 
              opacity={0.8} 
            />
          </mesh>
        </group>

        {/* Train d'atterrissage */}
        {[-0.8, 0.8].map((x, i) => (
          <group key={i} position={[x, -0.3, 0]}>
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, 0.4]} />
              <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.25, 0]}>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Antennes */}
        <mesh position={[0, 0.4, -0.5]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
        <mesh position={[0.3, 0.4, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#666666" />
        </mesh>

        {/* Capteurs thermiques */}
        <group position={[0, 0.2, -0.3]}>
          <mesh>
            <boxGeometry args={[0.1, 0.05, 0.05]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// Modèle Atlas X1 avancé
function AtlasX1Model({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, isRunning = false }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isRunning?: boolean;
}) {
  const droneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (droneRef.current && isRunning) {
      droneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={droneRef} position={position} rotation={rotation} scale={scale}>
        {/* Corps principal plus large */}
        <group>
          <mesh>
            <cylinderGeometry args={[1.0, 1.4, 0.5, 8]} />
            <meshStandardMaterial color="#059669" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Réservoir de pulvérisation */}
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.3, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>

        {/* Bras plus longs */}
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
            <mesh position={[1.8, 0, 0]}>
              <boxGeometry args={[1.5, 0.2, 0.2]} />
              <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </mesh>

            <mesh position={[2.5, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.35, 0.5, 12]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>

            <RotatingPropeller
              position={[2.5, 0.3, 0]}
              speed={isRunning ? 12 : 0}
              color="#555555"
            />

            <BlinkingLED
              position={[2.0, -0.15, 0]}
              color={i < 2 ? "#ffaa00" : "#00ffaa"}
              blinkSpeed={1.5 + i * 0.3}
            />
          </group>
        ))}

        {/* Système de pulvérisation */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.2]} />
            <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        {/* Capteurs de sol */}
        <group position={[0, -0.6, 0]}>
          {[-0.3, 0, 0.3].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.1]} />
              <meshStandardMaterial color="#444444" emissive="#00ff00" emissiveIntensity={0.2} />
            </mesh>
          ))}
        </group>

        {/* Train d'atterrissage robuste */}
        {[-1.0, 1.0].map((x, i) => (
          <group key={i} position={[x, -0.4, 0]}>
            <mesh>
              <cylinderGeometry args={[0.05, 0.05, 0.5]} />
              <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.12]} />
              <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

// Composant principal
export default function AdvancedDrone3D({ 
  droneType = 'sentinel', 
  isRunning = false, 
  showControls = true,
  cameraPosition = [0, 0, 8]
}: {
  droneType?: 'sentinel' | 'atlas';
  isRunning?: boolean;
  showControls?: boolean;
  cameraPosition?: [number, number, number];
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        {/* Éclairage avancé */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#4444ff" />
        <spotLight 
          position={[0, 10, 0]} 
          intensity={1} 
          angle={0.3} 
          penumbra={0.5} 
          castShadow 
        />

        {/* Modèle de drone */}
        {droneType === 'sentinel' ? (
          <SentinelV1Model isRunning={isRunning} />
        ) : (
          <AtlasX1Model isRunning={isRunning} />
        )}

        {/* Contrôles de caméra */}
        {showControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        )}

        {/* Plan de sol pour ombres */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
} 