import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

//firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth/auth-interceptor';
import { logInterceptor } from './interceptors/log/log-interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withEnabledBlockingInitialNavigation(),withViewTransitions()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptors([authInterceptor, logInterceptor])),
    importProvidersFrom(NgxUiLoaderModule),
  ],
};
