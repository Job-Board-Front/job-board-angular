import { JobsService } from '@/app/api/jobs.service';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { Job, JobSearchFilters } from '@/app/interfaces/api/job.models';
import { FormatDatePipe } from '@/app/pipes/job-details-pipes/format-date.pipe';
import { GetInitialsPipe } from '@/app/pipes/job-details-pipes/get-initials.pipe';
import { Component, signal, resource, Resource, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule,MapPin, Briefcase, DollarSign, ExternalLink, Bookmark ,ArrowRight} from 'lucide-angular';
import { map } from 'rxjs';


@Component({
  selector: 'app-job-details',
  imports: [LucideAngularModule,FormatDatePipe, GetInitialsPipe,JobCardComponent],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {
  readonly MapPin = MapPin;
  readonly Briefcase = Briefcase;
  readonly DollarSign = DollarSign;
  readonly ExternalLink = ExternalLink;
  readonly Bookmark = Bookmark;
  readonly ArrowRight= ArrowRight;
  logoError = signal(false);
  readMore = signal(false);
  private route = inject(ActivatedRoute);
  private jobService = inject(JobsService);
  private jobId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id') ?? undefined))
  );

  private jobResource = this.jobService.getJobById(this.jobId);

  job = computed(() => this.jobResource.value());

  isLoading = computed(() => this.jobResource.isLoading?.() ?? false);
  error = computed(() => this.jobResource.error?.() ?? undefined);




  constructor() {}

  logoErrorf() {
    this.logoError.set(true);
  }

  toggleReadMore() {
    this.readMore.update(v => !v);
  }

  openJobUrl() {
    //const url = this.job.value()?.url;
    const url= "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    if (url) {
      window.open(url, '_blank'); 
    } else {
      console.warn('Job URL is not defined');
    }
  }

  private similarJobsParams = computed(() => {
    const currentJob = this.job();
    if (!currentJob?.keywords?.[0]) {
      return undefined; 
    }
    
    return {
      filters: {
        search: currentJob.keywords[0], 
      },
      limit: 4 
    };
  });

  private similarJobsResource = this.jobService.getJobsPaginated(this.similarJobsParams);

  //limit to 3
  similarJobs = computed(() => {
    const currentJob = this.job();
    const response = this.similarJobsResource.value();
    
    if (!response?.data || !currentJob) {
      return [];
    }
    
    // Exclude the current job and take first 3
    return response.data
      .filter(j => j.id !== currentJob.id)
      .slice(0, 3);
  });


}
