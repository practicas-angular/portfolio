import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { WikipediaEdit } from '../models/wikipedia.interface';
import { throttleTime } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class WikipediaSseService {
  private eventSource!: EventSource;
  private editsSubject = new Subject<WikipediaEdit>();
  
  public edits$: Observable<WikipediaEdit> = this.editsSubject.asObservable().pipe(
    throttleTime(2000) 
  );

  constructor(
    private zone: NgZone, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  connect(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.eventSource = new EventSource('https://stream.wikimedia.org/v2/stream/recentchange');

      this.eventSource.onmessage = (event) => {
        this.zone.run(() => {
          const data = JSON.parse(event.data);
          
          if (data.type === 'edit') {
            const edit: WikipediaEdit = {
              id: data.meta.id,
              user: data.user,
              title: data.title,
              serverUrl: data.server_url,
              wikiUrl: `${data.server_url}/wiki/${encodeURIComponent(data.title)}`,
              timestamp: data.meta.dt
            };
            
            this.editsSubject.next(edit);
          }
        });
      };

      this.eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        this.disconnect();
      };
    }
  }

  disconnect(): void {
    if (isPlatformBrowser(this.platformId) && this.eventSource) {
      this.eventSource.close();
    }
  }
}