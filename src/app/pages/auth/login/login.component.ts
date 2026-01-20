import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ButtonComponent, IconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private auth = inject(AuthService);

  email = signal('');
  password = signal('');
  errorMessage = signal('');

  async handleLogin() {
    try {
      await this.auth.login(this.email(), this.password());
    } catch (err: any) {
      this.errorMessage.set(err.message);
    }
  }
}
