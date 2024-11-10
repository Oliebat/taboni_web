import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Button from './buttons/Button'
import gsap from 'gsap'

const Header = styled.header`
	display: flex;
	justify-content: center;
	left: 0;
	top: 0;
	width: 100%;
`

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0px;
	margin: 0 2% 0 2%;

	@media only screen and (max-width: 768px) {
		width: 100%;
		padding: 10px;
	}
`

const Links = styled.div`
	display: flex;
	align-items: center;
	gap: 50px;
`

const TitleSite = styled.div`
	font-weight: bold;
	cursor: pointer;
	font-size: 3.65vw;
	font-weight: bold;
	cursor: pointer;
	color: transparent;
	-webkit-text-stroke: 1px white;
	position: relative;

	@media only screen and (max-width: 768px) {
		font-size: 24px;
		width: 150px;
		height: 50px;
	}
`

const List = styled.ul`
	display: flex;
	gap: 40px;
	list-style: none;
	font-weight: 600;
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

	@media only screen and (max-width: 768px) {
		display: none;
	}
`

const ListItem = styled.li`
	cursor: pointer;
	transition: width 0.8s ease, left 0.7s ease;
	font-size: 1.2vw;
	color: #fff;
	text-decoration: none;
	padding: 15px 0;
	position: relative;

	&:after {
		content: '';
		display: block;
		height: 2px;
		left: 50%;
		position: absolute;
		bottom: 0;
		background: #fff;
		transition: width 0.3s ease, left 0.3s ease;
		width: 0;
	}

	&:hover:after {
		width: 100%;
		left: 0;
	}
`

const Icons = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`

const scrollToSection = (id) => {
	const element = document.getElementById(id)
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
		})
	}
}

const Navbar = () => {
	const header = useRef(null)
	const logo = useRef(null)
	const list = useRef(null)
	const button = useRef(null)
	const clipCircle = useRef(null)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const items = list.current?.querySelectorAll('li')
		if (!items) return

		gsap.set(items, { yPercent: 100 })
		gsap.set(logo.current, { opacity: 0 })
		gsap.set(button.current, { x: 20, opacity: 0 })

		const tl = gsap.timeline({
			defaults: {
				duration: 1,
				ease: 'sine.out',
				delay: 1.2,
			},
		})

		tl.to(logo.current, { opacity: 1 })
			.to(items, { yPercent: 0, stagger: 0.15 }, 0.5)
			.to(button.current, { x: 0, opacity: 1 }, 1)

		// Mouse follow animation
		const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
		const mouse = { x: pos.x, y: pos.y }
		const speed = 0.2

		let animationFrame
		const animate = () => {
			const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
			pos.x += (mouse.x - pos.x) * dt
			pos.y += (mouse.y - pos.y) * dt
			if (clipCircle.current) {
				clipCircle.current.setAttribute('cx', pos.x)
				clipCircle.current.setAttribute('cy', pos.y)
			}
			animationFrame = requestAnimationFrame(animate)
		}

		const handleMouseMove = (e) => {
			mouse.x = e.clientX
			mouse.y = e.clientY
		}

		window.addEventListener('mousemove', handleMouseMove)
		animate()

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			cancelAnimationFrame(animationFrame)
		}
	}, [])

	return (
		<Header id='navbar' ref={header}>
			<Container>
				<Links>
					<TitleSite ref={logo}>
						<svg width='100%' height='100%' viewBox='0 0 300 100'>
							<defs>
								<clipPath id='logoClip'>
									<circle
										ref={clipCircle}
										r='50'
										cx='150'
										cy='50'
									/>
								</clipPath>
							</defs>
							<text
								x='150'
								y='65'
								textAnchor='middle'
								fontSize='55'
								fontWeight='bold'
								fill='transparent'
								stroke='white'
								strokeWidth='1'
							>
								Taboni Web
							</text>
							<g clipPath='url(#logoClip)'>
								<text
									x='150'
									y='65'
									textAnchor='middle'
									fontSize='55'
									fontWeight='bold'
									fill='#A3333D'
								>
									Taboni Web
								</text>
							</g>
						</svg>
					</TitleSite>
					<List ref={list}>
						<ListItem onClick={() => scrollToSection('home')}>
							Accueil
						</ListItem>
						<ListItem onClick={() => scrollToSection('studio')}>
							Studio
						</ListItem>
						<ListItem onClick={() => scrollToSection('works')}>
							Compétences
						</ListItem>
						<ListItem onClick={() => scrollToSection('portfolio')}>
							Projets
						</ListItem>
						<ListItem onClick={() => scrollToSection('contact')}>
							Contact
						</ListItem>
					</List>
				</Links>
				<Icons ref={button}>
					<Button onClick={() => scrollToSection('contact')}>
						<span>Contactez-nous</span>
					</Button>
				</Icons>
			</Container>
		</Header>
	)
}

export default Navbar
