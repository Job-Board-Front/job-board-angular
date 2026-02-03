import { CurrentUser } from '@/app/interfaces/auth/current-user.interface';
import { APP_ROUTES } from '@/app/route-names/route-names.constants';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // 👈 Added for Toasts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);
  private _messageService = inject(MessageService); 

  private _currentUser = signal<User | null>(null);

  constructor() {
    user(this._auth).subscribe((u) => {
      this._currentUser.set(u);
    });
  }

  currentUser = computed<CurrentUser | null>(() => {
    const user = this._currentUser();

    return user
      ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }
      : null;
  });

  async register(email: string, password: string, displayName: string) {
    try {
      const creds = await createUserWithEmailAndPassword(this._auth, email, password);
      await updateProfile(creds.user, { displayName, photoURL: null });
      await creds.user.reload();
      this._router.navigate([APP_ROUTES.home]);
      window.location.reload();
    } catch (error: any) {
      this.handleAuthError(error, 'Registration Failed');
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(this._auth, email, password);
      await firstValueFrom(authState(this._auth).pipe(filter((user) => !!user)));
      if (userCredentials) {
        this._currentUser.set(userCredentials.user);
        this._router.navigate([APP_ROUTES.home]);
        window.location.reload();
      }
    } catch (error: any) {
      this.handleAuthError(error, 'Login Failed');
      throw error;
    }
  }

  async logout() {
    try {
      return await signOut(this._auth).then((value) => {
        this._router.navigate([APP_ROUTES.home]);
        window.location.reload();
      });
    } catch (error: any) {
      this.handleAuthError(error, 'Logout Failed');
      throw error;
    }
  }

  private handleAuthError(error: any, summary: string) {
    let detail = 'An unexpected error occurred.';

    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        detail = 'Invalid email or password.';
        break;
      case 'auth/email-already-in-use':
        detail = 'This email is already registered.';
        break;
      case 'auth/weak-password':
        detail = 'Password should be at least 6 characters.';
        break;
      case 'auth/too-many-requests':
        detail = 'Too many failed attempts. Please try again later.';
        break;
      default:
        detail = error.message;
    }

    this._messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: 5000
    });
  }
}