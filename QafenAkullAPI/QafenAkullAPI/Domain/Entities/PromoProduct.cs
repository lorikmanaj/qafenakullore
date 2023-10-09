using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class PromoProduct
    {
        [Key]
        public int PromoId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public DateTime DateAdded { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; } // Many-to-One relationship
    }
}
