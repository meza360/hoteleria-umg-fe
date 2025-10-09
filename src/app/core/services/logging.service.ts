import { Injectable } from '@angular/core';
import { environment } from '../../../environments/prod.env';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor () { }

  logInfo(message: string, ...optionalParams: any[]): void {
    console.info(`[INFO]: ${message}`, ...optionalParams);
  }

  logWarn(message: string, ...optionalParams: any[]): void {
    console.warn(`[WARN]: ${message}`, ...optionalParams);
  }

  logError(message: string, ...optionalParams: any[]): void {
    console.error(`[ERROR]: ${message}`, ...optionalParams);
  }

  logDebug(message: string, ...optionalParams: any[]): void {
    if (!environment.production)
      console.debug(`[DEBUG]: ${message}`, ...optionalParams);
  }
}
