import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
})
export class SharedModule { }
