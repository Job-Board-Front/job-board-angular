import { JobsService } from '@/app/api/jobs.service';
import { JobActionsComponent } from '@/app/components/Jobs/job-details/job-actions/job-actions.component';
import { JobDescriptionComponent } from '@/app/components/Jobs/job-details/job-description/job-description.component';
import { JobDetailHeaderComponent } from '@/app/components/Jobs/job-details/job-detail-header/job-detail-header.component';
import { JobDetailsCardComponent } from '@/app/components/Jobs/job-details/job-details-card/job-details-card.component';
import { JobHeaderComponent } from '@/app/components/Jobs/job-details/job-header/job-header.component';
import { JobSkillsComponent } from '@/app/components/Jobs/job-details/job-skills/job-skills.component';
import { SimilarJobsComponent } from '@/app/components/Jobs/job-details/similar-jobs/similar-jobs.component';
import { JobSearchFilters } from '@/app/interfaces/api/job.models';
import { Job } from '@/app/interfaces/api/job.models';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { JobKeywordsComponent } from '@/app/components/Jobs/job-details/job-keywords/job-keywords.component';
import { BookmarkService } from '@/app/services/bookmark/bookmark.service';

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
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobsService);
  private router = inject(Router);
  private bookmarkService = inject(BookmarkService);

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
/*
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
  }*/
}
