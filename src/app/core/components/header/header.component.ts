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
import { Router, RouterModule } from '@angular/router'; // Added for routerLink
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
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  auth = inject(AuthService);
  private translate = inject(TranslateService);
  languages = LANGUAGES;
  isBrowserReady = signal<boolean>(false);
  isDarkMode = signal<boolean>(false);
  private dialog = inject(MatDialog);
  private router = inject(Router);

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
      this.snackBar.open(`${type} copied!`, 'Close', {
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

  navHome() {
    this.router.navigate(['/']);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
