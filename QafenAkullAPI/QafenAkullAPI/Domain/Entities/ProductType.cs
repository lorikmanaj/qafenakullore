using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class ProductType
    {
        [Key]
        public int TypeId { get; set; }
        public string Type { get; set; }
    }
}
