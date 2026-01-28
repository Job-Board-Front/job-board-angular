import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

//firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth/auth-interceptor';
import { logInterceptor } from './interceptors/log/log-interceptor';
import { errorInterceptor } from './interceptors/error/error.interceptor';
import { GlobalErrorHandler } from './interceptors/error/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    // @ts-ignore: Deprecated in v20 but required for PrimeNG until v23
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptors([authInterceptor, logInterceptor, errorInterceptor])),
    providePrimeNG({
        theme: {
            preset: Lara,
            options: {
                darkModeSelector: false || 'none' 
            }
        }
    }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    MessageService
  ],
};
