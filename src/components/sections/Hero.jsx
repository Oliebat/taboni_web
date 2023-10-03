import React, { Suspense } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Button from "../buttons/Button";
import 'animate.css';

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;


`;

const Container = styled.div`
  height: 100%;
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
  font-size: 65px;

  @media only screen and (max-width: 768px) {
    text-align: left;
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
  font-size: 24px;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    text-align: left;
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
  bottom: 0; /* Il sera positionné au bas de son parent (Container) */
  left: 0;
  width: 100%;
  position: relative;
  opacity: 0.4; 
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
  
  const handleButtonClick = () => {
    const section = document.getElementById("studio");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id={id}>
      <Navbar />
      <Container>
        <Left className="animate__animated animate__pulse animate__delay-2s">
          <Title>Solutions web & mobile sur-mesure</Title>
          <WhatWeDo>
            <Line src="./img/line.png" />
            <Subtitle>Ce que nous faisons</Subtitle>
          </WhatWeDo>
          <Desc>
            Nous rendons le digital chaleureux et humain
          </Desc>
          <Button onClick={handleButtonClick}><span>En savoir plus</span></Button>
        </Left>
        <Right className="animate__animated animate__fadeIn animate__delay-1s">
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
