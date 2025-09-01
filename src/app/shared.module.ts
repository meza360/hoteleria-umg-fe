import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [

  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  exports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class SharedModule { }
