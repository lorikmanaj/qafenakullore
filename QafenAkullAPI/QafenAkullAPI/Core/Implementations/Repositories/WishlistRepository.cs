using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class WishListRepository : IWishListRepository
    {
        private readonly QafenAkullDbContext _context;

        public WishListRepository(QafenAkullDbContext context)
        {
            _context = context;
        }

        public async Task<WishList> CreateWishListAsync(string userId)
        {
            var wishList = new WishList
            {
                UserId = userId
            };

            _context.WishLists.Add(wishList);
            await _context.SaveChangesAsync();

            return wishList;
        }

        public async Task<bool> RemoveWishListAsync(string userId)
        {
            var wishList = await _context.WishLists
                .Include(wl => wl.WishListItems)
                .FirstOrDefaultAsync(wl => wl.UserId == userId);

            if (wishList != null)
            {
                _context.WishLists.Remove(wishList);
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }
    }
}
