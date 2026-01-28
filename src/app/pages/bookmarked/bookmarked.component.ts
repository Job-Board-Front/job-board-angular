import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { BookmarksService } from '@/app/api/bookmarks.service';
import { JobsService } from '@/app/api/jobs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarked',
  imports: [JobCardComponent, IconComponent, CommonModule],
  templateUrl: './bookmarked.component.html',
  styleUrl: './bookmarked.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkedComponent {
  private bookmarksService = inject(BookmarksService);
  private jobsService = inject(JobsService);

  private bookmarksResource = this.bookmarksService.getBookmarks();

  private bookmarkJobIdsSignal = computed(() => {
    const bookmarks = this.bookmarksResource.value();
    return bookmarks?.map(bookmark => bookmark.id) ?? [];
  });

  private bookmarkedJobsResource = this.jobsService.getJobsByIds(this.bookmarkJobIdsSignal);

  bookmarkedJobs = computed(() => {
    return this.bookmarkedJobsResource.value() ?? [];
  });

  isLoading = computed(() => this.bookmarkedJobsResource.isLoading());
  hasError = computed(() => !!this.bookmarkedJobsResource.error());
}

