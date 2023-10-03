import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Handshake(props) {
  const { nodes, materials } = useGLTF('/handshake-transformed.glb');

  // color hand
  const [handColor, setHandColor] = useState("#B06C49"); 

  // Clone material to change color
  const materialClone = materials['Material.011'].clone();
  materialClone.color.set(handColor);

  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.GLTF_created_0_rootJoint} />
      <primitive object={nodes.GLTF_created_1_rootJoint} />
      <skinnedMesh 
        geometry={nodes.Object_7.geometry} 
        material={materialClone} 
        skeleton={nodes.Object_7.skeleton} 
        position={[1.016, -1.389, 0.776]} 
        rotation={[-0.429, 0, 0]} 
      />
      <skinnedMesh 
        geometry={nodes.Object_34.geometry} 
        material={materials['Material.004']} 
        skeleton={nodes.Object_34.skeleton} 
        position={[-1.712, -1.365, 0.665]} 
        rotation={[-2.713, 0, -Math.PI]} 
      />
    </group>
  );
}

useGLTF.preload('/handshake-transformed.glb');
