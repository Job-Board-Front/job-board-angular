import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeComponent } from '@/app/components/shared/badge/badge.component';

@Component({
  selector: 'app-job-keywords',
  imports: [BadgeComponent],
  templateUrl: './job-keywords.component.html',
  styleUrl: './job-keywords.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobKeywordsComponent {
  keywords = input<readonly string[]>([]);
  techStack = input<readonly string[]>([]);
  displayTags = computed(() => {
    const combined = [...this.keywords(), ...this.techStack()];
    return [...new Set(combined)].slice(0, 10);
  });

  // Count of remaining tags
  remainingTagsCount = computed(() => {
    const combined = [...this.keywords(), ...this.techStack()];
    const unique = [...new Set(combined)];
    return Math.max(0, unique.length - 4);
  });
}
