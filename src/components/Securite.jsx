import React, { Suspense  } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Padlock from "./objects/Padlock";
import styled from "styled-components";
import Desc from "./Desc";
import 'animate.css';



const Container = styled.div`
  position: absolute;
  top: 115px;
  right: 220px;
  z-index: 999;
  @media only screen and (max-width: 768px) {
    right: 56%;
    top: 70%;
    
  }
`;



const Securite = () => {


  return (
    <>
      <Canvas camera={{  position: [0, 0, 10] }} style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.01}>
          <Padlock scale={[0.001, 0.001, 0.001]} />
          </Stage>
          <OrbitControls enableZoom={false}  autoRotate />
        </Suspense>
      </Canvas>
      <Container className="animate__animated animate__fadeIn animate__slow">
        <Desc frontText="Protégez votre présence en ligne avec nos solutions de sécurité robustes." 
          backText="Taboni Web" />
        </Container>
    </>
  );
};

export default Securite;
