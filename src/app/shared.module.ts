import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from './pages/shared/not-found/not-found.component';
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class SharedModule { }
