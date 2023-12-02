namespace Domain.Dtos.Product.WishList
{
    public class AddToWishListRequest
    {
        public int ProductId { get; set; }
        public int WishListId { get; set; }
    }
}
