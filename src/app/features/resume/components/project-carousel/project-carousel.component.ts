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
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div
      class="carousel-container"
      (mouseenter)="pauseAutoMove()"
      (mouseleave)="startAutoMove()"
    >
      <!-- Left Arrow -->
      <button
        mat-mini-fab
        color="primary"
        class="nav-button prev"
        (click)="prev()"
      >
        <mat-icon>chevron_left</mat-icon>
      </button>

      <!-- Carousel Viewport -->
      <div class="carousel-viewport">
        <div class="carousel-track" [style.transform]="trackTransform()">
          @for (project of projects(); track project.id) {
            <div class="carousel-item">
              <mat-card class="card-surface project-card">
                <!-- Image with Fallback Error Handling -->
                <img
                  mat-card-image
                  [src]="project.img"
                  [alt]="project.title"
                  (error)="handleImageError($event)"
                />

                <mat-card-content>
                  <h3 class="text-accent" style="margin-top: 1rem;">
                    {{ project.title }}
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
                    <mat-icon>open_in_new</mat-icon> Ver App
                  </a>
                </mat-card-actions>
              </mat-card>
            </div>
          }
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        mat-mini-fab
        color="primary"
        class="nav-button next"
        (click)="next()"
      >
        <mat-icon>chevron_right</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .carousel-container {
        position: relative;
        width: 100%;
        padding: 0 var(--spacing-6);
        overflow: hidden;
      }
      .carousel-viewport {
        overflow: hidden;
        width: 100%;
      }
      .carousel-track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth GSAP-like easing */
        will-change: transform;
      }
      .carousel-item {
        /* Default to 1 card per view (Mobile) */
        flex: 0 0 100%;
        padding: var(--spacing-2);
      }
      /* Responsive: 2 cards on Tablets */
      @media (min-width: 768px) {
        .carousel-item {
          flex: 0 0 50%;
        }
      }
      /* Responsive: 3 cards on Desktop */
      @media (min-width: 1024px) {
        .carousel-item {
          flex: 0 0 33.333%;
        }
      }

      .project-card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .project-card img {
        height: 200px;
        object-fit: cover;
        border-bottom: 1px solid var(--color-bg-default);
      }
      .card-actions {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        padding: var(--spacing-2) var(--spacing-4);
      }

      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }
      .nav-button.prev {
        left: 0;
      }
      .nav-button.next {
        right: 0;
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
  // Your Portfolio Projects
  projects = signal<Project[]>([
    {
      id: 1,
      title: 'Real-time Dashboard',
      img: '/assets/dashboard-preview.jpg',
      githubUrl: '#',
      deployUrl: '#',
    },
    {
      id: 2,
      title: 'Hydraulic System Tracker',
      img: 'invalid-link-to-test-fallback.jpg',
      githubUrl: '#',
      deployUrl: '#',
    },
    {
      id: 3,
      title: 'E-Cigarette R&D Analyzer',
      img: '/assets/rd-preview.jpg',
      githubUrl: '#',
      deployUrl: '#',
    },
    {
      id: 4,
      title: 'AWS Cloud Deployment',
      img: '/assets/aws-preview.jpg',
      githubUrl: '#',
      deployUrl: '#',
    },
  ]);

  currentIndex = signal(0);
  itemsPerView = signal(1); // Defaults to 1 for mobile
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
    const maxIndex = this.projects().length - this.itemsPerView();
    if (this.currentIndex() < maxIndex) {
      this.currentIndex.update((i) => i + 1);
    } else {
      this.currentIndex.set(0); // Loop back to start
    }
  }

  prev() {
    const maxIndex = this.projects().length - this.itemsPerView();
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    } else {
      this.currentIndex.set(maxIndex); // Loop to end
    }
  }

  private checkBounds() {
    const maxIndex = this.projects().length - this.itemsPerView();
    if (this.currentIndex() > maxIndex) {
      this.currentIndex.set(Math.max(0, maxIndex));
    }
  }

  startAutoMove() {
    if (isPlatformBrowser(this.platformId)) {
      // Auto-move every 3 seconds
      this.autoMoveSub = interval(3000).subscribe(() => this.next());
    }
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
    if (!imgElement.src.includes('default-project.png')) {
      imgElement.src = '/assets/default-project.png';
    }
  }
}
