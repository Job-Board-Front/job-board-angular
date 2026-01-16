import { Component, signal, resource, Resource } from '@angular/core';
import { LucideAngularModule,MapPin, Briefcase, DollarSign, ExternalLink, Bookmark ,ArrowRight} from 'lucide-angular';
export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string | null;
  candidate_required_location: string;
  job_type: string;
  salary?: string | null;
  category: string;
  publication_date: string;
  description?: string;
  tags?: string[];
  [key: string]: any; // fallback for extra fields from API
}

@Component({
  selector: 'app-job-details',
  imports: [LucideAngularModule],
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


  job = resource<Job | null, { limit: number }>({
  params: () => ({ limit: 1 }),
  loader: async ({ params, abortSignal, previous }) => {
    const res = await fetch(`https://remotive.com/api/remote-jobs?limit=${params.limit}`, { signal: abortSignal });
    const data = await res.json();
    return data.jobs?.[0] ?? null;
  },
  defaultValue: null
});


  constructor() {}

  logoErrorf() {
    this.logoError.set(true);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
readMore = signal(false);

toggleReadMore() {
  this.readMore.update(v => !v);
}

openJobUrl() {
  const url = this.job.value()?.url;
  if (url) {
    window.open(url, '_blank'); // opens in a new tab
  } else {
    console.warn('Job URL is not defined');
  }
}

similarJobs = resource<Job[] | null, { category?: string }>({
  params: () => ({
    category: this.job.value()?.category || this.job.value()?.tags?.[0] // fallback to first tag
  }),
  loader: async ({ params, abortSignal }) => {
    if (!params.category) return [];
    const res = await fetch(`https://remotive.com/api/remote-jobs?category=${encodeURIComponent(params.category)}&limit=10`, {
      signal: abortSignal
    });
    const data = await res.json();
    const jobs: Job[] = data.jobs ?? [];
    // exclude the main job
    const filtered = jobs.filter(j => j.id !== this.job.value()?.id);
    // return only first 3
    return filtered.slice(0, 3);
  },
  defaultValue: []
});


}
