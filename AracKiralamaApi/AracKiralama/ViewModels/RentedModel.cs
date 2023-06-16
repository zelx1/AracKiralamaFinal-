using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracKiralama.ViewModels
{
    public class RentedModel
    {
        public int RentId { get; set; }
        public int aracId { get; set; }
        public int uyeId { get; set; }
        public string RentTarih { get; set; }
        public AracModel aracBilgi { get; set; }
    }
}