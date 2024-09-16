import React, { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "../objects/Cube";
import Button from "../buttons/Button";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)



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
  font-size: 3.65vw;

  @media only screen and (max-width: 1350px) {
    font-size: 3vw;
  }

  @media only screen and (max-width: 768px) {
    font-size: 2.5em;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  
  @media only screen and (max-width: 1350px) {
    margin-right: 2%;
  }

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
  font-size: 2vw;
  @media only screen and (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const Desc = styled.p`
  font-size: 1.5vw;
  color: lightgray;

  @media only screen and (max-width: 768px) {
    margin: 0 20px;
    font-size: 1.2em;
    line-height: 1.3em;
  }
  @media only screen and (max-width: 376px) {
    font-size: 1.1em;
  }
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

  const cube = useRef(null);
  const section = useRef(null);

  useEffect(() => { 
    const items = gsap.utils.toArray('.whoAnimatedItems')

    const tl = gsap.timeline({
      defaults: {
        ease: 'sine.out',
        duration: 1,
      },
      scrollTrigger: {
        trigger: section.current,
        start: 'top 50%',
        end: '80% bottom',
        scrub: 2,
      },
    })

    tl
      .fromTo(
        items,
        {
          x: -20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
        }
      )
      .fromTo(cube.current, { opacity: 0 }, { opacity: 1 }, 1)
   })

  return (
    <Section ref={section} id={id}>
      <Container>
        <Left>
          <Canvas ref={cube} camera={{ position: [5, 5, 5], fov: 25 }} style={{ cursor: 'grab' }}>
            <Suspense fallback={null}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[3, 2, 1]} />
              <Cube />
              <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
          </Canvas>
        </Left>
        <Right>
          <Title className="whoAnimatedItems">Dépassez les limites du cadre établi.</Title>
          <WhatWeDo className="whoAnimatedItems">
            <Line src="./img/line.png" />
            <Subtitle>
              Qu'est ce que Taboni Web ?
            </Subtitle>
          </WhatWeDo>
          <Desc className="whoAnimatedItems">
          Taboni Web : bien plus qu'une expertise en développement web, c'est une aventure au cœur de l'innovation technologique. Doté d'un flair pour le design et une maîtrise des langages modernes comme JavaScript, React et Node.js, je façonne des sites dynamiques et réactifs. 
          <br></br>Chaque projet est une toile où se mêlent performance, créativité et précision technique. Je collabore étroitement avec mes clients pour métamorphoser des visions en réalités digitales percutantes. Partenaire agile, je guide chaque étape avec une promesse de qualité et de pertinence dans l'écosystème numérique d'aujourd'hui.
          </Desc>
          <Button className="whoAnimatedItems" onClick={() => scrollToSection("works")}><span>Voir plus</span></Button>
        </Right>
      </Container>
    </Section>
  );
};

export default Who;
