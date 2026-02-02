import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authRoutes } from './pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';
import { authGuard, redirectUnauthorized } from './guards/auth/auth.guard';
import { adminGuard } from './guards/role/role.guard';
import { APP_ROUTES } from './route-names/route-names.constants';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: APP_ROUTES.jobCreate,
    loadComponent: () =>
      import('./pages/job-create/job-create.component').then((m) => m.JobCreateComponent),
    canActivate: [authGuard, adminGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
  {
    path: APP_ROUTES.jobEdit,
    loadComponent: () =>
      import('./pages/job-edit/job-edit.component').then((m) => m.JobEditComponent),
    canActivate: [authGuard, adminGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
  {
    path: APP_ROUTES.jobs,
    loadComponent: () => import('./pages/jobs/jobs').then((m) => m.Jobs),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.bookmarks,
    loadComponent: () =>
      import('./pages/bookmarks/bookmarks.component').then((m) => m.BookmarksComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
  {
    path: APP_ROUTES.jobDetails,
    loadComponent: () =>
      import('./pages/job-details/job-details.component').then((m) => m.JobDetailsComponent),
    canActivate: [authGuard],
    data: {
      authGuardPipe: redirectUnauthorized,
    },
  },
  {
    path: APP_ROUTES.privacy,
    loadComponent: () =>
      import('./pages/static-pages/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: APP_ROUTES.terms,
    loadComponent: () =>
      import('./pages/static-pages/terms.component').then((m) => m.TermsComponent),
  },
  //added route for testing the services
  { path: APP_ROUTES.test, component: TestPageComponent },
  ...authRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];
