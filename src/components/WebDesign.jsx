import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import styled from 'styled-components'
import Mac from './objects/Mac'
// import Desc from "./Desc";
import 'animate.css'
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

const WebDesign = () => {
	return (
		<>
			<Canvas style={{ cursor: 'grab' }}>
				<Suspense fallback={null}>
					<Stage environment='city' intensity={4}>
						<Mac scale={[0.6, 0.6, 0.6]} />
					</Stage>
					<OrbitControls enableZoom={false} autoRotate />
				</Suspense>
			</Canvas>
			<Container className='animate__animated animate__fadeIn animate__slow'>
				<CardSpotlight
					title='Solutions Web'
					description='Distinguez-vous en ligne grâce à nos conceptions web uniques. Site ou maintenance Wordpress, site sur mesure avec un framework JS, nous vous accompagnons dans votre projet.'
					maxWidth='24rem'
					textAlign='center'
					titleSize='1.8rem'
				/>
				{/* <Desc frontText="Distinguez-vous en ligne grâce à nos conceptions web uniques.
      Site ou maintenance Wordpress, site sur mesure avec un framework JS, nous vous accompagnons dans votre projet." 
        backText="Taboni Web" /> */}
			</Container>
		</>
	)
}

export default WebDesign
