import { AuthService } from '@/app/services/auth/auth.service';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  private authService = inject(AuthService);
  
  readonly APP_ROUTES = APP_ROUTES;
  readonly AUTH_ROUTES = AUTH_ROUTES;

  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());
}