import {
  Component,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Job, JobSearchFilters, PaginatedResponse } from '../../../interfaces/api/job.models';
import { JobsService } from '@/app/api/jobs.service';
import { CommonModule } from '@angular/common';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-job-list',
  imports: [JobCardComponent, CommonModule],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobList {
  private readonly jobsService = inject(JobsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly limit = 6;
  private lastCursor: string | undefined = undefined;
  private currentSearchFilters: Partial<JobSearchFilters> = {};
  private isNewFilter = true;

  readonly loadMore$ = input<Subject<void>>();
  readonly infinite = input<boolean>();
  readonly filters = input<Partial<JobSearchFilters>>();

  readonly isLoading = output<boolean>();
  readonly jobCount = output<number>();
  private route = inject(ActivatedRoute);
  readonly filterSignal = signal<JobSearchFilters | undefined>({
    limit: this.limit,
    cursor: undefined,
  });

  readonly jobsResource = this.jobsService.getJobsPaginated(this.filterSignal);

  readonly jobsList = linkedSignal<PaginatedResponse<Job> | undefined, Job[]>({
    source: this.jobsResource.value,
    computation: (src, prev) => {
      if (!src) return prev?.value || [];

      this.lastCursor = src.nextCursor ?? undefined;

      // If this is a new filter/search, reset the list
      if (this.isNewFilter) {
        this.isNewFilter = false;
        return src.data;
      }

      // Otherwise append for pagination
      if (prev?.value) {
        return [...prev.value, ...src.data];
      }

      return src.data;
    },
  });

  constructor() {
    effect(() => {
      const response = this.jobsResource.value();
      const jobs = this.jobsList();

      if (response?.totalCount !== undefined) {
        this.jobCount.emit(response.totalCount);
      } else {
        this.jobCount.emit(jobs.length);
      }
    });

    // Emit loading state when resource loading changes
    effect(() => {
      this.isLoading.emit(this.jobsResource.isLoading());
    });

    // Handle load more subscription
    effect(() => {
      const subject = this.loadMore$?.();
      if (!subject) return;

      subject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadMoreJobs());
    });

    // React to filter input changes
    effect(() => {
      const newFilters = this.filters();
      if (newFilters !== undefined) {
        this.applyFilters(newFilters);
      }
    });
  }

  applyFilters(newFilters: Partial<JobSearchFilters>) {
    this.currentSearchFilters = newFilters;
    this.lastCursor = undefined;
    this.isNewFilter = true;
    this.filterSignal.set({
      ...newFilters,
      limit: this.limit,
      cursor: undefined,
    });
  }

  private loadMoreJobs() {
    if (!this.lastCursor || this.jobsResource.isLoading() || !this.hasMoreJobs()) return;

    this.filterSignal.update((current) => ({
      ...current,
      ...this.currentSearchFilters,
      cursor: this.lastCursor,
      limit: this.limit,
    }));
  }

  hasMoreJobs(): boolean {
    return !!this.lastCursor;
  }
}
