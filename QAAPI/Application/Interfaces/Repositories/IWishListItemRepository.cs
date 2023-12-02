using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface IWishListItemRepository
    {
        Task<WishListItem> AddItemToWishListAsync(WishListItem wishListItem);
        Task<bool> RemoveItemFromWishListAsync(int wishListItemId);
    }
}
