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
import { EducationCardComponent } from '../../components/education-card/education-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../../../../core/components/footer/footer.component';

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
    EducationCardComponent,
    TranslatePipe,
    FooterComponent,
  ],
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
})
export class ResumePageComponent implements AfterViewInit {
  // Reactive state using Angular Signals
  jobExperience = JOB_EXPERIENCE;
  educationList = EDUCATION_DATA;
  showExperience = signal(false);
  showEducation = signal(false);

  isCoupled = signal(false);
  private currentRotation = 0;
  private previousScrollY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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
      sessionStorage.setItem('gearCoupled', String(state));
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
      const savedGearState = sessionStorage.getItem('gearCoupled');
      if (savedGearState !== null) {
        this.isCoupled.set(savedGearState === 'true');
      }
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
