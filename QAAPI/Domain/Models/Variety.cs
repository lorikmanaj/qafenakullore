using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Variety
    {
        [Key]
        public int VarietyId { get; set; }
        public int ProductId { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string ImageBlob { get; set; }
        public int Stock { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
