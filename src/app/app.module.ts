import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SetInterceptorService} from './services/set-interceptor/set-interceptor.service';
import {ToastrModule} from 'ng6-toastr-notifications';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GetInterceptorService} from './services/get-interceptor/get-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FullComponent } from './components/full/full.component';

// import {} from 'ngx-bootstrap';

// import { MaterialModule } from "../../src/app/requests/Material-Module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FullComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SetInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: GetInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
