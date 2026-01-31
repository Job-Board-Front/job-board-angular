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
  private normalizeLocation(value?: string): string | undefined {
    if (!value) return undefined;
    const v = value.toLowerCase();
    if (v === 'remote') return 'Remote';
    if (v === 'hybrid') return 'Hybrid';
    if (v === 'on-site' || v === 'onsite' || v === 'on site') return 'On-site';
    // Title-case fallback
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  applyFilters(
    newFilters: Partial<JobSearchFilters & { salaryRange?: string; postedWithin?: string }>,
  ) {
    // Build server filters only - match backend API fields
    const serverFilters: Partial<JobSearchFilters> = {
      limit: this.limit,
      cursor: undefined,
    };

    if (newFilters.search !== undefined) serverFilters.search = newFilters.search;
    if (newFilters.employmentType !== undefined)
      serverFilters.employmentType = newFilters.employmentType;
    if (newFilters.experienceLevel !== undefined)
      serverFilters.experienceLevel = newFilters.experienceLevel;
    const normalizedLocation = this.normalizeLocation(newFilters.location as string | undefined);
    if (normalizedLocation) serverFilters.location = normalizedLocation;

    this.currentSearchFilters = serverFilters;
    this.lastCursor = undefined;
    this.isNewFilter = true;
    this.filterSignal.set({
      ...serverFilters,
      limit: this.limit,
      cursor: undefined,
    } as JobSearchFilters);
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
