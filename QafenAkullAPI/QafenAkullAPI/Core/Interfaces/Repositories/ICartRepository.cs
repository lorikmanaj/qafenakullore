using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface ICartRepository
    {
        Task<Cart> CreateCartAsync(string userId);
        Task<Cart> GetCartByUserIdAsync(string userId);
        Task<bool> RemoveCartAsync(string userId);
    }
}
