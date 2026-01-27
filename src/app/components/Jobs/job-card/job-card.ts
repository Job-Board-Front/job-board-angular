import { Job } from '@/app/interfaces/api/job.models';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class JobCard {
  @Input() job!: Job;
}
