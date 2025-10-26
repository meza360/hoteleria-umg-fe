import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { asyncScheduler, BehaviorSubject, observeOn } from 'rxjs';
import { ReservationsService } from '../../core/services/reservations.service';

@Component({
  selector: 'app-user-reservation-dialog',
  templateUrl: './user-reservation-dialog.component.html',
  styleUrl: './user-reservation-dialog.component.scss'
})
export class UserReservationDialogComponent {


  datesSelector: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  datesSelector$ = this.datesSelector.asObservable().pipe(observeOn(asyncScheduler));
  minDate: Date = new Date();
  maxDate: Date = new Date();
  clientForm: FormGroup<{
    email: FormControl<string | null>;
    name: FormControl<string | null>;
    dateRange: FormGroup<
      {
        start: FormControl<Date | null>;
        end: FormControl<Date | null>;
      }>;
  }> = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.required),
    name: this.formBuilder.control('', Validators.required),
    dateRange: this.formBuilder.group({
      start: this.formBuilder.control(new Date(), Validators.required),
      end: this.formBuilder.control(new Date(), Validators.required)
    })
  });

  constructor (private readonly formBuilder: FormBuilder,
    private reservationService: ReservationsService
  ) {
    //Se limitan las fechas que se pueden seleccionar, desde el día actual
    const currentYear: number = new Date().getFullYear();
    const currentMonth: number = new Date().getMonth();
    const currentDay: number = new Date().getDate();
    //La fecha minima, es un dia despues del día actual
    this.minDate = new Date(currentYear, currentMonth, currentDay);
    //La fecha maximas, es 6 meses despues del día actual
    this.maxDate = new Date(currentYear, currentMonth + 6);
  }

  handleFindAvailableDates(event: MatDatepickerInputEvent<Date> | Event | KeyboardEvent) {

    if (event instanceof Event || event instanceof KeyboardEvent) {
      //this.smsCampaignForm.controls.campaignInformation.controls.campaignDate.setValue(null);
      this.datesSelector.next([]);
    }
    if (event instanceof MatDatepickerInputEvent) {
      //this.utilsService.findAvailableDates(event, this.unavailableDates, this.availableSchedules.map((n) => n), this.datesSelector);
    }
  }

  reserveRoom() {
    const {
      email, name, dateRange
    } = this.clientForm.value;
    console.log('Valores');
    console.log(email, name, dateRange);
    // Aquí se puede agregar la lógica para reservar la habitación

  }
}
