import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Atom from "./objects/Atom";
import styled from "styled-components";
import Desc from "./Desc";


const Container = styled.div`
  position: absolute;
  top: 200px;
  right: 195px;
  z-index: 999;
`;

const Development = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }} style={{ cursor: 'grab' }}>
        <Suspense fallback={null}>
          <Atom />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
      <Container className="animate__animated animate__fadeIn">
      <Desc frontText="Des solutions sur mesure pour répondre précisément à vos besoins spécifiques" 
        backText="Taboni Web" />
      </Container>
    </>
  );
};

export default Development;
