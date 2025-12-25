import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private _authService = inject(AuthService);

  // Angular 21: Writable Signals for local state
  email = signal('');
  password = signal('');
  errorMessage = signal('');

  async handleLogin() {
    try {
      await this._authService.register(this.email(), this.password());
    } catch (err: any) {
      this.errorMessage.set(err.message);
    }
  }
}
