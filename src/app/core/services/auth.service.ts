import { Injectable, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  username: string;
  role: 'Admin' | 'User' | 'Guest';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  currentUser = signal<User>({ username: 'Invitado', role: 'Guest' });
  isLoading = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('portfolio_user');
      if (storedUser) {
        this.currentUser.set(JSON.parse(storedUser));
      }
    }
  }

  signup(username: string, role: 'Admin' | 'User'): Observable<User> {
    this.isLoading.set(true);
    return this.http.post<User>('/api/auth/signup', { username, role }).pipe(
      tap(user => {
        this.currentUser.set(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('portfolio_user', JSON.stringify(user));
        }
        this.isLoading.set(false);
      })
    );
  }

  login(username: string, role: 'Admin' | 'User'): Observable<User> {
    this.isLoading.set(true);
    return this.http.post<User>('/api/auth/login', { username, role }).pipe(
      tap(user => {
        this.currentUser.set(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('portfolio_user', JSON.stringify(user));
        }
        this.isLoading.set(false);
      })
    );
  }

  logout() {
    this.currentUser.set({ username: 'Invitado', role: 'Guest' });
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('portfolio_user');
    }
  }
}