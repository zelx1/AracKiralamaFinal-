import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Arac } from 'src/app/models/Arac';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-arac-dialog',
  templateUrl: './arac-dialog.component.html',
  styleUrls: ['./arac-dialog.component.css']
})
export class AracDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit: Arac;
  islem!: string;
  kategoriler: Kategori[];
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AracDialogComponent>,
    public frmBuild: FormBuilder,
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Araç Ekle"
      this.yeniKayit = new Arac();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Araç Düzenle"
      this.yeniKayit = data.kayit
    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      aracModel: this.yeniKayit.aracModel,
      aracMarka: this.yeniKayit.aracMarka,
      aracFiyat: this.yeniKayit.aracFiyat,
      aracYil: this.yeniKayit.aracYil,
      aracKatId: this.yeniKayit.aracKatId,
      aracFoto: this.yeniKayit.aracFoto
    })
  }
  KategoriListele(){
    this.api.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    })
  }
}
