using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class PaymentMethod
    {
        [Key]
        public int PaymentMethodId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
