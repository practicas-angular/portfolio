import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  // Only intercept our mock authentication API routes
  const MOCK_LATENCY = 1500;

  const body = req.body as any;

  if (req.url.startsWith('/api/auth')) {
    if (req.url === '/api/auth/signup' && req.method === 'POST') {
      console.log('Mock Backend: Procesando Registro...', body);
      return of(
        new HttpResponse({
          status: 200,
          body: { username: body.username, role: body.role },
        }),
      ).pipe(delay(MOCK_LATENCY));
    }

    if (req.url === '/api/auth/login' && req.method === 'POST') {
      console.log('Mock Backend: Procesando Login...', body);
      return of(
        new HttpResponse({
          status: 200,
          body: { username: body.username, role: body.role },
        }),
      ).pipe(delay(MOCK_LATENCY));
    }
  } else if (req.url === '/api/guestbook/send' && req.method === 'POST') {
    console.log('Mock Backend: Mensaje de Guestbook interceptado...', body);
    // Simulate a quick network delay, then return the message back to the client
    return of(new HttpResponse({ status: 200, body })).pipe(delay(300));
  }

  return next(req);
};
