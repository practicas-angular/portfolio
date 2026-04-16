import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {
  // Signals to hold the reactive state for all 3 roles
  activeAdmins = signal<number>(1);
  activeUsers = signal<number>(4);
  activeGuests = signal<number>(12);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Simulate real-time fluctuating traffic every 5 seconds
      interval(5000).subscribe(() => {
        // Randomly increase or decrease the counts slightly, keeping minimum limits
        this.activeAdmins.update(v => Math.max(1, v + (Math.random() > 0.8 ? 1 : (Math.random() > 0.8 ? -1 : 0))));
        this.activeUsers.update(v => Math.max(2, v + (Math.random() > 0.5 ? 1 : -1)));
        this.activeGuests.update(v => Math.max(5, v + (Math.random() > 0.5 ? 2 : -2)));
      });
    }
  }

  // Computed signal for total users
  totalUsers() {
    return this.activeAdmins() + this.activeUsers() + this.activeGuests();
  }
}