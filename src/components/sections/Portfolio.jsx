import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Styled Components

const PortfolioSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;

const PortfolioTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: -17%;
  transform: translateY(-50%);
  font-size: 26rem;
  letter-spacing: 0;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px white;
  display: inline-block;
  opacity: 0;
  white-space: nowrap;
`;

const PanelsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: fit-content;
`;

const Panel = styled.div`
  display: flex;
  flex: 0 0 80%;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  padding: 5rem 3rem 2rem 5rem;
  background-color: transparent;
  overflow: hidden;
  position: relative;
`;

const PanelItem = styled.div`
  height: 55%;
  width: 70%;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;

const PanelImg = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: cover;
  opacity: 0;
  transform: scale(0.5) translateX(100%);
`;

const DetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  position: absolute;
  top: 65%;
  left: 95%;
  transform: translateX(-50%);
  width: 50%;
  height: 25%;
  opacity: 0;
  transition: opacity 0.8s ease;
  border-radius: 5%;

  a {
    display: inline-flex;
    align-items: center;
    margin-top: 5%;
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.6s ease;

    &:hover {
      color: #f0f0f0;
    }
  }

  ${PanelItem}:hover & {
    opacity: 1;
  }
`;

// Données des Projets

const Projets = [
  {
    src: "./img/cabnow.png",
    title: "CabNow",
    description: "Site web de Chauffeur VTC avec réservation en ligne",
    lien: "https://cabnowriviera.fr/"
  },
  {
    src: "./img/mcb.png",
    title: "MCB - Photographie",
    description: "Site web de photographe professionnel",
    lien: "https://mariecharlottebana.fr/"
  },
  {
    src: "./img/lescarsrapides.png",
    title: "Les Cars Rapides",
    description: "Site web chauffeur VTC avec formulaire de contact", 
    lien: "https://les-cars-rapides.fr/"
  },
  {
    src: "./img/9juillet.png",
    title: "Institut 9 Juillet",
    description: "Site web de l'institut de beauté 9 Juillet",
    lien: "https://institut-neuf-juillet.fr/"
  },
  {
    src: "./img/marclevy.png",
    title: "Marc Levy",
    description: "Site web de l'auteur Marc Levy",
    lien: "https://www.marclevy.com/"
  },
  {
    src: "https://picsum.photos/seed/project8/800/600",
    title: "Projet 8",
    description: "Description du projet 8",
    lien: "https://www.google.com"
  },
  {
    src: "https://picsum.photos/seed/project9/800/600",
    title: "Projet 9",
    description: "Description du projet 9",
    lien: "https://www.google.com"
  }
];

// Composant Portfolio

const Portfolio = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const panelsRef = useRef([]);
  const imagesRef = useRef([]);
  const firstImageRef = useRef(null); // Référence pour la première image

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const panels = panelsRef.current;
    const images = imagesRef.current;
    const firstImage = firstImageRef.current; // Récupère la première image

    const totalPanels = panels.length;
    const gap = 300;
    const panelWidth = gap + panels[0]?.offsetWidth;
    const totalWidth = panelWidth * totalPanels;

    const panelsContainer = gsap.utils.toArray('.panels-container')[0];
    if (panelsContainer) {
      panelsContainer.style.width = `${totalWidth}px`;
    }

    // Timeline principale pour le défilement horizontal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalWidth - window.innerWidth}`,
        markers: false,
      },
      defaults: { ease: "none", duration: 4 }
    });

    // Animation du titre
    gsap.to(title, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "top top",
        scrub: true,
        markers: false,
      }
    });

    tl.to(title, { x: 2000 })
      .to(panelsContainer, { x: () => -(totalWidth - window.innerWidth) }, 0);

    // Animation individuelle pour chaque image
    images.forEach((img, index) => {
      gsap.fromTo(img, 
        { opacity: 0, scale: 2, x: "100%" },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "left center",
            end: "right center",
            containerAnimation: tl,
            scrub: true
          }
        }
      );
    });

    // Animation de fondu spécifique pour la première image
    if (firstImage) {
      gsap.fromTo(firstImage, 
        { opacity: 0, scale: 2, x: "100%" },
        { 
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: firstImage,
            start: "top 5%",
            end: "top 50%",
            scrub: true,
            markers: true,
          }
        }
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <PortfolioSection ref={sectionRef} className="portfolio">
      <PortfolioTitle ref={titleRef} className="portfolio_title text-stroke parallax">
        Projets
      </PortfolioTitle>
      <PanelsContainer className="panels-container">
        {Projets.map((projet, index) => (
          <Panel 
            key={index} 
            className="panel" 
            ref={el => panelsRef.current[index] = el}
          >
            <PanelItem>
              <PanelImg 
                className="panel-img"
                src={projet.src}
                alt={`Project ${index + 1}`}
                ref={el => {
                  imagesRef.current[index] = el;
                  if (index === 0) firstImageRef.current = el; // Assigne la première image
                }}
              />
              <DetailsPanel>
                <h3>{projet.title}</h3>
                <p>{projet.description}</p>
                <a href={projet.lien} target="_blank" rel="noopener noreferrer">Voir le projet</a>
              </DetailsPanel>
            </PanelItem>
          </Panel>
        ))}
      </PanelsContainer>
    </PortfolioSection>
  );
};

export default Portfolio;
