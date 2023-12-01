import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Handshake from "./objects/Handshake";
import styled from "styled-components";
import Desc from "./Desc";
import 'animate.css';

const Container = styled.div`
  position: absolute;
  top: 115px;
  right: 220px;
  z-index: 999;
  @media only screen and (max-width: 768px) {
    top: 70%;
    
  }
`;

const Proximite = () => {
  return (
    <>
      <Canvas camera={{  position: [0, 0, 10] }} style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
          <Handshake scale={[0.009, 0.009, 0.009]}/>
          </Stage>
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
      <Container className="animate__animated animate__fadeIn animate__slow">
        <Desc frontText="Toujours à vos côtés pour vous conseiller et vous guider dans votre parcours numérique." 
          backText="Taboni Web" />
        </Container>
    </>
  );
};

export default Proximite;
