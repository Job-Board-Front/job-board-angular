import { Component, Input } from '@angular/core';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {
  @Input() job!: Job;
}
