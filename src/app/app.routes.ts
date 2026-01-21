import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { App } from './app';
import { authRoutes } from './pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';

import { JobDetailsComponent } from './pages/job-details/job-details.component';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "jobs", component: Jobs },
    {
    path: 'Details/:id',
    loadComponent: () =>
      import('./pages/job-details/job-details.component')
        .then(m => m.JobDetailsComponent),
  },
  //added route for testing the services
  { path: 'test', component: TestPageComponent },
  ...authRoutes

];

