import {
  Component,
  AfterViewInit,
  signal,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { MatChipsModule } from '@angular/material/chips';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';
import { ProjectCarouselComponent } from '../../components/project-carousel/project-carousel.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { EDUCATION_DATA, JOB_EXPERIENCE } from '../../constants/resume.data';
import {
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
  MatCardHeader,
  MatCard,
  MatCardModule,
} from '@angular/material/card';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MatButtonModule } from '@angular/material/button';
import { EducationCardComponent } from "../../components/education-card/education-card.component";

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
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    EducationCardComponent
],
  template: `
    <div class="resume-page-wrapper" style="position: relative;">
      <!-- Controles flotantes (Se ocultarán en móviles) -->
      <div class="clutch-controls-track">
        <div
          class="clutch-controls gsap-reveal"
          [class.pulse-attention]="!isCoupled()"
        >
          <p
            class="text-muted"
            style="margin-bottom: 4px; font-size: 12px; font-weight: bold;"
          >
            MECANISMO
          </p>
          <div style="display: flex; gap: 8px;">
            <button
              mat-raised-button
              (click)="toggleClutch(true)"
              [disabled]="isCoupled()"
            >
              <mat-icon>link</mat-icon> Engranar
            </button>
            <button
              mat-raised-button
              (click)="toggleClutch(false)"
              [disabled]="!isCoupled()"
            >
              <mat-icon>link_off</mat-icon> Desengranar
            </button>
          </div>
        </div>
      </div>

      <div class="mechanical-system">
        <!-- La Cremallera (Rack) -->
        <div class="rack"></div>

        <!-- El Engranaje (Gear) -->
        <div class="gear-wrapper" [class.uncoupled]="!isCoupled()">
          <!-- Sustituye la ruta por el nombre real de tu imagen -->
          <img
            src="/assets/img/gear_rack/gear.png"
            class="gear-element"
            alt="Engranaje"
          />
        </div>
      </div>

      <!-- Contenedor original del currículum (sin el wrapper extra) -->
      <div
        class="resume-container container"
        style="padding-top: var(--spacing-8); padding-bottom: var(--spacing-16);"
      >
        <section class="gsap-reveal">
          <h1 class="text-primary">José Gabino Muriel Sánchez</h1>
          <div
            style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;"
          >
            <span
              class="text-muted"
              style="display: flex; align-items: center; gap: 4px;"
            >
              <mat-icon inline="true" style="font-size: 10px;">email</mat-icon>
              gabino.muriel.sanchez&#64;gmail.com
            </span>
            <span
              class="text-muted"
              style="display: flex; align-items: center; gap: 4px;"
            >
              <mat-icon inline="true" style="font-size: 10px;">phone</mat-icon>
              +34 669 264 151
            </span>
            <span
              class="text-muted"
              style="display: flex; align-items: center; gap: 4px;"
            >
              <mat-icon inline="true" style="font-size: 10px;"
                >location_on</mat-icon
              >
              Mérida (España)
            </span>
          </div>
          <h2 class="text-accent">
            Desarrollador de Software | Ingeniero Mecánico I+D
          </h2>

          <p>
            Profesional con mentalidad analítica y experiencia internacional en
            Europa. Transicionando de la ingeniería de I+D hacia el desarrollo
            de software, aportando habilidades en resolución de problemas,
            gestión de proyectos y aprendizaje rápido de nuevas tecnologías.
          </p>
        </section>

        <!-- Tecnologías y Lenguajes (Foco Principal) -->
        <section class="skills-section gsap-reveal">
          <h3>Stack Tecnológico</h3>

          <h4 class="text-muted">Avanzado</h4>
          <mat-chip-set>
            <mat-chip>Java</mat-chip>
            <mat-chip>JavaScript</mat-chip>
            <mat-chip>MySQL</mat-chip>
            <mat-chip>Bootstrap</mat-chip>
          </mat-chip-set>

          <h4 class="text-muted" style="margin-top: 1rem;">
            Intermedio / En Desarrollo
          </h4>
          <mat-chip-set>
            <mat-chip>React</mat-chip>
            <mat-chip>Python</mat-chip>
            <mat-chip>Angular</mat-chip>
            <mat-chip>Tailwind CSS</mat-chip>
          </mat-chip-set>

          <h4 class="text-muted" style="margin-top: 1rem;">
            Análisis de Datos
          </h4>
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
            <h2>
              <mat-icon color="accent">code</mat-icon> Proyectos Destacados
            </h2>
            <p class="text-muted">
              Explora mis aplicaciones y arquitecturas más recientes.
            </p>
          </div>

          <app-project-carousel></app-project-carousel>
        </section>

        <!-- SECCIÓN DE EXPERIENCIA -->
        <section
          class="gsap-reveal experience-section"
          style="margin-bottom: var(--spacing-12);"
        >
          <!-- Header Interactivo -->
          <div
            class="section-header interactive-header"
            (click)="toggleExperience()"
          >
            <h2>
              <mat-icon color="accent">work</mat-icon> Experiencia en I+D,
              soporte técnico y gestión de proyectos
            </h2>
            <!-- El icono cambia de flecha hacia abajo a flecha hacia arriba -->
            <mat-icon class="toggle-icon">{{
              showExperience() ? 'expand_less' : 'expand_more'
            }}</mat-icon>
          </div>

          <!-- El contenido solo se renderiza si showExperience() es true -->
          @if (showExperience()) {
            <div class="experience-grid fade-in-dropdown">
              <!-- Tu iteración de tarjetas de experiencia -->
              @for (exp of jobExperience; track exp.role) {
                <app-experience-card
                  [experienceData]="exp"
                ></app-experience-card>
              }
            </div>
          }
        </section>

        <!-- SECCIÓN DE EDUCACIÓN -->
        <section
          class="gsap-reveal education-section"
          style="margin-bottom: var(--spacing-12);"
        >
          <!-- Header Interactivo -->
          <div
            class="section-header interactive-header"
            (click)="toggleEducation()"
          >
            <h2>
              <mat-icon color="accent">school</mat-icon> Educación en ingeniería
              mecánica y automatización industrial
            </h2>
            <mat-icon class="toggle-icon">{{
              showEducation() ? 'expand_less' : 'expand_more'
            }}</mat-icon>
          </div>

          @if (showEducation()) {
            <div class="education-grid fade-in-dropdown">
              @for (e of educationList; track e.degree) {
                <app-education-card [educationData]="e"></app-education-card>
              }
            </div>
          }
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
        margin-top: var(--spacing-6);
      }
      .skills-section {
        margin-top: var(--spacing-12);
      }
      .experience-section {
        margin-top: var(--spacing-16);
      }

      .section-header h2 {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }
      mat-chip {
        font-family: var(--font-secondary);
      }

      .skills-section mat-chip {
        --mdc-chip-label-text-color: var(--color-text-muted);
        --mdc-chip-elevated-container-color: var(--color-bg-surface);
      }

      .skills-section mat-chip:hover {
        --mdc-chip-elevated-container-color: var(--color-bg-surface);
        --mdc-chip-label-text-color: var( --color-primary);
        border-color: var(--color-accent);
      }

      .education-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--spacing-6);
      }
      @media (min-width: 768px) {
        .education-grid {
          grid-template-columns: 1fr 1fr;
        }
        .education-icon {
          position: relative;
          right: 10px;
        }
      }

      .education-card {
        border-left: 4px solid var(--color-accent); /* Adds a nice architectural touch */
        height: 100%;
      }

      .clutch-controls,
      .mechanical-system {
        display: none;
      }

      @media (min-width: 1450px) {
        .clutch-controls-track {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;

          pointer-events: none;
          z-index: 50;
        }

        .clutch-controls {
          display: block;
          position: sticky;

          top: calc(100vh - 120px);

          margin-left: auto;
          margin-right: var(--spacing-8);
          width: max-content;

          pointer-events: auto;

          background: var(--color-bg-surface);
          padding: var(--spacing-4);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          border-left: 4px solid var(--color-accent);
        }

        .clutch-controls .mat-mdc-raised-button[disabled] {
          --mdc-protected-button-disabled-label-text-color: var(
            --color-text-muted
          );

          opacity: 0.7;
        }

        .mechanical-system {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          height: 105%;
          z-index: -1;
          pointer-events: none;
        }

        /* LA CREMALLERA REPETIDA */
        .rack {
          position: absolute;
          top: -46px;
          left: 0;
          width: 30px; /* AJUSTA este valor al grosor de tu imagen de cremallera */
          height: 100%;

          /* El truco para repetir la imagen de 1/5 infinitamente: */
          background-image: url('/assets/img/gear_rack/rack.png'); /* Sustituye por tu ruta */
          background-repeat: repeat-y;
          background-size: 100% auto; /* Asegura que el ancho encaje y el alto mantenga la proporción */
          filter: var(--img-theme-filter);
        }

        .gear-wrapper {
          position: sticky;
          top: 150px;
          left: 15px;
          width: 100px;
          height: 100px;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform;
          filter: var(--img-theme-filter);
        }

        .gear-wrapper.uncoupled {
          transform: translateX(1.4rem);
        }

        /* TU IMAGEN DE ENGRANAJE DE 100x100 */
        .gear-element {
          width: 100px;
          height: 100px;
          object-fit: contain; /* Evita que la imagen se deforme */
          will-change: transform;
        }
      }

      .pulse-attention {
        animation: pulse-ring 1.5s infinite;
      }

      @keyframes pulse-ring {
        0% {
          box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); /* Starts with a tight accent-colored shadow */
        }
        70% {
          box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); /* Expands outward and fades out */
        }
        100% {
          box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
        }
      }

      /* Estilos para que el Header parezca un botón desplegable */
      .interactive-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding-bottom: var(--spacing-2);
        border-bottom: 2px solid transparent;
        transition: border-color var(--transition-fast);
        user-select: none; /* Evita que el texto se seleccione por accidente al hacer clic rápido */
      }

      .interactive-header:hover {
        border-bottom: 2px solid var(--color-accent); /* Subrayado azul al pasar el ratón */
      }

      .interactive-header h2 {
        margin-bottom: 0; /* Anula el margen inferior para alinearse bien con la flecha */
      }

      .toggle-icon {
        color: var(--color-text-muted);
        transform: scale(1.2); /* Hace la flecha un poco más grande */
        transition: color var(--transition-fast);
      }

      .interactive-header:hover .toggle-icon {
        color: var(--color-accent);
      }

      /* Animación suave para cuando el bloque @if inserta el contenido en el DOM */
      .fade-in-dropdown {
        animation: fadeInDown 0.4s ease-out forwards;
        margin-top: var(--spacing-6);
      }

      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class ResumePageComponent implements AfterViewInit {
  // Reactive state using Angular Signals
  jobExperience = JOB_EXPERIENCE;
  educationList = EDUCATION_DATA;
  showExperience = signal(false);
  showEducation = signal(false);

  isCoupled = signal(true);
  private currentRotation = 0;
  private previousScrollY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleExperience() {
    this.showExperience.update((val) => !val);
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50); // 50ms is unnoticeable to the user, but gives Angular time to render the cards
    }
  }

  toggleEducation() {
    this.showEducation.update((val) => !val);
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  }

  toggleClutch(state: boolean) {
    this.isCoupled.set(state);

    if (isPlatformBrowser(this.platformId)) {
      this.checkViewportAndScroll();
    }
  }

  private checkViewportAndScroll() {
    const isDesktop = window.innerWidth >= 1450;

    if (!isDesktop) {
      document.body.style.overflow = 'auto';
    } else {
      if (!this.isCoupled()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkViewportAndScroll();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkViewportAndScroll();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      /* document.body.style.overflow = 'hidden'; */
      // Keep your existing GSAP reveal animation
      setTimeout(() => {
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
            this.currentRotation += delta * 1.147;

            // gsap.set applies it instantly without any easing delays
            gsap.set('.gear-element', { rotation: this.currentRotation });
          }
        },
      });
    }
  }
}
