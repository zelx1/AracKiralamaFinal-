import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthGuard {

  constructor(
    public api: ApiService,
    public alert: AlertService,
    public router: Router
  ) { }

  canActive(route: ActivatedRouteSnapshot) {
    var yetkiler = route.data["yetkiler"] as Array<string>
    var gitUrl = route.data["gerigit"] as string
    if (!this.api.OturumKontrol() || !yetkiler || !yetkiler.length) {
      this.router.navigate([gitUrl]);
      return false;
    }
    var sonuc: boolean = false;
    sonuc = this.api.YetkiKontrol(yetkiler);
    return sonuc;
  }

}
