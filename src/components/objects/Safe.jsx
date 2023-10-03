import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Safe(props) {
  const { nodes, materials } = useGLTF('/safe-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube_Material003_0.geometry} material={materials['Material.003']} position={[0, 0, 0.582]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Circle001_Material001_0.geometry} material={materials['Material.001']} position={[0.888, 0.004, 1.071]} scale={0.15} />
      <mesh geometry={nodes.Circle_Material002_0.geometry} material={materials['Material.002']} position={[0, 0, 1.001]} rotation={[0, 0, -1.683]} scale={0.321} />
    </group>
  )
}

useGLTF.preload('/safe-transformed.glb')
