import { Component, OnInit } from '@angular/core';
import { AuthClientService } from '../../../../core/services/auth-client.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserReservationDialogComponent } from '../../../../components/user-reservation-dialog/user-reservation-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {

  constructor (private authClient: AuthClientService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {

  }

  reserveRoom() {
    if (this.authClient.userValue) {
      console.log('Existe un usuario para reservar');
    }
    else {
      console.log('Autenticando usuario');
      const dialogRefLoadingPage: MatDialogRef<UserReservationDialogComponent> = this.dialog.open(UserReservationDialogComponent,
        {
          width: '80%',
          data: "",
          disableClose: false
        });

    }
  }

}
