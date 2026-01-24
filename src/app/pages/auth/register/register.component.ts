import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@/app/components/shared/button/button.component';

import { AuthLayoutComponent } from '@/app/components/layout/auth-layout/auth-layout.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, AuthLayoutComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private _authService = inject(AuthService);
  private fb = inject(FormBuilder);

  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    displayName: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, displayName } = this.form.getRawValue();

    try {
      this.errorMessage.set('');
      await this._authService.register(email, password, displayName);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Registration failed. Please try again.');
    }
  }

  get displayName() {
    return this.form.controls.displayName;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }
}
