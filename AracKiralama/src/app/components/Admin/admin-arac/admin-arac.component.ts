import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Arac } from 'src/app/models/Arac';
import { AracDialogComponent } from '../../dialogs/arac-dialog/arac-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-arac',
  templateUrl: './admin-arac.component.html',
  styleUrls: ['./admin-arac.component.css']
})
export class AdminAracComponent implements OnInit {
  araclar: Arac[];
  dataSource: any;
  displayedColumns = ['aracModel', 'aracMarka', 'aracYil', 'aracFiyat', 'Islemler']
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef!: MatDialogRef<AracDialogComponent>
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public api: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.AracListele();
  }
  AracListele(){
    this.api.AracListele().subscribe(d => {
      this.araclar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  Ekle() {
    var yeniKayit: Arac = new Arac();
    this.dialogRef = this.matDialog.open(AracDialogComponent, {
      width: '500px',
      height: '680px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.api.AracEkle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        })
      }
    })
  }

  Duzenle(arac: Arac) {
    console.log(arac);
    this.dialogRef = this.matDialog.open(AracDialogComponent, {
      width: '500px',
      height: '680px',
      data: {
        kayit: arac,
        islem: 'duzenle'
      }
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.aracId = arac.aracId
        this.api.AracDuzenle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        })
      }
    })
  }
  Sil(arac: Arac) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      height: '230px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = arac.aracModel + " adlı Araç Silinecektir Onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.api.AracSil(arac.aracId).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        })
      }
    })
  }
}