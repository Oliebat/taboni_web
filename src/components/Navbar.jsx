import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
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


const TitleSite = styled.h1`
    font-size: 90px;
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
  gap: 20px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
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

const Button = styled.button`
  width: 120px;
  padding: 10px;
  background-color: #A3333D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

   /* hover effect*/
   display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  transition-duration: 0.3s;
  transition-property: transform;

  &:hover, 
  &:focus, 
  &:active {
    transform: scale(1.1) rotate(4deg);
  }
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
  return (
    <Section>
      <Container>
        <Links>
          <TitleSite>Taboni Web</TitleSite>
          <List>
            <ListItem onClick={() => scrollToSection("home")}>Home</ListItem>
            <ListItem onClick={() => scrollToSection("studio")}>Studio</ListItem>
            <ListItem onClick={() => scrollToSection("works")}>Works</ListItem>
            <ListItem onClick={() => scrollToSection("contact")}>Contact</ListItem>
          </List>
        </Links>
        <Icons>
          <Button onClick={() => scrollToSection("contact")}>Contactez nous</Button>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
