using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class ProductMaterial
    {
        [Key]
        public int MaterialId { get; set; }
        public string Material { get; set; }

        // Navigation property for products
        public List<Product> Products { get; set; }
    }
}
