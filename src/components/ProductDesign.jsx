import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Mobile from "./objects/Mobile";
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
      <Desc>
        Restez connecté avec vos utilisateurs grâce à nos applications mobiles performantes.
      </Desc>
    </>
  );
};

export default ProductDesign;
