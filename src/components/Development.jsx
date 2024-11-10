import React, { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Atom from './objects/Atom'
import styled from 'styled-components'
// import Desc from "./Desc";
import CardSpotlight from '../components/objects/CardSpotlight'

const Container = styled.div`
	position: absolute;
	top: 115px;
	right: 220px;
	z-index: 999;
	@media only screen and (max-width: 768px) {
		right: 56%;
		top: 70%;
	}
`
const Development = () => {
	return (
		<>
			<Canvas
				camera={{ position: [0, 0, 10] }}
				style={{ cursor: 'grab' }}
			>
				<Suspense fallback={null}>
					<Atom />
					<OrbitControls enableZoom={false} autoRotate />
				</Suspense>
			</Canvas>
			<Container className='animate__animated animate__fadeIn'>
				<CardSpotlight
					title='Développement'
					description='Des solutions sur mesure pour répondre précisément à vos besoins spécifiques.'
					maxWidth='24rem'
					textAlign='center'
					titleSize='1.8rem'
				/>
				{/* <Desc frontText="Des solutions sur mesure pour répondre précisément à vos besoins spécifiques." 
        backText="Taboni Web" /> */}
			</Container>
		</>
	)
}

export default Development
