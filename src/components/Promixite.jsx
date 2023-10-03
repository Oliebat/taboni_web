import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Handshake from "./objects/Handshake";
import styled from "styled-components";

const Desc = styled.div`
  width: 200px;
  /* height: 70px; */
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 150px;
  right: 100px;

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
      <Desc>
        Toujours à vos côtés pour vous conseiller et vous guider dans votre parcours numérique.
      </Desc>
    </>
  );
};

export default Proximite;
