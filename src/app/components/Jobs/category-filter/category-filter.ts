import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import {
  EmploymentType,
  ExperienceLevel,
  SalaryRange,
  PostedWithin,
} from '@/app/interfaces/api/job.models';

export interface FilterOption {
  id: string;
  name: string;
}

export interface FilterState {
  employmentType?: EmploymentType;
  experienceLevel?: ExperienceLevel;
  location?: string;
  salaryRange?: SalaryRange;
  postedWithin?: PostedWithin;
}

@Component({
  selector: 'app-category-filter',
  imports: [],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilter {
  readonly filterChange = output<FilterState>();
  readonly clearAll = output<void>();

  readonly currentFilters = signal<FilterState>({});

  readonly selectedEmploymentType = signal('');
  readonly selectedExperienceLevel = signal('');
  readonly selectedLocation = signal('');
  readonly selectedSalaryRange = signal('');
  readonly selectedPostedWithin = signal('');

  readonly employmentTypes: FilterOption[] = [
    { id: EmploymentType.FULL_TIME, name: 'Full Time' },
    { id: EmploymentType.PART_TIME, name: 'Part Time' },
    { id: EmploymentType.CONTRACT, name: 'Contract' },
    { id: EmploymentType.INTERNSHIP, name: 'Internship' },
  ];

  readonly experienceLevels: FilterOption[] = [
    { id: ExperienceLevel.JUNIOR, name: 'Junior' },
    { id: ExperienceLevel.MID, name: 'Mid-Level' },
    { id: ExperienceLevel.SENIOR, name: 'Senior' },
  ];

  readonly locations: FilterOption[] = [
    { id: 'remote', name: 'Remote' },
    { id: 'hybrid', name: 'Hybrid' },
    { id: 'on-site', name: 'On-site' },
  ];

  readonly salaryRanges: FilterOption[] = [
    { id: SalaryRange.UNDER_50K, name: 'Under $50k' },
    { id: SalaryRange.FROM_50K_TO_100K, name: '$50k - $100k' },
    { id: SalaryRange.FROM_100K_TO_150K, name: '$100k - $150k' },
    { id: SalaryRange.OVER_150K, name: 'Over $150k' },
  ];

  readonly postedWithinOptions: FilterOption[] = [
    { id: PostedWithin.LAST_24H, name: 'Last 24 hours' },
    { id: PostedWithin.LAST_7D, name: 'Last 7 days' },
    { id: PostedWithin.LAST_30D, name: 'Last 30 days' },
  ];

  onEmploymentTypeChange(value: string) {
    this.selectedEmploymentType.set(value);
    this.updateFilter('employmentType', value as EmploymentType);
  }

  onExperienceLevelChange(value: string) {
    this.selectedExperienceLevel.set(value);
    this.updateFilter('experienceLevel', value as ExperienceLevel);
  }

  onLocationChange(value: string) {
    this.selectedLocation.set(value);
    this.updateFilter('location', value);
  }

  onSalaryRangeChange(value: string) {
    this.selectedSalaryRange.set(value);
    this.updateFilter('salaryRange', value as SalaryRange);
  }

  onPostedWithinChange(value: string) {
    this.selectedPostedWithin.set(value);
    this.updateFilter('postedWithin', value as PostedWithin);
  }

  private updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K] | string) {
    const newFilters = {
      ...this.currentFilters(),
      [key]: value || undefined,
    };
    this.currentFilters.set(newFilters);
    this.filterChange.emit(newFilters);
  }

  clearFilters() {
    this.selectedEmploymentType.set('');
    this.selectedExperienceLevel.set('');
    this.selectedLocation.set('');
    this.selectedSalaryRange.set('');
    this.selectedPostedWithin.set('');
    this.currentFilters.set({});
    this.filterChange.emit({});
    this.clearAll.emit();
  }
}
