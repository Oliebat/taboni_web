import React, { useRef, useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  max-width: 20rem;
  border-radius: 1.5rem;
  padding: 2rem;
  overflow: hidden;
  color: #f0f0f0;
  bottom: 30%;
  left: 74%;
  background-color: rgba(0, 0, 0, 0.7);

  @media only screen and (max-width: 768px) {
    max-width: none;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 1rem;
		bottom: -8rem;
		left: 0;
  }
`;

const Spotlight = styled.div`
  pointer-events: none;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  opacity: 0;
  transition: opacity 0.5s;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #f0f0f0;
  font-size: 2rem;

  @media only screen and (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #f0f0f0;
  margin: 0.5rem 0;

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const CardLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  display: inline-block;
	transition: opacity 0.6s ease;
  
  &:hover {
    text-decoration: none;
		opacity: 0.8;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    text-align: center;
    margin-top: 1rem;
  }
`;

// Le reste du composant reste identique
const CardSpotlight = ({ title, description, feat, lien }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <CardContainer
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Spotlight
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.25), transparent 40%)`,
        }}
      />
      <IconWrapper>
        {/* If you have an icon library, you can use an icon here */}
      </IconWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {feat && <CardDescription>{feat}</CardDescription>}
      <CardLink href={lien} target="_blank" rel="noopener noreferrer">
        Voir le projet
      </CardLink>
    </CardContainer>
  );
};

export default CardSpotlight;