import { Routes } from '@angular/router';
import { App } from './app';
import { authRoutes } from './components/pages/auth/routes/auth.routes';

import { JobDetailsComponent } from './job-details/job-details.component';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  { path: 'Details', component: JobDetailsComponent },
  ...authRoutes
];

