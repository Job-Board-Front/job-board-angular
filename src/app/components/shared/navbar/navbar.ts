import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@/app/services/auth/auth.service';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { ThemeService } from '@/app/services/theme/theme.service';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink, ThemeToggleComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  readonly APP_ROUTES = APP_ROUTES;
  readonly AUTH_ROUTES = AUTH_ROUTES;

  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());
}
