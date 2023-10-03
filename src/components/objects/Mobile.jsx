
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Mobile(props) {
  const { nodes, materials } = useGLTF('/mobile-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.PaletteMaterial001} position={[0.539, 0.502, 0.077]} rotation={[1.233, -0.19, 0.494]} scale={[1, 0.672, 1]} />
      <mesh geometry={nodes.Object_11.geometry} material={materials.PaletteMaterial002} rotation={[1.233, -0.19, 0.494]} />
    </group>
  )
}

useGLTF.preload('/mobile-transformed.glb')
