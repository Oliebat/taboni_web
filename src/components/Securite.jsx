import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Safe from "./objects/Safe";
import styled from "styled-components";
import Desc from "./Desc";
import 'animate.css';

const Container = styled.div`
  position: absolute;
  bottom: 150px;
  right: 210px;
  z-index: 999;

  @media only screen and (max-width: 768px) {
    top: 410px;
    right: 206px;
  }
`;

const Securite = () => {
  return (
    <>
      <Canvas camera={{  position: [0, 0, 10] }} style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
          <Safe scale={[0.01, 0.01, 0.01]}/>
          </Stage>
          <OrbitControls enableZoom={false} maxDistance={1000} autoRotate />
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
