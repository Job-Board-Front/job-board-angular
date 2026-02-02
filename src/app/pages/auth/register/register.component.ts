import { AuthService } from '@/app/services/auth/auth.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@/app/components/shared/button/button.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { AuthLayoutComponent } from '@/app/components/layout/auth-layout/auth-layout.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, IconComponent, AuthLayoutComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  errorMessage = signal('');
  isLoading = signal(false);

  form = this.formBuilder.group(
    {
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator() },
  );

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }

  async handleRegister() {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      try {
        await this.authService.register(
          this.email.value!,
          this.password.value!,
          this.displayName.value!,
        );
      } catch (err: unknown) {
        const error = err as { message?: string };
        this.errorMessage.set(error.message || 'Registration failed. Please try again.');
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.form.markAllAsTouched();
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
