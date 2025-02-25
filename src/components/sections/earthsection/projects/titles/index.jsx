import React, { useRef, useEffect, useState } from 'react'
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function Titles({data, setSelectedProject}) {
  return (
    <div className={styles.titles}>
        {
            data.map((project, i) => {
                return <Title key={i} data={{...project, i}} setSelectedProject={setSelectedProject}/>
            })
        }
    </div>
  )
}

function Title({data, setSelectedProject}) {
    const { title, speed, i } = data;
    const container = useRef(null);
    const textRef = useRef(null);
    
    useEffect(() => {

        const animation = gsap.fromTo(textRef.current, 
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: `+=${25 / speed}vw`,
                    scrub: true,
                }
            }
        );

        return () => {
            if (animation.scrollTrigger) {
                animation.scrollTrigger.kill();
            }
            animation.kill();
        };
    }, [speed]);

    return (
        <div ref={container} className={styles.title}>
            <div 
                className={styles.wrapper}
                onMouseOver={() => {setSelectedProject(i)}}
                onMouseLeave={() => {setSelectedProject(null)}}
            >
                <p ref={textRef}>
                    {title}
                </p>
                <p>
                    {title}
                </p>
            </div>
        </div>
    )
}