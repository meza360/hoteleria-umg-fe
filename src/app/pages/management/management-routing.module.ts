import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const managementRouter: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(managementRouter)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
