import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { Arac } from 'src/app/models/Arac';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SatinComponent } from '../dialogs/Satin/Satin.component';

@Component({
  selector: 'app-arac-detay',
  templateUrl: './arac-detay.component.html',
  styleUrls: ['./arac-detay.component.css']
})
export class AracDetayComponent implements OnInit {
  arac: Arac;
  secAracId: number;
  matDialogRef: MatDialogRef<SatinComponent>
  s: Sonuc = new Sonuc();
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public alert: AlertService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((d:any) => {
      this.secAracId = d.aracId
    })
    this.AracGetir();
  }
  AracGetir(){
    this.api.AracById(this.secAracId).subscribe(d => {
      this.arac = d;
    })
  }
  Kirala(aracFiyat: number) {
    this.matDialogRef = this.matDialog.open(SatinComponent, {
      width: '450px',
      height: '600px',
      data: aracFiyat
    });
    this.matDialogRef.afterClosed().subscribe((d: any)=> {
      if (d) {
        this.s.islem = true;
        this.s.mesaj = "Araç Kiralandı!";
        this.alert.AlertUygula(this.s)
      }
    })
  }
}
