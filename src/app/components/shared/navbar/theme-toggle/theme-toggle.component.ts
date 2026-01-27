import { ThemeService } from '@/app/services/theme/theme.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
