import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Experience } from '../../models/resume.interface';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="card-surface gsap-reveal">
      <mat-card-header>
        <mat-card-title
          >{{ experienceData().role }} -
          {{ experienceData().company }}</mat-card-title
        >
        <mat-card-subtitle
          >{{ experienceData().period }} |
          {{ experienceData().location }}</mat-card-subtitle
        >
      </mat-card-header>
      <mat-card-content>
        <!-- Using modern Angular Control Flow syntax to loop through descriptions -->
        @for (desc of experienceData().description; track $index) {
          <p>{{ desc }}</p>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin-bottom: var(--spacing-6);
        border-radius: var(--border-radius-md);
      }
      mat-card-title {
        color: var(--color-primary);
        font-weight: var(--weight-bold);
      }
    `,
  ],
})
export class ExperienceCardComponent {
  // Advanced Angular: Using required Signal inputs
  experienceData = input.required<Experience>();
}
