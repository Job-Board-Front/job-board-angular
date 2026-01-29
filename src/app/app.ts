import { ChangeDetectionStrategy, Component, HostBinding, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { NgxUiLoaderModule, NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NgxUiLoaderModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('job-board-angular');
  router = inject(Router);
  loader = inject(NgxUiLoaderService);
  isLoading = signal<boolean>(true);
  SPINNER = SPINNER;

  darkTheme = signal<boolean>(false);
  @HostBinding('class.dark')
  get isDarkMode() {
    return this.darkTheme();
  }

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
        this.loader.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading.set(false);
        this.loader.stop();
      }
    });
  }
}
