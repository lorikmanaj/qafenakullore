using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface IWishListRepository
    {
        Task<WishList> CreateWishListAsync(string userId);
        Task<bool> RemoveWishListAsync(string userId);
    }
}
