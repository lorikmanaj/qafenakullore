using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly QafenAkullDbContext _context;

        public CartItemRepository(QafenAkullDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<List<CartItem>>> GetCartItems(int cartId)
        {
            var cartItems = await _context.CartItems.Where(_ => _.CartId == cartId).ToListAsync();

            if (cartItems == null)
                return null;
            
            return cartItems;
        }

        public async Task<CartItem> AddItemToCartAsync(CartItem cartItem)
        {
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return cartItem;
        }

        public async Task<bool> RemoveItemFromCartAsync(int cartItemId)
        {
            var existingCartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId);

            if (existingCartItem != null)
            {
                _context.CartItems.Remove(existingCartItem);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }

}
