import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Development from "../Development";
import ProductDesign from "../ProductDesign";
import WebDesign from "../WebDesign";
import Securite from "../Securite";
import Promixite from "../Promixite";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger);


const data = [
  "Web",
  "Développement",
  "Mobile",
  "Promixité",
  "Sécurité",
];

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 14px;
  font-weight: 300;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 20px;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 90px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;
  will-change: transform;  // Suggestion d'accélération matérielle

  ::after {
    content: "${(props) => props.text}";
    position: absolute;
    top: 0;
    left: 0;
    color: #A3333D;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    ::after {
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to {
          width: 100%;
          transform: translateZ(0);
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    color: white;
    -webkit-text-stroke: 0px;
    font-size: 2.5em;

    ::after {
      width: 0; 
      animation: none; 
    }

    &:hover {
      ::after {
        animation: none; // supprime l'animation au survol également
      }
    }
  }
`;



const Right = styled.div`
  flex: 1;
`;

const Works = ({ id }) => {
  const [work, setWork] = useState("Web");

  const section = useRef(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.listItem');
    console.log(items);

    const tl = gsap.timeline({
      defaults: {
        ease: 'sine.out',
        duration: 1,
      },
      scrollTrigger: {
        trigger: section.current,
        start: 'top bottom',
        end: '80% bottom',
        scrub: 2,
      },
    });

    tl.fromTo(
      items,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 1 }
    );

  }, []);
  

  const renderRightContent = () => {
    switch (work) {
      case "Web":
        return <WebDesign />;
      case "Développement":
        return <Development />;
      case "Mobile":
        return <ProductDesign />;
      case "Sécurité":
        return <Securite />;
      case "Promixité":
        return <Promixite />;
      default:
        return null; 
    }
  };

  return (
    <Section id={id} ref={section}>
      <Container>
        <Left>
        <List>
            {data.map((item) => (
              <ListItem id="target" className="listItem"
                key={item}
                text={item}
                onMouseOver={() => setWork(item)} 
              >
                {item}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right>
          {renderRightContent()}
        </Right>
      </Container>
    </Section>
  );
};

export default Works;

