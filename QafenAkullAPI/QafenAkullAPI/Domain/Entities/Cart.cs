using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

        [Required]
        public string UserId { get; set; }

        public List<CartItem> Items { get; set; } // One-to-Many relationship

        [ForeignKey("UserId")]
        public ApiUser User { get; set; } // Many-to-One relationship
    }
}
