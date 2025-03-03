import React, { Suspense } from 'react'
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Handshake from './objects/Handshake'
import styled from 'styled-components'
// import Desc from "./Desc";
import 'animate.css'
import CardSpotlight from '../components/objects/CardSpotlight'

const Container = styled.div`
	position: absolute;
	top: 115px;
	z-index: 999;
	right: 220px;
	@media only screen and (max-width: 768px) {
		right: 56%;
		top: 70%;
	}
`

const Proximite = () => {
	return (
		<>
			<Canvas
				camera={{ position: [0, 0, 10] }}
				style={{ cursor: 'grab' }}
			>
				<Suspense fallback={null}>
					<Stage environment='city' intensity={0.3}>
					<Handshake scale={[0.02, 0.02, 0.02]} />

					</Stage>
					<OrbitControls enableZoom={false} autoRotate />
				</Suspense>
			</Canvas>
			<Container className='animate__animated animate__fadeIn animate__slow'>
				;
				<CardSpotlight
					title='Accompagnement'
					description='Toujours à vos côtés pour vous conseiller et vous guider dans votre parcours numérique'
					maxWidth='24rem'
					textAlign='center'
					titleSize='1.8rem'
				/>
				{/* <Desc frontText="Toujours à vos côtés pour vous conseiller et vous guider dans votre parcours numérique." 
          backText="Taboni Web" /> */}
			</Container>
		</>
	)
}

export default Proximite
