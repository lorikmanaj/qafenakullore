using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface IWishListItemRepository
    {
        Task<WishListItem> GetWishListItem(int id);
        Task<List<WishListItem>> GetWishListItems(int wishListId);
        Task<WishListItem> AddItemToWishListAsync(int prodId, int wishListId);
        Task<bool> RemoveItemFromWishListAsync(int wishListItemId);
    }
}
