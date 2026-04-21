import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Experience } from '../../models/experience.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
})
export class ExperienceCardComponent {
  experienceData = input.required<Experience>();
}
