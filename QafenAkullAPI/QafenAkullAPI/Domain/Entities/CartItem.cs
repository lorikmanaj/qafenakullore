using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        [Required]
        public int CartId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public int Quantity { get; set; }

        [ForeignKey("CartId")]
        public Cart Cart { get; set; } // Many-to-One relationship

        [ForeignKey("ProductId")]
        public Product Product { get; set; } // Many-to-One relationship
    }
}
