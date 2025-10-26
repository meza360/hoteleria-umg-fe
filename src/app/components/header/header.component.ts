import { Component } from '@angular/core';
import { ReservationsService } from '../../core/services/reservations.service';
import { Reservation } from '../../core/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserListreservationDialogComponent } from '../user-listreservation-dialog/user-listreservation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private reservations: Array<Reservation> = [];
  constructor (private reservationsService: ReservationsService,
    public dialog: MatDialog
  ) { }

  onSearchReservations() {
    const dialogRefLoadingPage: MatDialogRef<UserListreservationDialogComponent> = this.dialog.open(UserListreservationDialogComponent,
      {
        width: '80%',
        data: "",
        disableClose: false
      });
    this.reservationsService.getReservationsPerCustomer('usuario@example.com')
      .subscribe({
        next: (reservations) => {
          this.reservations = reservations;
        },
        complete: () => {
          console.log('Reservations loaded:', this.reservations);
        }
      });
  }

}
