import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './reservations/report/report.component';
import { FormComponent } from './reservations/form/form.component';

const managementRouter: Routes = [
  {
    path: 'management/login',
    component: LoginComponent
  },
  {
    path: 'management/reservations',
    component: ReportComponent
  },
  {
    path: 'management/reservations/newReservation',
    component: FormComponent
  },
  {
    path: 'management/reservations/:id',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(managementRouter)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
