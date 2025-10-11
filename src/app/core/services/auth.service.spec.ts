import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have environment set', () => {
    if (!service['env']) {
      expect(service['env']).toBeFalse();
    }

  });

  it('should return fake user in development mode', (done) => {
    if (!service['env']) {
      service.login('any', 'any').subscribe(user => {
        expect(user).toBeTruthy();
        expect(user?.username).toBe('admin');
        expect(user?.roles).toContain('admin');
        done();
      });
    }
    if (service['env']) {
      expect(service['env']).toBeTrue();
      done();
    }

  });


  it('should return error in production mode with blank credentials', (done) => {
    if (service['env']) {
      console.log('Produccion');
      service.login('', '')
        .subscribe({
          next: (user) => {
            expect(user).toBeFalsy();
            done();
          },
          error: (err: HttpErrorResponse) => {
            //console.error(err);
            expect(err.status).toBe(400);
            done();
          }
        });
    }

  });

});
