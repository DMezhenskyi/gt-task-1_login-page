import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from '../../shared/signin/signin.component';
import { IndexPageComponent } from './index-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SigninComponent,
    IndexPageComponent
  ],
  exports: [
    SigninComponent,
    IndexPageComponent
  ]
})
export class IndexPageModule { }
