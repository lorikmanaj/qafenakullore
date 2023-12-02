using Api.Interfaces.Repositories;
using Domain.Models;
using Infrastructure.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Implementations.Repositories
{
    public class WishListRepository : IWishListRepository
    {
        private readonly ApplicationDbContext _context;

        public WishListRepository(ApplicationDbContext context)
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
