import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';


if (environment.production) {
  if (window) {
    window.console.log = () => {};
    window.console.warn = () => {};
    window.console.error = () => {};
  }
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
