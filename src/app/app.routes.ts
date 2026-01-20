import { Routes } from '@angular/router';
import { App } from './app';
import { authRoutes } from './components/pages/auth/routes/auth.routes';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
  ...authRoutes,
  {
    path: 'test',
    loadComponent: () =>
      import('./components/pages/test/test-page/test-page.component').then(
        (m) => m.TestPageComponent,
      ),
  },
];
