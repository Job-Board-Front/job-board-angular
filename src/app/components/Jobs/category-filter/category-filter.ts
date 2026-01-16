import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
export interface Category {
  id: string;
  name: string;
  count?: number;
}
@Component({
  selector: 'app-category-filter',
  imports: [], 
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
})

export class CategoryFilter {
  @Output() filterChange = new EventEmitter<{
    title?: string;
    salary?: string;
    location?: string;
    recent?: string;
  }>();
  // filtre par titre de job
  jobTitles: FilterOption[] = [
    { id: 'developer', name: 'Developer' },
    { id: 'designer', name: 'Designer' },
    { id: 'manager', name: 'Manager' }
  ];

  // filtre par salary
  salaryRanges: FilterOption[] = [
    { id: 'low', name: '<50k' },
    { id: 'medium', name: '50k-100k' },
    { id: 'high', name: '>100k' }
  ];

  // filtre par location
  locations: FilterOption[] = [
    { id: 'remote', name: 'Remote' },
    { id: 'onsite', name: 'Onsite' },
    { id: 'hybrid', name: 'Hybrid' }
  ];

  // filtre par date (recent)
  recentOptions: FilterOption[] = [
    { id: '24h', name: 'Last 24h' },
    { id: '7d', name: 'Last 7 days' },
    { id: '30d', name: 'Last 30 days' }
  ];
   selectOption(type: string, value: string) {
    this.filterChange.emit({ [type]: value });
  }

}
export interface FilterOption {
  id: string;
  name: string;
  active?: boolean;
}