import React, { useRef, useEffect, useState, useCallback, memo } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import {
	ComposableMap,
	Geographies,
	Geography,
	Annotation,
	Marker,
} from 'react-simple-maps'

const MapContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
`

const CursorContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 5;
`

const CursorCircle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	border-radius: 50%;
	transition: width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out,
		background-image 0.3s ease-out;
	background-size: cover;
	background-position: center;
	will-change: transform, width, height;
`

// Configuration
const CONFIG = {
	cursorSize: 40,
	baseColors: [
		'#b74265',
		'#8e1b5e',
		'#650e57',
		'#4a0e4e',
		'#610c61',
		'#780e78',
		'#9c27b0',
		'#4b0082',
	],
	cityImages: {
		Paris: './img/paris.webp',
		Nice: './img/nice.webp',
		Rouen: './img/rouen.webp',
	},
	cities: [
		{ name: 'Paris', coordinates: [2.3522, 48.8566] },
		{ name: 'Nice', coordinates: [7.2619, 43.7102] },
		{ name: 'Rouen', coordinates: [1.0993, 49.4432] },
	],
	mapProjection: {
		rotate: [-10.0, -52.0, 0],
		center: [-5, -3],
		scale: 1600,
	}
}

// Composant mémoïsé pour les marqueurs de villes
const CityMarker = memo(({ name, coordinates, onHover, onLeave }) => (
	<React.Fragment>
		<Annotation
			subject={coordinates}
			dx={-90}
			dy={-30}
			connectorProps={{
				stroke: 'white',
				strokeWidth: 2,
				strokeLinecap: 'round',
			}}
		>
			<text
				x='-8'
				textAnchor='end'
				alignmentBaseline='middle'
				fill='white'
				style={{ zIndex: 50, cursor: 'pointer' }}
				onMouseEnter={() => onHover(name)}
				onMouseLeave={onLeave}
			>
				{name}
			</text>
		</Annotation>
		<Marker coordinates={coordinates}>
			<g>
				<circle
					r={25}
					fill='transparent'
					onMouseEnter={() => onHover(name)}
					onMouseLeave={onLeave}
				/>
				<circle
					r={4}
					fill='white'
					stroke='#fff'
					strokeWidth={2}
				/>
			</g>
		</Marker>
	</React.Fragment>
))

CityMarker.displayName = 'CityMarker';

const Map = () => {
	const [isActive, setIsActive] = useState(false)
	const [hoveredCity, setHoveredCity] = useState(null)
	const [isOverContact, setIsOverContact] = useState(false)
	const [isInsideMap, setIsInsideMap] = useState(false)
	const circles = useRef([])
	const mapContainerRef = useRef(null)
	const cursorSize = CONFIG.cursorSize
	const expandedCursorSize = cursorSize * 2
	const resizeTimeoutRef = useRef(null)
	const lastCursorPos = useRef({ x: 0, y: 0 })
	const animationFrameRef = useRef(null)

	// Mémoiser les fonctions de gestion des événements
	const handleCityHover = useCallback((city) => {
		// Annuler tout redimensionnement en cours
		if (resizeTimeoutRef.current) {
			clearTimeout(resizeTimeoutRef.current)
		}

		setHoveredCity(city)

		// Animation de redimensionnement plus fluide
		circles.current.forEach((circle, i) => {
			if (!circle) return;
			
			const delay = i * 0.02
			gsap.to(circle, {
				width: expandedCursorSize,
				height: expandedCursorSize,
				duration: 0.25,
				ease: 'power2.out',
				delay,
				onComplete: () => {
					// Mettre à jour la position après le redimensionnement
					if (lastCursorPos.current) {
						gsap.to(circle, {
							x: lastCursorPos.current.x - expandedCursorSize / 2,
							y: lastCursorPos.current.y - expandedCursorSize / 2,
							duration: 0.1,
							ease: 'none',
						})
					}
				},
			})
		})
	}, [expandedCursorSize])

	const handleCityLeave = useCallback(() => {
		// Délai court avant de retirer la ville survolée
		resizeTimeoutRef.current = setTimeout(() => {
			setHoveredCity(null)

			circles.current.forEach((circle, i) => {
				if (!circle) return;
				
				const delay = i * 0.02
				gsap.to(circle, {
					width: cursorSize,
					height: cursorSize,
					duration: 0.4,
					ease: 'power2.inOut',
					delay,
					onComplete: () => {
						// Mettre à jour la position après le redimensionnement
						if (lastCursorPos.current) {
							gsap.to(circle, {
								x: lastCursorPos.current.x - cursorSize / 2,
								y: lastCursorPos.current.y - cursorSize / 2,
								duration: 0.1,
								ease: 'none',
							})
						}
					},
				})
			})
		}, 50) // Petit délai pour éviter les changements trop rapides
	}, [cursorSize])

	// Fonction optimisée de déplacement des cercles
	const moveCircles = useCallback((x, y) => {
		if (circles.current.length < 1) return;

		// Vérifier si nous sommes à l'intérieur de la section Contact
		const contactSection = document.getElementById('contact')
		const contactRect = contactSection?.getBoundingClientRect()
		const mapRect = mapContainerRef.current?.getBoundingClientRect()
		
		if (!mapRect || !contactRect) return;

		const isInsideContact = 
			x >= contactRect.left &&
			x <= contactRect.right &&
			y >= contactRect.top &&
			y <= contactRect.bottom;
			
		const isInMap = 
			x >= mapRect.left &&
			x <= mapRect.right &&
			y >= mapRect.top &&
			y <= mapRect.bottom;

		setIsInsideMap(isInMap);
		
		// Si nous ne sommes pas dans la section Contact, désactiver l'affichage
		if (!isInsideContact) {
			setIsActive(false);
			return;
		} else {
			setIsActive(true);
		}

		// Stocker la dernière position valide du curseur
		lastCursorPos.current = { x, y };

		const element = document.elementFromPoint(x, y);
		setIsOverContact(!!element?.closest('.box-contact'));

		// Animation plus fluide pour le mouvement
		circles.current.forEach((circle, i) => {
			if (!circle) return;
			
			gsap.to(circle, {
				x: x - (hoveredCity ? expandedCursorSize : cursorSize) / 2,
				y: y - (hoveredCity ? expandedCursorSize : cursorSize) / 2,
				duration: 0.15, 
				ease: 'power1.out', 
				delay: i * 0.01,
			});
		});
	}, [cursorSize, expandedCursorSize, hoveredCity]);

	// Optimiser le gestionnaire de souris avec requestAnimationFrame
	useEffect(() => {
		let mouseX = 0;
		let mouseY = 0;
		let isMoving = false;

		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			
			if (!isMoving) {
				isMoving = true;
				
				// Utiliser requestAnimationFrame pour limiter les mises à jour
				animationFrameRef.current = requestAnimationFrame(function updatePosition() {
					moveCircles(mouseX, mouseY);
					
					if (isMoving) {
						animationFrameRef.current = requestAnimationFrame(updatePosition);
					} else {
						isMoving = false;
					}
				});
			}
		};

		const handleMouseStop = () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
				isMoving = false;
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseStop);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseStop);
			
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			
			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current);
			}
		};
	}, [moveCircles]);

	return (
		<>
			<MapContainer ref={mapContainerRef}>
				<ComposableMap
					projection='geoAzimuthalEqualArea'
					projectionConfig={CONFIG.mapProjection}
					style={{ width: '100%', height: '100%' }}
				>
					<Geographies
						geography='/features.json'
						fill='#2C065D'
						stroke='#FFFFFF'
						strokeWidth={0.5}
					>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography 
									key={geo.rsmKey} 
									geography={geo}
								/>
							))
						}
					</Geographies>
					
					{CONFIG.cities.map(({ name, coordinates }) => (
						<CityMarker
							key={name}
							name={name}
							coordinates={coordinates}
							onHover={handleCityHover}
							onLeave={handleCityLeave}
						/>
					))}
				</ComposableMap>
			</MapContainer>

			<CursorContainer
				style={{
					display: isActive ? 'block' : 'none',
				}}
			>
				{[...Array(4)].map((_, i) => (
					<CursorCircle
						key={i}
						ref={(el) => (circles.current[i] = el)}
						style={{
							backgroundColor: hoveredCity
								? 'transparent'
								: CONFIG.baseColors[i],
							backgroundImage:
								hoveredCity && i === 0
									? `url(${CONFIG.cityImages[hoveredCity]})`
									: 'none',
							width: hoveredCity
								? expandedCursorSize * 0.75
								: cursorSize * 0.75,
							height: hoveredCity
								? expandedCursorSize * 0.75
								: cursorSize * 0.75,
							filter: i === 0 ? 'none' : `blur(${i * 15}px)`,
							opacity: hoveredCity ? (i === 0 ? 1 : 0.5) : 1,
							transition: `all 0.3s ease-out`,
							zIndex: i === 0 ? 1 : 0,
						}}
					/>
				))}
			</CursorContainer>
		</>
	)
}

export default Map