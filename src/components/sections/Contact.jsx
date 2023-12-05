import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styled, { css, keyframes } from "styled-components";
import Map from "../Map";
import Button from "../buttons/Button";
import UpButton from "../buttons/UpButton";
// import { Turnstile } from '@marsidev/react-turnstile'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Box } from "@react-three/drei";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)



const Section = styled.div`
  position: relative;
  height: 100vh;
  scroll-snap-align: center;
  overflow: hidden;
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
  @media only screen and (max-width: 1350px) {
    margin-left: 2%;
    flex: 1;
  }
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: 3.35vw;
  @media only screen and (max-width: 768px) {
    font-size: 2em;
  }
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  resize: none;

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
  resize: none;
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

const LegalLink = styled.a`
  color: inherit; 
  text-decoration: none; 

  &:hover {
    text-decoration: underline; 
  }
`;

const BoxContact = styled.div`
  position: absolute;
  bottom: 7%;
  left: 0;
  right: 0;
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 1.75em;

  & a {
  color: white; 
  margin: 0 10px; 
  transition: color 0.3s; 
      }

      a:hover {
        color: #cccccc; 
      }
    @media only screen and (max-width: 768px) {
      bottom: 4%;
      display: block;
      font-size: 1em;
      text-align: center;
      height: 25px;
    }
`;

const githubUrl = 'https://github.com/Oliebat';
const linkedinUrl = 'https://www.linkedin.com/in/cyril-bationo-690721121';

const Footer = styled.footer`
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
  

  const section = useRef(null);
  const boxContact = useRef(null);
  const footer = useRef(null);
  const right = useRef(null);
  const titleForm = useRef(null);
  const buttonForm = useRef(null);
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputMessage = useRef(null);

  // const elements = useRef([]);

  useEffect(() => {
    // elements.current.push(formRef.current, map.current, boxContact.current, right.current, footer.current)
    // console.log(map?.current)

    // elements.current.forEach((element) => {
    //   const tl = gsap.timeline({
    //     defaults: {
    //       ease: 'sine.out',
    //       duration: 1.2
    //     },
    //     scrollTrigger: {
    //       trigger: elements.current,
    //       start: 'top bottom',
    //       end: '80% bottom',
    //       scrub: 2,
    //     },
    //   });

    //   tl.fromTo(
    //     formRef.current,
    //     { x: -20, opacity: 0 },
    //     { x: 0, opacity: 1, stagger: 0.2 }, 1
    //   );
    //   tl.fromTo(
    //     map.current,
    //     { x: -20, opacity: 0 },
    //     { x: 0, opacity: 1, stagger: 0.2 }, 2
    //   );
    //   tl.fromTo(
    //     boxContact.current,
    //     { x: -20, opacity: 0 },
    //     { x: 0, opacity: 1, stagger: 0.2 }, 3
    //   );
    //   tl.fromTo(
    //     right.current,
    //     { x: -20, opacity: 0 },
    //     { x: 0, opacity: 1, stagger: 0.2 }, 4
    //   );
    //   tl.fromTo(
    //     footer.current,
    //     { x: -20, opacity: 0 },
    //     { x: 0, opacity: 1, stagger: 0.2 }, 5
    //   );

    // })

    gsap.fromTo(right.current, {
      opacity: 0,
    },{
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: section.current,
        start: '25% bottom',
        end: 'bottom bottom',
        scrub: 2,
      },
    })
    
    gsap.fromTo(formRef.current, {
      opacity: 0,
    },{
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: section.current,
        start: '25% bottom',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    gsap.fromTo(inputName.current, {
      y: 20,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: inputName.current,
        start: 'top 95%',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    gsap.fromTo(inputEmail.current, {
      y: 20,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: inputEmail.current,
        start: 'top 95%',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    gsap.fromTo(inputMessage.current, {
      y: 20,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: inputMessage.current,
        start: 'top 95%',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    gsap.fromTo(buttonForm.current, {
      y: 20,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: buttonForm.current,
        start: 'top 95%',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    
    gsap.fromTo(titleForm.current, {
      x: -20,
      opacity: 0,
    },{
      x: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: section.current,
        start: '25% bottom',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    gsap.fromTo(boxContact.current, {
      y: 20,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: boxContact.current,
        start: 'top 97%',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    gsap.fromTo(footer.current, {
      y: 20,
      opacity: 0,
    },{
      y: 0,
      opacity: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: footer.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 2,
      },
    })
  });
  
  

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
    <Section id={id} ref={section}>
      <Container>
        <Left>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title ref={titleForm}>Contactez-nous.</Title>
            <Input ref={inputName} placeholder="Nom" name="name" required />
            <Input ref={inputEmail} placeholder="Email" name="email" type="email" required />
            <TextArea
              ref={inputMessage}
              placeholder="Message"
              name="message"
              rows={10}
              required
            />
            {/* <Turnstile siteKey='0x4AAAAAAAM0j9-Umz6Vic_K' /> */}
            <Button ref={buttonForm} customWidth="100%" type="submit"><span>Envoyer</span></Button>
            {success && (
              <SuccessMessage startFadeOut={startFadeOut}>
                Votre message a été envoyé. Nous vous répondrons bientôt !
              </SuccessMessage>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </Form>
          <BoxContact ref={boxContact}>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub/>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin/>
            </a>
          </BoxContact>
        </Left>
        <Right ref={right}>
        <UpButtonWrapper>
          <UpButton onClick={() => scrollToSection("navbar")} />
        </UpButtonWrapper>
        <Map/>
        </Right>
      </Container>
      <Footer ref={footer} onClick={handleModalOpen}>
    © {currentYear} Taboni Web. Tous droits réservés. <span style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '2px' }}> Mentions légales</span>.
  </Footer>

{showModal && (
  <ModalBackground 
  ref={modalRef} 
  showModal={showModal} 
  animatingOut={animatingOut} 
  onClick={handleModalClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={handleModalClose}>✖</CloseButton>
      <section>
          <h2>Edition du site</h2>
          <p>Le présent site, accessible à l’URL <LegalLink href="https://taboniweb.com" target="_blank" rel="noopener noreferrer">taboniweb.com</LegalLink> (le « Site »), est édité par :</p>
          <p>Cyril Bationo, résidant à NICE, de nationalité Française (France).</p>
      </section>

      <section>
          <h2>Hébergement</h2>
          <p>Le Site est hébergé par la société OVH SAS, située 2 rue Kellermann - BP 80157 - 59053 Roubaix Cedex 1, (contact téléphonique ou email : 1007).</p>
      </section>

      <section>
          <h2>Directeur de publication</h2>
          <p>Le Directeur de la publication du Site est Cyril Bationo.</p>
      </section>

      <section>
          <h2>Nous contacter</h2>
          <p>Par email : <LegalLink href="mailto:contact@taboniweb.com">contact@taboniweb.com</LegalLink></p>
      </section>

      <section>
          <h2>Données personnelles</h2>
          <p>Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 (« RGPD »).</p>
      </section>

    </ModalContent>
  </ModalBackground>
)}
    </Section>
  );
};

export default Contact;