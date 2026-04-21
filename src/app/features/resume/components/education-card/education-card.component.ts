import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Education } from '../../models/education.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [MatCardModule, MatIcon, TranslatePipe],
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss'],
})
export class EducationCardComponent {
  educationData = input.required<Education>();
}
