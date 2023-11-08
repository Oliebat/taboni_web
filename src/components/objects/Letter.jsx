import React from 'react';
import styled, { css } from 'styled-components';

const speed = '0.2s';

const triangleMixin = (direction, width, height, color, color2 = color) => {
  return css`
    height: 0;
    width: 0;
    border: ${(width * 0.5)}px solid transparent;
    ${direction === 'up' &&
    css`
      border-top: 0 solid ${color2};
      border-bottom: ${height}px solid ${color};
    `}
    ${direction === 'down' &&
    css`
      border-top: ${height}px solid ${color};
      border-bottom: 0 solid ${color2};
    `}
  `;
};

const Container = styled.section`
  z-index: 1;
  width: ${props => 100 * props.sizeMultiplier}px;
  height: ${props => 65 * props.sizeMultiplier}px;
  position: absolute;
  top: 0; bottom: 0; right: 0; left: 0;
  margin: auto;
  border-width: ${props => 63 * props.sizeMultiplier}px ${props => 43 * props.sizeMultiplier}px;
  border-style: solid;
  border-color: #9e9abd;
  border-radius: 50%;
`;

const Foreground = styled.div`
  z-index: 1;
  width: ${props => 34 * props.sizeMultiplier}px;
  height: 0;
  border-width: ${props => 34 * props.sizeMultiplier}px ${props => 35 * props.sizeMultiplier}px;
  border-style: solid;
  border-color: transparent #ecc460 #f7d98f;
  border-radius: 0 0 ${props => 10 * props.sizeMultiplier}px ${props => 10 * props.sizeMultiplier}px;
  box-shadow: 0 ${props => 5 * props.sizeMultiplier}px 0 rgba(0,0,0,0.2);

  &:before {
    ${triangleMixin('down', 104, 52, '#f7d98f', '#d77e35')}
    z-index: 1;
    position: absolute;
    top: ${props => 0 * props.sizeMultiplier}px;
    left: 0;
    content: '';
    transition: border-bottom-width ease-in ${speed} ${speed},
                border-top-width ease-out ${speed} calc(${speed} * 2),
                top ease-in ${speed} ${speed},
                z-index linear ${speed} ${speed};
  }
  
  &:after {
    content: 'Aloha';
    z-index: -1;
    position: absolute;
    left: ${props => 7 * props.sizeMultiplier}px;
    bottom: ${props => 4 * props.sizeMultiplier}px;
    color: #444246;
    font: ${props => 13 * props.sizeMultiplier}px 'Open Sans', sans-serif; 
    text-transform: uppercase;
    text-align: center;
    line-height: ${props => 55 * props.sizeMultiplier}px;
    background: white;
    width: ${props => 90 * props.sizeMultiplier}px;
    height: ${props => 54 * props.sizeMultiplier}px;
    margin-top: 0;
    padding-bottom: 0;
    box-shadow: 0 0 0 ${props => 7 * props.sizeMultiplier}px #d77e35;
    transition: all ease-in-out ${speed} 0s;
    border-radius: 0 0 ${props => 10 * props.sizeMultiplier}px ${props => 10 * props.sizeMultiplier}px;
  }

  &:hover:before {
    top: ${props => -52 * props.sizeMultiplier}px;
    z-index: -1;
    border-top-width: 0;
    border-bottom-width: ${props => 52 * props.sizeMultiplier}px;
    transition: top ease-out ${speed} ${speed},
                border-top-width ease-in ${speed} 0s,
                border-bottom-width ease-out ${speed} ${speed},
                z-index linear ${speed} ${speed};
  }

  &:hover:after {
    bottom: ${props => 40 * props.sizeMultiplier}px;
    box-shadow: 0 ${props => 36 * props.sizeMultiplier}px 0 ${props => 7 * props.sizeMultiplier}px #d77e35;
    transition: all ease-in-out ${speed} calc(${speed} * 2);
  }
`;

const Letter = ({ sizeMultiplier = 1 }) => {
  return (
    <Container sizeMultiplier={sizeMultiplier}>
      <Foreground sizeMultiplier={sizeMultiplier}></Foreground>
    </Container>
  );
};

export default Letter;