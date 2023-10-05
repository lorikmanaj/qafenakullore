using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class SliderItem
    {
        [Key]
        public int SliderItemId { get; set; }

        [Required]
        public int SliderId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [ForeignKey("SliderId")]
        public Slider Slider { get; set; } // Many-to-One relationship

        [ForeignKey("ProductId")]
        public Product Product { get; set; } // Many-to-One relationship
    }
}
