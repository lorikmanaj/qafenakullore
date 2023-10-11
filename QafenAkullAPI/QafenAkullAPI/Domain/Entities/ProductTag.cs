using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class ProductTag
    {
        [Key]
        public int TagId { get; set; }
        public int ProductId { get; set; }
        public string Tag { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
