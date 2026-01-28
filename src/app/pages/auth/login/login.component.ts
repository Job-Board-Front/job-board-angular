import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { AuthLayoutComponent } from '@/app/components/layout/auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, IconComponent, AuthLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  errorMessage = signal('');
  isLoading = signal(false);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async handleLogin() {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      try {
        await this.auth.login(this.form.value.email!, this.form.value.password!);
      } catch (err: unknown) {
        const error = err as { message?: string };
        this.errorMessage.set(error.message || 'Login failed. Please try again.');
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
