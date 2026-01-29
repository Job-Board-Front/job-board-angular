import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { map, take } from 'rxjs';
import { APP_ROUTES, AUTH_ROUTES } from '@/app/route-names/route-names.constants';

export type AuthPipe = (user: User | null, router: Router) => boolean;

export const redirectLoggedIn: AuthPipe = (user, router) => {
  if (user && user.uid) {
    router.navigate([APP_ROUTES.home]);
    return false;
  }
  return true;
};

export const redirectUnauthorized: AuthPipe = (user, router) => {
  if (!user || !user.uid) {
    router.navigate([AUTH_ROUTES.login]);
    return false;
  }
  return true;
};

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  const currentUser$ = user(auth);
  const authPipe = route.data['authGuardPipe'] as AuthPipe | null;

  if (authPipe) {
    return currentUser$.pipe(
      take(1),
      map((currentUser) => {
        return authPipe(currentUser, router);
      }),
    );
  }

  return true;
};
