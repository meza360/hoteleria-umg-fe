import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../../core/services/reservations.service';
import { Reservation } from '../../core/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { asyncScheduler, BehaviorSubject, Observable, observeOn } from 'rxjs';

@Component({
  selector: 'app-user-listreservation-dialog',
  templateUrl: './user-listreservation-dialog.component.html',
  styleUrl: './user-listreservation-dialog.component.scss'
})
export class UserListreservationDialogComponent {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this.isLoading.asObservable().pipe(observeOn(asyncScheduler));
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Reservation>;
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();
  displayedColumns: Array<string> = ['id', 'room', 'nights', 'total'];
  localData: Array<Reservation> = [];
  hasData: boolean = false;
  clientForm: FormGroup<{
    email: FormControl<string | null>;
  }> = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.required),
  });


  constructor (private readonly formBuilder: FormBuilder,
    private reservationService: ReservationsService
  ) { }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.localData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  searchRooms() {
    this.isLoading.next(true);
    console.log('Searching reservations for email:', this.clientForm.value.email);
    const { email } = this.clientForm.value;
    if (!email) {
      console.error('Email is required to search reservations.');
      return;
    }
    this.reservationService.getReservationsPerCustomer(email).subscribe({
      next: (reservations: Reservation[]) => {
        console.log('Found reservations:', reservations);
        this.localData = reservations;
      },
      error: (error) => {
        console.error('Error searching reservations:', error);
        this.isLoading.next(false);
      },
      complete: () => {
        this.refreshDataSource();
        this.hasData = this.localData.length > 0;
        this.isLoading.next(false);
      }
    });
  }

}
