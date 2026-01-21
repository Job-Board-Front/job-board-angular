import { Component, HostBinding, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('job-board-angular');
  darkTheme = signal<boolean>(false);
  @HostBinding('class.dark')
  get isDarkMode() {
    return this.darkTheme();
  }
}
