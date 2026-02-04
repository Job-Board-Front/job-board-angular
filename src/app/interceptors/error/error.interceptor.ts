import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const logger = inject(LoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      

      let errorMessage = 'An unexpected error occurred.';
      let summary = 'Error';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            summary = 'Bad Request';
            errorMessage = error.error?.message || 'Invalid request data.';
            break;
          case 401:
            summary = 'Unauthorized';
            errorMessage = 'Please log in again.';
            break;
          case 403:
            summary = 'Forbidden';
            errorMessage = 'You do not have permission to perform this action.';
            break;
          case 404:
            summary = 'Not Found';
            errorMessage = 'The requested resource was not found.';
            break;
          case 500:
            summary = 'Server Error';
            errorMessage = 'Something went wrong on our end. Please try again later.';
            break;
          case 0:
            summary = 'Connection Error';
            errorMessage = 'Unable to connect to the server. Check your internet connection.';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      logger.logError(errorMessage, error);

        messageService.add({
          severity: 'error',
          summary: summary,
          detail: errorMessage,
          life: 5000 
        });

      const handledError = error as any;
      handledError.isHandled = true;

      return throwError(() => handledError);
    })
  );
};