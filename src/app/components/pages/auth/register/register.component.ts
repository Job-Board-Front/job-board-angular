import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private _authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(6)] }],
    displayName: ['', { validators: [Validators.required] }],
  });

  async handleLogin() {
    if (this.form.valid) {
      await this._authService.register(
        this.email.value!,
        this.password.value!,
        this.displayName.value!
      );
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
}
