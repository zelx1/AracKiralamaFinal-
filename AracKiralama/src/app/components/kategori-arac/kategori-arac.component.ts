import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Arac } from 'src/app/models/Arac';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SatinComponent } from '../dialogs/Satin/Satin.component';

@Component({
  selector: 'app-kategori-arac',
  templateUrl: './kategori-arac.component.html',
  styleUrls: ['./kategori-arac.component.css']
})
export class KategoriAracComponent implements OnInit {
  araclar: Arac[];
  katId: number;
  matDialogRef: any;
  matDialog: any;
  sonuc: any;
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public alert: AlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((d: any) => {
      this.katId = d.katId
    })
    this.AraclariGetir();
  }
  AraclariGetir(){
    this.api.AracListeleByKatId(this.katId).subscribe(d => {
      this.araclar = d;
    })
  }
Kirala(aracFiyat: number) {
  this.matDialogRef = this.matDialog.open(SatinComponent, {
    width: '450px',
    height: '600px',
    data: aracFiyat
  });
  this.matDialogRef.afterClosed().subscribe((s: any)=> {
    if (s) {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Araç Kiralandı!";
      this.alert.AlertUygula(this.sonuc)
    }
  })
}
}
