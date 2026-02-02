import { Component, inject, signal, effect, computed, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CreateJobDto,
  EmploymentType,
  ExperienceLevel,
  Job,
  JobSearchFilters,
  PaginatedResponse,
} from '../interfaces/api/job.models';
import { BookmarksService } from '../api/bookmarks.service';
import { JobsService } from '../api/jobs.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>🧪 Service Tester (Raw & Dirty)</h1>

      <section class="section status" *ngIf="status()">
        <div [class]="status()?.type">
          {{ status()?.message }}
        </div>
      </section>

      <section class="section">
        <h2>📋 Jobs Service</h2>
        <div class="status-badge" [class.ready]="jobsResource.value()">
          Resource Status: {{ jobsResource.isLoading() ? 'Loading...' : 'Ready' }}
        </div>

        <div class="buttons">
          <button (click)="resetFilters()">Reset / Get All</button>
          <button (click)="applyFilter()">Filter (Senior/FullTime)</button>

          <button (click)="createTestJob()">Create Test Job</button>
          <button (click)="deleteFirstJob()">Delete First Job</button>
        </div>
        <div class="buttons">
          <button (click)="nextPage()">Next Page</button>
          <button (click)="nextPage()">Prev Page</button>
        </div>

        <div class="results" *ngIf="jobsList().length > 0">
          <h3>Results: {{ jobsList().length }} jobs</h3>
          <div class="job-card" *ngFor="let job of jobsList()">
            <strong>{{ job.title }}</strong> ({{ job.id }}) <br />
            <button (click)="selectJob(job.id)">View Details</button>
            <button (click)="bookmarkJob(job.id)">
              {{ isBookmarked(job.id) ? '★ Unbookmark' : '☆ Bookmark' }}
            </button>
          </div>
        </div>

        <div class="json-view" *ngIf="selectedJobResource.value()">
          <h3>Selected Job Details (Fetched via ID):</h3>
          <pre>{{ selectedJobResource.value() | json }}</pre>
        </div>
      </section>

      <section class="section">
        <h2>⭐ Bookmarks Service</h2>

        <div class="results">
          <h3>My Bookmarks: {{ bookmarksList().length }}</h3>
          <div class="bookmark-card" *ngFor="let b of bookmarksList()">Job ID: {{ b.id }}</div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 20px auto;
        font-family: monospace;
      }
      .section {
        border: 1px solid #ccc;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
      }
      .buttons {
        margin-bottom: 10px;
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }
      button {
        padding: 8px 12px;
        cursor: pointer;
      }
      .job-card {
        background: #f0f0f0;
        margin: 5px 0;
        padding: 10px;
        border-left: 5px solid #2196f3;
      }
      .json-view {
        background: #333;
        color: #8bc34a;
        padding: 10px;
        overflow: auto;
      }
      .status-badge {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .ready {
        color: green;
      }
      .success {
        background: #dff0d8;
        color: #3c763d;
        padding: 10px;
      }
      .error {
        background: #f2dede;
        color: #a94442;
        padding: 10px;
      }
    `,
  ],
})
export class TestPageComponent {
  private jobsService = inject(JobsService);
  private bookmarksService = inject(BookmarksService);
  private messageService = inject(MessageService);

  filterSignal = signal<JobSearchFilters | undefined>({ limit: 5 });
  selectedJobId = signal<string | undefined>(undefined);
  status = signal<{ message: string; type: 'success' | 'error' } | null>(null);

  jobsResource = this.jobsService.getJobsPaginated(this.filterSignal);
  bookmarksResource = this.bookmarksService.getBookmarks();
  selectedJobResource = this.jobsService.getJobById(this.selectedJobId);

  jobsList = linkedSignal<PaginatedResponse<Job> | undefined, Job[]>({
    source: this.jobsResource.value,
    computation: (src, prev) => {
      console.log('🔵 JobsList Computation:', src, prev);
      if (!src) return prev?.value || [];
      else if (prev?.value) return [...prev.value, ...src.data];
      else return src.data;
    },
  });
  bookmarksList = computed(() => this.bookmarksResource.value() || []);

  constructor() {
    effect(() => {
      const jobs = this.jobsResource.value();
      if (jobs) {
        console.log('✅ [Auto-Log] Jobs Updated:', jobs.data.length, 'items');
      }
    });

    effect(() => {
      const b = this.bookmarksResource.value();
      if (b) {
        console.log('✅ [Auto-Log] Bookmarks Updated:', b.length, 'items');
      }
    });
  }

  resetFilters() {
    console.log('🔵 Resetting filters & Reloading...');
    this.filterSignal.set(undefined);

    this.jobsResource.reload();
  }

  applyFilter() {
    console.log('🔵 Applying filters...');
    this.filterSignal.set({
      employmentType: EmploymentType.FULL_TIME,
      experienceLevel: ExperienceLevel.SENIOR,
    });
  }

  selectJob(id: string) {
    console.log('🔵 Selecting Job ID:', id);
    this.selectedJobId.set(id);
  }

  createTestJob() {
    const newJob: CreateJobDto = {
      title: 'Test Job ' + Math.floor(Math.random() * 100),
      description: 'Auto-generated test',
      company: 'Test Co',
      location: 'Remote',
      employmentType: EmploymentType.FULL_TIME,
      experienceLevel: ExperienceLevel.MID,
      salaryRange: '$50k',
      techStack: ['Angular'],
      submissionLink: 'https://www.friv.com/',
      logoUrl: null,
    };

    console.log('🔵 Creating Job...');
    this.jobsService.createJob(newJob).subscribe({
      next: (res) => {
        this.showStatus(`Created job: ${res.id}`, 'success');
        this.jobsResource.reload();
      },
      error: (err) => this.showStatus(err.message, 'error'),
    });
  }
  deleteFirstJob() {
    const list = this.jobsList();
    if (list.length === 0) return alert('No jobs to delete');
    const id = list[0].id;

    if (!confirm('Delete ' + id + '?')) return;

    this.jobsService.deleteJob(id).subscribe({
      next: () => {
        this.showStatus('Deleted ' + id, 'success');
        this.resetFilters();
      },
      error: (err) => this.showStatus(err.message, 'error'),
    });
  }

  isBookmarked(jobId: string | number) {
    const list = this.bookmarksList();
    if (!list) return false;

    return list.some((b) => String(b.id) === String(jobId));
  }

  bookmarkJob(jobId: string | number) {
    console.log('🖱️ Clicked Bookmark for ID:', jobId, 'Type:', typeof jobId);

    if (!jobId) {
      this.showStatus('❌ Error: Job ID is missing/undefined', 'error');
      return;
    }

    const idStr = String(jobId);

    if (this.isBookmarked(idStr)) {
      console.log('🔵 Action: Unbookmarking', idStr);
      this.bookmarksService.unbookmarkJob(idStr).subscribe({
        next: () => this.showStatus('➖ Unbookmarked successfully', 'success'),
        error: (err) => {
          console.error('❌ Unbookmark failed:', err);
          this.showStatus('Error unbookmarking: ' + err.message, 'error');
        },
      });
    } else {
      console.log('🔵 Action: Bookmarking', idStr);
      this.bookmarksService.bookmarkJob(idStr).subscribe({
        next: () => this.showStatus('➕ Bookmarked successfully', 'success'),
        error: (err) => {
          console.error('❌ Bookmark failed:', err);
          this.showStatus('Error bookmarking: ' + err.message, 'error');
        },
      });
    }
  }

  private showStatus(msg: string, type: 'success' | 'error') {
    this.status.set({ message: msg, type });
    setTimeout(() => this.status.set(null), 3000);
  }

  nextPage() {
    const nextCursor = this.jobsResource.value()?.nextCursor;
    if (!nextCursor) return;
    this.filterSignal.update((f) => ({ ...f, cursor: nextCursor }));
    this.jobsResource.reload();
  }

}
