import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Job } from '@/app/interfaces/api/job.models';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { JobCardComponent } from '../../job-card/job-card.component';

@Component({
  selector: 'app-similar-jobs',
  standalone: true,
  imports: [JobCardComponent, LucideAngularModule],
  templateUrl:'./similar-jobs.component.html',
  styleUrl: './similar-jobs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarJobsComponent {
  readonly ArrowRight = ArrowRight;

  similarJobs = input.required<Job[]>();
  viewAllClick = output<void>();
}
