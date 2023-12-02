using Api.Interfaces.Repositories;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Application.Implementations.Repositories
{
    public class WishListItemRepository : IWishListItemRepository
    {
        private readonly ApplicationDbContext _context;
        //private readonly IProductRepository _productRepository;

        public WishListItemRepository(ApplicationDbContext context
            //, IProductRepository productRepository
            )
        {
            _context = context;
            //_productRepository = productRepository;
        }

        public async Task<WishListItem> GetWishListItem(int id)
        {
            var wishListItem = await _context.WishListItems.FindAsync(id);

            if (wishListItem == null)
                return null;

            return wishListItem;
        }

        public async Task<List<WishListItem>> GetWishListItems(int wishListId)
        {
            var wishListItems = await _context.WishListItems.Where(_ => _.WishListId == wishListId).ToListAsync();

            if (wishListItems == null)
                return null;

            return wishListItems;
        }

        public async Task<WishListItem> AddItemToWishListAsync(int productId, int wishListId)
        {
            //var prod = await this._productRepository.GetProductById(productId);
            var prod = await _context.Products.FindAsync(productId);

            if (prod != null)
            {
                WishListItem newWli = new WishListItem()
                {
                    WishListId = wishListId,
                    ProductId = prod.ProductId,
                    ItemName = prod.Name
                };

                _context.WishListItems.Add(newWli);
                await _context.SaveChangesAsync();

                return newWli;
            }

            // Handle the case when the product is not found
            return null;
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
