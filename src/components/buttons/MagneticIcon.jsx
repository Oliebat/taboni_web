import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
  margin: 0 10px;
`;

const MagneticIcon = ({ children, href, target = "_blank", rel = "noopener noreferrer" }) => {
  const magnetic = useRef(null);
  
  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width/2);
      const y = clientY - (top + height/2);
      xTo(x);
      yTo(y);
    };
    
    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };
    
    magnetic.current.addEventListener("mousemove", handleMouseMove);
    magnetic.current.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      if (magnetic.current) {
        magnetic.current.removeEventListener("mousemove", handleMouseMove);
        magnetic.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <IconWrapper ref={magnetic}>
      <a href={href} target={target} rel={rel}>
        {children}
      </a>
    </IconWrapper>
  );
};

export default MagneticIcon;