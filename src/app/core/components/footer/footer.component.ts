import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Adjust this path if your service is located elsewhere
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="footer-container">
      <div class="container footer-content">
        
        <!-- Brand / Identity -->
        <div class="footer-brand">
          <h3>José Gabino Muriel Sánchez</h3>
          <p class="text-muted">Ingeniero Mecánico & Desarrollador Frontend</p>
        </div>

        <!-- Social / Contact Links -->
        <div class="footer-socials">
          <!-- Replace the hrefs with your actual links -->
          <a mat-icon-button href="https://github.com/jgmuriels01" target="_blank" aria-label="GitHub">
            <mat-icon>code</mat-icon> 
          </a>
          <a mat-icon-button href="https://www.linkedin.com/in/jose-gabino-muriel-sanchez-8a1850143" target="_blank" aria-label="LinkedIn">
            <mat-icon>work</mat-icon>
          </a>
          <a mat-icon-button href="mailto:gabino.muriel.sanchez@gmail.com" aria-label="Email">
            <mat-icon>email</mat-icon>
          </a>
        </div>

      </div>
      
      <!-- Copyright & i18n support -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Gabino Muriel. {{ i18n.translations()?.footer_rights || 'Todos los derechos reservados.' }}</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      /* Using your dark inverse background for high contrast */
      background-color: var(--color-bg-inverse); 
      color: var(--color-text-inverse);
      padding-top: var(--spacing-8);
      border-top: 4px solid var(--color-accent);
      margin-top: auto;
    }
    
    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-6);
    }
    
    /* Responsive layout: Side-by-side on tablets and up */
    @media (min-width: 768px) {
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
    
    .footer-brand h3 {
      color: var(--color-text-inverse);
      margin-bottom: var(--spacing-1);
      font-family: var(--font-secondary);
    }
    
    /* Overriding the text-muted variable specifically for the dark footer */
    .text-muted {
      color: #94a3b8; /* A lighter gray that reads well on dark backgrounds */
      margin: 0;
    }
    
    .footer-socials {
      display: flex;
      gap: var(--spacing-2);
    }
    
    .footer-socials a {
      color: var(--color-text-inverse);
      transition: color var(--transition-fast), transform var(--transition-fast);
    }
    
    .footer-socials a:hover {
      color: var(--color-accent);
      transform: translateY(-3px); /* Small GSAP-like hover bounce */
    }
    
    .footer-bottom {
      text-align: center;
      padding: var(--spacing-4);
      background-color: var(--color-primary); /* Deep slate for the bottom strip */
      font-size: var(--text-sm);
      color: #94a3b8;
    }
  `]
})
export class FooterComponent {
  i18n = inject(I18nService);
  currentYear = new Date().getFullYear();
}