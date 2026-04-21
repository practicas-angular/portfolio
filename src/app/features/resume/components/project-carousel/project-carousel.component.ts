import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, interval } from 'rxjs';
import { DEFAULT_IMG_URL } from '../../../../core/constants/core.data';
import { PROJECTS_DATA } from '../../constants/resume.data';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
  ],
  template: `
    <div
      class="carousel-container"
      (mouseenter)="pauseAutoMove()"
      (mouseleave)="startAutoMove()"
    >
      <!-- Left Arrow -->
      <button class="nav-button prev text-accent" (click)="prev()">
        <mat-icon>chevron_left</mat-icon>
      </button>

      <!-- Carousel Viewport -->
      <div class="carousel-viewport">
        <div class="carousel-track" [style.transform]="trackTransform()">
          @for (project of projects; track project.id) {
            <div
              class="carousel-item"
              [style.flex]="'0 0 ' + 100 / itemsPerView() + '%'"
              [style.max-width]="100 / itemsPerView() + '%'"
            >
              <!-- Surface card using your custom CSS variables -->
              <mat-card class="card-surface project-card" appGsapHover>
                <!-- IMPROVEMENT 3: 3D Flip Container -->
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <!-- Front of the image -->
                    <div class="flip-card-front">
                      <img
                        mat-card-image
                        [src]="project.img"
                        [alt]="project.title"
                        (error)="handleImageError($event)"
                      />
                    </div>

                    <!-- Back of the image (Description) -->
                    <div class="flip-card-back">
                      <p>{{ project.description | translate }}</p>
                    </div>
                  </div>
                </div>

                <mat-card-content>
                  <h3 class="text-accent" style="margin-top: 1rem;">
                    {{ project.title | translate }}
                  </h3>
                </mat-card-content>

                <mat-card-actions class="card-actions">
                  <a
                    mat-button
                    [href]="project.githubUrl"
                    target="_blank"
                    class="text-muted"
                  >
                    <mat-icon>code</mat-icon> GitHub
                  </a>
                  <a
                    mat-raised-button
                    color="accent"
                    [href]="project.deployUrl"
                    target="_blank"
                  >
                    <mat-icon>open_in_new</mat-icon> App
                  </a>
                </mat-card-actions>
              </mat-card>
            </div>
          }
        </div>
      </div>

      <!-- Right Arrow -->
      <button class="nav-button next text-accent" (click)="next()">
        <mat-icon>chevron_right</mat-icon>
      </button>

      <div class="carousel-dots">
        @for (project of projects; track project.id; let i = $index) {
          <!-- Only show dots up to the maximum scrollable index -->
          @if (i <= projects.length - itemsPerView()) {
            <div
              class="dot"
              [class.active]="i === currentIndex()"
              (click)="goToSlide(i)"
            ></div>
          }
        }
      </div>
    </div>
  `,
  styles: [
    `
      .carousel-container {
        position: relative;
        width: 100%;
        padding: 0 var(--spacing-12);
        overflow: hidden;
      }
      .carousel-viewport {
        overflow: hidden;
        width: 100%;
      }
      .carousel-track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        will-change: transform;
      }
      .carousel-item {
        padding: var(--spacing-2);
        box-sizing: border-box;
      }

      .carousel-container {
        padding: 0 var(--spacing-12);
      }
      @media (max-width: 768px) {
        .project-card .mat-mdc-card-actions button {
          font-size: var(--text-xs);
          padding: 0 var(--spacing-2);
          letter-spacing: normal;
        }
        .carousel-container {
          padding: 0 var(--spacing-8);
        }
      }

      .project-card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      /* --- 3D FLIP CSS --- */
      .flip-card {
        background-color: transparent;
        height: 200px;
        perspective: 1000px; /* Gives the 3D depth effect */
      }
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      /* Trigger the 360 rotation on hover */
      .project-card:hover .flip-card-inner {
        transform: rotateY(180deg);
      }
      .flip-card-front,
      .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden; /* Hides the back when looking at the front */
        border-bottom: 1px solid var(--color-bg-default);
        border-radius: 20px;
      }
      .flip-card-front img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .flip-card-back {
        background-color: var(
          --color-bg-inverse
        ); /* Dark background for the back */
        color: var(--color-text-inverse); /* White text */
        transform: rotateY(180deg);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-4);
        font-size: var(--text-sm);
      }

      .card-actions {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        padding: var(--spacing-2) var(--spacing-4);
      }

      .nav-button {
        position: absolute;
        top: calc(50% - 20px);
        transform: translateY(-50%);
        z-index: 10;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--transition-fast);
      }
      .nav-button:hover {
        transform: translateY(-50%) scale(1.2);
      } /* Grow slightly on hover */
      .nav-button mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
      }
      .nav-button.prev {
        left: 0;
      }
      .nav-button.next {
        right: 0;
      }

      /* Dot Indicators */
      .carousel-dots {
        display: flex;
        justify-content: center;
        gap: var(--spacing-2);
        margin-top: var(--spacing-4);
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--color-text-muted);
        cursor: pointer;
        transition:
          background-color var(--transition-fast),
          transform var(--transition-fast);
      }
      .dot.active {
        background-color: var(--color-accent);
      }

      .text-muted {
        color: var(--color-text-muted);
      }
      .text-accent {
        color: var(--color-accent);
        font-weight: var(--weight-bold);
      }
    `,
  ],
})
export class ProjectCarouselComponent implements OnInit, OnDestroy {
  defaultImgUrl = DEFAULT_IMG_URL;
  projects = PROJECTS_DATA;

  currentIndex = signal(0);
  itemsPerView = signal(1);
  private autoMoveSub!: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Computed signal to calculate the CSS transform percentage dynamically
  trackTransform = computed(() => {
    const slidePercentage = 100 / this.itemsPerView();
    return `translateX(-${this.currentIndex() * slidePercentage}%)`;
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateItemsPerView();
      this.startAutoMove();
    }
  }

  ngOnDestroy() {
    this.pauseAutoMove();
  }

  // Listen to window resize to adjust how many cards are visible
  @HostListener('window:resize')
  updateItemsPerView() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width >= 1024) this.itemsPerView.set(3);
      else if (width >= 768) this.itemsPerView.set(2);
      else this.itemsPerView.set(1);

      // Prevent index out of bounds when resizing
      this.checkBounds();
    }
  }

  next() {
    const maxIndex = this.projects.length - this.itemsPerView();
    if (this.currentIndex() < maxIndex) {
      this.currentIndex.update((i) => i + 1);
    } else {
      this.currentIndex.set(0); // Loop back to start
    }
  }

  prev() {
    const maxIndex = this.projects.length - this.itemsPerView();
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    } else {
      this.currentIndex.set(maxIndex); // Loop to end
    }
  }

  goToSlide(index: number) {
    const maxIndex = this.projects.length - this.itemsPerView();
    this.currentIndex.set(Math.min(index, Math.max(0, maxIndex)));
  }

  private checkBounds() {
    const maxIndex = this.projects.length - this.itemsPerView();
    if (this.currentIndex() > maxIndex) {
      this.currentIndex.set(Math.max(0, maxIndex));
    }
  }

  startAutoMove() {
    /* if (isPlatformBrowser(this.platformId)) {
      // Auto-move every 3 seconds
      this.autoMoveSub = interval(3000).subscribe(() => this.next());
    } */
  }

  pauseAutoMove() {
    if (this.autoMoveSub) {
      this.autoMoveSub.unsubscribe();
    }
  }

  // If the image link fails, swap the src to the default image location
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;

    // Only change the source if it isn't ALREADY the default image
    if (!imgElement.src.includes(this.defaultImgUrl)) {
      imgElement.src = this.defaultImgUrl;
    }
  }
}
