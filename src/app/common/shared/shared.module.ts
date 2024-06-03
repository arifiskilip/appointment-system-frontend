import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,

  ]
})
export class SharedModule { }
