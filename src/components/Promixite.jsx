import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Handshake from "./objects/Handshake";
import styled from "styled-components";
import Desc from "./Desc";

const Container = styled.div`
  position: absolute;
  bottom: 150px;
  right: 210px;
  z-index: 999;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Proximite = () => {
  return (
    <>
      <Canvas camera={{  position: [0, 0, 10] }} style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Handshake scale={[0.009, 0.009, 0.009]} />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
      <Container>
        <Desc frontText="Toujours à vos côtés pour vous conseiller et vous guider dans votre parcours numérique." 
          backText="Taboni Web" />
        </Container>
    </>
  );
};

export default Proximite;
