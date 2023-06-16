import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminKategoriComponent } from './components/Admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/Admin/admin-uye/admin-uye.component';
import { AdminAracComponent } from './components/Admin/admin-arac/admin-arac.component';
import { KategoriAracComponent } from './components/kategori-arac/kategori-arac.component';
import { AracDetayComponent } from './components/arac-detay/arac-detay.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin-kategori',
    component: AdminKategoriComponent,
  },
  {
    path: 'admin-uye',
    component: AdminUyeComponent,
  },
  {
    path: 'admin-arac',
    component: AdminAracComponent,
  },
  {
    path: 'kategoriarac/:katId',
    component: KategoriAracComponent
  },
  {
    path: 'aracdetay/:aracId',
    component: AracDetayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
