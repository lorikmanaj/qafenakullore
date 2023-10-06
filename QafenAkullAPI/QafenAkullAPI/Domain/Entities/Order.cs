using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool Approved { get; set; }

        [Required]
        public string ShippingAddress { get; set; }

        [Required]
        public int PaymentMethodId { get; set; }

        public List<OrderProduct> OrderProducts { get; set; } // One-to-Many relationship
        public List<Discount> Discounts { get; set; } // Many-to-Many relationship

        [ForeignKey("UserId")]
        public ApiUser User { get; set; } // Many-to-One relationship

        [ForeignKey("PaymentMethodId")]
        public PaymentMethod PaymentMethod { get; set; }
    }
}
