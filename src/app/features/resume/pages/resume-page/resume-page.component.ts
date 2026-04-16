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
import { Experience } from '../../models/experience.interface';
import { ProjectCarouselComponent } from '../../components/project-carousel/project-carousel.component';
import { MatIcon } from "@angular/material/icon";
import { EDUCATION_DATA, JOB_EXPERIENCE } from '../../constants/resume.data';
import { MatCardContent, MatCardSubtitle, MatCardTitle, MatCardHeader, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [
    CommonModule,
    ExperienceCardComponent,
    MatChipsModule,
    ProjectCarouselComponent,
    MatIcon,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard
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
          Desarrollador de Software | Ingeniero mecánico I+D
        </h2>
        <p>
          Profesional con mentalidad analítica y experiencia internacional en
          Europa. Transicionando de la ingeniería de I+D hacia el desarrollo de
          software, aportando habilidades en resolución de problemas,
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
          <mat-chip>React</mat-chip>
          <mat-chip>Python</mat-chip>
          <mat-chip color="accent">Angular</mat-chip>
          <mat-chip>Tailwind CSS</mat-chip>
        </mat-chip-set>

        <h4 class="text-muted" style="margin-top: 1rem;">Análisis de Datos</h4>
        <mat-chip-set>
          <mat-chip>PowerBI</mat-chip>
          <mat-chip>Excel</mat-chip>
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
      <section class="experience-section gsap-reveal">
        <h2><mat-icon color="accent">work</mat-icon> Experiencia en I+D, soporte técnico y gestión</h2>

        @for (job of jobExperience; track job.company + job.period) {
          <app-experience-card [experienceData]="job"></app-experience-card>
        }
      </section>

      <section class="gsap-reveal education-section" style="margin-bottom: var(--spacing-12);">
        <div class="section-header" style="margin-bottom: var(--spacing-6);">
          <h2><mat-icon color="accent">school</mat-icon> Educación</h2>
        </div>
        
        <div class="education-grid">
          @for (edu of educationList; track edu.degree) {
            <mat-card class="card-surface education-card">
              <mat-card-header>
                <div mat-card-avatar>
                  <mat-icon class="education-icon" color="primary" style="transform: scale(1.5); margin-top: 8px;">account_balance</mat-icon>
                </div>
                <mat-card-title class="text-primary" style="margin-bottom: 4px;">{{ edu.degree }}</mat-card-title>
                <mat-card-subtitle class="text-accent">{{ edu.institution }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content style="margin-top: 1rem; margin-left: 2rem;">
                <p class="text-muted" style="margin: 0;">
                  <mat-icon inline="true" style="vertical-align: middle; font-size: 16px;">location_on</mat-icon> {{ edu.location }}
                </p>
                <p class="text-muted" style="margin: 0;">
                  <mat-icon inline="true" style="vertical-align: middle; font-size: 16px;">calendar_today</mat-icon> {{ edu.period }}
                </p>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </section>
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
      .section-header h2 {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }
      mat-chip {
        font-family: var(--font-secondary);
      }

      .education-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-6);
    }
    @media (min-width: 768px) {
      .education-grid { grid-template-columns: 1fr 1fr; }
      .education-icon{ 
        position: relative;
        right: 10px;
      }
    }
    
    .education-card {
      border-left: 4px solid var(--color-accent); /* Adds a nice architectural touch */
      height: 100%;
    }
    `,
  ],
})
export class ResumePageComponent implements AfterViewInit {
  // Reactive state using Angular Signals
  jobExperience = JOB_EXPERIENCE
  educationList = EDUCATION_DATA;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      // Add a small 100ms delay to ensure Angular SSR hydration is 100% complete
      setTimeout(() => {
        gsap.fromTo('.gsap-reveal',
          { y: 40, opacity: 0, visibility: 'hidden' },
          {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          }
        );
      }, 100);

    }
  }
}
