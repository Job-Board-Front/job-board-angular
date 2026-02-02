import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Job } from '@/app/interfaces/api/job.models';
import { FormatDatePipe } from '@/app/pipes/job-details-pipes/format-date.pipe';

@Component({
  selector: 'app-job-details-card',
  standalone: true,
  imports: [FormatDatePipe],
  templateUrl:'./job-details-card.component.html',
  styleUrl: './job-details-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsCardComponent {
  job = input.required<Job>();
}
