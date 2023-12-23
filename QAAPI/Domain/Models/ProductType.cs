using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class ProductType
    {
        [Key]
        public int TypeId { get; set; }
        public string Type { get; set; }

        public List<TypeSize> TypeSizes { get; set; }
    }
}
