import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { mockBackendInterceptor } from './core/interceptors/mock-backend.interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([mockBackendInterceptor])),
    provideTranslateService({
      defaultLanguage: 'es',

      // 2. EL CARGADOR: Aquí se define dónde están los JSON
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/', // Ruta a la carpeta
        suffix: '.json', // Extensión del archivo
      }),
    }),
  ],
};
