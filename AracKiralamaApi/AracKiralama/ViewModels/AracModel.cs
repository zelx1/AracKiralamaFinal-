using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracKiralama.ViewModels
{
    public class AracModel
    {
        public int aracId { get; set; }
        public int aracKatId { get; set; }
        public string aracModel { get; set; }
        public string aracMarka { get; set; }
        public string aracYil { get; set; }
        public Nullable<int> aracFiyat { get; set; }
        public string aracFoto { get; set; }
    }
}