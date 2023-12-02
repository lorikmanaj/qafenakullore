using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class ProfileOption
    {
        [Key]
        public int OptionId { get; set; }

        [Required]
        public string Option { get; set; }
    }
}
