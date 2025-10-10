import { Injectable } from '@angular/core';
import { environment } from '../../../environments/prod.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private mockRooms: Array<any> = [];
  private apiUrl: string = `${environment.apiUrl}/rooms`;
  private production: boolean = environment.production; // true for production
  private roomsCatalog: Array<any> = [];
  constructor (private httpClient: HttpClient) { }

  getRooms(): Observable<Array<any>> {
    if (!this.production) {
      return new Observable((observer) => {
        observer.next(this.mockRooms);
        observer.complete();
      });
    }
    return this.httpClient.get<Array<any>>(this.apiUrl);
  }

  getReservations(): Observable<Array<Reservation>> {
    if (!this.production) {
      return new Observable((observer) => {
        observer.next(environment.reservations as Array<Reservation>);
        observer.complete();
      });
    }
    return this.httpClient.get<Array<Reservation>>(`${this.apiUrl}/reservations`);
  }
}
