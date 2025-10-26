import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/prod.env';
import { Reservation } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private mockReservations: Array<Reservation> = [];
  private apiUrl: string = `${environment.apiUrl}/reservations`;
  private production: boolean = environment.production; // true for productions
  constructor (private httpClient: HttpClient) { }

  getReservationsPerCustomer(email: string): Observable<Array<Reservation>> {
    if (!this.production) {
      return new Observable((observer) => {
        this.mockReservations = <Array<Reservation>>environment.reservations;
        observer.next(this.mockReservations.filter(reservation => (reservation.billTo.email == email)));
        observer.complete();
      });
    }
    return this.httpClient.get<Array<Reservation>>(this.apiUrl);
  }

  getAllReservations(): Observable<Array<Reservation>> {
    if (!this.production) {
      return new Observable((observer) => {
        observer.next(this.mockReservations);
        observer.complete();
      });
    }
    return this.httpClient.get<Array<Reservation>>(this.apiUrl);
  }
}
