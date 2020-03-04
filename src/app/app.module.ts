import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ApiCallsService } from './services/api-calls.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/httpReq';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiCallsService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule { }
