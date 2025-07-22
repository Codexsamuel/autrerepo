import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function DroneModel() {
  // Charge le modèle 3D du drone (GLB)
  const { scene } = useGLTF('/models/drone.glb', true);
  return <primitive object={scene} scale={1.5} />;
}

function DemoDrone() {
  // Cube de démo si le modèle n'est pas trouvé
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[2, 1, 3]} />
      <meshStandardMaterial color="#4f46e5" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

export default function Drone3DView() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-blue-100 via-white to-purple-100 rounded-xl shadow-lg">
      <Canvas shadows camera={{ position: [3, 2, 6], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.7} contactShadow={{ opacity: 0.6, blur: 2 }}>
            {/* Essaye de charger le modèle drone.glb, sinon fallback cube */}
            <ErrorBoundary fallback={<DemoDrone />}>
              <DroneModel />
            </ErrorBoundary>
          </Stage>
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

// Simple ErrorBoundary pour fallback
import { Component, ReactNode } from 'react';
class ErrorBoundary extends Component<{ fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Nécessaire pour le support GLTF
// @ts-ignore
useGLTF.preload && useGLTF.preload('/models/drone.glb'); 