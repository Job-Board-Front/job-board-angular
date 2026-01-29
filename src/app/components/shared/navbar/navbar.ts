import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { AuthService } from '@/app/services/auth/auth.service';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { ThemeService } from '@/app/services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive,
    RouterLink, ThemeToggleComponent, ButtonComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
themeService = inject(ThemeService);
  readonly APP_ROUTES = APP_ROUTES;
  readonly AUTH_ROUTES = AUTH_ROUTES;

  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());
}
