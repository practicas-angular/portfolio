import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  Inject,
  PLATFORM_ID,
  inject,
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

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  template: `
    <div class="dashboard-wrapper container">
      <header
        class="gsap-reveal"
        style="margin-bottom: var(--spacing-8); margin-top: var(--spacing-6);"
      >
        <h1>Panel de Datos en Tiempo Real</h1>
        <p class="text-muted">
          Demostración de flujos de datos continuos utilizando Server-Sent
          Events (SSE) y programación reactiva (RxJS).
        </p>
      </header>

      <section
        class="stats-grid gsap-reveal"
        style="margin-bottom: var(--spacing-8);"
      >
        <mat-card class="card-surface stat-card">
          <div class="stat-content">
            <mat-icon color="primary">people</mat-icon>
            <div class="stat-text">
              <h3>{{ activeUsersService.totalUsers() }}</h3>
              <p class="text-muted">Total Conectados</p>
            </div>
          </div>
        </mat-card>

        <mat-card class="card-surface stat-card">
          <div class="stat-content">
            <mat-icon color="accent">admin_panel_settings</mat-icon>
            <div class="stat-text">
              <h3>{{ activeUsersService.activeAdmins() }}</h3>
              <p class="text-muted">Administradores</p>
            </div>
          </div>
        </mat-card>

        <mat-card class="card-surface stat-card">
          <div class="stat-content">
            <mat-icon color="primary">person</mat-icon>
            <div class="stat-text">
              <h3>{{ activeUsersService.activeUsers() }}</h3>
              <p class="text-muted">Usuarios Registrados</p>
            </div>
          </div>
        </mat-card>

        <mat-card class="card-surface stat-card">
          <div class="stat-content">
            <mat-icon>public</mat-icon>
            <div class="stat-text">
              <h3>{{ activeUsersService.activeGuests() }}</h3>
              <p class="text-muted">Invitados</p>
            </div>
          </div>
        </mat-card>
      </section>

      <div class="dashboard-grid">
        <!-- Wikipedia SSE Feed Section -->
        <section class="sse-section">
          <div class="section-header gsap-reveal">
            <h2>
              <mat-icon color="accent">public</mat-icon> Ediciones en Wikipedia
            </h2>
            <p class="text-muted">
              Mostrando los últimos 10 cambios globales en vivo.
            </p>
          </div>

          <div class="feed-container">
            @for (edit of recentEdits(); track edit.id) {
              <mat-card class="card-surface edit-card">
                <mat-card-header>
                  <mat-card-title class="text-accent">{{
                    edit.title
                  }}</mat-card-title>
                  <mat-card-subtitle
                    >Editado por:
                    <strong>{{ edit.user }}</strong></mat-card-subtitle
                  >
                </mat-card-header>
                <mat-card-actions>
                  <a
                    mat-button
                    color="primary"
                    [href]="edit.wikiUrl"
                    target="_blank"
                    >Ver Artículo</a
                  >
                </mat-card-actions>
              </mat-card>
            } @empty {
              <p class="text-muted gsap-reveal">
                Esperando datos en vivo de Wikipedia...
              </p>
            }
          </div>
        </section>

        <!-- WebSocket Guestbook Section -->
        <section class="websocket-section gsap-reveal">
          <div class="section-header">
            <h2>
              <mat-icon color="primary">forum</mat-icon> Libro de Visitas
              (WebSockets)
            </h2>
            <p class="text-muted">
              Chat en tiempo real mediante Pusher. Logueado como:
              <strong>{{ auth.currentUser().username }}</strong>
            </p>
          </div>

          <mat-card class="card-surface chat-container">
            <mat-card-content class="chat-messages">
              @for (msg of pusherService.messages(); track msg.timestamp) {
                <div class="chat-message">
                  <span class="chat-user text-accent">{{ msg.username }}:</span>
                  <span class="chat-text">{{ msg.message }}</span>
                </div>
              } @empty {
                <p
                  class="text-muted"
                  style="text-align: center; margin-top: 1rem;"
                >
                  No hay mensajes. ¡Sé el primero en saludar!
                </p>
              }
            </mat-card-content>

            <mat-card-actions class="chat-input-area">
              <input
                type="text"
                class="chat-input"
                placeholder="Escribe un mensaje..."
                [(ngModel)]="newMessageInput"
                (keyup.enter)="sendChatMessage()"
              />
              <button
                mat-raised-button
                color="accent"
                (click)="sendChatMessage()"
                [disabled]="!newMessageInput.trim()"
              >
                Enviar
              </button>
            </mat-card-actions>
          </mat-card>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-4);
      }
      .stat-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
      }
      .stat-content mat-icon {
        transform: scale(1.5);
      }
      .stat-text h3 {
        margin: 0;
        font-size: var(--text-2xl);
        color: var(--color-primary);
      }
      .stat-text p {
        margin: 0;
        font-size: var(--text-sm);
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--spacing-8);
      }
      @media (min-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      .section-header {
        margin-bottom: var(--spacing-4);
        h2 {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }
      }
      .edit-card {
        margin-bottom: var(--spacing-4);
        border-left: 4px solid var(--color-accent);
      }
      .text-muted {
        color: var(--color-text-muted);
      }
      .text-accent {
        color: var(--color-accent);
        font-weight: var(--weight-bold);
      }

      /* Chat specific styles */
      .chat-container {
        display: flex;
        flex-direction: column;
        height: 400px;
        padding: 0;
      }
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-4);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }
      .chat-message {
        background: var(--color-bg-default);
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: var(--border-radius-md);
        width: fit-content;
        max-width: 80%;
      }
      .chat-user {
        font-weight: var(--weight-bold);
        margin-right: var(--spacing-2);
      }
      .chat-input-area {
        display: flex;
        gap: var(--spacing-2);
        padding: var(--spacing-4);
        border-top: 1px solid var(--color-bg-default);
      }
      .chat-input {
        flex: 1;
        padding: var(--spacing-2) var(--spacing-3);
        border: 1px solid var(--color-text-muted);
        border-radius: var(--border-radius-sm);
        font-family: var(--font-primary);
        outline: none;
      }
      .chat-input:focus {
        border-color: var(--color-accent);
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--spacing-8);
      }
      @media (min-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  recentEdits = signal<WikipediaEdit[]>([]);
  private sseSubscription!: Subscription;

  auth = inject(AuthService);
  pusherService = inject(PusherService);
  activeUsersService = inject(ActiveUsersService);
  newMessageInput = '';

  constructor(
    private wikiService: WikipediaSseService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

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
        return updatedList.slice(0, 10);
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
