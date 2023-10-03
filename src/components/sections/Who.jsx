import React, { Suspense } from "react";
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "../objects/Cube";
import Button from "../buttons/Button";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    font-size: 55px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #A3333D;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
`;



const Who = ({ id }) => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  
  return (
    <Section id={id}>
      <Container>
        <Left>
          <Canvas camera={{ position: [5, 5, 5], fov: 25 }} style={{ cursor: 'grab' }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 2, 1]} />
              <Cube />
              <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
          </Canvas>
        </Left>
        <Right>
          <Title>Dépassez les limites du cadre établi.</Title>
          <WhatWeDo>
            <Line src="./img/line.png" />
            <Subtitle>
              Qu'est ce que Taboni Web ?
            </Subtitle>
          </WhatWeDo>
          <Desc>
            Un developpeur web passionné par le code et les nouvelles technologies.
          </Desc>
          <Button onClick={() => scrollToSection("works")}><span>Voir plus</span></Button>
        </Right>
      </Container>
    </Section>
  );
};

export default Who;
