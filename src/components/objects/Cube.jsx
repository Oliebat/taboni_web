import React, { useRef, useEffect } from 'react'
import { PerspectiveCamera, RenderTexture, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Cube = ({ scrollTriggerRef }) => {
  const textRef = useRef()
  const meshRef = useRef()
  
  useFrame((state) => {

    if (textRef.current) {
      textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })
  
  useEffect(() => {
    if (meshRef.current && scrollTriggerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      })
      
      tl.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        z: Math.PI * 1.5,
        ease: "none"
      })
      
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill()
        }
      }
    }
  }, [scrollTriggerRef])
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial>
        <RenderTexture attach='map'>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <color attach='background' args={['#A3333D']} />
          <Text ref={textRef} fontSize={3} color='#ffffff'>
            Taboni Web
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  )
}

export default Cube