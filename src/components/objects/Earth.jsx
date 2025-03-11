import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Earth = ({ scrollTriggerRef }) => {
  const meshRef = useRef(null)
  

  const [colorMap, normalMap, aoMap] = useLoader(TextureLoader, [
    './textures/earth/color.jpg',
    './textures/earth/normal.png',
    './textures/earth/occlusion.jpg'
  ])

  useEffect(() => {
    if (meshRef.current && scrollTriggerRef.current) {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      })
      
      tl.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        ease: "none"
      })
      
      return () => {

        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill()
        }
      }
    }
  }, [scrollTriggerRef])
  

  useFrame(() => {
    if (meshRef.current) {

      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap} 
        normalMap={normalMap} 
        aoMap={aoMap} 
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  )
}

export default Earth