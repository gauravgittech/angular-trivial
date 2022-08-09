import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { ToastrModule } from 'ngx-toastr';
import { ErrorHandlerInterceptor } from './error-handler/error-handler.interceptor';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
