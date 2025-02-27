import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Titles({ data, setSelectedProject }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const handleTitleClick = (index) => {
    if (isMobile) {

      if (activeIndex === index) {
        setActiveIndex(null);
        setSelectedProject(null);
      } else {

        setActiveIndex(index);
        setSelectedProject(index);
      }
    }
  };

  return (
    <div className={styles.titles}>
      {data.map((project, i) => (
        <Title 
          key={i} 
          data={{ ...project, i }} 
          setSelectedProject={setSelectedProject}
          isMobile={isMobile}
          isActive={activeIndex === i}
          onClick={() => handleTitleClick(i)}
        />
      ))}
    </div>
  );
}

function Title({ data, setSelectedProject, isMobile, isActive, onClick }) {
  const { title, i } = data;
  const container = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    if (!container.current) return;

    const texts = gsap.utils.toArray(textRefs.current);

    gsap.fromTo(
      texts,
      {
        x: -50,
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
      },
      {
        x: 0,
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 3.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          end: "bottom 95%",
          scrub: 4.5,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div 
      ref={container} 
      className={`${styles.title} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      onMouseOver={() => !isMobile && setSelectedProject(i)}
      onMouseLeave={() => !isMobile && setSelectedProject(null)}
    >
      <div
        className={styles.wrapper}
      >
        <p ref={(el) => (textRefs.current[0] = el)} className={styles.animatedText}>
          {title}
        </p>
        <p ref={(el) => (textRefs.current[1] = el)}>{title}</p>
      </div>
    </div>
  );
}