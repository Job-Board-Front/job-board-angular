import { Job } from '@/app/interfaces/jobs/job.interface';
import { FormatDatePipe } from '@/app/pipes/job-details-pipes/format-date.pipe';
import { GetInitialsPipe } from '@/app/pipes/job-details-pipes/get-initials.pipe';
import { Component, signal, resource, Resource } from '@angular/core';
import { LucideAngularModule,MapPin, Briefcase, DollarSign, ExternalLink, Bookmark ,ArrowRight} from 'lucide-angular';


@Component({
  selector: 'app-job-details',
  imports: [LucideAngularModule,FormatDatePipe, GetInitialsPipe],
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


  job = resource<Job | null, { limit: number }>({
          params: () => ({ limit: 1 }),
          loader: async ({ params, abortSignal, previous }) => {
            const res = await fetch(`https://remotive.com/api/remote-jobs?limit=${params.limit}`, { signal: abortSignal });
            const data = await res.json();
            return data.jobs?.[0] ?? null;
          },
          defaultValue: null
        }
      );


  constructor() {}

  logoErrorf() {
    this.logoError.set(true);
  }

  toggleReadMore() {
    this.readMore.update(v => !v);
  }

  openJobUrl() {
    const url = this.job.value()?.url;
    if (url) {
      window.open(url, '_blank'); // in a new tab
    } else {
      console.warn('Job URL is not defined');
    }
  }

  similarJobs = resource<Job[] | null, { category?: string }>({
    params: () => ({
      category: this.job.value()?.category || this.job.value()?.tags?.[0] 
    }),
    loader: async ({ params, abortSignal }) => {
      if (!params.category) return [];
      const res = await fetch(`https://remotive.com/api/remote-jobs?category=${encodeURIComponent(params.category)}&limit=4`, {
        signal: abortSignal
      });
      const data = await res.json();
      const jobs: Job[] = data.jobs ?? [];
      // exclude the main job
      const filtered = jobs.filter(j => j.id !== this.job.value()?.id);
      // only first 3
      return filtered.slice(0, 3);
    },
    defaultValue: []
  });


}
