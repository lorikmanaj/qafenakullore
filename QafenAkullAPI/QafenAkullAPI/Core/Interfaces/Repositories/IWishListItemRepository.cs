using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IWishListItemRepository
    {
        Task<WishListItem> AddItemToWishListAsync(int wishListId, int productId);
        Task<bool> RemoveItemFromWishListAsync(int wishListId, int productId);
    }
}
