import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AracDialogComponent } from './components/dialogs/arac-dialog/arac-dialog.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { KategoriAracComponent } from './components/kategori-arac/kategori-arac.component';
import { AracDetayComponent } from './components/arac-detay/arac-detay.component';
import { SatinComponent } from './components/dialogs/Satin/Satin.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AlertService } from './services/alert.service';
import { ApiService } from './services/api.service';
import { AdminKategoriComponent } from './components/Admin/admin-kategori/admin-kategori.component';
import { AdminAracComponent } from './components/Admin/admin-arac/admin-arac.component';
import { AdminUyeComponent } from './components/Admin/admin-uye/admin-uye.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    KategoriAracComponent,
    AracDetayComponent,
    AdminKategoriComponent,
    AdminAracComponent,
    AdminUyeComponent,


    //Dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AracDialogComponent,
    UyeDialogComponent,
    SatinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AracDialogComponent,
    UyeDialogComponent,
    SatinComponent
  ],
  providers: [ApiService, AlertService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
