using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class Variety
    {
        [Key]
        public int VarietyId { get; set; }
        public int ProductId { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string ImageBlob { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
