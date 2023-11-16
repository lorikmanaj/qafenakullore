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

        public async Task<WishListItem> AddItemToWishListAsync(int wishListId, int productId)
        {
            var wishListItem = new WishListItem
            {
                WishListId = wishListId,
                ProductId = productId
            };

            _context.WishListItems.Add(wishListItem);
            await _context.SaveChangesAsync();

            return wishListItem;
        }

        public async Task<bool> RemoveItemFromWishListAsync(int wishListId, int productId)
        {
            var wishListItem = await _context.WishListItems
                .FirstOrDefaultAsync(wli => wli.WishListId == wishListId && wli.ProductId == productId);

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
