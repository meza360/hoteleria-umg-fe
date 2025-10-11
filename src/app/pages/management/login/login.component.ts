import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { asyncScheduler, BehaviorSubject, Observable, observeOn } from 'rxjs';
import { LoggingService, AuthService } from '../../../core/services';
import { AuthUser } from '../../../core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../../components/loading-dialog/loading-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  dialogref: MatDialogRef<LoadingDialogComponent> | null = null;
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

  constructor (private formBuilder: FormBuilder,
    private logger: LoggingService,
    private AuthService: AuthService,
    private matDialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  openLoadingDialog(): void {
    this.dialogref = this.matDialog.open(LoadingDialogComponent,
      {
        width: '70%',
        data: "",
        disableClose: true
      });
  }

  closeLoadingDialog(): void {
    this.dialogref?.close();
  }

  onSubmit(): void {
    this.isLoading$.next(true);
    this.openLoadingDialog();
    if (!this.userLoginForm.valid) {
      this.openSnackBar();
      this.isLoading$.next(false);
      this.closeLoadingDialog();
    }
    const { username, password } = this.userLoginForm.value;
    this.logger.logDebug('Iniciando sesion para: ', username);
    this.AuthService.login(username || '', password || '')
      .subscribe(
        {
          next: (response: AuthUser | null): void => {
            this.logger.logInfo('Login exitoso', response);
          },
          error: (error: HttpErrorResponse): void => {
            this.logger.logError('Error iniciando sesion: ', error);
            this.closeLoadingDialog();
          },
          complete: (): void => {
            this.isLoading$.next(false);
            this.openSnackBar('Bienvenido');
            this.closeLoadingDialog();
            this.router.navigate(['../reservations'], { relativeTo: this.activeRoute });
          }
        });
  }

  openSnackBar(text?: string) {
    this._snackBar.open(text || 'Usuario o contraseña incorrecta',
      'X',
      {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
  }
}
