using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class Testimonial
    {
        [Key]
        public int TestimonialId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public DateTime DateAdded { get; set; }

        [Required]
        public int Rating { get; set; }

        [ForeignKey("UserId")]
        public ApiUser User { get; set; } // Many-to-One relationship
    }
}
