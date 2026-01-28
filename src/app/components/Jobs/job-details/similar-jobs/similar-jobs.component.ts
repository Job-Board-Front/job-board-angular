import { Component, input, output } from '@angular/core';
import { Job } from '@/app/interfaces/api/job.models';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-similar-jobs',
  standalone: true,
  imports: [JobCardComponent, LucideAngularModule],
  templateUrl:'./similar-jobs.component.html',
  styleUrl: './similar-jobs.component.css'
})
export class SimilarJobsComponent {
  readonly ArrowRight = ArrowRight;
  
  similarJobs = input.required<Job[]>();
  viewAllClick = output<void>();
}