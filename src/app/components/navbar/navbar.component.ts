import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@/app/services/auth/auth.service';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);

  readonly APP_ROUTES = APP_ROUTES;
  readonly AUTH_ROUTES = AUTH_ROUTES;

  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());
}

