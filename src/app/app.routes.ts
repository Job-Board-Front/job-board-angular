import { Routes } from '@angular/router';
import { App } from './app';
import { authRoutes } from './components/pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  //added route for testing the services
  { path: 'test', component: TestPageComponent },
  ...authRoutes
];
