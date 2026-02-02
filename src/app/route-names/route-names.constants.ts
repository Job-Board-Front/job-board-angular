import { InjectionToken } from '@angular/core';

export const AUTH_ROUTES = {
  login: 'login',
  register: 'register',
  logout: 'logout',
} as const;

export const APP_ROUTES = {
  home: '/',
  bookmarks: 'bookmarks',
  jobs: 'jobs',
  jobCreate: 'jobs/create',
  jobEdit: 'jobs/edit/:id',
  privacy: 'privacy',
  terms: 'terms',
  jobDetails: 'details/:id',
  test: 'test',
} as const;

export type AuthRoutes = typeof AUTH_ROUTES;
export type AppRoutes = typeof APP_ROUTES;

export const AUTH_ROUTES_TOKEN = new InjectionToken<AuthRoutes>('AUTH_ROUTES_TOKEN');

export const APP_ROUTES_TOKEN = new InjectionToken<AppRoutes>('APP_ROUTES_TOKEN');
