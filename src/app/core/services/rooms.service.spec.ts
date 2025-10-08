import { TestBed } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(RoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
