import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@/app/services/auth/auth.service';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink, ButtonComponent, IconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);

  readonly APP_ROUTES = APP_ROUTES;
  readonly AUTH_ROUTES = AUTH_ROUTES;

  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());
}
