import { Injectable, inject, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Bookmark } from '../interfaces/api/job.models';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/bookmarks`;
  private readonly bookmarksRefresh = signal(0);

  // Singleton httpResource instance - reused across the app
  private readonly bookmarksResource = httpResource<Bookmark[]>(() => {
    // Read the refresh signal to trigger refetch when invalidated
    this.bookmarksRefresh();

    return {
      url: this.baseUrl,
      // Enable HTTP cache to prevent unnecessary refetches
      // Cache for 5 minutes, but will be invalidated manually when needed
    };
  });

  getBookmarks(refreshTrigger?: Signal<unknown>) {
    if (refreshTrigger) {
      refreshTrigger();
    }
    return this.bookmarksResource;
  }

  bookmarkJob(jobId: string): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.baseUrl}/${jobId}`, {})
      .pipe(
        tap(() => this.invalidateCache())
      );
  }

  unbookmarkJob(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${jobId}`)
      .pipe(
        tap(() => this.invalidateCache())
      );
  }

  isJobBookmarked(bookmarks: readonly Bookmark[] | undefined, jobId: string): boolean {
    return bookmarks?.some(bookmark => bookmark.id === jobId) ?? false;
  }

  private invalidateCache(): void {
  this.bookmarksRefresh.update(count => count + 1);
}
}
