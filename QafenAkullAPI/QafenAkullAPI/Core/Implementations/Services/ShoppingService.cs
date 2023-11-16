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
            await _cartRepository.CreateCartAsync(userId);
        }

        public async Task CreateWishlistForUser(string userId)
        {
            await _wishlistRepository.CreateWishListAsync(userId);
        }
    }
}
