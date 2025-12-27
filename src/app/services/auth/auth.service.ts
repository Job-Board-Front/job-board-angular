import { CurrentUser } from '@/app/interfaces/auth/current-user.interface';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { Auth, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);

  private _currentUser = toSignal(user(this._auth), { initialValue: null });

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
    this._router.navigate([AUTH_ROUTES.login]);
  }

  login(email: string, password: string) {
    if (this.currentUser()?.uid) {
      console.log(this.currentUser());
      return;
    }
    return signInWithEmailAndPassword(this._auth, email, password).then((value) => {
      this._router.navigate([APP_ROUTES.home]);
    });
  }

  logout() {
    return signOut(this._auth).then((value) => {
      this._router.navigate([AUTH_ROUTES.login]);
    });
  }
}
