using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface ICartItemRepository
    {
        Task<List<CartItem>> GetCartItems(int cartId);
        Task<CartItem> AddItemToCartAsync(CartItem cartItem);
        Task<bool> RemoveItemFromCartAsync(int cartItemId);
    }
}
