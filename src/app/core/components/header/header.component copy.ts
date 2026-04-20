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
      <!-- Title always visible -->
      <span class="portfolio-title">Gabino Muriel | {{ "NAVBAR.PORTFOLIO" | translate}}</span>
      
      <span class="spacer"></span>

      <!-- ========================================= -->
      <!-- DESKTOP NAVIGATION (Hidden < 1450px)      -->
      <!-- ========================================= -->
      <div class="desktop-nav">
        <button mat-button class="nav-button" routerLink="/resume">
          {{ "NAVBAR.EXPERIENCE" | translate }}
        </button>
        <button mat-button class="nav-button" routerLink="/dashboard">
          {{ "NAVBAR.DASHBOARD" | translate }}
        </button>

        <!-- Welcome Message & Role Switcher -->
        @if (auth.currentUser()) {
          <span class="text-inverse" style="margin-right: var(--spacing-4);">
            {{ "NAVBAR.WELCOME" | translate }}, <strong>{{ auth.currentUser()?.username }}</strong>
          </span>
          <button mat-button class="nav-button" [matMenuTriggerFor]="roleMenu">
            <mat-icon>admin_panel_settings</mat-icon>
            {{ "NAVBAR.ROLE" | translate }}: {{ auth.currentUser()?.role }}
          </button>
        }

        <!-- Language Switcher -->
        <button mat-button class="nav-button" [matMenuTriggerFor]="langMenu">
          <mat-icon>language</mat-icon>
          {{ "NAVBAR.LANGUAGE" | translate }}
        </button>

        <!-- RESTORED: Dark Mode Toggle -->
        <button mat-icon-button class="nav-button" (click)="toggleTheme()">
          <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>

        <!-- Auth -->
        @if (auth.currentUser()) {
          <button mat-button class="nav-button" (click)="logout()">
            {{ "COMMON.LOGOUT" | translate }}
          </button>
        } @else {
          <!-- Retains your original .login-button class -->
          <button mat-raised-button class="login-button" (click)="simulateSignup()">
            {{ "COMMON.LOGIN" | translate }}
          </button>
        }
      </div>

      <!-- ========================================= -->
      <!-- MOBILE NAVIGATION (Visible < 1450px)      -->
      <!-- ========================================= -->
      <div class="mobile-nav">
        <button mat-icon-button [matMenuTriggerFor]="mobileMenu" class="nav-button" aria-label="Menu">
          <mat-icon>menu</mat-icon>
        </button>

        <mat-menu #mobileMenu="matMenu">
          <button mat-menu-item routerLink="/resume">
            <mat-icon>work</mat-icon>
            <span>{{ "NAVBAR.EXPERIENCE" | translate }}</span>
          </button>
          <button mat-menu-item routerLink="/dashboard">
            <mat-icon>dashboard</mat-icon>
            <span>{{ "NAVBAR.DASHBOARD" | translate }}</span>
          </button>
          
          <button mat-menu-item [matMenuTriggerFor]="langMenu">
            <mat-icon>language</mat-icon>
            <span>{{ "NAVBAR.LANGUAGE" | translate }}</span>
          </button>
          
          <!-- RESTORED: Dark Mode inside mobile menu -->
          <button mat-menu-item (click)="toggleTheme()">
            <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            <span>Tema</span>
          </button>

          @if (auth.currentUser()) {
            <div style="padding: 8px 16px; outline: none; cursor: default; color: var(--color-text-muted);">
              {{ "NAVBAR.WELCOME" | translate }}, <strong>{{ auth.currentUser()?.username }}</strong>
            </div>
            <button mat-menu-item [matMenuTriggerFor]="roleMenu">
              <mat-icon>admin_panel_settings</mat-icon>
              <span>{{ "NAVBAR.ROLE" | translate }}</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>{{ "COMMON.LOGOUT" | translate }}</span>
            </button>
          } @else {
            <button mat-menu-item (click)="simulateSignup()">
              <mat-icon>login</mat-icon>
              <span>{{ "COMMON.LOGIN" | translate }}</span>
            </button>
          }
        </mat-menu>
      </div>

      <!-- Shared Menus -->
      <mat-menu #langMenu="matMenu">
        <button mat-menu-item (click)="changeLang('es')">Español</button>
        <button mat-menu-item (click)="changeLang('en')">English</button>
        <button mat-menu-item (click)="changeLang('pt')">Português</button>
      </mat-menu>

      <mat-menu #roleMenu="matMenu">
        <!-- Strictly adhering to your loginAs parameters: 'Admin' | 'User' -->
        <button mat-menu-item (click)="loginAs(auth.currentUser()?.username || '', 'Admin')">
          <mat-icon>security</mat-icon>
          <span>{{ "NAVBAR.ROLES.ADMIN" | translate }}</span>
        </button>
        <button mat-menu-item (click)="loginAs(auth.currentUser()?.username || '', 'User')">
          <mat-icon>person</mat-icon>
          <span>{{ "NAVBAR.ROLES.USER" | translate }}</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    `
    /* Your original styles preserved perfectly */
    .spacer { flex: 1 1 auto; }
    .header-toolbar { background-color: var(--color-primary); color: var(--color-text-inverse); }
    .portfolio-title { font-family: var(--font-secondary); font-weight: var(--weight-bold); }
    .nav-button { color: var(--color-text-inverse) !important; transition: color var(--transition-fast); }
    .nav-button:hover { color: var(--color-accent) !important; }
    .login-button { margin-left: var(--spacing-4); background-color: var(--color-accent) !important; color: var(--color-text-inverse) !important; }
    
    /* Responsive layout logic */
    .desktop-nav { 
      display: flex; 
      align-items: center; 
    }
    .mobile-nav { 
      display: none;
    }

    /* 1450px Breakpoint Clutch */
    @media (max-width: 1450px) {
      .desktop-nav { display: none; }
      .mobile-nav { display: block; }
    }
    `
  ]
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
