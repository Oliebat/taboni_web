import React from 'react'
import styles from './style.module.scss';

export default function Descriptions({data, selectedProject}) {
    // Détection du mode mobile
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
    
    return (
        <div className={styles.descriptions}>
            {
                data.map((project, i) => {
                    const { title, description } = project;
                    const isSelected = selectedProject === i;
                    
                    // Ne créer la classe que si isSelected est true
                    const activeClass = isSelected ? styles.active : '';
                    
                    return (
                    <div 
                        key={i} 
                        className={`${styles.description} ${activeClass}`}
                        style={{
                            clipPath: isSelected ? "inset(0 0 0)" : "inset(50% 0 50%)",
                            height: isMobile ? `${100 / data.length}%` : 'auto'
                        }}
                    >
                        <p>{title}</p>
                        <p>{description}</p>
                    </div>
                    )
                })
            }
        </div>
    )
}