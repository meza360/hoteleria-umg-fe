import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './pages/customer/information/rooms/rooms.component';
import { OurServicesComponent } from './pages/customer/information/our-services/our-services.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ApiHeadersInterceptor } from './core/interceptors/api-headers.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ManagementModule } from './pages/management/management.module';
import { CustomerModule } from './pages/customer/customer.module';
import { SharedModule } from './shared.module';
import { MaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    AppRoutingModule,
    ManagementModule,
    CustomerModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    provideServerRendering(),
    { provide: HTTP_INTERCEPTORS, useClass: ApiHeadersInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
