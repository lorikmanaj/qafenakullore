using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Core.Interfaces.Services;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Implementations.Services
{
    public class ShoppingService : IShoppingService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IWishListRepository _wishlistRepository;

        public ShoppingService(ICartRepository cartRepository, IWishListRepository wishlistRepository)
        {
            _cartRepository = cartRepository;
            _wishlistRepository = wishlistRepository;
        }

        public async Task CreateCartForUser(string userId)
        {
            // Implement logic to create a cart for the user
            var cart = new Cart { UserId = userId };
            await _cartRepository.CreateAsync(cart);
        }

        public async Task CreateWishlistForUser(string userId)
        {
            // Implement logic to create a wishlist for the user
            var wishlist = new WishList { UserId = userId };
            await _wishlistRepository.CreateAsync(wishlist);
        }
    }
}
