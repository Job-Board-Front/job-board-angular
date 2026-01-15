/*import { Component } from '@angular/core';

@Component({
  selector: 'app-job-details',
  standalone: true,
  templateUrl: './job-details.component.html'
})
export class JobDetailsComponent {}
*/
/*
import { Component, OnInit ,signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
job = signal<any | null>(null);
loading = signal(true);
logoError= signal(false);
error = signal<string | null>(null);


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get('https://remotive.com/api/remote-jobs?limit=3')
    .subscribe({
      next: (data: any) => {
        if (data.jobs?.length) {
          this.job.set(data.jobs[0]);
          console.log(this.job());
        } else {
          this.error.set('No jobs found');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to fetch job data');
        this.loading.set(false);
        console.error(err);
      }
    });
}
logoErrorf(){
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
}*/
import { Component, signal, resource, Resource } from '@angular/core';
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
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent {

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
