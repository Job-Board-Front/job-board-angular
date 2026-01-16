import { Job } from '@/app/interfaces/api/job.models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {
  @Input() job!: Job;
}
