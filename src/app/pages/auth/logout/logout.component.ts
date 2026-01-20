import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-logout',
  imports: [ButtonComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  private _authService = inject(AuthService);
  
  constructor() {
    this.logout();
  }
  
  async logout() {
    await this._authService.logout();
  }
}
