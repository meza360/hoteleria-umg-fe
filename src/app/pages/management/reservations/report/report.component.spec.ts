import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import { SharedModule } from '../../../../shared.module';
import { RoomsService } from '../../../../core/services';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  let roomService: jasmine.SpyObj<RoomsService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ReportComponent],
      imports: [SharedModule],
      providers: [
        { provide: RoomsService, useValue: roomService }
      ]
    })
      .compileComponents();

    //fixture = TestBed.createComponent(ReportComponent);
    //component = fixture.componentInstance;
    roomService = TestBed.inject(RoomsService) as jasmine.SpyObj<RoomsService>;
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
