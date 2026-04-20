import { Project } from '../models/project.interface';
import { Experience } from '../models/experience.interface';
import { Education } from '../models/education.interface';

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'RESUME_PAGE.PROJECTS.1.TITLE',
    description: 'RESUME_PAGE.PROJECTS.1.DESCRIPTION',
    img: '/assets/img/projects/bellochip.jpg',
    githubUrl: 'https://github.com/MurielSG-proyectos-servidor/bellochip',
    deployUrl: 'http://informatica.iesalbarregas.com:7001/bellochip-1.0/',
  },
  {
    id: 2,
    title: 'RESUME_PAGE.PROJECTS.2.TITLE',
    description: 'RESUME_PAGE.PROJECTS.2.DESCRIPTION',
    img: '/assets/img/projects/vesto.jpg',
    githubUrl: 'https://github.com/LaNoviaDePepe/Vesto',
    deployUrl: 'https://vesto-wheat.vercel.app/',
  },
  {
    id: 3,
    title: 'RESUME_PAGE.PROJECTS.3.TITLE',
    description: 'RESUME_PAGE.PROJECTS.3.DESCRIPTION',
    img: '/assets/img/projects/ies-albarregas.jpg',
    githubUrl: 'https://github.com/jgmuriels01/albarregas3D',
    deployUrl: 'https://albarregas3-d.vercel.app/',
  },
  {
    id: 4,
    title: 'RESUME_PAGE.PROJECTS.4.TITLE',
    description: 'RESUME_PAGE.PROJECTS.4.DESCRIPTION',
    img: '/assets/img/projects/extrema-dev.jpg',
    githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/GSAP',
    deployUrl: 'https://jgmuriels01.github.io/front-projects/GSAP/',
  },
  {
    id: 5,
    title: 'RESUME_PAGE.PROJECTS.5.TITLE',
    description: 'RESUME_PAGE.PROJECTS.5.DESCRIPTION',
    img: '/assets/img/projects/tablero-kanban.jpg',
    githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/tablero-kanban',
    deployUrl: 'https://jgmuriels01.github.io/front-projects/tablero-kanban/',
  },
  {
    id: 6,
    title: 'RESUME_PAGE.PROJECTS.6.TITLE',
    description: 'RESUME_PAGE.PROJECTS.6.DESCRIPTION',
    img: '/assets/img/projects/aventura-reino-js.jpg',
    githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/aventura-reino-js',
    deployUrl: 'https://jgmuriels01.github.io/front-projects/aventura-reino-js/',
  },
  {
    id: 7,
    title: 'RESUME_PAGE.PROJECTS.7.TITLE',
    description: 'RESUME_PAGE.PROJECTS.7.DESCRIPTION',
    img: '/assets/img/projects/panel-usuario.jpg',
    githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/panel-usuario',
    deployUrl: 'https://jgmuriels01.github.io/front-projects/panel-usuario/',
  },
  {
    id: 8,
    title: 'RESUME_PAGE.PROJECTS.8.TITLE',
    description: 'RESUME_PAGE.PROJECTS.8.DESCRIPTION',
    img: '/assets/img/projects/gasolineras.jpg',
    githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/gasolineras',
    deployUrl: 'https://jgmuriels01.github.io/front-projects/gasolineras/',
  },
  {
    id: 9,
    title: 'RESUME_PAGE.PROJECTS.9.TITLE',
    description: 'RESUME_PAGE.PROJECTS.9.DESCRIPTION',
    img: '/assets/img/projects/figma.jpg',
    githubUrl: '#',
    deployUrl: 'https://www.figma.com/design/tKqqDKgI7jMtW1YAyvf3OP/Portfolio?m=auto&t=bINoRaJ4uhXkKBfU-6',
  },
  {
    id: 10,
    title: 'RESUME_PAGE.PROJECTS.10.TITLE',
    description: 'RESUME_PAGE.PROJECTS.10.DESCRIPTION',
    img: '/assets/img/projects/gestion-fechas.jpg',
    githubUrl: 'https://github.com/jgmuriels01/front-projects/tree/main/gestion-fechas',
    deployUrl: 'https://jgmuriels01.github.io/front-projects/gestion-fechas/',
  },
];

export const JOB_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: 'RESUME_PAGE.EXPERIENCE.1.ROLE',
    company: 'RESUME_PAGE.EXPERIENCE.1.COMPANY',
    location: 'RESUME_PAGE.EXPERIENCE.1.LOCATION',
    period: 'RESUME_PAGE.EXPERIENCE.1.PERIOD',
    description: 'RESUME_PAGE.EXPERIENCE.1.DESCRIPTION',
  },
  {
    id: 2,
    role: 'RESUME_PAGE.EXPERIENCE.2.ROLE',
    company: 'RESUME_PAGE.EXPERIENCE.2.COMPANY',
    location: 'RESUME_PAGE.EXPERIENCE.2.LOCATION',
    period: 'RESUME_PAGE.EXPERIENCE.2.PERIOD',
    description: 'RESUME_PAGE.EXPERIENCE.2.DESCRIPTION',
  },
  {
    id: 3,
    role: 'RESUME_PAGE.EXPERIENCE.3.ROLE',
    company: 'RESUME_PAGE.EXPERIENCE.3.COMPANY',
    location: 'RESUME_PAGE.EXPERIENCE.3.LOCATION',
    period: 'RESUME_PAGE.EXPERIENCE.3.PERIOD',
    description: 'RESUME_PAGE.EXPERIENCE.3.DESCRIPTION',
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    id: 1,
    degree: 'RESUME_PAGE.EDUCATION.1.DEGREE',
    institution: 'RESUME_PAGE.EDUCATION.1.INSTITUTION',
    location: 'RESUME_PAGE.EDUCATION.1.LOCATION',
    period: 'RESUME_PAGE.EDUCATION.1.PERIOD',
  },
  {
    id: 2,
    degree: 'RESUME_PAGE.EDUCATION.2.DEGREE',
    institution: 'RESUME_PAGE.EDUCATION.2.INSTITUTION',
    location: 'RESUME_PAGE.EDUCATION.2.LOCATION',
    period: 'RESUME_PAGE.EDUCATION.2.PERIOD',
  },
];
