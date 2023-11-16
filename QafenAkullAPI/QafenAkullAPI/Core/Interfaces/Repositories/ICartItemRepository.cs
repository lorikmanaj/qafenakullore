using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface ICartItemRepository
    {
        Task<CartItem> AddItemToCartAsync(CartItem cartItem);
        Task<bool> RemoveItemFromCartAsync(CartItem cartItem);
    }
}
