import React, { useRef, useEffect } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Titles({ data, setSelectedProject }) {
  return (
    <div className={styles.titles}>
      {data.map((project, i) => (
        <Title key={i} data={{ ...project, i }} setSelectedProject={setSelectedProject} />
      ))}
    </div>
  );
}

function Title({ data, setSelectedProject }) {
  const { title, i } = data;
  const container = useRef(null);
  const textRefs = useRef([]); // Stocker les deux <p>

  useEffect(() => {
    if (!container.current) return;

    const texts = gsap.utils.toArray(textRefs.current); // Récupérer les deux <p>

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
    <div ref={container} className={styles.title}>
      <div
        className={styles.wrapper}
        onMouseOver={() => setSelectedProject(i)}
        onMouseLeave={() => setSelectedProject(null)}
      >
        {/* Les deux <p> ont le même effet */}
        <p ref={(el) => (textRefs.current[0] = el)} className={styles.animatedText}>
          {title}
        </p>
        <p ref={(el) => (textRefs.current[1] = el)}>{title}</p>
      </div>
    </div>
  );
}
