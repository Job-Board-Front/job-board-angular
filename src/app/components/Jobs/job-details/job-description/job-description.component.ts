import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

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

  toggleReadMore() {
    this.readMore.update(v => !v);
  }
}
