﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class ItemGallery
    {
        [Key]
        public int ItemGalleryId { get; set; }
        public int GalleryId { get; set; }
        public int ProductId { get; set; }
        public string ImageUrl { get; set; }
        public string ImageBlob { get; set; }

        [ForeignKey("GalleryId")]
        public Gallery Gallery { get; set; } // Many-to-One relationship

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
