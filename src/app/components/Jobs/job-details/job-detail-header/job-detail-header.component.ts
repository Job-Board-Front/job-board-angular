import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-detail-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './job-detail-header.component.html',
  styleUrl: './job-detail-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailHeaderComponent {}
