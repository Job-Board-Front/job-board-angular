import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'bookmarks';

  private _bookmarkIds = signal<Set<string>>(new Set());

  readonly bookmarkIds = computed(() => Array.from(this._bookmarkIds()));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();

      // Sync with localStorage changes from other tabs
      window.addEventListener('storage', (e) => {
        if (e.key === this.STORAGE_KEY) {
          this.loadFromStorage();
        }
      });

      effect(() => {
        const ids = this._bookmarkIds();
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(ids)));
        }
      });
    }
  }

  private loadFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const bookmarkArray = stored ? JSON.parse(stored) : [];
      this._bookmarkIds.set(new Set(bookmarkArray));
    } catch (error) {
      console.error('Error loading bookmarks from storage:', error);
      this._bookmarkIds.set(new Set());
    }
  }

  toggleBookmark(jobId: string): boolean {
    const wasBookmarked = this._bookmarkIds().has(jobId);
    
    this._bookmarkIds.update((ids) => {
      const newIds = new Set(ids);
      if (wasBookmarked) {
        newIds.delete(jobId);
      } else {
        newIds.add(jobId);
      }
      return newIds;
    });
    
    return !wasBookmarked;
  }

  hasBookmark(jobId: string): boolean {
    return this._bookmarkIds().has(jobId);
  }
}

