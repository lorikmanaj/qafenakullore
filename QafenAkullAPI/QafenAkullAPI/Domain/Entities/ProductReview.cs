using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class ProductReview
    {
        [Key]
        public int ProdRevId { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime DateReviewed { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; } // Many-to-One relationship

        [ForeignKey("UserId")]
        public ApiUser User { get; set; }
    }
}
