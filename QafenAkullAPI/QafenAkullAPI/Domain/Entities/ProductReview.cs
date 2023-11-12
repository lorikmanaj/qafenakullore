using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class ProductReview
    {
        [Key]
        public int ProdRevId { get; set; }

        [ForeignKey("ProductId")]
        public int ProductId { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime DateReviewed { get; set; }

        public Product Product { get; set; } // Many-to-One relationship
        public ApiUser User { get; set; }
    }
}
