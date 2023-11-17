using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class WishListItemRepository : IWishListItemRepository
    {
        private readonly QafenAkullDbContext _context;

        public WishListItemRepository(QafenAkullDbContext context)
        {
            _context = context;
        }

        public async Task<WishListItem> AddItemToWishListAsync(WishListItem wishListItem)
        {
            _context.WishListItems.Add(wishListItem);
            await _context.SaveChangesAsync();

            return wishListItem;
        }

        public async Task<bool> RemoveItemFromWishListAsync(int wishListItemId)
        {
            var wishListItem = await _context.WishListItems
                .FirstOrDefaultAsync(wli => wli.WishListItemId == wishListItemId);

            if (wishListItem != null)
            {
                _context.WishListItems.Remove(wishListItem);
                await _context.SaveChangesAsync();
                
                return true;
            }

            return false;
        }
    }

}
