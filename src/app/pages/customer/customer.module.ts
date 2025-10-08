import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { RoomsComponent } from './information/rooms/rooms.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    RoomsComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    MatButtonModule
  ]
})
export class CustomerModule { }
