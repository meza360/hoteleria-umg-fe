import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthUser } from '../../../core/models/AuthUser';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, ReactiveFormsModule, MatDialogModule, MatProgressBar],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show snackbar with "Bienvenido" on successful login', () => {
    const mockAuthUser: AuthUser = {
      token: 'fake-token',
      expiration: new Date(new Date().getTime() + 3600 * 1000).toISOString(),
      username: 'admin',
      roles: ['admin', 'user']
    };

    authService.login.and.returnValue(of(mockAuthUser)); // Simular inicio de sesión exitoso

    component.userLoginForm.setValue({ username: 'admin', password: 'admin123' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('admin', 'admin123');
    expect(snackBar.open).toHaveBeenCalledWith('Bienvenido', 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  });
});
