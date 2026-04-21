import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from "./core/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `

    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
  app-header{
    position: sticky;
    top: 0px;
    z-index: 1000;
  }
    main {
      padding-top: var(--spacing-8); 
      min-height: 100vh;
    }
  `]
})
export class AppComponent { }