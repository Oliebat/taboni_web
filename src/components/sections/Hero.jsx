import React, { Suspense, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import Button from '../buttons/Button'
import gsap from 'gsap'

const Section = styled.div`
	height: 100vh;
	scroll-snap-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`

const Container = styled.div`
	height: 80%;
	scroll-snap-align: center;
	width: 100%;
	display: flex;
	justify-content: space-between;

	@media only screen and (max-width: 768px) {
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: 10%;
	}
`

const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
	margin-left: 2%;
	@media only screen and (max-width: 1350px) {
		flex: 1;
	}

	@media only screen and (max-width: 768px) {
		flex: 1;
		margin: 20px;
		position: absolute;
		z-index: 1;
	}
`

const Title = styled.h1`
	font-size: 3vw;

	@media only screen and (max-width: 1350px) {
		font-size: 3vw;
	}

	@media only screen and (max-width: 768px) {
		text-align: left;
		font-size: 2.5em;
	}
`

const WhatWeDo = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`

const Line = styled.img`
	height: 5px;
`

const Subtitle = styled.h2`
	color: #a93f55;
	font-size: 2vw;
	@media only screen and (max-width: 768px) {
		text-align: left;
		font-size: 1.2em;
	}
`

const Desc = styled.p`
	font-size: 1.5vw;
	color: lightgray;
	@media only screen and (max-width: 768px) {
		text-align: left;
		font-size: 1.1em;
		color: #ffff;
	}
`

const Right = styled.div`
	flex: 1;
	position: relative;
	animation-duration: 0ms.6;
	@media only screen and (max-width: 1350px) {
		flex: 1;
	}
	@media only screen and (max-width: 768px) {
		flex: 1;
		bottom: 0;
		left: 0;
		width: 100%;
		position: relative;
	}
`

const Img = styled.img`
	width: 80%;
	height: 70%;
	object-fit: contain;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	animation: animate 2s infinite ease alternate;

	@media only screen and (max-width: 1350px) {
		width: 60%;
		height: 60%;
	}

	@media only screen and (max-width: 768px) {
		width: 80%;
		height: 80%;
	}

	@keyframes animate {
		to {
			transform: translateY(20px);
		}
	}
`

const Hero = ({ id }) => {
	const title = useRef(null)
	const whatwedo = useRef(null)
	const desc = useRef(null)
	const button = useRef(null)
	const canvas = useRef(null)

	const itemsLeft = useRef([])
	const mm = gsap.matchMedia()

	useEffect(() => {
		itemsLeft.current.push(
			title.current,
			whatwedo.current,
			desc.current,
			button.current
		)

		itemsLeft.current.forEach((item) => {
			gsap.set(item, { x: -20, opacity: 0 })
		})

		gsap.set(canvas.current, { opacity: 0 })

		const tl = gsap.timeline({
			defaults: {
				duration: 1,
				ease: 'sine.out',
				delay: 2.5,
			},
		})

		mm.add('(min-width: 768px)', () => {
			tl.to(itemsLeft.current, {
				x: 0,
				opacity: 1,
				stagger: 0.2,
			}).to(canvas.current, { opacity: 1 }, 0.8)
		})

		mm.add('(max-width: 768px)', () => {
			tl.to(itemsLeft.current, {
				x: 0,
				opacity: 1,
				stagger: 0.2,
			}).to(canvas.current, { opacity: 0.3 }, 0.8)
		})
	})

	const handleButtonClick = () => {
		const section = document.getElementById('studio')
		section.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<Section id={id}>
			<Container>
				<Left>
					<Title ref={title}>Solutions web & mobile sur-mesure</Title>
					<WhatWeDo ref={whatwedo}>
						<Line src='./img/line.webp' />
						<Subtitle>Ce que nous faisons</Subtitle>
					</WhatWeDo>
					<Desc ref={desc}>
						Nous rendons le digital chaleureux et humain. Chez
						Taboni Web, nous croyons que la technologie doit servir
						les gens et non l'inverse. C'est pourquoi nous mettons
						un point d'honneur à créer des solutions digitales qui
						sont non seulement efficaces et robustes, mais aussi
						intuitives et agréables à utiliser.
					</Desc>
					<Button ref={button} onClick={handleButtonClick}>
						<span>En savoir plus</span>
					</Button>
				</Left>
				<Right ref={canvas}>
					<Canvas>
						<Suspense fallback={null}>
							<OrbitControls enableZoom={false} />
							<ambientLight intensity={2} />
							<directionalLight position={[3, 2, 1]} />
							<Sphere args={[1, 100, 200]} scale={2.4}>
								<MeshDistortMaterial
									color='#5DA7C5'
									attach='material'
									distort={0.5}
									speed={1.75}
								/>
							</Sphere>
						</Suspense>
					</Canvas>
					<Img src='./img/earth.webp' />
				</Right>
			</Container>
		</Section>
	)
}

export default Hero
