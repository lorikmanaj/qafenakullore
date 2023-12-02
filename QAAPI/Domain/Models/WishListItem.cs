using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class WishListItem
    {
        [Key]
        public int WishListItemId { get; set; }

        [Required]
        public int WishListId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public string ItemName { get; set; }

        [ForeignKey("WishListId")]
        public WishList WishList { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
