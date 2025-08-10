"use client";

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface MilitaryEffectsProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high' | 'critical';
  type?: 'radar' | 'targeting' | 'scanning' | 'threat' | 'defense';
}

export const MilitaryEffects = ({ 
  children, 
  intensity = 'medium', 
  type = 'radar' 
}: MilitaryEffectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [0, 400], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 400], [-15, 15]);

  const getIntensityConfig = () => {
    switch (intensity) {
      case 'critical':
        return { scale: 1.1, blur: 0, glow: '0 0 30px rgba(255, 0, 0, 0.8)' };
      case 'high':
        return { scale: 1.05, blur: 0, glow: '0 0 20px rgba(255, 165, 0, 0.6)' };
      case 'medium':
        return { scale: 1.02, blur: 0, glow: '0 0 15px rgba(255, 255, 0, 0.4)' };
      case 'low':
        return { scale: 1, blur: 0, glow: '0 0 10px rgba(0, 255, 0, 0.3)' };
      default:
        return { scale: 1, blur: 0, glow: 'none' };
    }
  };

  const config = getIntensityConfig();

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Effet de fond militaire */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        {/* Grille militaire */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Particules militaires */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Effet principal */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: config.scale,
          filter: `blur(${config.blur}px)`,
          boxShadow: config.glow,
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Effet de type spécifique */}
      {type === 'radar' && <RadarEffect intensity={intensity} />}
      {type === 'targeting' && <TargetingEffect intensity={intensity} />}
      {type === 'scanning' && <ScanningEffect intensity={intensity} />}
      {type === 'threat' && <ThreatEffect intensity={intensity} />}
      {type === 'defense' && <DefenseEffect intensity={intensity} />}
    </div>
  );
};

// Effet Radar
const RadarEffect = ({ intensity }: { intensity: string }) => {
  const rotation = useMotionValue(0);
  const scale = useSpring(1, { stiffness: 100, damping: 10 });

  useEffect(() => {
    const interval = setInterval(() => {
      rotation.set(rotation.get() + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [rotation]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-red-500 rounded-full"
        style={{ rotate: rotation, scale }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 border border-red-400 rounded-full"
        style={{ rotate: rotation }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

// Effet de Ciblage
const TargetingEffect = ({ intensity }: { intensity: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-red-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-8 border border-red-400"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

// Effet de Scan
const ScanningEffect = ({ intensity }: { intensity: string }) => {
  const scanLine = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      scanLine.set(scanLine.get() + 2);
      if (scanLine.get() > 100) scanLine.set(0);
    }, 100);

    return () => clearInterval(interval);
  }, [scanLine]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        style={{ top: `${scanLine.get()}%` }}
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

// Effet de Menace
const ThreatEffect = ({ intensity }: { intensity: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-red-500/10"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 text-red-500 text-2xl font-bold"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      >
        ⚠️ THREAT DETECTED ⚠️
      </motion.div>
    </div>
  );
};

// Effet de Défense
const DefenseEffect = ({ intensity }: { intensity: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 border-4 border-green-500"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 text-green-500 text-xl font-bold"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        🛡️ DEFENSE ACTIVE 🛡️
      </motion.div>
    </div>
  );
};

// Composant d'effet de particules militaires
export const MilitaryParticles = ({ count = 50, color = 'red' }: { count?: number; color?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-${color}-500 rounded-full`}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Composant d'effet de scan militaire
export const MilitaryScan = ({ active = false }: { active?: boolean }) => {
  const scanProgress = useMotionValue(0);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        scanProgress.set(scanProgress.get() + 1);
        if (scanProgress.get() > 100) scanProgress.set(0);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [active, scanProgress]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        style={{ top: `${scanProgress.get()}%` }}
        animate={{
          opacity: active ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          repeat: active ? Infinity : 0,
        }}
      />
    </div>
  );
};

// Composant d'effet de cible militaire
export const MilitaryTarget = ({ locked = false }: { locked?: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-red-500"
        animate={{
          scale: locked ? [1, 1.1, 1] : 1,
          opacity: locked ? [0.5, 1, 0.5] : 0.3,
        }}
        transition={{
          duration: locked ? 0.5 : 1,
          repeat: locked ? Infinity : 0,
        }}
      />
      {locked && (
        <motion.div
          className="absolute top-1/2 left-1/2 text-red-500 text-sm font-bold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        >
          TARGET LOCKED
        </motion.div>
      )}
    </div>
  );
}; 