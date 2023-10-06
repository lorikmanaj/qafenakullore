using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QafenAkullAPI.Domain.Entities
{
    public class WishList
    {
        [Key]
        public int WishListId { get; set; }
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApiUser User { get; set; }

        public List<WishListItem> WishListItems { get; set; }
    }
}
