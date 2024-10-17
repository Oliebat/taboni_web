import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components';
import { gsap } from 'gsap';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  Marker
} from "react-simple-maps";

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
`;

const CursorCircle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  transition: width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out, background-image 0.3s ease-out;
  background-size: cover;
  background-position: center;
`;

const baseColors = [
  "#b74265",
  "#8e1b5e",
  "#650e57",
  "#4a0e4e",
  "#610c61",
  "#780e78", 
  "#9c27b0",
  "#4b0082"
];
const cityImages = {
  Paris: "./img/paris.jpg",
  Nice: "./img/nice.jpg",
  Rouen: "./img/rouen.png"
};

const Map = () => {
  const [isActive, setIsActive] = useState(false);
  const [hoveredCity, setHoveredCity] = useState(null);
  const circles = useRef([]);
  const cursorSize = 40;
  const expandedCursorSize = cursorSize * 2;

  useEffect(() => {
    const moveCircles = (x, y) => {
      if (circles.current.length < 1) return;
      circles.current.forEach((circle, i) => {
        gsap.to(circle, {
          x: x - (hoveredCity ? expandedCursorSize : cursorSize) / 2,
          y: y - (hoveredCity ? expandedCursorSize : cursorSize) / 2,
          duration: 0.2,
          ease: "power2.out",
          delay: i * 0.02,
        });
      });
    };

    const handleMouseMove = (e) => {
      if (isActive) {
        moveCircles(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isActive, hoveredCity, cursorSize, expandedCursorSize]);

  const handleCityHover = (city) => {
    setHoveredCity(city);
    circles.current.forEach((circle) => {
      gsap.to(circle, {
        width: expandedCursorSize,
        height: expandedCursorSize,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const handleCityLeave = () => {
    setHoveredCity(null);
    circles.current.forEach((circle) => {
      gsap.to(circle, {
        width: cursorSize,
        height: cursorSize,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  };

  const cities = [
    { name: "Paris", coordinates: [2.3522, 48.8566] },
    { name: "Nice", coordinates: [7.2619, 43.7102] },
    { name: "Rouen", coordinates: [1.0993, 49.4432] }
  ];

  return (
    <MapContainer
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        setIsActive(false);
        setHoveredCity(null);
      }}
    >
      <CursorContainer style={{ display: isActive ? 'block' : 'none' }}>
  {[...Array(4)].map((_, i) => (
    <CursorCircle
      key={i}
      ref={(el) => (circles.current[i] = el)}
      style={{
        backgroundColor: hoveredCity ? 'transparent' : baseColors[i],
        backgroundImage: hoveredCity && i === 0 ? `url(${cityImages[hoveredCity]})` : 'none',
        width: hoveredCity ? expandedCursorSize * 0.75 : cursorSize * 0.75,  
        height: hoveredCity ? expandedCursorSize * 0.75 : cursorSize * 0.75, 
        filter: i === 0 ? 'none' : `blur(${i * 15}px)`,
        opacity: hoveredCity ? (i === 0 ? 1 : 0.5) : 1,
        transition: `all 0.3s ease-out`,
        zIndex: i === 0 ? 1 : 0,
      }}
    />
  ))}
</CursorContainer>

      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -52.0, 0],
          center: [-5, -3],
          scale: 1600
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies
          geography="/features.json"
          fill="#2C065D"
          stroke="#FFFFFF"
          strokeWidth={0.5}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {cities.map(({ name, coordinates }) => (
          <React.Fragment key={name}>
            <Annotation
              subject={coordinates}
              dx={-90}
              dy={-30}
              connectorProps={{
                stroke: "white",
                strokeWidth: 2,
                strokeLinecap: "round"
              }}
            >
              <text 
                x="-8" 
                textAnchor="end" 
                alignmentBaseline="middle" 
                fill="white" 
                style={{ zIndex: 50, cursor: 'pointer' }}
                onMouseEnter={() => handleCityHover(name)}
                onMouseLeave={handleCityLeave}
              >
                {name}
              </text>
            </Annotation>
            <Marker coordinates={coordinates}>
              <g>
                <circle
                  r={25}
                  fill="transparent"
                  onMouseEnter={() => handleCityHover(name)}
                  onMouseLeave={handleCityLeave}
                />
                <circle
                  r={4}
                  fill="white"
                  stroke="#fff"
                  strokeWidth={2}
                />
              </g>
            </Marker>
          </React.Fragment>
        ))}
      </ComposableMap>
    </MapContainer>
  );
};

export default Map;