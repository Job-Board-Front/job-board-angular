import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  
  logError(message: string, stack: any) {
    console.error('Checking Error Logging Service:', message, stack);
  } 

  logWarning(message: string) {
    console.warn('Warning:', message);
  }
}