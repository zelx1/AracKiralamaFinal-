using AracKiralama.Models;
using AracKiralama.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracKiralama.Auth
{
    public class UyeServis
    {
        AracKiralamaEntities1 db = new AracKiralamaEntities1();
        
        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(d => d.KullaniciAdi == kadi && d.Sifre == parola).Select(s => new UyeModel()
            {
                uyeId = s.uyeId,
                KullaniciAdi = s.KullaniciAdi,
                Email = s.Email,
                Adsoyad = s.Adsoyad,
                Sifre = s.Sifre,
                uyeAdmin = s.uyeAdmin
            }).SingleOrDefault();

            return uye;
        }
    }
}