import { useState } from 'react';
import styles from './style.module.scss';
import Titles from './titles';
import Descriptions from './descriptions';

const data = [
    {
        title: "Solutions",
        description: "Création de solutions web personnalisées et innovantes adaptées parfaitement à vos objectifs d'entreprise.",
        speed: 0.5
    },
    {
        title: "Mobile",
        description: "Applications mobiles performantes et intuitives pour connecter votre entreprise à vos clients où qu'ils soient.",
        speed: 0.5
    },
    {
        title: "Protection",
        description: "Protection avancée de vos données et systèmes contre les menaces numériques avec des solutions robustes et actualisées.",
        speed: 0.67
    },
    {
        title: "Conseil",
        description: "Support personnalisé et conseils stratégiques pour optimiser votre présence en ligne et maximiser votre impact numérique.",
        speed: 0.8
    },
    {
        title: "Audit",
        description: "Analyse experte et détaillée de votre plateforme web pour identifier les opportunités d'amélioration en termes de fonctionnalités, sécurité et expérience utilisateur.",
        speed: 0.8
    },
    {
        title: "Formation",
        description: "Programmes de formation sur mesure pour maîtriser les outils numériques, optimiser votre site web et exploiter l'intelligence artificielle, en collaboration avec l'Académie de Nice.",
        speed: 0.8
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)
    return (
        <div className={styles.container}>
            <Titles data={data} setSelectedProject={setSelectedProject}/>
            <Descriptions data={data} selectedProject={selectedProject}/>
        </div>
    )
}