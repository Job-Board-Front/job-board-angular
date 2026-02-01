import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _auth = inject(Auth);

  return idToken(_auth).pipe(
    take(1),
    switchMap((token) => {
      if (token) {
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(modifiedReq);
      }
      return next(req);
    }),
  );
};
