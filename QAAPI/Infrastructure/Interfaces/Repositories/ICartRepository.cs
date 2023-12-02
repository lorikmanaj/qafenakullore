using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface ICartRepository
    {
        Task<Cart> CreateCartAsync(string userId);
        Task<Cart> GetCartByUserIdAsync(string userId);
        Task<bool> RemoveCartAsync(string userId);
    }
}
