import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatGridListModule,
  MatCardModule
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule {}
