import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, createElement, useEffect } from 'react';

function DroneModel() {
  // useGLTF type signature does not match overload for string path
  const { scene } = useGLTF('/models/drone.glb', true);
  return <primitive object={scene} scale={1.5} />;
}

function DemoDrone() {
  // Utilisation de React.createElement pour lever les erreurs JSX/TS sur les éléments mesh/geometry/material
  return createElement(
    'mesh',
    { castShadow: true, receiveShadow: true },
    createElement('boxGeometry', { args: [2, 1, 3] }),
    createElement('meshStandardMaterial', { color: '#4f46e5', metalness: 0.5, roughness: 0.3 })
  );
}

export default function Drone3DModal({ onClose }: { onClose: () => void }) {
  // Fermer avec ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl h-[70vh] bg-[#181f2a] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-lg focus:outline-none"
            aria-label="Fermer la vue 3D"
          >
            <X className="w-6 h-6" />
          </button>
          {/* Viewer 3D */}
          <div className="w-full h-full">
            <Canvas shadows camera={{ position: [3, 2, 6], fov: 50 }} dpr={[1, 2]}>
              {/* @ts-expect-error: JSX types for ambientLight/directionalLight may not be recognized by TS in some Next.js setups */}
              <ambientLight intensity={0.5} />
              {/* @ts-expect-error: JSX types for ambientLight/directionalLight may not be recognized by TS in some Next.js setups */}
              <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
              <Stage environment="city" intensity={0.7} contactShadow={{ opacity: 0.6, blur: 2 }}>
                <ErrorBoundary fallback={<DemoDrone />}>
                  <DroneModel />
                </ErrorBoundary>
              </Stage>
              <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ErrorBoundary pour fallback 3D
import { Component } from 'react';
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
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
if (typeof useGLTF.preload === 'function') {
  useGLTF.preload('/models/drone.glb');
} 