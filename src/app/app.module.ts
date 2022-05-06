import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./add/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {Interceptor} from "./add/interceptor";
import { AppComponent } from './app.component';
import {AuthService} from "./admin/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const INTERCEPTOR:Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: Interceptor
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    INTERCEPTOR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
