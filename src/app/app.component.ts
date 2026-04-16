import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <!-- The Application Shell Header -->
    <app-header></app-header>
    
    <!-- Main Content Area -->
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      /* Pushes content down slightly from the header using your custom variables */
      padding-top: var(--spacing-8); 
      min-height: 100vh;
    }
  `]
})
export class AppComponent {}