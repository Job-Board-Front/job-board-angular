import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { BookmarksService } from '@/app/api/bookmarks.service';
import { JobsService } from '@/app/api/jobs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  imports: [JobCardComponent, IconComponent, CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent {
  private bookmarksService = inject(BookmarksService);
  private jobsService = inject(JobsService);

  private bookmarksResource = this.bookmarksService.getBookmarks();

  private bookmarkJobIdsSignal = computed(() => {
    const bookmarks = this.bookmarksResource.value();
    return bookmarks?.map(bookmark => bookmark.id) ?? [];
  });

  private bookmarksJobsResource = this.jobsService.getJobsByIds(this.bookmarkJobIdsSignal);

  bookmarksJobs = computed(() => {
    return this.bookmarksJobsResource.value() ?? [];
  });

  isLoading = computed(() => this.bookmarksJobsResource.isLoading());
  hasError = computed(() => !!this.bookmarksJobsResource.error());
}

