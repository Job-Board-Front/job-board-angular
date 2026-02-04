import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

//firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, authState, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { authInterceptor } from './interceptors/auth/auth-interceptor';
import { logInterceptor } from './interceptors/log/log-interceptor';
import { errorInterceptor } from './interceptors/error/error.interceptor';
import { GlobalErrorHandler } from './interceptors/error/global-error-handler';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {
  APP_ROUTES,
  APP_ROUTES_TOKEN,
  AUTH_ROUTES,
  AUTH_ROUTES_TOKEN,
} from './route-names/route-names.constants';
import { firstValueFrom, take } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withEnabledBlockingInitialNavigation(), withViewTransitions()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAppInitializer(() => {
      const auth = inject(Auth);
      // This promise blocks the app from rendering until Firebase says "Logged In" or "Null"
      return firstValueFrom(authState(auth).pipe(take(1)));
    }),
    provideHttpClient(withInterceptors([authInterceptor, logInterceptor, errorInterceptor])),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: 'dark',
        },
      },
    }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    MessageService,
    importProvidersFrom(NgxUiLoaderModule),
    {
      provide: AUTH_ROUTES_TOKEN,
      useValue: AUTH_ROUTES,
    },
    {
      provide: APP_ROUTES_TOKEN,
      useValue: APP_ROUTES,
    },
  ],
};
