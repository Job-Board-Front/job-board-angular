import { ErrorHandler, inject, Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}
    private logger = inject(LoggingService);
    private messageService = inject(MessageService);

  handleError(error: any): void {
    const effectiveError = error.cause || error;
    if (effectiveError.isHandled || effectiveError.rejection?.isHandled) {
      return;
    }

    const message = error.message ? error.message : error.toString();
    this.logger.logError(message, error);

      this.messageService.add({
        severity: 'error',
        summary: 'Application Error',
        detail: 'An unexpected error occurred. Please reload the page.',
        sticky: true,
      });
  }
}
