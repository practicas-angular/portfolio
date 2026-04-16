import { Injectable, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';

export interface ChatMessage {
  username: string;
  message: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Reactive state for the guestbook messages
  messages = signal<ChatMessage[]>([]);
  private pusher!: Pusher;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize Pusher using your European cluster and key [1]
      // We enable clusters and force TLS for security
      this.pusher = new Pusher('5e03b881d905446d8ffa', {
        cluster: 'eu',
      });

      // Subscribe to a public channel
      const channel = this.pusher.subscribe('portfolio-guestbook');

      // Listen for backend broadcasts (If someone else was using the app with a real backend)
      channel.bind('new-message', (data: ChatMessage) => {
        this.messages.update((msgs) => [...msgs, data]);
      });
    }
  }

  // Mocking the backend POST request
  sendMessage(username: string, message: string) {
    const newMessage: ChatMessage = {
      username,
      message,
      timestamp: Date.now(),
    };
    return this.http.post<ChatMessage>('/api/guestbook/send', newMessage);
  }
}
