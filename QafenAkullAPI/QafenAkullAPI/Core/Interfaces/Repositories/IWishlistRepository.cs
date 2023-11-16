using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IWishListRepository
    {
        Task<WishList> CreateWishListAsync(string userId);
        Task<bool> RemoveWishListAsync(string userId);
    }

}
