import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  Inject,
  PLATFORM_ID,
  inject,
  effect,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { gsap } from 'gsap';
import { WikipediaSseService } from '../../services/wikipedia-sse.service';
import { WikipediaEdit } from '../../models/wikipedia.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { PusherService } from '../../services/pusher.service';
import { ActiveUsersService } from '../../services/active-users.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  recentEdits = signal<WikipediaEdit[]>([]);
  private sseSubscription!: Subscription;

  auth = inject(AuthService);
  private router = inject(Router);
  pusherService = inject(PusherService);
  activeUsersService = inject(ActiveUsersService);
  newMessageInput = '';

  constructor(
    private wikiService: WikipediaSseService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    effect(() => {
      const user = this.auth.currentUser(); // Assuming your signal is called currentUser

      // If there is no user, or their role is strictly 'Guest', redirect to home
      if (!user || user.role === 'Guest') {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    // 1. Reveal layout
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        gsap.fromTo(
          '.gsap-reveal',
          { y: 20, opacity: 0, visibility: 'hidden' },
          {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
        );
      }, 100);
    }

    // 2. Connect to Wikipedia SSE
    this.wikiService.connect();
    this.sseSubscription = this.wikiService.edits$.subscribe((newEdit) => {
      this.recentEdits.update((currentEdits) => {
        const updatedList = [newEdit, ...currentEdits];
        return updatedList.slice(0, 5);
      });

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          gsap.fromTo(
            '.edit-card:first-child',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          );
        }, 10);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
    this.wikiService.disconnect();
  }

  sendChatMessage() {
    if (!this.newMessageInput.trim()) return;

    const username = this.auth.currentUser().username;
    const msg = this.newMessageInput;
    this.newMessageInput = '';

    this.pusherService.sendMessage(username, msg).subscribe((response) => {
      this.pusherService.messages.update((msgs) => [...msgs, response]);

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          gsap.fromTo(
            '.chat-message:last-child',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          );
          const container = document.querySelector('.chat-messages');
          if (container) container.scrollTop = container.scrollHeight;
        }, 50);
      }
    });
  }
}
