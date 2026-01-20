import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { mockJobs } from '@/app/lib/mock-data';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { BookmarkService } from '@/app/services/bookmark/bookmark.service';

@Component({
  selector: 'app-bookmarked',
  imports: [JobCardComponent, IconComponent],
  templateUrl: './bookmarked.component.html',
  styleUrl: './bookmarked.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkedComponent {
  private bookmarkService = inject(BookmarkService);

  // Computed signal that reactively filters jobs based on bookmarks
  // This automatically updates when bookmarks change in the service
  bookmarkedJobs = computed(() => {
    const bookmarkIds = this.bookmarkService.bookmarkIds();
    const bookmarkSet = new Set(bookmarkIds);
    return mockJobs.filter((job) => bookmarkSet.has(job.id));
  });
}

