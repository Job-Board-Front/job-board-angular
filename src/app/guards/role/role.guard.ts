import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { catchError, from, map, of, switchMap, take } from 'rxjs';
import { APP_ROUTES } from '@/app/route-names/route-names.constants';

export const createRoleGuard =
  (allowedRoles: string[]): CanActivateFn =>
  () => {
    const router = inject(Router);
    const auth = inject(Auth);

    return user(auth).pipe(
      take(1),
      switchMap((firebaseUser) => {
        if (!firebaseUser) {
          router.navigate([APP_ROUTES.home]);
          return of(false);
        }
        return from(firebaseUser.getIdTokenResult()).pipe(
          map((tokenResult) => {
            const roles = (tokenResult.claims['roles'] as string[]) || ['user'];
            const hasRole = allowedRoles.some((r) => roles.includes(r));
            if (!hasRole) {
              router.navigate([APP_ROUTES.home]);
              return false;
            }
            return true;
          }),
          catchError(() => {
            router.navigate([APP_ROUTES.home]);
            return of(false);
          }),
        );
      }),
    );
  };

export const adminGuard = createRoleGuard(['admin']);
