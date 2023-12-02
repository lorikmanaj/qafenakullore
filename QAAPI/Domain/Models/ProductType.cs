using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class ProductType
    {
        [Key]
        public int TypeId { get; set; }
        public string Type { get; set; }
    }
}
