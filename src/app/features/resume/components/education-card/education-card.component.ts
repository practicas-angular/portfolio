import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Education } from '../../models/education.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [MatCardModule, MatIcon, TranslatePipe],
  template: `
    <mat-card class="card-surface education-card">
      <mat-card-header>
        <div mat-card-avatar>
          <mat-icon
            class="education-icon"
            color="primary"
            style="transform: scale(1.5); margin-top: 8px;"
            >account_balance</mat-icon
          >
        </div>
        <mat-card-title class="text-primary" style="margin-bottom: 4px;">{{ educationData().degree | translate }}</mat-card-title>
        <mat-card-subtitle class="text-accent">{{
          educationData().institution | translate
        }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content style="margin-left: 2rem;">
        <p class="text-muted" style="margin: 0;">
          <mat-icon
            inline="true"
            style="vertical-align: middle; font-size: 16px;"
            >location_on</mat-icon
          >
          {{ educationData().location | translate}}
        </p>
        <p class="text-muted" style="margin: 0;">
          <mat-icon
            inline="true"
            style="vertical-align: middle; font-size: 16px;"
            >calendar_today</mat-icon
          >
          {{ educationData().period | translate}}
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin-bottom: var(--spacing-6);
        border-left: 4px solid var(--color-accent); /* Adds a nice architectural touch */
        height: 100%;
      }

      mat-card-title {
        font-weight: var(--weight-bold);
      }

      mat-card-content {
        margin-top: var(--spacing-4);
      }
    `,
  ],
})
export class EducationCardComponent {
  educationData = input.required<Education>();
}
