import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const EarthMesh = ({ scrollRef }) => {
  const meshRef = useRef(null);
  
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    './img/color.jpg',
    './img/normal.png',
    './img/occlusion.jpg'
  ]);

  
  useFrame(() => {
    if (meshRef.current && scrollRef.current) {
      meshRef.current.rotation.y = scrollRef.current.progress;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[1, 0, -0.25]} />
      <mesh ref={meshRef} scale={2.85}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </mesh>
    </>
  );
};

const Earth = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef({ progress: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current.progress = self.progress;
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    >
      <Canvas ref={canvasRef}>
        <EarthMesh scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

export default Earth;