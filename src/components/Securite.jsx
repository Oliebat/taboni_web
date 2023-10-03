import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Safe from "./objects/Safe";
import styled from "styled-components";

const Desc = styled.div`
  width: 200px;
  /* height: 70px; */
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 200px;
  right: 100px;

  @media only screen and (max-width: 768px) {
    display: none;
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
      <Desc>
      Protégez votre présence en ligne avec nos solutions de sécurité robustes.
      </Desc>
    </>
  );
};

export default Securite;
