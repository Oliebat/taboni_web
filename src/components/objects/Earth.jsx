import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrement du plugin
gsap.registerPlugin(ScrollTrigger)

const Earth = ({ scrollTriggerRef }) => {
  const meshRef = useRef(null)
  
  // Chargement des textures
  const [colorMap, normalMap, aoMap] = useLoader(TextureLoader, [
    './textures/earth/color.jpg',
    './textures/earth/normal.png',
    './textures/earth/occlusion.jpg'
  ])

  useEffect(() => {
    if (meshRef.current && scrollTriggerRef.current) {
      // Animation avec GSAP
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
        // Nettoyage au démontage
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill()
        }
      }
    }
  }, [scrollTriggerRef])
  
  // Animation légère continue
  useFrame(() => {
    if (meshRef.current) {
      // Petite rotation continue pour donner vie à la Terre
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