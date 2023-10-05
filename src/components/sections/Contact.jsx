import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styled, { css, keyframes } from "styled-components";
import Map from "../Map";
import Button from "../buttons/Button";
import UpButton from "../buttons/UpButton";


const Section = styled.div`
position: relative;
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

const Right = styled.div`
position: relative;
  flex: 1;
  

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const UpButtonWrapper = styled.div`
  position: absolute;
  bottom: 0; 
  right: 0;
  z-index: 2;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Semi-transparent background
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ showModal }) => (showModal ? "visible" : "hidden")};
  animation: ${({ animatingOut }) => 
        animatingOut ? tvOffEffect : fadeIn} 0.3s forwards;
`;

const ModalContent = styled.div`
  width: 80%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1); // Glassmorphism effect
  backdrop-filter: blur(10px); // Making the background blurred
  border-radius: 10px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.span`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;


const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
    @media only screen and (max-width: 768px) {
      display: block;
      font-size: 10px;
      text-align: center;
      height: 25px;
    }
`;

const currentYear = new Date().getFullYear();

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

const tvOffEffect = keyframes`
  0% {
    transform: scaleY(1);
    opacity: 1;
  }
  80% {
    transform: scaleY(0.05);
    opacity: 1;
  }
  100% {
    transform: scaleY(0);
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

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};




const Contact = ({ id }) => {
  const formRef = useRef(null);
  const modalRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const APP_SERVICE_ID = import.meta.env.VITE_REACT_APP_SERVICE_ID;
  const APP_TEMPLATE_ID = import.meta.env.VITE_REACT_APP_TEMPLATE_ID;
  const APP_PUBLIC_KEY = import.meta.env.VITE_REACT_APP_PUBLIC_KEY;

  useEffect(() => {
    if (animatingOut && modalRef.current) {
        const handleAnimationEnd = () => {
            setShowModal(false);
            setAnimatingOut(false);
        };

        modalRef.current.addEventListener('animationend', handleAnimationEnd);

        return () => {
            if (modalRef.current) {
                modalRef.current.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }
}, [animatingOut]);



  const handleModalOpen = () => {
    setShowModal(true);
};

const handleModalClose = () => {
  setAnimatingOut(true);
};



  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        APP_SERVICE_ID,
        APP_TEMPLATE_ID,
        formRef.current,
        APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          setErrorMessage(null);
          formRef.current.reset();

          setTimeout(() => {
            setStartFadeOut(true);
          }, 4000);

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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>Contactez-nous.</Title>
            <Input placeholder="Nom" name="name" required />
            <Input placeholder="Email" name="email" type="email" required />
            <TextArea
              placeholder="Message"
              name="message"
              rows={10}
              required
            />
            <Button customWidth="100%" type="submit"><span>Envoyer</span></Button>
            {success && (
              <SuccessMessage startFadeOut={startFadeOut}>
                Votre message a été envoyé. Nous vous répondrons bientôt !
              </SuccessMessage>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </Form>
        </Left>
        <Right>
        <UpButtonWrapper>
          <UpButton onClick={() => scrollToSection("home")} />
        </UpButtonWrapper>
          <Map />
        </Right>
      </Container>
      <BottomBar onClick={handleModalOpen}>
    © {currentYear} Taboni Web. All rights reserved. <span style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '2px' }}> Mentions légales</span>.
</BottomBar>

{showModal && (
  <ModalBackground 
  ref={modalRef} 
  showModal={showModal} 
  animatingOut={animatingOut} 
  onClick={handleModalClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={handleModalClose}>✖</CloseButton>
      {/* Contenu des mentions légales */}
      <h2>Mentions légales</h2>
      <p>... vos mentions légales ...</p>
    </ModalContent>
  </ModalBackground>
)}
    </Section>
  );
};

export default Contact;