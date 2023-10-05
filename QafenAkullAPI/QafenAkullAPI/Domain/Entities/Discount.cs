using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class Discount
    {
        [Key]
        public int DiscountId { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
