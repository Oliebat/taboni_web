import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Mobile from "./objects/Mobile";
import styled from "styled-components";
import Desc from "./Desc";

const Container = styled.div`
  position: absolute;
  top: 140px;
  bottom: -185px;
  right: 190px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ProductDesign = () => {
  return (
    <>
      <Canvas style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Mobile scale={[0.1, 0.1, 0.1]} />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
        <Container>
        <Desc frontText="Restez connecté avec vos utilisateurs grâce à nos applications mobiles performantes." 
          backText="Taboni Web" />
        </Container>
    </>
  );
};

export default ProductDesign;
