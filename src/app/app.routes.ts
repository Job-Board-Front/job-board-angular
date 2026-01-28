import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { App } from './app';
import { authRoutes } from './pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';
 import { authGuard, redirectUnauthorized } from './guards/auth/auth.guard';
import { APP_ROUTES } from './route-names/route-names.constants';

import { JobDetailsComponent } from './pages/job-details/job-details.component';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "jobs", component: Jobs },
    {
      path: APP_ROUTES.bookmarked,
      loadComponent: () => import('./pages/bookmarked/bookmarked.component').then((m) => m.BookmarkedComponent),
      canActivate: [authGuard],
      data: {
        authGuardPipe: redirectUnauthorized,
      },
    },
    { path: 'Details', component: JobDetailsComponent },
  //added route for testing the services
  { path: 'test', component: TestPageComponent },
  ...authRoutes

];

