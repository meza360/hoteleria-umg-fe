import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListreservationDialogComponent } from './user-listreservation-dialog.component';

describe('UserListreservationDialogComponent', () => {
  let component: UserListreservationDialogComponent;
  let fixture: ComponentFixture<UserListreservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListreservationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListreservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
