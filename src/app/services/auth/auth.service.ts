import { CurrentUser } from '@/app/interfaces/auth/current-user.interface';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
    const creds = await createUserWithEmailAndPassword(this._auth, email, password);
    await updateProfile(creds.user, { displayName, photoURL: null });
    await creds.user.reload();
    this._router.navigate([APP_ROUTES.home]);
    window.location.reload();
  }

  async login(email: string, password: string) {
    const userCredentials = await signInWithEmailAndPassword(this._auth, email, password);
    await firstValueFrom(authState(this._auth).pipe(filter((user) => !!user)));
    if (userCredentials) {
      this._currentUser.set(userCredentials.user);
      this._router.navigate([APP_ROUTES.home]);
      window.location.reload();
    }
  }

  async logout() {
    return await signOut(this._auth).then((value) => {
      this._router.navigate([APP_ROUTES.home]);
      window.location.reload();
    });
  }
}
