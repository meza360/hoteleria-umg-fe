import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { SharedModule } from './shared.module';
import { MaterialModule } from './material.module';
import { ManagementModule } from './pages/management/management.module';
import { CustomerModule } from './pages/customer/customer.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';
import { ApiHeadersInterceptor } from './core/interceptors/api-headers.interceptor';
import { UserReservationDialogComponent } from './components/user-reservation-dialog/user-reservation-dialog.component';
import { UserListreservationDialogComponent } from './components/user-listreservation-dialog/user-listreservation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserReservationDialogComponent,
    UserListreservationDialogComponent,
    LoadingDialogComponent
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
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideServerRendering(),
    { provide: HTTP_INTERCEPTORS, useClass: ApiHeadersInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
