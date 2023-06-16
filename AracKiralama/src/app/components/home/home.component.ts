import { Component, OnInit } from '@angular/core';
import { Arac } from 'src/app/models/Arac';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SatinComponent } from '../dialogs/Satin/Satin.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  araclar: Arac[];
  matDialogRef: MatDialogRef<SatinComponent>
  sonuc: Sonuc;
  constructor(
    public api : ApiService,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.AracListele();
  }

  AracListele(){
    this.api.AracListeleSonEklenenler(10).subscribe(d => {
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
