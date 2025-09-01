import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const customerRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
