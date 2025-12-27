import { authGuard, redirectLoggedIn, redirectUnauthorized } from '@/app/guards/auth/auth.guard';
import { AUTH_ROUTES } from '@/app/route-names/route-names.constants';
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: AUTH_ROUTES.login,
    loadComponent: () => import('../login/login.component').then((m) => m.LoginComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectLoggedIn,
    },
  },
  {
    path: AUTH_ROUTES.register,
    loadComponent: () => import('../register/register.component').then((m) => m.RegisterComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectLoggedIn,
    },
  },
  {
    path: AUTH_ROUTES.logout,
    loadComponent: () => import('../logout/logout.component').then((m) => m.LogoutComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
];
