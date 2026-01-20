import { Component, signal } from '@angular/core';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { mockJobs } from '@/app/lib/mock-data';
import { Job } from '@/app/interfaces/api/job.models';

@Component({
  selector: 'app-bookmarked',
  imports: [JobCardComponent],
  templateUrl: './bookmarked.component.html',
  styleUrl: './bookmarked.component.css',
})
export class BookmarkedComponent {
  bookmarkedJobs = signal<Job[]>([]);

  constructor() {
    this.loadBookmarkedJobs();
  }

  loadBookmarkedJobs() {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const jobs = mockJobs.filter((job) => bookmarks.includes(job.id));
      this.bookmarkedJobs.set(jobs);
    }
  }
}

