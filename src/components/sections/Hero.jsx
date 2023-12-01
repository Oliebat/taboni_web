import React, { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Button from "../buttons/Button";
import gsap from "gsap";


const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;


`;

const Container = styled.div`
  height: 80%;
  scroll-snap-align: center;
  width: 1400px;
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
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  
  

  @media only screen and (max-width: 768px) {
    flex: 1;
    margin: 20px;
    position: absolute;
    z-index: 1;
    
  }
`;

const Title = styled.h1`
  font-size: 60px;

  @media only screen and (max-width: 768px) {
    text-align: left;
    font-size: 2.5em;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #A93F55;
`;

const Desc = styled.p`
  font-size: 1.50em;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    text-align: left;
    font-size: 1.1em;
    color: #ffff
  }
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  animation-duration: 0ms.6;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    position: relative;
  bottom: 0; 
  left: 0;
  width: 100%;
  position: relative;
  }
`;

const Img = styled.img`
  width: 800px;
  height: 400px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Hero = ({ id }) => {
  const title = useRef(null)
  const whatwedo = useRef(null)
  const desc = useRef(null)
  const button = useRef(null)
  const canvas = useRef(null)
  
  const itemsLeft = useRef([]);
  const mm = gsap.matchMedia();

  useEffect(() => {
    itemsLeft.current.push(title.current, whatwedo.current, desc.current, button.current)

    itemsLeft.current.forEach((item) => {
      gsap.set(item, { x: -20, opacity: 0 })
    })

    gsap.set(canvas.current, { opacity: 0 })

    const tl = gsap.timeline({
      defaults: {
        duration: 1, 
        ease: "sine.out",
        delay: 2.5
      }
    })

    mm.add("(min-width: 768px)", () => {
      tl.to(itemsLeft.current, {
        x: 0,
        opacity: 1,
        stagger: 0.2,
      })
      .to(canvas.current, { opacity: 1 }, 0.8)
    })

    mm.add("(max-width: 768px)", () => {
      tl.to(itemsLeft.current, {
        x: 0,
        opacity: 1,
        stagger: 0.2,
      })
      .to(canvas.current, { opacity: 0.3 }, 0.8)
    })
  })




  const handleButtonClick = () => {
    const section = document.getElementById("studio");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id={id}>
      <Container>
        <Left>
          <Title ref={title}>Solutions web & mobile sur-mesure</Title>
          <WhatWeDo ref={whatwedo}>
            <Line src="./img/line.png" />
            <Subtitle>Ce que nous faisons</Subtitle>
          </WhatWeDo>
          <Desc ref={desc}>
          Nous rendons le digital chaleureux et humain. Chez Taboni Web, nous croyons que la technologie doit servir les gens et non l'inverse. C'est pourquoi nous mettons un point d'honneur à créer des solutions digitales qui sont non seulement efficaces et robustes, mais aussi intuitives et agréables à utiliser.
          </Desc>
          <Button ref={button} onClick={handleButtonClick}><span>En savoir plus</span></Button>
        </Left>
        <Right ref={canvas}>
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                  color="#5DA7C5"
                  attach="material"
                  distort={0.5}
                  speed={2}
                />
              </Sphere>
            </Suspense>
          </Canvas>
          <Img src="./img/earth.png" />
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;
