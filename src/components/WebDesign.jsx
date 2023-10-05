import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import styled from "styled-components";
import Mac from "./objects/Mac";
import Desc from "./Desc";

const Container = styled.div`
  position: absolute;
  top: 140px;
  right: 160px;
  z-index: 999;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;


const WebDesign = () => {
  return (
    <>
      <Canvas style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Mac />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
      <Container>
      <Desc frontText="Distinguez-vous en ligne grâce à nos conceptions web uniques." 
        backText="Taboni Web" />
      </Container>
    </>
  );
};

export default WebDesign;
