import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { asyncScheduler, BehaviorSubject, Observable, observeOn } from 'rxjs';
import { Reservation } from '../../../../core/models';
import { RoomsService } from '../../../../core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements AfterViewInit {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this.isLoading.asObservable().pipe(observeOn(asyncScheduler));
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Reservation>;
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();
  localData: Reservation[] = [];
  displayedColumns: Array<string> = ['id', 'guest', 'nights', 'options'];

  constructor (private roomService: RoomsService) {
    this.refreshCatalog();
  }

  ngAfterViewInit(): void {
    /*Este observable es para indicar
         que ya se pueden asignar valores a los elementos del dataSource */
    this.isLoading$.subscribe(
      {
        next: (loading: boolean): void => {
          if (!loading) {
            this.refreshDataSource();
          }
        }
      }
    );
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.localData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  refreshCatalog(): void {
    this.isLoading.next(true);
    this.roomService.getReservations()
      .subscribe({
        next: (response: Array<Reservation>): void => {
          this.localData = response;
        }, error: (e: HttpErrorResponse): void => {
          console.error(e);
          this.isLoading.next(false);
        }, complete: (): void => { this.isLoading.next(false); }
      });
  }
}
