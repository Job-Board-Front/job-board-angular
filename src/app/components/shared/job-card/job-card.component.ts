import { Job } from '@/app/interfaces/api/job.models';
import { Component, computed, inject, input, output } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule, BadgeComponent, IconComponent],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  job = input.required<Job>();
  private router = inject(Router);
  onBookmark = output<string>();
  onCardClick = output<string>();

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

   goToDetails() {
    this.router.navigate(['/Details', this.job().id]);
   }
}
