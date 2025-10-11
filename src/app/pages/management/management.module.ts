import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { LoginComponent } from './login/login.component';
import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './reservations/report/report.component';
import { FormComponent } from './reservations/form/form.component';

@NgModule({
  declarations: [
    LoginComponent,
    ReportComponent,
    FormComponent
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
