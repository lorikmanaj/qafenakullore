using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class TypeSize
    {
        [Key]
        public int TypeSizeId { get; set; }
        public string Size { get; set; }

        // Foreign key
        public int ProductTypeId { get; set; }

        // Navigation property
        [ForeignKey("ProductTypeId")]
        public ProductType ProductType { get; set; }
    }

}
