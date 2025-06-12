"use client"

import { useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Avatar: THREE.SkinnedMesh
    Wolf3D_Body: THREE.SkinnedMesh
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh
    Wolf3D_Outfit_Top: THREE.SkinnedMesh
    Wolf3D_Hair: THREE.SkinnedMesh
    EyeLeft: THREE.SkinnedMesh
    EyeRight: THREE.SkinnedMesh
    Wolf3D_Head: THREE.SkinnedMesh
    Wolf3D_Teeth: THREE.SkinnedMesh
    Hips: THREE.Bone
  }
  materials: {
    Wolf3D_Avatar: THREE.MeshStandardMaterial
    Wolf3D_Body: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial
    Wolf3D_Hair: THREE.MeshStandardMaterial
    EyeLeft: THREE.MeshStandardMaterial
    EyeRight: THREE.MeshStandardMaterial
    Wolf3D_Head: THREE.MeshStandardMaterial
    Wolf3D_Teeth: THREE.MeshStandardMaterial
  }
  animations: THREE.AnimationClip[]
}

export function HumanoidAICursor() {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF("/models/avatar.glb") as GLTFResult
  const { actions } = useAnimations(animations, group)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!group.current) return

    // Animation de base
    if (actions["idle"]) {
      actions["idle"].play()
    }

    // Suivi du curseur
    const targetX = position.x * 2
    const targetY = position.y * 2
    
    group.current.position.x += (targetX - group.current.position.x) * 0.1
    group.current.position.y += (targetY - group.current.position.y) * 0.1
    
    // Rotation vers le curseur
    const angle = Math.atan2(targetY - group.current.position.y, targetX - group.current.position.x)
    group.current.rotation.y = angle
  })

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="Wolf3D_Avatar"
            geometry={nodes.Wolf3D_Avatar.geometry}
            material={materials.Wolf3D_Avatar}
            skeleton={nodes.Wolf3D_Avatar.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Hair"
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
          />
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.EyeLeft}
            skeleton={nodes.EyeLeft.skeleton}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.EyeRight}
            skeleton={nodes.EyeRight.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Head}
            skeleton={nodes.Wolf3D_Head.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
          />
        </group>
      </group>
    </group>
  )
}
