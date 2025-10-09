import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { AuthUser } from '../models/AuthUser';
import { environment } from '../../../environments/prod.env';
import { map, Observable, tap } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private env = environment.production;
  constructor (private httpClient: HttpClient,
    private logger: LoggingService
  ) { }

  login(username: string, password: string): Observable<AuthUser> {
    if (!environment.production) {
      this.logger.logDebug('Modo desarrollo: Usando credenciales falsas');
      return new Observable<AuthUser>((observer) => {
        observer.next(
          {
            token: 'fake-token',
            expiration: new Date(new Date().getTime() + 3600 * 1000).toISOString(),
            username: 'admin',
            roles: ['admin', 'user']
          }
        );
        observer.complete();
      });
    }
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/api/auth/login`,
      { username, password }
    ).pipe(
      //tap(this.logger.logDebug),
      map(response => {
        if (response.isSuccess && <AuthUser>response?.value) {
          return <AuthUser>response.value;
        }
        else {
          throw new Error(response.error || 'Error desconocido');
        }
      })
    );
  }
}
