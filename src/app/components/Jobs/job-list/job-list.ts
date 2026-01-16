import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { JobCard } from '../job-card/job-card';
import { Job } from '../../../interfaces/api/job.models';
import { CommonModule } from '@angular/common';
import { JobsService } from '@/app/api/jobs.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { concatMap, map, Observable, of, scan, startWith, Subject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobCard, CommonModule],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css'],
})
export class JobList {
  private http = inject(HttpClient);

  private trigger$ = new Subject<void>(); 
  private allJobs: Job[] = [];
  private page = 0;
  private limit = 6;
  private loading = false;
  @Input() infinite = true; 
  @Output() jobCount = new EventEmitter<number>();

  jobsResource = rxResource<Job[], null>({
    stream: () =>
      this.trigger$.pipe(
        startWith(undefined),
        concatMap(() => {
          if (!this.infinite && this.page > 0) return of([]); 
          if (this.loading) return of([]); 

          this.loading = true;
          this.page++;

          return this.http
            .get<{ jobs: Job[] }>(`https://remotive.com/api/remote-jobs?page=${this.page}&limit=${this.limit}`)
            .pipe(
              tap(() => (this.loading = false)),
              map(res => res.jobs)
            ); 
        }),
        scan((acc, page) => [...acc, ...page], [] as Job[]),
        tap(jobs => this.jobCount.emit(jobs.length))
      ),
    defaultValue: [],
  });


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.infinite || this.loading) return;

    const scrollPosition =
      window.innerHeight + window.scrollY;

    const pageHeight =
      document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - 200) {
      this.trigger$.next();
      console.log('Scrolled near bottom of page, loading more jobs');
    }
  }

}
