"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

function HumanoidModel() {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Breathing effect
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1
      groupRef.current.scale.setScalar(breathe)
    }

    if (headRef.current) {
      // Head follows cursor subtly
      const targetRotationY = mousePosition.x * 0.3
      const targetRotationX = mousePosition.y * 0.2

      headRef.current.rotation.y += (targetRotationY - headRef.current.rotation.y) * 0.1
      headRef.current.rotation.x += (targetRotationX - headRef.current.rotation.x) * 0.1
    }

    // Eyes follow cursor
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeMovementX = mousePosition.x * 0.1
      const eyeMovementY = mousePosition.y * 0.1

      leftEyeRef.current.position.x = -0.15 + eyeMovementX
      leftEyeRef.current.position.y = 0.1 + eyeMovementY

      rightEyeRef.current.position.x = 0.15 + eyeMovementX
      rightEyeRef.current.position.y = 0.1 + eyeMovementY
    }
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Torso */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.5, 16]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} />
      </mesh>

      {/* Shirt */}
      <mesh position={[0, -0.3, 0.01]}>
        <cylinderGeometry args={[0.58, 0.78, 1.2, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Tie */}
      <mesh position={[0, -0.2, 0.6]}>
        <boxGeometry args={[0.15, 0.8, 0.02]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.8, 0]}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>

        {/* Eyes */}
        <group>
          {/* Left eye white */}
          <mesh position={[-0.15, 0.1, 0.35]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Left iris */}
          <mesh ref={leftEyeRef} position={[-0.15, 0.1, 0.4]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
          {/* Left pupil */}
          <mesh position={[-0.15, 0.1, 0.42]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>

          {/* Right eye white */}
          <mesh position={[0.15, 0.1, 0.35]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Right iris */}
          <mesh ref={rightEyeRef} position={[0.15, 0.1, 0.4]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
          {/* Right pupil */}
          <mesh position={[0.15, 0.1, 0.42]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>

        {/* Eyebrows */}
        <mesh position={[-0.15, 0.2, 0.35]}>
          <boxGeometry args={[0.12, 0.03, 0.02]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0.15, 0.2, 0.35]}>
          <boxGeometry args={[0.12, 0.03, 0.02]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, 0.05, 0.38]}>
          <coneGeometry args={[0.03, 0.08, 8]} />
          <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -0.05, 0.37]}>
          <sphereGeometry args={[0.06, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#8b4513" roughness={0.4} />
        </mesh>
      </group>

      {/* Shoulders */}
      <mesh position={[-0.5, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} />
      </mesh>
      <mesh position={[0.5, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.7, -0.3, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.12, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
      </mesh>
      <mesh position={[0.7, -0.3, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.85, -0.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
      </mesh>
      <mesh position={[0.85, -0.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.6} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 5, 5]} intensity={0.3} color="#4f46e5" />
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01
        particle.rotation.z += 0.01
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={`hsl(${200 + Math.random() * 60}, 70%, 60%)`}
            emissive={`hsl(${200 + Math.random() * 60}, 70%, 30%)`}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

export function HumanoidAICursor() {
  return (
    <div className="fixed top-1/2 right-8 transform -translate-y-1/2 w-64 h-80 pointer-events-none z-[5] opacity-30">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ background: "transparent" }}>
        <Environment preset="studio" />
        <HumanoidModel />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-xl opacity-20" />
    </div>
  )
}
