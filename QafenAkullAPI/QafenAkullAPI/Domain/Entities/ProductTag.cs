﻿using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class ProductTag
    {
        [Key]
        public int ProductTagId { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
