using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QafenAkullAPI.Domain.Entities
{
    public class OrderProduct
    {
        [Key]
        public int OPId { get; set; }
        [ForeignKey(nameof(OrderId))]
        public int OrderId { get; set; }
        [ForeignKey(nameof(ProductId))]
        public int ProductId { get; set; }

        public Order Order { get; set; }
        public Product Product { get; set; }

        //public virtual ICollection<OrderProduct> OrderProducts { get; set; }
    }
}
