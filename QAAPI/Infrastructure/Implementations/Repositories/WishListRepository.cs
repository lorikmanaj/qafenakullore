using Api.Interfaces.Repositories;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Application.Implementations.Repositories
{
    public class WishListRepository : IWishListRepository
    {
        private readonly ApplicationDbContext _context;

        public WishListRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<WishList> GetWishListByUserIdAsync(string userId)
        {
            return await _context.WishLists
                //.Include(w => .Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);
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
