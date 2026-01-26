import { Component, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { JobList } from '../../components/Jobs/job-list/job-list';
import { CategoryFilter, FilterState } from '../../components/Jobs/category-filter/category-filter';
import { JobSearch } from '../../components/Jobs/job-search/job-search';
import { InfiniteScrollDirective } from '@/app/directives/infiniteScroll-directive';
import { JobSearchFilters } from '@/app/interfaces/api/job.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-jobs',
  imports: [JobList, CategoryFilter, JobSearch, InfiniteScrollDirective],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Jobs {
  readonly loadMore$ = new Subject<void>();
  readonly isLoading = signal(false);
  readonly jobCount = signal(0);

  readonly searchQuery = signal<string>('');
  private readonly categoryFilters = signal<FilterState>({});

  readonly filters = computed<Partial<JobSearchFilters>>(() => {
    const search = this.searchQuery();
    const categories = this.categoryFilters();

    return {
      ...(search ? { search } : {}),
      ...(categories.employmentType ? { employmentType: categories.employmentType } : {}),
      ...(categories.experienceLevel ? { experienceLevel: categories.experienceLevel } : {}),
      ...(categories.location ? { location: categories.location } : {}),
      ...(categories.salaryRange ? { salaryRange: categories.salaryRange } : {}),
      ...(categories.postedWithin ? { postedWithin: categories.postedWithin } : {}),
    };
  });

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onFilterChange(filters: FilterState) {
    this.categoryFilters.set(filters);
  }

  onClearAll() {
    this.searchQuery.set('');
  }

  onJobCountChange(count: number) {
    this.jobCount.set(count);
  }

  onLoadingChange(loading: boolean, scrollDir: InfiniteScrollDirective) {
    this.isLoading.set(loading);
    scrollDir.setLoading(loading);
  }

  onScrollBottom() {
    if (!this.isLoading()) {
      this.loadMore$.next();
    }
  }
}
