import React from "react";
import styled from "styled-components";

const Label = styled.label`
  perspective: 1000px;
  transform-style: preserve-3d;
  display: block;
  width: 285px;
  height: 110px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Card = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: all 600ms;
  z-index: 20;

  div {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    text-align: center;
    line-height: 20px;
    backface-visibility: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .back {
    background: #222;
    color: #fff;
    transform: rotateX(180deg);
    text-align: center;
  }

  &:hover {
    transform: rotateX(20deg);
    box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Card} {
    transform: rotateX(180deg);
  }

  &:checked + ${Card}:hover {
    transform: rotateX(160deg);
    box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
  }
`;

const Desc = ({ frontText, backText }) => {
    return (
      <Label>
        <Input type="checkbox" />
        <Card>
          <div className="front">{frontText || "Front"}</div>
          <div className="back">{backText || "Back"}</div>
        </Card>
      </Label>
    );
  };
  
export default Desc;
