using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class OrderStatus
    {
        [Key]
        public int StatusId { get; set; }
        public string Status { get; set; }
    }
}
