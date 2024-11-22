import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './app/index/index.component';
import { AdminHotelModelModule } from './admin-hotel-model/admin-hotel-model.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './app/register/register.component';
import { LoginComponent } from './app/login/login.component';
import { AppLoginLayoutComponent } from './app/app-login-layout/app-login-layout.component';
import { CustomerHotelModelModule } from './customer-hotel-model/customer-hotel-model.module';
import { CookieService } from 'ngx-cookie-service';
import {  AuthInterceptorService, httpInterceptorProviders } from 'src/services/auth.interceptor.service';
import { HotelModelService } from 'src/services/hotel-model.service';





@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterComponent,
    LoginComponent,
    AppLoginLayoutComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AdminHotelModelModule,
    HttpClientModule,
    CustomerHotelModelModule,
    
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true // Ensure it is added to the HTTP_INTERCEPTORS chain
    },
    HotelModelService, // Make sure this service is also provided
     // AuthInterceptorService,
      CookieService,
      httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
