import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { authRoutes } from './pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';
 import { authGuard, redirectUnauthorized } from './guards/auth/auth.guard';
import { APP_ROUTES } from './route-names/route-names.constants';

import { JobDetailsComponent } from './pages/job-details/job-details.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'jobs', component: Jobs },
    {
      path: APP_ROUTES.bookmarks,
      loadComponent: () => import('./pages/bookmarks/bookmarks.component').then((m) => m.BookmarksComponent),
      canActivate: [authGuard],
      data: {
        authGuardPipe: redirectUnauthorized,
      },
    },
    {
      path: 'Details/:id',
      loadComponent: () =>
        import('./pages/job-details/job-details.component')
          .then(m => m.JobDetailsComponent),
    },
    {
      path: 'privacy',
      loadComponent: () =>
        import('./pages/static-pages/privacy.component')
          .then(m => m.PrivacyComponent),
    },
    {
      path: 'terms',
      loadComponent: () =>
        import('./pages/static-pages/terms.component')
          .then(m => m.TermsComponent),
    },
  //added route for testing the services
  { path: 'test', component: TestPageComponent },
  ...authRoutes,

];

