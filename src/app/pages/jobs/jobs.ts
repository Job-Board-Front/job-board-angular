import { Component, signal } from '@angular/core';
import { JobList } from '../../components/Jobs/job-list/job-list';
import { CategoryFilter } from '../../components/Jobs/category-filter/category-filter';
import { JobSearch } from '../../components/Jobs/job-search/job-search';
import { InfiniteScrollDirective } from '@/app/directives/infiniteScroll-directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-jobs',
  imports: [JobList, CategoryFilter, JobSearch, InfiniteScrollDirective],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  loadMore$ = new Subject<void>();
  isLoading = signal(false);
  jobCount = signal(0);

  onJobCountChange(count: number) {
    this.jobCount.set(count);
    console.log('Total jobs loaded:', count);
  }
   onLoadingChange(loading: boolean, scrollDir: InfiniteScrollDirective) {
    this.isLoading.set(loading);
    scrollDir.setLoading(loading);
  }
  onScrollBottom() {
    if (!this.isLoading() ) {
      this.loadMore$.next();
    }
  }
}
