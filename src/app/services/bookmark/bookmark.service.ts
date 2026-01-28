import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { BookmarksService } from '@/app/api/bookmarks.service';
import { Bookmark } from '@/app/interfaces/api/job.models';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private bookmarksService = inject(BookmarksService);

  private bookmarksResource = this.bookmarksService.getBookmarks();

  // Store the last known bookmarks to prevent flickering during refetch
  private lastKnownBookmarks = signal<Bookmark[]>([]);

  // Optimistic updates: track pending bookmark changes
  // Map of jobId -> boolean (true = bookmarked, false = unbookmarked)
  private optimisticBookmarks = signal<Map<string, boolean>>(new Map());

  constructor() {
    effect(() => {
      const resourceValue = this.bookmarksResource.value();
      if (resourceValue !== undefined) {
        this.lastKnownBookmarks.set(resourceValue);

        this.optimisticBookmarks.update(map => {
          const newMap = new Map(map);
          map.forEach((isBookmarked, jobId) => {
            const serverHasBookmark = resourceValue.some(b => b.id === jobId);
            if (isBookmarked === serverHasBookmark) {
              newMap.delete(jobId);
            }
          });
          return newMap;
        });
      }
    });
  }

  readonly bookmarks = computed(() => {
    const resourceValue = this.bookmarksResource.value();
    const optimistic = this.optimisticBookmarks();

    let baseBookmarks = resourceValue ?? this.lastKnownBookmarks();

    if (optimistic.size > 0) {
      const bookmarksMap = new Map(baseBookmarks.map(b => [b.id, b]));

      optimistic.forEach((isBookmarked, jobId) => {
        if (isBookmarked) {
          if (!bookmarksMap.has(jobId)) {
            bookmarksMap.set(jobId, {
              id: jobId,
              createdAt: new Date().toISOString(),
              expiresAt: new Date().toISOString(),
            } as Bookmark);
          }
        } else {
          bookmarksMap.delete(jobId);
        }
      });

      baseBookmarks = Array.from(bookmarksMap.values());
    }

    return baseBookmarks;
  });

  readonly bookmarkIds = computed(() => {
    return this.bookmarks().map(bookmark => bookmark.id);
  });

  toggleBookmark(jobId: string): void {
    const currentState = this.hasBookmark(jobId);
    const newState = !currentState;

    // Optimistically update the state immediately
    this.optimisticBookmarks.update(map => {
      const newMap = new Map(map);
      newMap.set(jobId, newState);
      return newMap;
    });

    if (currentState) {
      this.bookmarksService.unbookmarkJob(jobId).subscribe({
        next: () => {
          // Don't clear optimistic update here - let it persist until the refetch completes
          // The effect will clear it when new data arrives
        },
        error: (error) => {
          this.optimisticBookmarks.update(map => {
            const newMap = new Map(map);
            newMap.delete(jobId);
            return newMap;
          });
          console.error('Error unbookmarking job:', error);
        },
      });
    } else {
      this.bookmarksService.bookmarkJob(jobId).subscribe({
        next: () => {
          // Don't clear optimistic update here - let it persist until the refetch completes
          // The effect will clear it when new data arrives
        },
        error: (error) => {
          // Revert optimistic update on error
          this.optimisticBookmarks.update(map => {
            const newMap = new Map(map);
            newMap.delete(jobId);
            return newMap;
          });
          console.error('Error bookmarking job:', error);
        },
      });
    }
  }

  hasBookmark(jobId: string): boolean {
    const optimistic = this.optimisticBookmarks();
    if (optimistic.has(jobId)) {
      return optimistic.get(jobId)!;
    }

    return this.bookmarksService.isJobBookmarked(this.bookmarks(), jobId);
  }
}

