import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const blinkHide = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
`

const blinkShow = keyframes`
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
`

const rotateIt = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Button = styled.button`
	pointer-events: auto;
	cursor: pointer;
	background: #e7e7e7;
	border: none;
	padding: 1.5rem 3rem;
	margin: 0;
	font-family: inherit;
	font-size: inherit;
	position: relative;
	display: inline-block;

	&.button--surtur {
		padding: 0;
		background: none;
		clip-path: circle(40% at 50% 50%);

		&:focus-visible {
			background: #443ffc;
		}

		/* &:hover .textcircle {
      animation: ${rotateIt} 7s linear infinite;
    } */

		&:hover .eye__lashes-up,
		&:hover .eye__inner,
		&:hover .eye__iris {
			animation: ${blinkHide} 2s step-end infinite;
		}

		&:hover .eye__lashes-down {
			animation: ${blinkShow} 2s step-end infinite;
		}
	}
`

const TextCircle = styled.svg`
	position: relative;
	display: block;
	width: 200px;
	animation: ${rotateIt} 15s linear infinite;

	text {
		font-size: 32px;
		text-transform: uppercase;
		fill: #fff;
	}

	textPath {
		letter-spacing: 17px;
	}
`

const Eye = styled.svg`
	position: absolute;
	z-index: 2;
	width: 60px;
	height: 60px;
	top: calc(50% - 30px);
	left: calc(50% - 30px);

	.eye__outer,
	.eye__inner,
	.eye__lashes-up,
	.eye__lashes-down {
		stroke: #fff;
		fill: none;
		stroke-width: 1.5px;
	}

	.eye__iris {
		fill: #000;
		stroke: none;
	}

	.eye__lashes-down {
		opacity: 0;
	}
`

const currentYear = new Date().getFullYear()

const UpButton = ({ onClick }) => {

	const eyeRef = useRef(null)
	const irisRef = useRef(null)
	const innerRef = useRef(null)
	

	useEffect(() => {
		const eye = eyeRef.current
		const iris = irisRef.current
		const inner = innerRef.current
		
		if (!eye || !iris || !inner) return
		
		const DEFAULT_IRIS_X = 35;
		const DEFAULT_IRIS_Y = 35.31;
		
		const handleMouseMove = (event) => {

			if (!eye || !iris || !inner) return;
			
			try {

				const eyeRect = eye.getBoundingClientRect()
				if (!eyeRect) return;
				
				const eyeCenterX = eyeRect.left + eyeRect.width / 2
				const eyeCenterY = eyeRect.top + eyeRect.height / 2
				
				const dx = event.clientX - eyeCenterX
				const dy = event.clientY - eyeCenterY
				

				const maxDistance = 4
				const distance = Math.sqrt(dx * dx + dy * dy)
				
				let moveX = dx
				let moveY = dy
				
				if (distance > maxDistance) {
					moveX = (dx / distance) * maxDistance
					moveY = (dy / distance) * maxDistance
				}
				
				// Calculate new positions
				const newIrisX = DEFAULT_IRIS_X + moveX;
				const newIrisY = DEFAULT_IRIS_Y + moveY;
				const newInnerX = DEFAULT_IRIS_X + moveX * 0.5;
				const newInnerY = DEFAULT_IRIS_Y + moveY * 0.5;
				
				if (!isNaN(newIrisX) && !isNaN(newIrisY)) {

					iris.setAttribute('cx', newIrisX.toString())
					iris.setAttribute('cy', newIrisY.toString())
				}
				
				if (!isNaN(newInnerX) && !isNaN(newInnerY)) {

					inner.setAttribute('cx', newInnerX.toString())
					inner.setAttribute('cy', newInnerY.toString())
				}
			} catch (error) {
				console.error('Error in eye movement calculation:', error);

				iris.setAttribute('cx', DEFAULT_IRIS_X.toString())
				iris.setAttribute('cy', DEFAULT_IRIS_Y.toString())
				inner.setAttribute('cx', DEFAULT_IRIS_X.toString())
				inner.setAttribute('cy', DEFAULT_IRIS_Y.toString())
			}
		}
		
		document.addEventListener('mousemove', handleMouseMove)
		
		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])
	
	return (
		<Button className='button button--surtur' onClick={onClick}>
			<TextCircle className='textcircle' viewBox='0 0 500 500'>
				<title>Taboni Web - UP</title>
				<defs>
					<path
						id='textcircle'
						d='M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z'
					/>
				</defs>
				<text>
					<textPath
						xlinkHref='#textcircle'
						aria-label='Projects & client work 2020'
						textLength='900'
					>
						-- UP -- Taboni Web {currentYear}
					</textPath>
				</text>
			</TextCircle>
			<Eye
				ref={eyeRef}
				aria-hidden='true'
				className='eye'
				width='70'
				height='70'
				viewBox='0 0 70 70'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className='eye__outer'
					d='M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z'
				/>
				<path
					className='eye__lashes-up'
					d='M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192'
				/>
				<path
					className='eye__lashes-down'
					d='M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z'
				/>
				<circle ref={irisRef} className='eye__iris' cx='35' cy='35.31' r='5.221' />
				<circle ref={innerRef} className='eye__inner' cx='35' cy='35.31' r='10.041' />
			</Eye>
		</Button>
	)
}

export default UpButton