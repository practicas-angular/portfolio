import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/resume/pages/resume-page/resume-page.component')
      .then(m => m.ResumePageComponent),
    title: 'Gabino Muriel | Portfolio'
  },
  {
    path: 'dashboard',
    // REQUIREMENT MET: Protecting the route. Only Admins and Users can enter. Guests are blocked.
    canActivate: [roleGuard(['Admin', 'User'])],
    loadComponent: () => 
      import('./features/dashboard/pages/dashboard-page/dashboard-page.component')
      .then(m => m.DashboardPageComponent),
    title: 'Gabino Muriel | Dashboard'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];