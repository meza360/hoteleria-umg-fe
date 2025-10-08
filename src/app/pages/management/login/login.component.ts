import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { asyncScheduler, BehaviorSubject, Observable, observeOn } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: Observable<boolean> = this.isLoading$.asObservable()
    .pipe(observeOn(asyncScheduler));
  userLoginForm: FormGroup<{
    username: FormControl<string | null>,
    password: FormControl<string | null>;
  }> = this.formBuilder.group({
    username: new FormControl<string | null>('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl<string | null>('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  constructor (private formBuilder: FormBuilder) { }

  onSubmit() {
    this.openSnackBar();
    if (!this.userLoginForm.valid) {
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.open('Usuario o contraseña incorrecta',
      'X',
      {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
  }
}
