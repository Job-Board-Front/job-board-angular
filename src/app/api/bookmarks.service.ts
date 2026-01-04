import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bookmark } from '../interfaces/api/job.models';


@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/bookmarks`;


  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl);
  }

 
  bookmarkJob(jobId: string): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.baseUrl}/${jobId}`, {});
  }


  unbookmarkJob(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${jobId}`);
  }


  isJobBookmarked(bookmarks: readonly Bookmark[], jobId: string): boolean {
    return bookmarks.some(bookmark => bookmark.jobId === jobId);
  }
}