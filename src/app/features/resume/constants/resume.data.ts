import { Project } from "../models/project.interface";
import { Experience } from "../models/experience.interface";
import { Education } from "../models/education.interface";

export const PROJECTS_DATA: Project[] = [
    {
        id: 1,
        title: 'Bellochip',
        description: 'Tienda online desarrollada con java y mysql.',
        img: '/assets/img/projects/bellochip.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/MurielSG-proyectos-servidor/bellochip',
        deployUrl: 'http://informatica.iesalbarregas.com:7001/bellochip-1.0/',
    },
    {
        id: 2,
        title: 'Vesto',
        description: 'Proyecto desarrollado junto a 4 compañeros. App web para creación de conjuntos de ropa.',
        img: '/assets/img/projects/vesto.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/LaNoviaDePepe/Vesto',
        deployUrl: 'https://vesto-wheat.vercel.app/',
    },
    {
        id: 3,
        title: 'IES Albarregas',
        description: 'Landing del IES Albarregas utilizando componentes shacdn y un diseño 3D desarrollado en Blender.',
        img: '/assets/img/projects/ies-albarregas.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/jgmuriels01/albarregas3D',
        deployUrl: 'https://albarregas3-d.vercel.app/',
    },
    {
        id: 4,
        title: 'ExtremaDev',
        description: 'Landing de web de programadores extremeños utilizando animaciones GSAP.',
        img: '/assets/img/projects/extrema-dev.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/GSAP',
        deployUrl: 'https://jgmuriels01.github.io/front-projects/GSAP/',
    },
    {
        id: 5,
        title: 'Tablero Kanban',
        description: 'Tablero kanban para gestión de tareas emulando Trello.',
        img: '/assets/img/projects/tablero-kanban.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/tablero-kanban',
        deployUrl: 'https://jgmuriels01.github.io/front-projects/tablero-kanban/',
    },
    {
        id: 6,
        title: 'Aventura en el Reino',
        description: 'Mini juego en js con gestión de escenas en single page con mercado interactivo.',
        img: '/assets/img/projects/aventura-reino-js.jpg',
        githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/aventura-reino-js',
        deployUrl: 'https://jgmuriels01.github.io/front-projects/aventura-reino-js/',
    },
    {
        id: 7,
        title: 'Panel de usuario',
        description: 'Introducción a formularios js con almacenamiento de información en cookies.',
        img: '/assets/img/projects/panel-usuario.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/panel-usuario',
        deployUrl: 'https://jgmuriels01.github.io/front-projects/panel-usuario/',
    },

    {
        id: 8,
        title: 'Búsqueda gasolineras',
        description: 'Buscador de gasolineras por provinvia, municipio, tipo de combustible y horas de apertura comprobando fecha actual.',
        img: '/assets/img/projects/gasolineras.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/gasolineras',
        deployUrl: 'https://jgmuriels01.github.io/front-projects/gasolineras/',
    },

    {
        id: 9,
        title: 'Diseño portfolio',
        description: 'Guía de estilos y diseño de un portfolio personal.',
        img: '/assets/img/projects/figma.jpg', // Used to test your fallback image functionality
        githubUrl: '#',
        deployUrl: 'https://www.figma.com/design/tKqqDKgI7jMtW1YAyvf3OP/Portfolio?m=auto&t=bINoRaJ4uhXkKBfU-6',
    },
    {
        id: 10,
        title: 'Gestión de fechas',
        description: 'Contador de tiempo hasta fecha indicada, remarcando tiempo restante mediante un sistema de colores.',
        img: '/assets/img/projects/gestion-fechas.jpg', // Used to test your fallback image functionality
        githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/gestion-fechas',
        deployUrl: 'https://jgmuriels01.github.io/front-projects/gestion-fechas/',
    },
];

export const JOB_EXPERIENCE: Experience[] = [
    {
        role: 'Ingeniero de Servicio y Soporte Técnico',
        company: 'Tembo',
        location: 'España y Europa',
        period: 'Agosto 2020 - Septiembre 2023',
        description: [
            'Gestión de proyectos y soporte técnico a nivel internacional, resolviendo problemas complejos en tiempo real para clientes en toda Europa.',
            'Desarrollé fuertes habilidades de comunicación transversal y adaptación en entornos multiculturales.',
        ],
    },
    {
        role: 'Ingeniero de Proyectos',
        company: 'Suurmond',
        location: 'Nunspeet, Países Bajos',
        period: 'Febrero 2020 - Julio 2020',
        description: [
            'Gestión de proyectos y diseño técnico.',
            'Soporte de ventas y supervisión de fabicación y ensamblaje.',
        ],
    },
    {
        role: 'Ingeniero de Concepto / I+D',
        company: 'Tembo',
        location: 'Kampen, Países Bajos',
        period: 'Mayo 2017 - Enero 2020',
        description: [
            'Aplicación de análisis de datos y modelado estadístico para optimizar procesos de I+D.',
            'Implementación de Diseño de Experimentos (DOE) y Control de Calidad Interno (IQC), demostrando un enfoque altamente analítico y metódico.',
        ],
    },
]


export const EDUCATION_DATA: Education[] = [
    {
        degree: 'Mecánica Aplicada y Automatización Industrial y Robótica',
        institution: 'Windesheim, Universidad de ciencias aplicadas',
        location: 'Zwolle, Países Bajos',
        period: 'Septiembre 2016 - Julio 2017'
    },
    {
        degree: 'Grado en ingeniería mecánica',
        institution: 'Universidad de Salamanca',
        location: 'Béjar, España',
        period: 'Septiembre 2013 - Julio 2018'
    }
];