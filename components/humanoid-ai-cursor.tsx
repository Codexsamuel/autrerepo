"use client";

// Temporairement désactivé - dépendances Three.js manquantes
// import { useState, useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber"
// import { useGLTF, useAnimations } from "@react-three/drei"
// import * as THREE from "three"

// type GLTFResult = GLTF & {
//   nodes: {
//     Wolf3D_Avatar: any
//     Wolf3D_Body: any
//     Wolf3D_Outfit_Bottom: any
//     Wolf3D_Outfit_Footwear: any
//     Wolf3D_Outfit_Top: any
//     Wolf3D_Hair: any
//     EyeLeft: any
//     EyeRight: any
//     Wolf3D_Head: any
//     Wolf3D_Teeth: any
//     Hips: any
//   }
//   materials: {
//     Wolf3D_Avatar: any
//     Wolf3D_Body: any
//     Wolf3D_Outfit_Bottom: any
//     Wolf3D_Outfit_Footwear: any
//     Wolf3D_Outfit_Top: any
//     Wolf3D_Hair: any
//     EyeLeft: any
//     EyeRight: any
//     Wolf3D_Head: any
//     Wolf3D_Teeth: any
//   }
//   animations: any[]
// }

export function HumanoidAICursor() {
  // Composant temporairement désactivé
  return (
    <div className="hidden">
      {/* Composant Three.js temporairement désactivé - dépendances manquantes */}
    </div>
  )
  
  // const group = useRef<THREE.Group>(null)
  // const { nodes, materials, animations } = useGLTF("/models/avatar.glb") as GLTFResult
  // const { actions } = useAnimations(animations, group)
  // const [position, setPosition] = useState({ x: 0, y: 0 })

  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     const x = (event.clientX / window.innerWidth) * 2 - 1
  //     const y = -(event.clientY / window.innerHeight) * 2 + 1
  //     setPosition({ x, y })
  //   }

  //   window.addEventListener("mousemove", handleMouseMove)
  //   return () => window.removeEventListener("mousemove", handleMouseMove)
  // }, [])

  // useFrame((state) => {
  //   if (!group.current) return

  //   // Animation de base
  //   if (actions["idle"]) {
  //     actions["idle"].play()
  //   }

  //   // Suivi du curseur
  //   const targetX = position.x * 2
  //   const targetY = position.y * 2
    
  //   group.current.position.x += (targetX - group.current.position.x) * 0.1
  //   group.current.position.y += (targetY - group.current.position.y) * 0.1
    
  //   // Rotation vers le curseur
  //   const angle = Math.atan2(targetY - group.current.position.y, targetX - group.current.position.x)
  //   group.current.rotation.y = angle
  // })

  // return (
  //   <primitive ref={group} object={group.current} dispose={null}>
  //     <primitive object={nodes.Hips} />
  //     <primitive object={nodes.Wolf3D_Avatar} />
  //     <primitive object={nodes.Wolf3D_Body} />
  //     <primitive object={nodes.Wolf3D_Outfit_Bottom} />
  //     <primitive object={nodes.Wolf3D_Outfit_Footwear} />
  //     <primitive object={nodes.Wolf3D_Outfit_Top} />
  //     <primitive object={nodes.Wolf3D_Hair} />
  //     <primitive object={nodes.EyeLeft} />
  //     <primitive object={nodes.EyeRight} />
  //     <primitive object={nodes.Wolf3D_Head} />
  //     <primitive object={nodes.Wolf3D_Teeth} />
  //   </primitive>
  // )
}
