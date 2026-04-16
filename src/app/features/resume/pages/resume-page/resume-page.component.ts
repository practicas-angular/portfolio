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
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { EDUCATION_DATA, JOB_EXPERIENCE } from '../../constants/resume.data';
import { MatCardContent, MatCardSubtitle, MatCardTitle, MatCardHeader, MatCard, MatCardModule } from "@angular/material/card";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MatButtonModule } from '@angular/material/button';

gsap.registerPlugin(ScrollTrigger);

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
    MatCard,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `

  <!-- Controles flotantes (Se ocultarán en móviles) -->
    <div class="clutch-controls gsap-reveal">
      <p class="text-muted" style="margin-bottom: 4px; font-size: 12px; font-weight: bold;">MECANISMO</p>
      <div style="display: flex; gap: 8px;">
        <button mat-raised-button color="primary" 
                (click)="toggleClutch(true)" 
                [disabled]="isCoupled()">
          <mat-icon>link</mat-icon> Engranar
        </button>
        <button mat-raised-button color="warn" 
                (click)="toggleClutch(false)" 
                [disabled]="!isCoupled()">
          <mat-icon>link_off</mat-icon> Desengranar
        </button>
      </div>
    </div>

    <div class="resume-page-wrapper" style="position: relative;">

    <div class="mechanical-system">
      <!-- La Cremallera (Rack) -->
      <div class="rack"></div>
      
      <!-- El Engranaje (Gear) -->
      <div class="gear-wrapper" [class.uncoupled]="!isCoupled()">
        <!-- Sustituye la ruta por el nombre real de tu imagen -->
        <img src="/assets/img/gear_rack/gear.png" class="gear-element" alt="Engranaje" />
      </div>
    </div>

    <!-- Contenedor original del currículum (sin el wrapper extra) -->
    <div class="resume-container container" style="padding-top: var(--spacing-8); padding-bottom: var(--spacing-16);">
      
      <section class="gsap-reveal">
        <h1 class="text-primary">José Gabino Muriel Sánchez</h1>
        <h2 class="text-accent">Desarrollador de Software | Ingeniero Mecánico I+D</h2>
        <p>
          Profesional con mentalidad analítica y experiencia internacional en
          Europa. Transicionando de la ingeniería de I+D hacia el desarrollo de
          software, aportando habilidades en resolución de problemas,
          gestión de proyectos y aprendizaje rápido de nuevas tecnologías.
        </p>
      </section>

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

    @media (min-width: 1024px) {
      .resume-content-wrapper {
        padding-left: 140px; 
      }
    }
    
    /* 1. Ocultar los controles y el mecanismo por defecto (para móviles y tablets pequeñas) */
    .clutch-controls, .mechanical-system {
      display: none;
    }

    /* 2. Mostrar el mecanismo SOLO en pantallas grandes donde tienes margen suficiente (> 1200px) */
    @media (min-width: 1450px) {
      
      .clutch-controls {
        display: block; /* Vuelve a mostrar los botones */
        position: fixed;
        bottom: var(--spacing-8);
        right: var(--spacing-8);
        z-index: 50;
        background: var(--color-bg-surface);
        padding: var(--spacing-4);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--color-accent);
      }

      /* Posición absoluta referenciada a la página para usar el margen izquierdo gigante */
      .mechanical-system {
        display: block; /* Vuelve a mostrar el mecanismo */
        position: absolute;
        top: 0;
        left: 0; /* Separación desde el borde de la pantalla */
        width: 150px; /* Espacio para que quepa todo */
        height: 105%;
        z-index: -1; /* Lo mantiene por detrás para que no moleste a los clicks */
        pointer-events: none;
      }

      /* LA CREMALLERA REPETIDA */
      .rack {
        position: absolute;
        top: -40px;
        left: 0;
        width: 40px; /* AJUSTA este valor al grosor de tu imagen de cremallera */
        height: 100%;
        
        /* El truco para repetir la imagen de 1/5 infinitamente: */
        background-image: url('/assets/img/gear_rack/rack.png'); /* Sustituye por tu ruta */
        background-repeat: repeat-y; 
        background-size: 100% auto; /* Asegura que el ancho encaje y el alto mantenga la proporción */
      }

      .gear-wrapper {
        position: sticky;
        top: 10vh;
        left: 36px; /* AJUSTA este valor para que los dientes encajen con los de la cremallera */
        width: 100px;
        height: 100px;
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        will-change: transform;
      }

      .gear-wrapper.uncoupled {
        transform: translateX(100px);
      }

      /* TU IMAGEN DE ENGRANAJE DE 100x100 */
      .gear-element {
        width: 100px;
        height: 100px;
        object-fit: contain; /* Evita que la imagen se deforme */
        will-change: transform;
      }
    }
    `,
  ],
})
export class ResumePageComponent implements AfterViewInit {
  // Reactive state using Angular Signals
  jobExperience = JOB_EXPERIENCE
  educationList = EDUCATION_DATA;

  isCoupled = signal(false);
  private currentRotation = 0;
  private previousScrollY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  toggleClutch(state: boolean) {
    this.isCoupled.set(state);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      [7]

      // Keep your existing GSAP reveal animation
      setTimeout(() => {
        gsap.fromTo('.gsap-reveal',
          { y: 40, opacity: 0, visibility: 'hidden' },
          { y: 0, opacity: 1, visibility: 'visible', duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }, 100);

      ScrollTrigger.create({
        // Remove the 'trigger' property completely. 
        // start: 0 means the absolute top of the page.
        // end: 'max' means the absolute bottom of the scrollable page.
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const scrollY = self.scroll();
          const delta = scrollY - this.previousScrollY;
          this.previousScrollY = scrollY;

          if (this.isCoupled()) {
            // This relationship is already strictly linear! 
            // 1 pixel of scroll = 0.6 degrees of rotation.
            this.currentRotation += delta * 0.6;

            // gsap.set applies it instantly without any easing delays
            gsap.set('.gear-element', { rotation: this.currentRotation });
          }
        }
      });
    }
  }
}
