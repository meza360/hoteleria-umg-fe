import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './information/rooms/rooms.component';
import { HomeComponent } from './home/home.component';
const customerRoutes: Routes = [

  {
    path: 'customer/information/home',
    component: HomeComponent
  },
  {
    path: 'customer/information/rooms',
    component: RoomsComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];


@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
