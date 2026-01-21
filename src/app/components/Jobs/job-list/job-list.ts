import { Component, EventEmitter, HostListener, inject, input, Input, linkedSignal, output, Output, Signal, signal } from '@angular/core';
import { Job, JobSearchFilters, PaginatedResponse } from '../../../interfaces/api/job.models';
import { CommonModule } from '@angular/common';
import { JobsService } from '@/app/api/jobs.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { concatMap, map, Observable, of, scan, startWith, Subject, switchMap, tap } from 'rxjs';
import {effect} from '@angular/core';
import { JobCardComponent } from '../../shared/job-card/job-card.component';
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css'],
})
export class JobList {
  private JobsService = inject(JobsService);
  private lastCursor: string | undefined = undefined;
  private limit = 6;
  private loading = false;
  infinite = input<boolean>();  
  jobCount = output<number>();

   filterSignal = signal<JobSearchFilters | undefined>({
    limit: this.limit,
    cursor: undefined,
  });

  jobsResource = this.JobsService.getJobsPaginated(this.filterSignal);
  jobsList = linkedSignal<PaginatedResponse<Job> | undefined, Job[]>({
    source: this.jobsResource.value,
    computation: (src, prev) => {
      console.log('JobsList Computation:', src, prev);
      if (!src) return prev?.value || [];
      else if (prev?.value){
          this.lastCursor = src.nextCursor ?? undefined; 
         return [...prev.value, ...src.data]}
      else return src.data;
    },
  });
 private JobCountEffect(): void {
  effect(() => {
    const jobs = this.jobsList();
    this.jobCount.emit(jobs.length);
  });
}

constructor() {
  this.JobCountEffect();
}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log (this.infinite())
    if (!this.infinite() || this.loading || !this.lastCursor) return;

    const scrollPosition =
      window.innerHeight + window.scrollY;

    const pageHeight =
      document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - 200) {
       this.filterSignal.set({
      ...this.filterSignal(),
      cursor: this.lastCursor,
      limit: this.limit,
    });
      console.log('Scrolled near bottom of page, loading more jobs');
    }
  }
}
