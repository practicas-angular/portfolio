import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Language = 'es' | 'en' | 'pt';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private http = inject(HttpClient);
  
  // Signals for state management
  currentLang = signal<Language>('es');
  translations = signal<any>({});

  constructor() {
    // Load the default Spanish JSON on initialization
    this.loadTranslations('es');
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: Language) {
    // Fetch the correct JSON file from the public folder
    this.http.get(`/i18n/${lang}.json`).subscribe({
      next: (data) => this.translations.set(data),
      error: (err) => console.error('Failed to load translations', err)
    });
  }
}