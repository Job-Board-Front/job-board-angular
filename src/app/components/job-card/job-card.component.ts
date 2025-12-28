import { Component, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job } from '@/app/models/job.model';

@Component({
  selector: 'app-job-card',
  imports: [RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  job = input.required<Job>();

  isBookmarked = signal(false);

  constructor() {
    effect(() => {
      // Track job changes - this will run after the input is set
      const job = this.job();
      if (typeof window !== 'undefined') {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        this.isBookmarked.set(bookmarks.includes(job.id));
      }
    });
  }

  toggleBookmark(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      if (this.isBookmarked()) {
        const updated = bookmarks.filter((id: string) => id !== this.job().id);
        localStorage.setItem('bookmarks', JSON.stringify(updated));
        this.isBookmarked.set(false);
      } else {
        bookmarks.push(this.job().id);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        this.isBookmarked.set(true);
      }
    }
  }
}

