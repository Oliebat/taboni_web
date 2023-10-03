import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Atom from "./objects/Atom";
import styled from "styled-components";

const Desc = styled.div`
  width: 200px;
  /* height: 70px; */
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 200px;
  right: 100px;

  @media only screen and (max-width: 768px) {
   display: non;
  }
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
      <Desc>
        Des solutions sur mesure pour répondre précisément à vos besoins spécifiques.
      </Desc>
    </>
  );
};

export default Development;
