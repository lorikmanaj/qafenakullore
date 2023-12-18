namespace Domain.Dtos.Product.Cart
{
    public class AddToCartRequest
    {
        public int ProductId { get; set; }
        public int CartId { get; set; }
        public int Quantity { get; set; }
    }
}
