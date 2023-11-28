import React, { useRef, useEffect } from 'react'
import styled from "styled-components";
import Button from "./buttons/Button";
import gsap from "gsap";

const Header = styled.header`
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;

`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

// const Logo = styled.img`
//   height: 50px;
// `;


const TitleSite = styled.div`
    font-size: 70px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: white;
    -webkit-text-stroke: 0px;
  }

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
        }
      }
    }
  }
`;

const List = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;

  font-weight: 600;

  // overflow: hidden;

  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  transition: width 0.8s ease, left 0.7s ease;

  color: #fff; // Text color
  text-decoration: none;
  
  padding: 15px 0;
  position: relative;

  &:after {    
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    bottom: 0;
    background: #fff; // Underline color
    transition: width 0.3s ease, left 0.3s ease;
    width: 0;
  }

  &:hover:after { 
    width: 100%; 
    left: 0; 
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`;


const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }
};


const Navbar = () => {
  const header = useRef(null);

  const logo = useRef(null);
  const list = useRef(null);
  const button = useRef(null);
  
  useEffect(() => {
    const items = list.current.querySelectorAll('li')

    gsap.set(items, { yPercent: 100 });
    gsap.set(logo.current, { opacity: 0})
    gsap.set(button.current, { x: 20, opacity: 0 })

    const tl = gsap.timeline({
      defaults: {
        duration: 1, 
        ease: "sine.out",
        delay: 1.2
      }
    })

    tl.to(logo.current, { opacity: 1 })
      .to(items, { yPercent: 0, stagger: 0.15 }, 0.5)
      .to(button.current, { x: 0, opacity: 1 }, 1)
  })

  return (
    <Header ref={header}>
      <Container>
        <Links>
          <TitleSite ref={logo}>Taboni Web</TitleSite>
          <List ref={list}>
            <ListItem onClick={() => scrollToSection("home")}>Accueil</ListItem>
            <ListItem onClick={() => scrollToSection("studio")}>Studio</ListItem>
            <ListItem onClick={() => scrollToSection("works")}>Compétences</ListItem>
            <ListItem onClick={() => scrollToSection("contact")}>Contact</ListItem>
          </List>
        </Links>
        <Icons ref={button}>
          <Button onClick={() => scrollToSection("contact")}><span>Contactez-nous</span></Button>
        </Icons>
      </Container>
    </Header>
  );
};

export default Navbar;
