import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import {
  EmploymentType,
  ExperienceLevel,
  SalaryRange,
  PostedWithin,
} from '@/app/interfaces/api/job.models';
import { ButtonComponent } from '../../shared/button/button.component';
import { JobsService } from '@/app/api/jobs.service';
import { DropDownMenuComponent } from '../../shared/drop-down-menu/drop-down-menu.component';

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
  imports: [ButtonComponent, DropDownMenuComponent],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilter {
  readonly filterChange = output<FilterState>();
  readonly clearAll = output<void>();

  jobsService = inject(JobsService);

  filtersData = this.jobsService.getFiltersData();
  readonly currentFilters = signal<FilterState>({});

  readonly selectedEmploymentType = signal<EmploymentType>(EmploymentType.ALL);
  readonly selectedExperienceLevel = signal<ExperienceLevel>(ExperienceLevel.ALL);
  readonly selectedLocation = signal<string>('');
  readonly selectedSalaryRange = signal<SalaryRange>(SalaryRange.ALL);
  readonly selectedPostedWithin = signal<PostedWithin>(PostedWithin.ALL);

  readonly employmentTypes = this.filtersData.value()?.employmentTypes;

  experienceLevels = computed(() => this.filtersData.value()?.experienceLevels);

  locations = computed(() => this.filtersData.value()?.locations);

  readonly salaryRanges: string[] = ['Under $50k', '$50k - $100k', '$100k - $150k', 'Over $150k'];

  readonly postedWithinOptions: string[] = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];

  onEmploymentTypeChange(value: EmploymentType) {
    this.selectedEmploymentType.set(value);
    this.updateFilter('employmentType', value);
  }

  onExperienceLevelChange(value: ExperienceLevel) {
    this.selectedExperienceLevel.set(value);
    this.updateFilter('experienceLevel', value);
  }

  onLocationChange(value: string) {
    this.selectedLocation.set(value);
    this.updateFilter('location', value);
  }

  onSalaryRangeChange(value: SalaryRange) {
    this.selectedSalaryRange.set(value);
    this.updateFilter('salaryRange', value);
  }

  onPostedWithinChange(value: PostedWithin) {
    this.selectedPostedWithin.set(value);
    this.updateFilter('postedWithin', value);
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
    this.selectedEmploymentType.set(EmploymentType.ALL);
    this.selectedExperienceLevel.set(ExperienceLevel.ALL);
    this.selectedLocation.set('');
    this.selectedSalaryRange.set(SalaryRange.ALL);
    this.selectedPostedWithin.set(PostedWithin.ALL);
    this.currentFilters.set({});
    this.filterChange.emit({});
    this.clearAll.emit();
  }
}
