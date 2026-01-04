//This is an ai generated content, just for testing the services
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {  Job, 
  Bookmark, 
  CreateJobDto, 
  EmploymentType, 
  ExperienceLevel,
  JobSearchFilters 
} from '../interfaces/api/job.models';
import { BookmarksService } from '../api/bookmarks.service';
import { JobsService } from '../api/jobs.service';


@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>🧪 Test Your Services</h1>
      
      <!-- JOBS SECTION -->
      <section class="section">
        <h2>📋 Jobs Service</h2>
        <div class="buttons">
          <button (click)="getAllJobs()">Get All Jobs</button>
          <button (click)="getFilteredJobs()">Get Filtered Jobs (Full-time, Senior)</button>
          <button (click)="testPagination()">Test Pagination (Load More)</button>
          <button (click)="createTestJob()">Create Test Job</button>
          <button (click)="getFirstJob()">Get First Job Details</button>
          <button (click)="deleteFirstJob()">Delete First Job</button>
        </div>
        
        <div class="results" *ngIf="jobs().length > 0">
          <h3>Results: {{ jobs().length }} jobs</h3>
          <div class="job-card" *ngFor="let job of jobs()">
            <strong>{{ job.title }}</strong> at {{ job.company }}<br>
            <small>{{ job.location }} • {{ job.employmentType }} • {{ job.experienceLevel }}</small><br>
            <small>ID: {{ job.id }}</small>
          </div>
        </div>

        <div class="json-view" *ngIf="selectedJob()">
          <h3>Selected Job Details:</h3>
          <pre>{{ selectedJob() | json }}</pre>
        </div>
      </section>

      <!-- BOOKMARKS SECTION -->
      <section class="section">
        <h2>⭐ Bookmarks Service</h2>
        <div class="buttons">
          <button (click)="getMyBookmarks()">Get My Bookmarks</button>
          <button (click)="bookmarkFirstJob()">Bookmark First Job</button>
          <button (click)="unbookmarkFirst()">Remove First Bookmark</button>
        </div>
        
        <div class="results" *ngIf="bookmarks().length > 0">
          <h3>My Bookmarks: {{ bookmarks().length }}</h3>
          <div class="bookmark-card" *ngFor="let bookmark of bookmarks()">
            Job ID: {{ bookmark.jobId }}<br>
            <small>Bookmarked at: {{ bookmark.createdAt }}</small>
          </div>
        </div>
      </section>

      <!-- STATUS MESSAGES -->
      <section class="section status" *ngIf="status()">
        <div [class]="status()?.type">
          {{ status()?.message }}
        </div>
      </section>

      <!-- CONSOLE LOG -->
      <section class="section">
        <p><strong>💡 Tip:</strong> Open the browser console (F12) to see detailed logs!</p>
      </section>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    h1 {
      color: #333;
      border-bottom: 3px solid #4CAF50;
      padding-bottom: 10px;
    }

    .section {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      margin-top: 0;
      color: #555;
    }

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 15px 0;
    }

    button {
      background: #2196F3;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s;
    }

    button:hover {
      background: #1976D2;
    }

    button:active {
      transform: scale(0.98);
    }

    .results {
      margin-top: 20px;
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
    }

    .job-card, .bookmark-card {
      background: white;
      padding: 12px;
      margin: 10px 0;
      border-left: 4px solid #4CAF50;
      border-radius: 4px;
    }

    .json-view {
      background: #263238;
      color: #aed581;
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;
      overflow-x: auto;
    }

    .json-view pre {
      margin: 0;
      font-size: 13px;
    }

    .status {
      margin-top: 20px;
    }

    .success {
      background: #d4edda;
      color: #155724;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #28a745;
    }

    .error {
      background: #f8d7da;
      color: #721c24;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #dc3545;
    }

    small {
      color: #666;
    }
  `]
})
export class TestPageComponent {
  private jobsService = inject(JobsService);
  private bookmarksService = inject(BookmarksService);

  jobs = signal<Job[]>([]);
  selectedJob = signal<Job | null>(null);
  bookmarks = signal<Bookmark[]>([]);
  status = signal<{ message: string; type: 'success' | 'error' } | null>(null);
  nextCursor = signal<string | null>(null);

  // ============ JOBS SERVICE METHODS ============

  getAllJobs() {
    console.log('🔵 Calling: jobsService.getJobs()');
    
    this.jobsService.getJobs().subscribe({
      next: (jobs) => {
        console.log('✅ Success! Received jobs:', jobs);
        console.log('Type of response:', typeof jobs);
        console.log('Is Array?', Array.isArray(jobs));
        console.log('Jobs length:', jobs?.length);
        console.log('First job:', jobs?.[0]);
        
        this.jobs.set(jobs);
        this.showStatus(`Loaded ${jobs?.length ?? 0} jobs`, 'success');
      },
      error: (error) => {
        console.error('❌ Error getting jobs:', error);
        console.log('Error details:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  getFilteredJobs() {
    const filters: JobSearchFilters = {
      employmentType: EmploymentType.FULL_TIME,
      experienceLevel: ExperienceLevel.SENIOR
      // Note: isActive is NOT a valid filter - backend filters this automatically
    };

    console.log('🔵 Calling: jobsService.getJobs() with filters:', filters);
    
    this.jobsService.getJobs(filters).subscribe({
      next: (jobs) => {
        console.log('✅ Success! Filtered jobs:', jobs);
        console.log('Filtered jobs length:', jobs?.length);
        this.jobs.set(jobs);
        this.showStatus(`Found ${jobs?.length ?? 0} full-time senior jobs`, 'success');
      },
      error: (error) => {
        console.error('❌ Error filtering jobs:', error);
        console.log('Error status:', error.status);
        console.log('Error body:', error.error);
        this.showStatus(`Error: ${error.status} - ${error.error?.message || error.message}`, 'error');
      }
    });
  }

  getFirstJob() {
    const firstJobId = this.jobs()[0]?.id;
    
    if (!firstJobId) {
      this.showStatus('No jobs loaded. Click "Get All Jobs" first!', 'error');
      return;
    }

    console.log('🔵 Calling: jobsService.getJobById()', firstJobId);
    
    this.jobsService.getJobById(firstJobId).subscribe({
      next: (job) => {
        console.log('✅ Success! Job details:', job);
        this.selectedJob.set(job);
        this.showStatus(`Loaded job: ${job.title}`, 'success');
      },
      error: (error) => {
        console.error('❌ Error getting job:', error);
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  createTestJob() {
    const newJob: CreateJobDto = {
      title: 'Test Angular Developer',
      description: 'This is a test job created from the frontend service',
      company: 'Test Company',
      location: 'Remote',
      employmentType: EmploymentType.FULL_TIME,
      experienceLevel: ExperienceLevel.SENIOR,
      salaryRange: '$100k - $150k',
      techStack: ['Angular', 'TypeScript', 'RxJS']
    };

    console.log('🔵 Calling: jobsService.createJob()', newJob);
    
    this.jobsService.createJob(newJob).subscribe({
      next: (createdJob) => {
        console.log('✅ Success! Created job:', createdJob);
        console.log('Created job ID:', createdJob?.id);
        console.log('Full response:', JSON.stringify(createdJob, null, 2));
        this.showStatus(`Created job: ${createdJob.title} (ID: ${createdJob.id})`, 'success');
        
        // Wait a bit then refresh to ensure backend saved it
        console.log('⏳ Waiting 1 second before refreshing list...');
        setTimeout(() => {
          console.log('🔄 Refreshing job list...');
          this.getAllJobs();
        }, 1000);
      },
      error: (error) => {
        console.error('❌ Error creating job:', error);
        console.log('Error status:', error.status);
        console.log('Error body:', error.error);
        this.showStatus(`Error: ${error.status} - ${error.error?.message || error.message}`, 'error');
      }
    });
  }

  deleteFirstJob() {
    const firstJobId = this.jobs()[0]?.id;
    
    if (!firstJobId) {
      this.showStatus('No jobs loaded. Click "Get All Jobs" first!', 'error');
      return;
    }

    if (!confirm(`Delete job: ${this.jobs()[0].title}?`)) {
      return;
    }

    console.log('🔵 Calling: jobsService.deleteJob()', firstJobId);
    
    this.jobsService.deleteJob(firstJobId).subscribe({
      next: () => {
        console.log('✅ Success! Job deleted');
        this.showStatus(`Deleted job: ${firstJobId}`, 'success');
        // Refresh the list
        this.getAllJobs();
      },
      error: (error) => {
        console.error('❌ Error deleting job:', error);
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  testPagination() {
    const cursor = this.nextCursor();
    
    console.log('🔵 Calling: jobsService.getJobsPaginated() with cursor:', cursor);
    
    this.jobsService.getJobsPaginated({}, cursor || undefined, 10).subscribe({
      next: (response) => {
        console.log('✅ Success! Paginated response:', response);
        console.log('Data length:', response.data.length);
        console.log('Next cursor:', response.nextCursor);
        
        // Append to existing jobs
        this.jobs.update(current => [...current, ...response.data]);
        this.nextCursor.set(response.nextCursor);
        
        this.showStatus(
          `Loaded ${response.data.length} more jobs. Total: ${this.jobs().length}${response.nextCursor ? ' (More available)' : ' (Last page)'}`,
          'success'
        );
      },
      error: (error) => {
        console.error('❌ Error with pagination:', error);
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  // ============ BOOKMARKS SERVICE METHODS ============

  getMyBookmarks() {
    console.log('🔵 Calling: bookmarksService.getBookmarks()');
    
    this.bookmarksService.getBookmarks().subscribe({
      next: (bookmarks) => {
        console.log('✅ Success! My bookmarks:', bookmarks);
        this.bookmarks.set(bookmarks);
        this.showStatus(`Loaded ${bookmarks.length} bookmarks`, 'success');
      },
      error: (error) => {
        console.error('❌ Error getting bookmarks:', error);
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  bookmarkFirstJob() {
    const firstJobId = this.jobs()[0]?.id;
    
    if (!firstJobId) {
      this.showStatus('No jobs loaded. Click "Get All Jobs" first!', 'error');
      return;
    }

    console.log('🔵 Calling: bookmarksService.bookmarkJob()', firstJobId);
    
    this.bookmarksService.bookmarkJob(firstJobId).subscribe({
      next: (bookmark) => {
        console.log('✅ Success! Bookmarked:', bookmark);
        this.showStatus(`Bookmarked job: ${this.jobs()[0].title}`, 'success');
        // Refresh bookmarks
        this.getMyBookmarks();
      },
      error: (error) => {
        console.error('❌ Error bookmarking:', error);
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  unbookmarkFirst() {
    const firstBookmark = this.bookmarks()[0];
    
    if (!firstBookmark) {
      this.showStatus('No bookmarks. Bookmark a job first!', 'error');
      return;
    }

    console.log('🔵 Calling: bookmarksService.unbookmarkJob()', firstBookmark.jobId);
    
    this.bookmarksService.unbookmarkJob(firstBookmark.jobId).subscribe({
      next: () => {
        console.log('✅ Success! Bookmark removed');
        this.showStatus(`Removed bookmark: ${firstBookmark.jobId}`, 'success');
        // Refresh bookmarks
        this.getMyBookmarks();
      },
      error: (error) => {
        console.error('❌ Error removing bookmark:', error);
        this.showStatus(`Error: ${error.message}`, 'error');
      }
    });
  }

  // ============ HELPER METHODS ============

  private showStatus(message: string, type: 'success' | 'error') {
    this.status.set({ message, type });
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
      this.status.set(null);
    }, 5000);
  }
}