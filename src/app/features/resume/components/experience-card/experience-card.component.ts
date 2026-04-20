import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Experience } from '../../models/experience.interface';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="card-surface">
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
        <p>{{ experienceData().description }}</p>
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
      mat-card-content {
        margin-top: var(--spacing-4);
      }
    `,
  ],
})
export class ExperienceCardComponent {
  experienceData = input.required<Experience>();
}
