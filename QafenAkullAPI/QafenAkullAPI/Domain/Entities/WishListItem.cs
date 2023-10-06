using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class WishListItem
    {
        [Key]
        public int WishListItemId { get; set; }
        public int WishListId { get; set; }
        public int ProductId { get; set; }

        [ForeignKey("WishListId")]
        public WishList WishList { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
