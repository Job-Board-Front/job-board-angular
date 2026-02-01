import { Component, input, output } from '@angular/core';
import { LucideAngularModule, ExternalLink, Bookmark } from 'lucide-angular';
import { ButtonComponent } from "@/app/components/shared/button/button.component";

@Component({
  selector: 'app-job-actions',
  standalone: true,
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: './job-actions.component.html',
  styleUrl: './job-actions.component.css',
})
export class JobActionsComponent {
  readonly ExternalLink = ExternalLink;
  readonly Bookmark = Bookmark;
  isBookmarked = input<boolean>(false);

  applyClick = output<void>();
  bookmarkClick = output<void>();
  getBookmarkButtonVariant(isBookmarked: boolean) {
    return isBookmarked ? 'secondary' : 'primary';
  }
}
