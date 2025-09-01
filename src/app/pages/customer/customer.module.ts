import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { RoomsComponent } from './information/rooms/rooms.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    RoomsComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
