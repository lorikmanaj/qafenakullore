using Api.Interfaces.Repositories;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Api.Implementations.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly ApplicationDbContext _context;

        public CartItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CartItem> GetCartItem(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if (cartItem == null)
                return null;

            return cartItem;
        }

        public async Task<List<CartItem>> GetCartItems(int cartId)
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
