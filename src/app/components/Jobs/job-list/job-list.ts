import { Component, DestroyRef, EventEmitter, HostListener, inject, input, Input, linkedSignal, output, Output, Signal, signal } from '@angular/core';
import { Job, JobSearchFilters, PaginatedResponse } from '../../../interfaces/api/job.models';
import { CommonModule } from '@angular/common';
import { JobsService } from '@/app/api/jobs.service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatMap, map, Observable, of, scan, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
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
  loadMore$ = input<Subject<void>>();
  isLoading = output<boolean>();
  infinite = input<boolean>();  
  jobCount = output<number>();
  private destroyRef = inject(DestroyRef);

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


    constructor() {
    effect(() => {
        const jobs = this.jobsList();
        this.jobCount.emit(jobs.length);
      });
   effect(() => {
    const subject = this.loadMore$?.(); 
    if (!subject) return;

    subject
      .pipe(takeUntilDestroyed(this.destroyRef)) 
      .subscribe(() => this.loadMoreJobs());
  });
    }
    private loadMoreJobs() {
     if (!this.lastCursor || this.jobsResource.isLoading()|| !this.hasMoreJobs()) return;

      this.filterSignal.update(current => ({
        ...current,
        cursor: this.lastCursor,
        limit: this.limit,
      }));

      
      console.log('Loading more jobs with cursor:', this.lastCursor);
    }

    hasMoreJobs(): boolean {
      return !!this.lastCursor;
    }


}
