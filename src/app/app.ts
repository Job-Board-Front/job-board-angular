import { Component, HostBinding, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme/theme.service';
import { Navbar } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,FooterComponent ],
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
