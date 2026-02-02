import { AuthService } from '@/app/services/auth/auth.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
