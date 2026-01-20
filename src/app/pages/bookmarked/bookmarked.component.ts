import { Component, signal } from '@angular/core';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { mockJobs } from '@/app/lib/mock-data';
import { Job } from '@/app/interfaces/api/job.models';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-bookmarked',
  imports: [JobCardComponent, IconComponent],
  templateUrl: './bookmarked.component.html',
  styleUrl: './bookmarked.component.css',
})
export class BookmarkedComponent {
  bookmarkedJobs = signal<Job[]>([]);

  constructor() {
    this.loadBookmarkedJobs();
    
    // Listen for storage changes to update bookmarks when they change from other tabs
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', () => {
        this.loadBookmarkedJobs();
      });
      
      // Listen for custom event to update bookmarks when changed in the same tab
      window.addEventListener('bookmarksChanged', () => {
        this.loadBookmarkedJobs();
      });
    }
  }

  loadBookmarkedJobs() {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const jobs = mockJobs.filter((job) => bookmarks.includes(job.id));
      this.bookmarkedJobs.set(jobs);
    }
  }

  onBookmarkChange(jobId: string) {
    // Reload bookmarked jobs when a bookmark is toggled
    this.loadBookmarkedJobs();
  }
}

