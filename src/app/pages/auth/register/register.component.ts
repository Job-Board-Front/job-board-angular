import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, IconComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private _authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  errorMessage = signal('');

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(6)] }],
    displayName: ['', { validators: [Validators.required] }],
    confirmPassword: ['', { validators: [Validators.required] }],
  });

  async handleLogin() {
    if (this.form.valid) {
      try {
        this.errorMessage.set('');
        await this._authService.register(
          this.email.value!,
          this.password.value!,
          this.displayName.value!
        );
      } catch (err: any) {
        this.errorMessage.set(err.message || 'Registration failed. Please try again.');
      }
    } else {
      console.log('Form is invalid');
    }
  }

  get displayName() {
    return this.form.get('displayName')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }
}
