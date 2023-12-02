using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Discount
    {
        [Key]
        public int DiscountId { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
