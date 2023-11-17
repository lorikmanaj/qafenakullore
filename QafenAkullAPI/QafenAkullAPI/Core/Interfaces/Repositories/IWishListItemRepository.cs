using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IWishListItemRepository
    {
        Task<WishListItem> AddItemToWishListAsync(WishListItem wishListItem);
        Task<bool> RemoveItemFromWishListAsync(int wishListItemId);
    }
}
