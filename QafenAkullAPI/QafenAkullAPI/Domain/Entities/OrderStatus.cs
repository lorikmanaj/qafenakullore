using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class OrderStatus
    {
        [Key]
        public int StatusId { get; set; }
        public string Status { get; set; }
    }
}
