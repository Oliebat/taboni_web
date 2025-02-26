import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EarthMesh = ({ velocityRef, scale }) => {
  const meshRef = useRef(null);
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    './img/color.jpg',
    './img/normal.png',
    './img/occlusion.jpg'
  ]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += velocityRef.current;
      velocityRef.current *= 0.9;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[1, 0, -0.25]} />
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </mesh>
    </>
  );
};

const Earth = () => {
  const containerRef = useRef(null);
  const velocityRef = useRef(0);
  const lastProgressRef = useRef(0);
  const [scale, setScale] = useState(2.85);


  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth <= 768) {
        setScale(1.8);
      } else {
        setScale(2.85);
      }
    };


    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const newProgress = self.progress;
        const delta = newProgress - lastProgressRef.current;
        lastProgressRef.current = newProgress;
        velocityRef.current += delta * 0.2;
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 0 
      }}
    >
      <Canvas>
        <EarthMesh velocityRef={velocityRef} scale={scale} />
      </Canvas>
    </div>
  );
};

export default Earth;