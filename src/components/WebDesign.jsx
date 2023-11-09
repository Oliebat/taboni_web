import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import styled from "styled-components";
import Mac from "./objects/Mac";
import Desc from "./Desc";
import 'animate.css';

const Container = styled.div`
  position: absolute;
  top: 115px;
  right: 220px;
  z-index: 999;
  @media only screen and (max-width: 768px) {
    top: 410px;
    right: 206px;
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
      <Container className="animate__animated animate__fadeIn animate__slow">
      <Desc frontText="Distinguez-vous en ligne grâce à nos conceptions web uniques.
      Site ou maintenance Wordpress, site sur mesure avec un framework JS, nous vous accompagnons dans votre projet." 
        backText="Taboni Web" />
      </Container>
    </>
  );
};

export default WebDesign;
