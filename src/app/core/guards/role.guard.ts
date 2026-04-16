import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    // Inject the platform ID to check if we are in the browser or on the server
    const platformId = inject(PLATFORM_ID);
    
    // Check the current reactive state
    const user = authService.currentUser();

    if (user && allowedRoles.includes(user.role)) {
      return true; // Access granted
    }

    // Access denied: Redirect to the resume page
    // Ensure the alert ONLY runs in the browser, preventing the SSR crash
    if (isPlatformBrowser(platformId)) {
      alert('Acceso Denegado: Necesitas hacer login para ver el Panel en Vivo.');
    }
    
    return router.createUrlTree(['/']);
  };
};