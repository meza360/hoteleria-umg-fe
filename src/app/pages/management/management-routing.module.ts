import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const managementRouter: Routes = [
  {
    path: 'management/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(managementRouter)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
