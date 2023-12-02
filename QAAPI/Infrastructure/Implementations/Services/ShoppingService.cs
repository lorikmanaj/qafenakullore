using Api.Interfaces.Repositories;
using Api.Interfaces.Services;

namespace Api.Implementations.Services
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
            await _cartRepository.CreateCartAsync(userId);
        }

        public async Task CreateWishlistForUser(string userId)
        {
            await _wishlistRepository.CreateWishListAsync(userId);
        }
    }
}
