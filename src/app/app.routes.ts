import { Routes } from '@angular/router';
import { App } from './app';
import { authRoutes } from './pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';

import { JobDetailsComponent } from './pages/job-details/job-details.component';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  { path: 'Details', component: JobDetailsComponent },
  //added route for testing the services
  { path: 'test', component: TestPageComponent },
  ...authRoutes
];

