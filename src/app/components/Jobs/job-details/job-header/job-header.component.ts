import { Component, input } from '@angular/core';
import { Job } from '@/app/interfaces/api/job.models';
import { FormatDatePipe } from '@/app/pipes/job-details-pipes/format-date.pipe';
import { GetInitialsPipe } from '@/app/pipes/job-details-pipes/get-initials.pipe';
import { LucideAngularModule, MapPin, Briefcase, DollarSign } from 'lucide-angular';

@Component({
  selector: 'app-job-header',
  standalone: true,
  imports: [LucideAngularModule, FormatDatePipe, GetInitialsPipe],
  templateUrl: './job-header.component.html',
  styleUrl: './job-header.component.css'
})
export class JobHeaderComponent {
  readonly MapPin = MapPin;
  readonly Briefcase = Briefcase;
  readonly DollarSign = DollarSign;
  
  job = input.required<Job>();
}