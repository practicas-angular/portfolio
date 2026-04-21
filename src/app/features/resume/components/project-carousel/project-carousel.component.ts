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
  templateUrl: './project-carousel.component.html',
  styleUrls: ['./project-carousel.component.scss'],
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
