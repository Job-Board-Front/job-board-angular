import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { BookmarkService } from '@/app/services/bookmark/bookmark.service';
import { JobsService } from '@/app/api/jobs.service';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '@/app/components/Jobs/job-card/job-card.component';

@Component({
  selector: 'app-bookmarks',
  imports: [JobCardComponent, IconComponent, CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent {
  private bookmarkService = inject(BookmarkService);
  private jobsService = inject(JobsService);

  /** IDs used for the single initial fetch; set once when we have bookmarks so we never refetch on unbookmark. */
  private initialBookmarkIds = signal<string[]>([]);

  constructor() {
    effect(() => {
      const ids = this.bookmarkService.bookmarks().map(b => b.id);
      if (ids.length > 0 && this.initialBookmarkIds().length === 0) {
        this.initialBookmarkIds.set(ids);
      }
    });
  }

  private bookmarksJobsResource = this.jobsService.getJobsByIds(this.initialBookmarkIds);

  /** Current list: initial jobs filtered by current bookmarks (unbookmark = filter only, no refetch). */
  bookmarksJobs = computed(() => {
    const allJobs = this.bookmarksJobsResource.value() ?? [];
    const currentIds = new Set(this.bookmarkService.bookmarks().map(b => b.id));
    return allJobs.filter(job => currentIds.has(job.id));
  });

  isLoading = computed(() => {
    const hasJobs = this.bookmarksJobs().length > 0;
    return !hasJobs && this.bookmarksJobsResource.isLoading();
  });
  hasError = computed(() => !!this.bookmarksJobsResource.error());
}

