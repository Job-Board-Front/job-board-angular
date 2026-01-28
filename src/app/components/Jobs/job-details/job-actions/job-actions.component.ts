import { Component, output } from '@angular/core';
import { LucideAngularModule, ExternalLink, Bookmark } from 'lucide-angular';

@Component({
  selector: 'app-job-actions',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl:'./job-actions.component.html',
  styleUrl: './job-actions.component.css'
})
export class JobActionsComponent {
  readonly ExternalLink = ExternalLink;
  readonly Bookmark = Bookmark;
  
  applyClick = output<void>();
  bookmarkClick = output<void>();
}