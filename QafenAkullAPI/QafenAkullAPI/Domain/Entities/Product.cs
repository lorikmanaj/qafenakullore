using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Background { get; set; }
        public int StockId { get; set; }

        //Blob's section
        public string MainImageBlob { get; set; }
        public string BgImageBlob { get; set; }
        
        [InverseProperty("Product")]
        public List<Variety> Varieties { get; set; } // One-to-Many relationship
        [InverseProperty("Product")]
        public List<Gallery> Galleries { get; set; } // One-to-Many relationship
        [InverseProperty("Product")]
        public List<ProductReview> ProductReviews { get; set; } // One-to-Many relationship
        [InverseProperty("Product")]
        public List<ItemGallery> ItemGalleries { get; set; }
        public List<ProductTag> ProductTags { get; set; }
        //public virtual ICollection<OrderProduct> OrderProducts { get; set; }

        //[InverseProperty("Product")]
    }
}
