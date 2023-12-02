using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
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
        public IdentityUser User { get; set; }
    }
}
