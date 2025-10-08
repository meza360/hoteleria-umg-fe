import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { LoginComponent } from './login/login.component';
import { ManagementRoutingModule } from './management-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
