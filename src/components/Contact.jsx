import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled, { css, keyframes } from "styled-components";
import Map from "./Map";


const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: 40px;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e8e6e6;
`;

const Button = styled.button`
background-color: #A93F55;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
  
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

const Right = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SuccessMessage = styled.div`
  ${({ startFadeOut }) =>
    startFadeOut &&
    css`
      animation: ${fadeOut} 2s forwards;
    `}
`;

const Contact = ({ id }) => {
  const ref = useRef();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const APP_SERVICE_ID = import.meta.env.VITE_REACT_APP_SERVICE_ID;
  const APP_TEMPLATE_ID = import.meta.env.VITE_REACT_APP_TEMPLATE_ID;
  const APP_PUBLIC_KEY = import.meta.env.VITE_REACT_APP_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        APP_SERVICE_ID,
        APP_TEMPLATE_ID,
        ref.current,
        APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          setErrorMessage(null);
          ref.current.reset();

          setTimeout(() => {
            setStartFadeOut(true);
          }, 8000);

          setTimeout(() => {
            setSuccess(false);
            setStartFadeOut(false);
          }, 10000);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
      );
  };

  return (
    <Section id={id}>
      <Container>
        <Left>
          <Form ref={ref} onSubmit={handleSubmit}>
            <Title>Contactez Nous</Title>
            <Input placeholder="Nom" name="name" required />
            <Input placeholder="Email" name="email" type="email" required />
            <TextArea
              placeholder="Message"
              name="message"
              rows={10}
              required
            />
            <Button type="submit">Envoyer</Button>
            {success && (
              <SuccessMessage startFadeOut={startFadeOut}>
                Votre message a été envoyé. Nous vous répondrons bientôt !
              </SuccessMessage>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </Form>
        </Left>
        <Right>
          <Map />
        </Right>
      </Container>
    </Section>
  );
};

export default Contact;
