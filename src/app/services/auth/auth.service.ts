import { CurrentUser } from '@/app/interfaces/auth/current-user.interface';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
    const creds = await createUserWithEmailAndPassword(this._auth, email, password);
    await updateProfile(creds.user, { displayName, photoURL: null });
    await creds.user.reload();
    this._router.navigate([AUTH_ROUTES.login]);
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this._auth, email, password);
    await firstValueFrom(authState(this._auth).pipe(filter((u) => !!u)));
    this._router.navigate([APP_ROUTES.home]);
  }

  async logout() {
    return await signOut(this._auth).then((value) => {
      this._router.navigate([APP_ROUTES.home]);
    });
  }
}
