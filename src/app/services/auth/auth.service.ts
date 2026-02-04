import { CurrentUser } from '@/app/interfaces/auth/current-user.interface';
import { APP_ROUTES } from '@/app/route-names/route-names.constants';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { catchError, filter, firstValueFrom, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth = inject(Auth);
  private readonly _router = inject(Router);
  private _messageService = inject(MessageService); 

  readonly currentUser = toSignal(
    user(this._auth).pipe(
      switchMap((u) =>
        u
          ? from(u.getIdTokenResult()).pipe(
              map((result) => ({
                uid: u.uid,
                email: u.email ?? null,
                displayName: u.displayName ?? null,
                roles: ((result.claims['roles'] as string[]) || ['user']) as readonly string[],
              })),
              catchError(() =>
                of({
                  uid: u.uid,
                  email: u.email ?? null,
                  displayName: u.displayName ?? null,
                  roles: ['user'] as readonly string[],
                }),
              ),
            )
          : of(null),
      ),
    ),
    { initialValue: null },
  );

  isAdmin = computed(() => this.currentUser()?.roles?.includes('admin') ?? false);

  hasRole(role: string): boolean {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }

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