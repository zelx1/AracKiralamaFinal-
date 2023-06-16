import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Kategori } from 'src/app/models/Kategori';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.css']
})
export class AdminKategoriComponent implements OnInit {
  kategoriler: Kategori[];
  dataSource: any;
  displayedColumns = ['katAdi','Islemler']
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<KategoriDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public api: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele() {
    this.api.KategoriListele().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  Ekle() {
    var yeniKayit : Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent,{
      width: '500px',
      height: '230px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
          this.api.KategoriEkle(d).subscribe((s:any) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
                this.KategoriListele();
            }
          })
      }
    })
  }
  Duzenle(kat: Kategori){
    this.dialogRef = this.matDialog.open(KategoriDialogComponent,{
      width: '450px',
      height: '230px',
      data:{
        kayit: kat,
        islem: 'duzenle'
      }
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.katId = kat.katId
          this.api.KategoriDuzenle(d).subscribe((s:any) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
                this.KategoriListele();
            }
          })
      }
    })
  }
  Sil(kat: Kategori){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      height: '230px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj =kat.katAdi + " adlı Kategori Silinecektir Onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.api.KategoriSil(kat.katId).subscribe((s:any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
              this.KategoriListele();
          }
        })
      }
    })
  }
}