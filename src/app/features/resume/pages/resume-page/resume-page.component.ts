import {
  Component,
  AfterViewInit,
  signal,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { MatChipsModule } from '@angular/material/chips';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';
import { Experience } from '../../models/resume.interface';
import { ProjectCarouselComponent } from '../../components/project-carousel/project-carousel.component';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [
    CommonModule,
    ExperienceCardComponent,
    MatChipsModule,
    ProjectCarouselComponent,
    MatIcon
],
  template: `
    <div
      class="resume-container container"
      style="padding-top: var(--spacing-8); padding-bottom: var(--spacing-16);"
    >
      <!-- Encabezado Estratégico -->
      <header class="gsap-reveal">
        <h1>José Gabino Muriel Sánchez</h1>
        <h2 class="text-accent">
          Desarrollador de Software | Ingeniero Internacional
        </h2>
        <p>
          Profesional con mentalidad analítica y experiencia internacional en
          Europa. Transicionando de la ingeniería de I+D hacia el desarrollo de
          software, aportando habilidades avanzadas en resolución de problemas,
          gestión de proyectos y aprendizaje rápido de nuevas tecnologías.
        </p>
      </header>

      <!-- Tecnologías y Lenguajes (Foco Principal) -->
      <section class="skills-section gsap-reveal">
        <h3>Stack Tecnológico</h3>

        <h4 class="text-muted">Avanzado</h4>
        <mat-chip-set>
          <mat-chip class="chip-primary">Java</mat-chip>
          <mat-chip class="chip-primary">JavaScript</mat-chip>
          <mat-chip class="chip-primary">MySQL</mat-chip>
          <mat-chip class="chip-primary">Bootstrap</mat-chip>
        </mat-chip-set>

        <h4 class="text-muted" style="margin-top: 1rem;">
          Intermedio / En Desarrollo
        </h4>
        <mat-chip-set>
          <mat-chip color="accent">Angular (Signals, Standalone)</mat-chip>
          <mat-chip>React</mat-chip>
          <mat-chip>Tailwind CSS</mat-chip>
          <mat-chip>Python</mat-chip>
        </mat-chip-set>

        <h4 class="text-muted" style="margin-top: 1rem;">Análisis de Datos</h4>
        <mat-chip-set>
          <mat-chip>PowerBI</mat-chip>
          <mat-chip>Excel Avanzado</mat-chip>
          <mat-chip>Análisis Estadístico</mat-chip>
        </mat-chip-set>
      </section>

      <section
        class="gsap-reveal projects-section"
        style="margin-top: var(--spacing-12); margin-bottom: var(--spacing-12);"
      >
        <div class="section-header" style="margin-bottom: var(--spacing-6);">
          <h2><mat-icon color="accent">code</mat-icon> Proyectos Destacados</h2>
          <p class="text-muted">
            Explora mis aplicaciones y arquitecturas más recientes.
          </p>
        </div>

        <!-- 3. Inject the Carousel Component here -->
        <app-project-carousel></app-project-carousel>
      </section>

      <!-- Experiencia Reframing (Foco en Soft Skills) -->
      <section class="experience-section">
        <h3>Experiencia Internacional y Gestión</h3>

        @for (job of jobExperience(); track job.company + job.period) {
          <app-experience-card [experienceData]="job"></app-experience-card>
        }
      </section>
      <img src="/assets/default-project.png" alt="Tech Stack Visual" />
    </div>
  `,
  styles: [
    `
      .text-muted {
        color: var(--color-text-muted);
      }
      .text-accent {
        color: var(--color-accent);
        font-weight: var(--weight-medium);
      }
      header {
        margin-bottom: var(--spacing-8);
        margin-top: var(--spacing-6);
      }
      .skills-section {
        margin-bottom: var(--spacing-8);
      }
      .experience-section {
        margin-top: var(--spacing-8);
      }
      mat-chip {
        font-family: var(--font-secondary);
      }
    `,
  ],
})
export class ResumePageComponent implements AfterViewInit {
  // Reactive state using Angular Signals
  jobExperience = signal<Experience[]>([
    {
      role: 'Ingeniero de Servicio y Soporte Técnico',
      company: 'Tembo',
      location: 'España y Europa',
      period: 'Agosto 2020 - Septiembre 2023',
      description: [
        'Lideré la gestión de proyectos y el soporte técnico a nivel internacional, resolviendo problemas complejos en tiempo real para clientes en toda Europa.',
        'Desarrollé fuertes habilidades de comunicación transversal y adaptación en entornos multiculturales.',
      ],
    },
    {
      role: 'Ingeniero de Concepto / I+D',
      company: 'Tembo',
      location: 'Kampen, Países Bajos',
      period: 'Septiembre 2018 - Enero 2020',
      description: [
        'Aplicación de análisis de datos y modelado estadístico para optimizar procesos de I+D.',
        'Implementación de Diseño de Experimentos (DOE) y Control de Calidad Interno (IQC), demostrando un enfoque altamente analítico y metódico.',
      ],
    },
  ]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Guard the GSAP animation
    if (isPlatformBrowser(this.platformId)) {
      gsap.fromTo(
        '.gsap-reveal',
        { y: 40, opacity: 0, visibility: 'hidden' },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
      );
    }
  }
}
