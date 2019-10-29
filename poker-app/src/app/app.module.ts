import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopNavComponent, FooterComponent } from './components/shared';
import { HomeModule } from './components/home';

import { routes } from './app.routes';

import { PokerEvaluateService } from "./providers/poker-evaluate/poker-evaluate.service";

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
    RouterModule.forRoot(routes)
  ],
  providers: [PokerEvaluateService],
  bootstrap: [AppComponent],
  exports: [TopNavComponent, FooterComponent]
})

export class AppModule { }
