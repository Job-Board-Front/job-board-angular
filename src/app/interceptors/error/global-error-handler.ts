import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: any): void {
    const effectiveError = error.cause || error;
    if (effectiveError.isHandled || effectiveError.rejection?.isHandled) {
      return;
    }
    const logger = this.injector.get(LoggingService);
    const messageService = this.injector.get(MessageService);

    const message = error.message ? error.message : error.toString();
    logger.logError(message, error);

    // 2. Show Toast (run inside NgZone to ensure UI updates)
    this.zone.run(() => {
      messageService.add({
        severity: 'error',
        summary: 'Application Error',
        detail: 'An unexpected error occurred. Please reload the page.',
        sticky: true 
      });
    });
  }
}