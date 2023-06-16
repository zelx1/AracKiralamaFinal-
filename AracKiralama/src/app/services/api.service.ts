import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Arac } from '../models/Arac';
import { Kiralanan } from '../models/Kiralanan';
import { Uye } from '../models/Uye';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SepetTemizle(uyeId: any) {
    throw new Error('Method not implemented.');
  }
  apiUrl: string = "https://localhost:44327/api/";
  siteUrl: string = "https://localhost:44327/";
  constructor(
    public http: HttpClient
  ) { }

  tokeAL(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader })
  }

  OturumKontrol() {
    if (localStorage.getItem("token")) {
      return true
    } else {
      return false
    }
  }

  YetkiKontrol(yetkiler: string[]) {
    var sonuc: boolean = false;
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
        return false;
      })
    }
    return sonuc;
  }
  //Kategori Api

  KategoriListele(){
    return this.http.get<Kategori[]>(this.apiUrl + "kategoriliste")
  }
  KategoriById(katId: number){
    return this.http.get<Kategori>(this.apiUrl +"kateogribyid/"+ katId);
  }
  KategoriEkle(Kategori: Kategori){
    return this.http.post(this.apiUrl + "kategoriekle", Kategori);
  }
  KategoriDuzenle(Kategori: Kategori){
    return this.http.put(this.apiUrl + "kategoriduzenle", Kategori)
  }
  KategoriSil(katId: number){
    return this.http.delete(this.apiUrl + "kategorisil/"+ katId);
  }
  //Bitiş

  //Arac 
  AracListele(){
    return this.http.get<Arac[]>(this.apiUrl + "aracliste")
  }
  AracListeleSonEklenenler(x: number){
    return this.http.get<Arac[]>(this.apiUrl + "aracsoneklenenler/" + x)
  }
  AracListeleByKatId(katId: number){
    return this.http.get<Arac[]>(this.apiUrl + "aracbykatid/"+ katId)
  }
  AracById(AracId: number){
    return this.http.get<Arac>(this.apiUrl +"aracbyid/"+ AracId);
  }
  AracEkle(Arac: Arac){
    return this.http.post(this.apiUrl + "aracekle", Arac);
  }
  AracDuzenle(Arac: Arac){
    return this.http.put(this.apiUrl + "aracduzenle", Arac)
  }
  AracSil(aracId: number){
    return this.http.delete(this.apiUrl + "aracsil/"+ aracId);
  }
  //Bitiş

  //Kiralanan
  KiralananListele(){
    return this.http.get<Kiralanan[]>(this.apiUrl + "rentedliste")
  }
  KiralananByUyeId(uyeId: number){
    return this.http.get<Kiralanan[]>(this.apiUrl +"rentedbyuyeid/"+ uyeId);
  }
  KiralananEkle(Kiralanan: Kiralanan){
    return this.http.post(this.apiUrl + "rentedekle", Kiralanan);
  }
  KiralananSil(kiralananId: number){
    return this.http.delete(this.apiUrl + "rentedsil/"+ kiralananId);
  }
  //Bitiş

  //Uye 

  UyeListe(){
    return this.http.get<Uye[]>(this.apiUrl + "uyelistele")
  }
  UyeById(uyeId:number){
    return this.http.get<Uye>(this.apiUrl + "uyebyid/"+ uyeId)
  }
  UyeEkle(uye: Uye){
    return this.http.post(this.apiUrl+ "uyeekle", uye)
  }
  UyeKayit(uye: Uye){
    return this.http.post(this.apiUrl + "uyekayit", uye)
  }
  UyeDuzenle(uye: Uye){
    return this.http.put(this.apiUrl + "uyeduzenle", uye)
  }
  UyeSil(uyeId: number){
    return this.http.delete(this.apiUrl+ "uyesil/"+ uyeId)
  }
  //Bitiş
}
