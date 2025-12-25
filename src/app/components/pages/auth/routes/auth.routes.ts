import { Routes } from '@angular/router';

export const AUTH_ROUTES = {
  login: 'login',
  register: 'register',
};

export const authRoutes: Routes = [
  {
    path: AUTH_ROUTES.login,
    loadComponent: () => import('../login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: AUTH_ROUTES.register,
    loadComponent: () => import('../register/register.component').then((m) => m.RegisterComponent),
  },
];
