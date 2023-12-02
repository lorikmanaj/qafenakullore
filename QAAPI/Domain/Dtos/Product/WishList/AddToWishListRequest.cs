using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Product.WishList
{
    public class AddToWishListRequest
    {
        public int ProductId { get; set; }
        public int WishListId { get; set; }
    }
}
