using Domain.Dtos.Product.Cart;
using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface ICartItemRepository
    {
        Task<CartItem> GetCartItem(int cartItemId);
        Task<List<CartItem>> GetCartItems(int cartId);
        Task<CartItem> AddItemToCartAsync(AddToCartRequest cartItem);
        Task<bool> UpdateCartItemQuantityAsync(int cartItemId, int newQuantity);
        Task<bool> RemoveItemFromCartAsync(int cartItemId);
    }
}
