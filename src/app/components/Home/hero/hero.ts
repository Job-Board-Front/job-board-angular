import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterLink } from '@angular/router';
import { AUTH_ROUTES_TOKEN } from '@/app/route-names/route-names.constants';
import { AuthService } from '@/app/services/auth/auth.service';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  auth_routes = inject(AUTH_ROUTES_TOKEN);
  authService = inject(AuthService);
}
