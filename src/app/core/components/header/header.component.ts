import {
  Component,
  inject,
  signal,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router'; // Added for routerLink
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignupDialogComponent } from '../../../features/auth/components/signup-dialog/signup-dialog.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LANGUAGES } from '../../constants/core.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    TranslateModule
  ],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <span class="portfolio-title"
        >Gabino Muriel | {{ "NAVBAR.PORTFOLIO" | translate}}</span
      >
      <span class="spacer"></span>

      <button mat-button [matMenuTriggerFor]="contactMenu" class="nav-button">
        <mat-icon>contact_mail</mat-icon> Contacto
      </button>
      <mat-menu #contactMenu="matMenu">
        <button
          mat-menu-item
          (click)="copyToClipboard('gabino.muriel.sanchez@gmail.com', 'Email')"
        >
          <mat-icon>email</mat-icon> gabino.muriel.sanchez&#64;gmail.com
        </button>
        <button
          mat-menu-item
          (click)="copyToClipboard('+34 669 264 151', 'Teléfono')"
        >
          <mat-icon>phone</mat-icon> +34 669 264 151
        </button>
      </mat-menu>
      <button mat-button class="nav-button" routerLink="/">
        {{ "NAVBAR.EXPERIENCE" | translate}}
      </button>
      @if (isBrowserReady()) {
        @if (auth.currentUser().role !== 'Guest') {
          <button mat-button class="nav-button" routerLink="/dashboard">
            {{ "NAVBAR.DASHBOARD" | translate}}
          </button>
        }
      }

      <button mat-button class="nav-button" [matMenuTriggerFor]="roleMenu">
        <mat-icon>security</mat-icon>
        {{ "NAVBAR.ROLE" | translate}}: {{ auth.currentUser().role }}
      </button>
      <mat-menu #roleMenu="matMenu">
        <button mat-menu-item (click)="loginAs('Gabino (Admin)', 'Admin')">
          {{ "NAVBAR.ROLES.ADMIN" | translate}}
        </button>
        <button mat-menu-item (click)="loginAs('Reclutador', 'User')">
          {{ "NAVBAR.ROLES.USER" | translate}}
        </button>
        <button mat-menu-item (click)="logout()">{{ "NAVBAR.ROLES.GUEST" | translate}} ({{ "COMMON.LOGOUT" | translate}})</button>
      </mat-menu>

      <button mat-button class="nav-button" [matMenuTriggerFor]="langMenu">
        <mat-icon>language</mat-icon>
        {{ "NAVBAR.LANGUAGE" | translate}}
      </button>
      <mat-menu #langMenu="matMenu">
        <button mat-menu-item (click)="changeLang('es')">{{ "NAVBAR.LANGUAGES.SPANISH" | translate}}</button>
        <button mat-menu-item (click)="changeLang('en')">{{ "NAVBAR.LANGUAGES.ENGLISH" | translate}}</button>
        <button mat-menu-item (click)="changeLang('pt')">{{ "NAVBAR.LANGUAGES.PORTUGUESE" | translate}}</button>
      </mat-menu>

      <button
        mat-icon-button
        (click)="toggleTheme()"
        matTooltip="Alternar Tema"
        class="nav-button"
      >
        <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>

      @if (isBrowserReady()) {
        @if (auth.currentUser().role === 'Guest') {
          <button
            mat-raised-button
            class="login-button"
            [disabled]="auth.isLoading()"
            (click)="simulateSignup()"
          >
            {{ auth.isLoading() ? ("COMMON.LOADING" | translate) : ("COMMON.SIGNUP" | translate) }}
          </button>
        } @else {
          <span style="margin-left: 1rem; color: var(--color-accent);">
            {{ "NAVBAR.WELCOME" | translate}}, {{ auth.currentUser().username }}
          </span>
          <button
            mat-raised-button
            color="warn"
            class="logout-button"
            style="margin-left: 1rem;"
            (click)="logout()"
          >
            {{ "COMMON.EXIT" | translate}}
          </button>
        }
      }
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .header-toolbar {
        background-color: var(--color-primary);
        color: var(--color-text-inverse);
      }
      .portfolio-title {
        font-family: var(--font-secondary);
        font-weight: var(--weight-bold);
      }
      .nav-button {
        color: var(--color-text-inverse) !important;
        transition: color var(--transition-fast);
      }
      .nav-button:hover {
        color: var(--color-accent) !important;
      }
      .login-button {
        margin-left: var(--spacing-4);
        background-color: var(--color-accent) !important;
        color: var(--color-text-inverse) !important;
      }
    `,
  ],
})
export class HeaderComponent {
  auth = inject(AuthService);
  private translate = inject(TranslateService);
  languages = LANGUAGES
  isBrowserReady = signal<boolean>(false);
  isDarkMode = signal<boolean>(false);
  private dialog = inject(MatDialog);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
    // Only set this to true when the browser has taken over
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowserReady.set(true);
    }
  }

  loginAs(username: string, role: 'Admin' | 'User') {
    // This now triggers the mock login API, waits 1.5s, and updates the UI automatically
    this.auth.login(username, role).subscribe({
      next: (res) =>
        console.log(
          `Suscripción completada, sesión iniciada como ${role}:`,
          res,
        ),
      error: (err) => console.error('Error de login', err),
    });
  }

  logout() {
    this.auth.logout();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  simulateSignup() {
    // We mock a signup using the prompt API for quick username collection,
    // though in a real app this would be a reactive form.
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '350px',
      autoFocus: 'first-tabbable',
    });

    // Call the auth service which hits our mock interceptor
    dialogRef.afterClosed().subscribe((username: string | undefined) => {
      // If the user clicked "Entrar" and returned a username, call the Auth API
      if (username) {
        this.auth.signup(username, 'User').subscribe({
          next: (res) =>
            console.log('Suscripción completada, usuario logueado:', res),
          error: (err) => console.error('Error de login', err),
        });
      }
    });
  }

  snackBar = inject(MatSnackBar);
  copyToClipboard(text: string, type: string) {
    navigator.clipboard.writeText(text).then(() => {
      // Shows a sleek notification for 3 seconds
      this.snackBar.open(`${type} copiado al portapapeles!`, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.update((dark) => !dark);
      if (this.isDarkMode()) {
        document.body.setAttribute('data-theme', 'dark');
      } else {
        document.body.removeAttribute('data-theme');
      }
    }
  }
}
