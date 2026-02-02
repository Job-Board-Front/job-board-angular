import { ChangeDetectionStrategy, Component, input, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-job-description',
  standalone: true,
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDescriptionComponent {
  description = input.required<string>();
  readMore = signal(false);
  descriptionMoreLess = linkedSignal({
    source: this.description,
    computation: () => {
      const words = this.description().trim().split(' ');
      return `${words.slice(25).join(' ').normalize()}`;
    },
  });

  toggleReadMore() {
    this.readMore.update((v) => !v);
    this.descriptionMoreLess.update(() => this.description());
  }
}
