import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { SharedModule } from '../../../../shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [SharedModule, MatButtonModule, RouterModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
