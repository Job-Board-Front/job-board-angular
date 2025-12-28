import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobCardComponent } from '@/app/components/job-card/job-card.component';
import { mockJobs } from '@/app/lib/mock-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, JobCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recentJobs = mockJobs.slice(0, 6);
}

