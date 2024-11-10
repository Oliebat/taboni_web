import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Padlock(props) {
	const { nodes, materials } = useGLTF('/padlock-transformed.glb')
	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.Extrude_1_Mat1_0.geometry}
				material={materials['Mat.1']}
				position={[206.929, 159.502, 46.841]}
			/>
			<mesh
				geometry={nodes.Boole_1_Mat_0.geometry}
				material={materials.material}
				position={[203.406, 182.542, 0]}
			/>
			<mesh
				geometry={nodes.Cylinder_1_candado_0.geometry}
				material={materials.candado}
				position={[204.577, 418.988, 0]}
			/>
		</group>
	)
}

useGLTF.preload('/padlock-transformed.glb')
