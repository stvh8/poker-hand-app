import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';1

import { AppComponent } from './app.component';
import { TopNavComponent, FooterComponent } from './shared';
import { HomeModule } from './home/index';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TopNavComponent, FooterComponent]
})
export class AppModule { }
