import { JobsService } from '@/app/api/jobs.service';
import { JobActionsComponent } from '@/app/components/Jobs/job-details/job-actions/job-actions.component';
import { JobDescriptionComponent } from '@/app/components/Jobs/job-details/job-description/job-description.component';
import { JobDetailHeaderComponent } from '@/app/components/Jobs/job-details/job-detail-header/job-detail-header.component';
import { JobDetailsCardComponent } from '@/app/components/Jobs/job-details/job-details-card/job-details-card.component';
import { JobHeaderComponent } from '@/app/components/Jobs/job-details/job-header/job-header.component';
import { JobSkillsComponent } from '@/app/components/Jobs/job-details/job-skills/job-skills.component';
import { SimilarJobsComponent } from '@/app/components/Jobs/job-details/similar-jobs/similar-jobs.component';
import { JobSearchFilters } from '@/app/interfaces/api/job.models';
import { ChangeDetectionStrategy, DestroyRef, Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { JobKeywordsComponent } from '@/app/components/Jobs/job-details/job-keywords/job-keywords.component';
import { BookmarkService } from '@/app/services/bookmark/bookmark.service';
import { AuthService } from '@/app/services/auth/auth.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    JobDetailHeaderComponent,
    JobHeaderComponent,
    JobDescriptionComponent,
    JobSkillsComponent,
    JobActionsComponent,
    JobDetailsCardComponent,
    SimilarJobsComponent,
    JobKeywordsComponent,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly jobService = inject(JobsService);
  private readonly router = inject(Router);
  private readonly bookmarkService = inject(BookmarkService);
  private readonly destroyRef = inject(DestroyRef);
  protected authService = inject(AuthService);

  private jobId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? undefined)),
  );

  private jobResource = this.jobService.getJobById(this.jobId);

  job = computed(() => this.jobResource.value());
  isLoading = computed(() => this.jobResource.isLoading?.() ?? false);
  error = computed(() => this.jobResource.error?.() ?? undefined);
  isBookmarked = computed(() => this.bookmarkService.hasBookmark(this.jobId()!));

  private similarJobsParams = computed<JobSearchFilters | undefined>(() => {
    const currentJob = this.job();
    if (!currentJob?.keywords || currentJob.keywords.length === 0) {
      return undefined;
    }

    return {
      search: currentJob.keywords.join(' '),
      limit: 7
    };

  });

  private similarJobsResource = this.jobService.getJobsPaginated(this.similarJobsParams);

  similarJobs = computed(() => {
    const currentJob = this.job();
    const response = this.similarJobsResource.value();

    if (!response?.data || !currentJob) {
      return [];
    }

    return response.data
      .filter(j => j.id !== currentJob.id)
      .slice(0, 6);
  });

  onApplyClick() {
    const currentJob = this.job();
    const url = currentJob?.submissionLink;

    if (url) {
      window.open(url, '_blank');
    } else {
      console.warn('Job submission link is not defined');
    }
  }

  onBookmarkClick() {
    const jobId = this.job()?.id;
    console.log('Bookmark clicked for job:', jobId);
    if (jobId) {
      this.bookmarkService.toggleBookmark(jobId);
    }
  }
  onViewSimilarJobs() {
    const currentJob = this.job();
    if (!currentJob?.keywords || currentJob.keywords.length === 0) {
      return;
    }

    this.router.navigate(['/jobs'], {
      queryParams: {
        search: currentJob.keywords.slice(0, 5).join(' '),
      },
    });
  }

  onEditClick() {
    const id = this.jobId();
    if (id) {
      this.router.navigate(['jobs', 'edit', id]);
    }
  }

  onDeleteClick() {
    const job = this.job();
    const id = this.jobId();
    if (!id || !job) return;
    if (!confirm(`Are you sure you want to delete "${job.title}"?`)) return;

    this.jobService
      .deleteJob(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/jobs']),
        error: (err) => {
          console.error('Delete failed:', err);
          alert(err.error?.message ?? err.message ?? 'Failed to delete job');
        },
      });
  }
}
