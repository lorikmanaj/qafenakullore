using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class ProfileOption
    {
        [Key]
        public int OptionId { get; set; }

        [Required]
        public string Option { get; set; }
    }
}
