import { Job } from '@/app/interfaces/api/job.models';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkService } from '@/app/services/bookmark/bookmark.service';
import { AbsoluteUrlPipe } from '@/app/pipes/absolute-url.pipe';
import { GetInitialsPipe } from '../../../pipes/job-details-pipes/get-initials.pipe';
import { Briefcase, LucideAngularModule } from 'lucide-angular';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule, BadgeComponent, IconComponent, AbsoluteUrlPipe, GetInitialsPipe, LucideAngularModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardComponent {
  private bookmarkService = inject(BookmarkService);

  readonly Briefcase = Briefcase;

  job = input.required<Job>();

  onBookmark = output<string>();
  onCardClick = output<string>();

  isBookmarked = computed(() => {
    const jobId = this.job().id;
    return this.bookmarkService.hasBookmark(jobId);
  });

  // Enhanced container classes with better light/dark mode support
  containerClasses = computed(() => {
    if (this.job().isActive) {
      return [
        // Light mode: crisp white with strong shadow
        'bg-white shadow-card border-slate-200',
        'hover:-translate-y-2 hover:shadow-xl hover:border-blue-200',

        // Dark mode
        'dark:bg-slate-800/90 dark:shadow-dark-card dark:border-slate-700/60',
        'dark:hover:border-blue-500/40',

        // Interaction
        'active:scale-[0.98]',
      ].join(' ');
    } else {
      return [
        // Light mode inactive
        'bg-white/60 shadow-sm border-slate-200',
        'opacity-70 grayscale cursor-not-allowed',

        // Dark mode inactive
        'dark:bg-slate-800/50 dark:border-slate-700/40',
      ].join(' ');
    }
  });

  // Display up to 4 tags
  displayTags = computed(() => {
    const combined = [...this.job().keywords, ...this.job().techStack];
    return [...new Set(combined)].slice(0, 4);
  });

  // Count of remaining tags
  remainingTagsCount = computed(() => {
    const combined = [...this.job().keywords, ...this.job().techStack];
    const unique = [...new Set(combined)];
    return Math.max(0, unique.length - 4);
  });

  handleCardClick() {
    if (this.job().isActive) {
      this.onCardClick.emit(this.job().id);
    }
  }

  formatEnum(value: string): string {
    return value.toLowerCase().replace(/_/g, ' ');
  }

  handleBookmark(event: Event) {
    event.stopPropagation();
    const jobId = this.job().id;
    this.bookmarkService.toggleBookmark(jobId);
  }
}