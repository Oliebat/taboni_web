import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CardSpotlight from '../objects/CardSpotlight'

gsap.registerPlugin(ScrollTrigger)

// Styled Components

const PortfolioSection = styled.section`
	height: 100vh;
	width: 100%;
	position: relative;
	padding: 0;
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;

	@media only screen and (max-width: 768px) {
		width: auto;
		height: 200vh;
		overflow: visible;
		flex-direction: column;
		padding: 0 2rem;
		margin-bottom: 50%;
	}
`

const PortfolioTitle = styled.h2`
	position: absolute;
	top: 50%;
	left: -17%;
	transform: translateY(-50%);
	font-size: 26rem;
	letter-spacing: 0;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px white;
	display: inline-block;
	opacity: 0;
	white-space: nowrap;

	@media only screen and (max-width: 768px) {
		font-size: 12rem;
		inset: auto;
		transform: none;
		z-index: 10;
		opacity: 1;
		position: relative;
		margin-bottom: 4rem;
	}
	@media only screen and (max-width: 640px) {
		font-size: 4rem;
	}
`

const PanelsContainer = styled.div`
	display: flex;
	flex-wrap: nowrap;
	height: 100%;
	width: fit-content;

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
`

const Panel = styled.div`
	display: flex;
	flex: 0 0 80%;
	flex-wrap: wrap;
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 100%;
	padding: 3rem 3rem 2rem 5rem;
	background-color: transparent;
	overflow: hidden;
	position: relative;

	@media only screen and (max-width: 768px) {
		flex: none;
		width: auto;
		height: 22rem;
		padding: 0;
		margin-bottom: 14rem;
		overflow: visible;

		&:last-child {
			margin-bottom: 0;
		}
	}
	@media only screen and (max-width: 640px) {
		height: 11rem;
	}
`

const PanelItem = styled.div`
	height: 70%;
	width: 70%;
	margin: 0 auto;
	position: relative;
	cursor: pointer;

	@media only screen and (max-width: 768px) {
		height: 100%;
		width: 100%;
	}
`

const PanelImg = styled.img`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	object-fit: cover;
	opacity: 0;
	transform: scale(0.5) translateX(100%);

	@media only screen and (max-width: 768px) {
		transform: none;
		opacity: 1;
		position: absolute;
		inset: 0;
	}
`

// Données des Projets

const Projets = [
	{
		src: './img/cabnow.webp',
		title: 'CabNow',
		description: 'Site web de Chauffeur VTC avec réservation en ligne.',
		lien: 'https://cabnowriviera.fr/',
	},
	{
		src: './img/mcb.webp',
		title: 'MCB - Photographie',
		description: 'Site web de photographe professionnel.',
		lien: 'https://mariecharlottebana.fr/',
	},
	{
		src: './img/9juillet.webp',
		title: 'Institut 9 Juillet',
		description: "Site web de l'institut de beauté 9 Juillet.",
		lien: 'https://institut-neuf-juillet.fr/',
	},
	{
		src: './img/marclevy.webp',
		title: 'Marc Levy',
		description: "Site web de l'auteur Marc Levy.",
		lien: 'https://www.marclevy.com/',
		feat: 'En collaboration avec Octevia',
	},
]

// Composant Portfolio

const Portfolio = () => {
	const sectionRef = useRef(null)
	const titleRef = useRef(null)
	const panelsRef = useRef([])
	const imagesRef = useRef([])

	useEffect(() => {
		const section = sectionRef.current
		const title = titleRef.current
		const panels = panelsRef.current
		const images = imagesRef.current
		const isMobile = window.innerWidth <= 768

		if (isMobile) {
			panels.forEach((panel) => {
				const direction = panel.classList.contains('right') ? 100 : -100

				gsap.set(panel, {
					x: direction,
					opacity: 0,
				})

				gsap.to(panel, {
					x: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: panel,
						start: 'top bottom',
						end: 'bottom 90%',
						scrub: 0.5,
					},
				})
			})
		} else {
			// Animation pour desktop (défilement horizontal)
			const totalPanels = panels.length
			const gap = 300
			const panelWidth = gap + panels[0]?.offsetWidth
			const totalWidth = panelWidth * totalPanels

			const panelsContainer = gsap.utils.toArray('.panels-container')[0]
			if (panelsContainer) {
				panelsContainer.style.width = `${totalWidth}px`
			}

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					pin: true,
					scrub: 0.5,
					start: 'top top',
					end: () => `+=${totalWidth - window.innerWidth}`,
					// markers: false,
				},
				defaults: { ease: 'none', duration: 4 },
			})

			gsap.to(title, {
				opacity: 1,
				duration: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: section,
					start: 'top center',
					end: 'top top',
					scrub: true,
				},
			})

			tl.to(title, { x: 2000 }).to(
				panelsContainer,
				{ x: () => -(totalWidth) },
				0
			)

			images.forEach((img, index) => {
				gsap.fromTo(
					img,
					{ opacity: 0, scale: 2, x: 0 },
					{
						opacity: 1,
						scale: 1,
						x: 0,
						duration: 1.4,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: img,
							start: 'left center',
							end: 'right center',
							containerAnimation: tl,
							scrub: true,
							// markers: true,
						},
					}
				)
			})
		}

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill())
		}
	}, [])

	return (
		<PortfolioSection ref={sectionRef} className='portfolio' id='portfolio'>
			<PortfolioTitle
				ref={titleRef}
				className='portfolio_title text-stroke parallax'
			>
				Projets
			</PortfolioTitle>
			<PanelsContainer className='panels-container'>
				{Projets.map((projet, index) => (
					<Panel
						key={index}
						className={`panel ${
							index % 2 !== 0 ? 'right' : 'left'
						}`}
						ref={(el) => (panelsRef.current[index] = el)}
					>
						<PanelItem>
							<PanelImg
								loading='lazy'
								className='panel-img'
								src={projet.src}
								alt={`Project ${index + 1}`}
								ref={(el) => (imagesRef.current[index] = el)}
							/>
							<CardSpotlight
								title={projet.title}
								description={projet.description}
								feat={projet.feat}
								lien={projet.lien}
							/>
						</PanelItem>
					</Panel>
				))}
			</PanelsContainer>
		</PortfolioSection>
	)
}

export default Portfolio