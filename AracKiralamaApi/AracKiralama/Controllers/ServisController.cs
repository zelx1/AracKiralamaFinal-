using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AracKiralama.Models;
using AracKiralama.ViewModels;

namespace AracKiralama.Controllers
{
    public class ServisController : ApiController
    {
        AracKiralamaEntities1 db = new AracKiralamaEntities1();
        SonucModel sonuc = new SonucModel();

        #region Kategori
        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(d => new KategoriModel()
            {
                katId = d.katId,
                katAdi = d.katAdi
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/kateogribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.Kategori.Where(d => d.katId == katId).Select(s => new KategoriModel()
            {
                katId = s.katId,
                katAdi = s.katAdi
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(d => d.katAdi == model.katAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Zaten Kayıtlı";
                return sonuc;
            }
            Kategori kayit = new Kategori();
            kayit.katAdi = model.katAdi;
            db.Kategori.Add(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi!";
            return sonuc;
        }
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(d => d.katId == model.katId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı!";
                return sonuc;
            }
            kayit.katAdi = model.katAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Duzenlendi!";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            Kategori kayit = db.Kategori.Where(d => d.katId == katId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı!";
                return sonuc;
            }
            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi!";
            return sonuc;
        }
        #endregion

        #region Arac
        [HttpGet]
        [Route("api/aracliste")]
        public List<AracModel> AracListe()
        {
            List<AracModel> liste = db.Arac.Select(s => new AracModel()
            {
                aracId = s.aracId,
                aracModel = s.aracModel,
                aracMarka = s.aracMarka,
                aracKatId = s.aracKatId,
                aracFiyat = s.aracFiyat,
                aracYil = s.aracYil,
                aracFoto = s.aracFoto
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/aracsoneklenenler/{x}")]
        public List<AracModel> AracSonEklenenler(int x)
        {
            List<AracModel> liste = db.Arac.OrderByDescending(d => d.aracId).Take(x).Select(s => new AracModel()
            {
                aracId = s.aracId,
                aracModel = s.aracModel,
                aracMarka = s.aracMarka,
                aracKatId = s.aracKatId,
                aracFiyat = s.aracFiyat,
                aracYil = s.aracYil,
                aracFoto = s.aracFoto
            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/aracbykatid/{katId}")]
        public List<AracModel> AracByKatId(int katId)
        {
            List<AracModel> liste = db.Arac.Where(d => d.aracKatId == katId).Select(s => new AracModel()
            {
                aracId = s.aracId,
                aracModel = s.aracModel,
                aracMarka = s.aracMarka,
                aracKatId = s.aracKatId,
                aracFiyat = s.aracFiyat,
                aracYil = s.aracYil,
                aracFoto = s.aracFoto
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/aracbyid/{aracId}")]
        public AracModel AracById(int aracId)
        {
            AracModel kayit = db.Arac.Where(d => d.aracId == aracId).Select(s => new AracModel()
            {
                aracId = s.aracId,
                aracModel = s.aracModel,
                aracMarka = s.aracMarka,
                aracKatId = s.aracKatId,
                aracFiyat = s.aracFiyat,
                aracYil = s.aracYil,
                aracFoto = s.aracFoto
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel AracEkle(AracModel model)
        {
            if (db.Arac.Count(d => d.aracModel == model.aracModel) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Zaten Bulunmakta";
                return sonuc;
            }
            Arac kayit = new Arac();
            kayit.aracId = model.aracId;
            kayit.aracModel = model.aracModel;
            kayit.aracMarka = model.aracMarka;
            kayit.aracKatId = model.aracKatId;
            kayit.aracYil = model.aracYil;
            kayit.aracFiyat = model.aracFiyat;
            kayit.aracFoto = model.aracFoto;
            db.Arac.Add(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Araç Eklendi!";
            return sonuc;
        }
        [HttpPut]
        [Route("api/aracduzenle")]
        public SonucModel AracDuzenle(AracModel model)
        {
            Arac kayit = db.Arac.Where(d => d.aracId == model.aracId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Bulunamadı!";
                return sonuc;
            }
            kayit.aracId = model.aracId;
            kayit.aracModel = model.aracModel;
            kayit.aracMarka = model.aracMarka;
            kayit.aracKatId = model.aracKatId;
            kayit.aracYil = model.aracYil;
            kayit.aracFiyat = model.aracFiyat;
            kayit.aracFoto = model.aracFoto;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Düzenlendi!";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/aracsil/{aracId}")]
        public SonucModel AracSil(int aracId)
        {
            Arac kayit = db.Arac.Where(d => d.aracId == aracId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Bulunamadı!";
                return sonuc;
            }
            db.Arac.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Silindi!";
            return sonuc;
        }

        [HttpPost]
        [Route("api/fotoguncelle")]
        public SonucModel AracFotoGuncelle(aracFotoModel model)
        {
            Arac arac = db.Arac.Where(s => s.aracId == model.aracId).SingleOrDefault();
            if (arac == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if (arac.aracFoto != "profil.jpg")
            {
                string path = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + arac.aracFoto);
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = arac.aracId + model.fotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            arac.aracFoto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Foto Güncellendi!";
            return sonuc;
        }

        #endregion

        #region Rented
        [HttpGet]
        [Route("api/rentedliste")]
        public List<RentedModel> RentedListe()
        {
            List<RentedModel> liste = db.Rented.Select(s => new RentedModel()
            {
                RentId = s.RentId,
                aracId = s.aracId,
                uyeId = s.uyeId,
                RentTarih = s.RentTarih
            }).ToList();

            foreach (var item in liste)
            {
                item.aracBilgi = AracById(item.aracId);
            }
            return liste;
        }
        [HttpGet]
        [Route("api/rentedbyuyeid/{uyeId}")]
        public List<RentedModel> RentedByUyeId(int uyeId)
        {
            List<RentedModel> liste = db.Rented.Where(d => d.uyeId == uyeId).Select(s => new RentedModel()
            {
                RentId = s.RentId,
                aracId = s.aracId,
                uyeId = s.uyeId,
                RentTarih = s.RentTarih
            }).ToList();

            foreach (var item in liste)
            {
                item.aracBilgi = AracById(item.aracId);
            }
            return liste;
        }
        [HttpPost]
        [Route("api/rentedekle")]
        public SonucModel RentedEkle(RentedModel model)
        {
            if (db.Rented.Count(d => d.aracId == model.aracId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Zaten Bulunmakta";
                return sonuc;
            }


            Rented kayit = new Rented();
            kayit.aracId = model.aracId;
            kayit.uyeId = model.uyeId;
            kayit.RentTarih = model.RentTarih;
            db.Rented.Add(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Araç Kiralandı!";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/rentedsil/{rentedId}")]
        public SonucModel RentedSil(int rentedId)
        {
            Rented kayit = db.Rented.Where(d => d.RentId == rentedId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kiralanan Araç bulunamadı!";
                return sonuc;
            }
            db.Rented.Remove(kayit);

            sonuc.islem = true;
            sonuc.mesaj = "Kiralanan Araç Silindi!";
            return sonuc;
        }
        #endregion

        #region Uye
        [HttpGet]
        [Route("api/uyelistele")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(s => new UyeModel()
            {
                uyeId = s.uyeId,
                KullaniciAdi = s.KullaniciAdi,
                Email = s.Email,
                Adsoyad = s.Adsoyad,
                Sifre = s.Sifre,
                uyeAdmin = s.uyeAdmin
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uye.Where(d => d.uyeId == uyeId).Select(s => new UyeModel()
            {
                uyeId = s.uyeId,
                KullaniciAdi = s.KullaniciAdi,
                Email = s.Email,
                Adsoyad = s.Adsoyad,
                Sifre = s.Sifre,
                uyeAdmin = s.uyeAdmin
            }).SingleOrDefault();

            return kayit;
        }
        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(d => d.KullaniciAdi == model.KullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Kullanıcı Adı Zaten Bulunmakta";
                return sonuc;
            }
            Uye kayit = new Uye();
            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.Email = model.Email;
            kayit.Adsoyad = model.Adsoyad;
            kayit.Sifre = model.Sifre;
            kayit.uyeAdmin = model.uyeAdmin;
            db.Uye.Add(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/uyekayit")]
        public SonucModel UyeKayit(UyeModel model)
        {
            if (db.Uye.Count(s => s.KullaniciAdi == model.KullaniciAdi || s.Email == model.Email) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Adı ve ya Email Kayıtlı!";
                return sonuc;
            }
            Uye kayit = new Uye();
            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.Adsoyad = model.Adsoyad;
            kayit.Email = model.Email;
            kayit.Sifre = model.Sifre;
            kayit.uyeAdmin = model.uyeAdmin;
            db.Uye.Add(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Başarıyla Kayıt Oldunuz!";
            return sonuc;
        }
        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(d => d.uyeId == model.uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunamadı!";
                return sonuc;
            }
            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.Email = model.Email;
            kayit.Adsoyad = model.Adsoyad;
            kayit.Sifre = model.Sifre;
            kayit.uyeAdmin = model.uyeAdmin;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(d => d.uyeId == uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunamadı!";
                return sonuc;
            }
            db.Uye.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi!";
            return sonuc;
        }
        #endregion
    }
}
