import { Component } from '@angular/core';
import { JobCardComponent } from '@/app/components/shared/job-card/job-card.component';
import { mockJobs } from '@/app/lib/mock-data';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-home',
  imports: [JobCardComponent, ButtonComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recentJobs = mockJobs.slice(0, 6);
}

