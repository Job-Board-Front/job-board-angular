import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/routes/auth.routes';
import { authGuard, redirectUnauthorized } from './guards/auth/auth.guard';
import { APP_ROUTES } from './route-names/route-names.constants';

export const routes: Routes = [
  {
    path: APP_ROUTES.home,
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
  {
    path: APP_ROUTES.bookmarked,
    loadComponent: () => import('./pages/bookmarked/bookmarked.component').then((m) => m.BookmarkedComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
  ...authRoutes
];
