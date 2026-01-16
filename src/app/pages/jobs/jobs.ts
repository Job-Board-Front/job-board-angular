import { Component } from '@angular/core';
import { JobList } from '../../components/job-list/job-list';
import { CategoryFilter } from '../../components/category-filter/category-filter';
import { JobSearch } from '../../components/job-search/job-search';

@Component({
  selector: 'app-jobs',
  imports: [JobList, CategoryFilter, JobSearch],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
 filteredJobCount: number = 6;
}
