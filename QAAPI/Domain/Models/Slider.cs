using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Slider
    {
        [Key]
        public int SliderId { get; set; }

        [Required]
        public string Title { get; set; }

        public bool IsActive { get; set; }

        public List<SliderItem> SliderItems { get; set; } // One-to-Many relationship
    }
}
