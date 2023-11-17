using Microsoft.AspNetCore.Mvc;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface ICartItemRepository
    {
        Task<ActionResult<List<CartItem>>> GetCartItems(int cartId);
        Task<CartItem> AddItemToCartAsync(CartItem cartItem);
        Task<bool> RemoveItemFromCartAsync(int cartItemId);
    }
}
