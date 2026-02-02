import { Component, computed, input, signal } from '@angular/core';
import { BadgeComponent } from '@/app/components/shared/badge/badge.component';

@Component({
  selector: 'app-job-keywords',
  imports: [BadgeComponent],
  templateUrl: './job-keywords.component.html',
  styleUrl: './job-keywords.component.css',
})
export class JobKeywordsComponent {
  keywords = input<readonly string[]>([]);
  techStack = input<readonly string[]>([]);
  isExpanded = signal(false);

  allTags = computed(() => {
    const combined = [...this.keywords(), ...this.techStack()];
    return [...new Set(combined)];
  });

  displayTags = computed(() => {
    const tags = this.allTags();
    return this.isExpanded() ? tags : tags.slice(0, 10);
  });

  remainingTagsCount = computed(() => {
    return Math.max(0, this.allTags().length - 10);
  });

  toggleExpanded() {
    this.isExpanded.update(v => !v);
  }
}