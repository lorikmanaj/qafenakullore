using Api.Interfaces.Repositories;
using Domain.Dtos.Product.Cart;
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

        public async Task<CartItem> AddItemToCartAsync(AddToCartRequest cartItem)
        {
            var prod = await _context.Products.FindAsync(cartItem.ProductId);

            if (prod != null)
            {
                CartItem newCi = new CartItem()
                {
                    CartId = cartItem.CartId,
                    ProductId = cartItem.ProductId,
                    ItemName = prod.Name,
                    Quantity = 1
                };

                _context.CartItems.Add(newCi);
                await _context.SaveChangesAsync();

                return newCi;
            }

            return null;
        }

        public async Task<bool> UpdateCartItemQuantityAsync(int cartItemId, int newQuantity)
        {
            var existingCartItem = await _context.CartItems.FindAsync(cartItemId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity = newQuantity;
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
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
