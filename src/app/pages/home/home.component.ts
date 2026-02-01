import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mockJobs } from '@/app/lib/mock-data';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { JobCardComponent } from '@/app/components/Jobs/job-card/job-card.component';

@Component({
  selector: 'app-home',
  imports: [JobCardComponent, ButtonComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  recentJobs = mockJobs.slice(0, 6);
}

