using Api.Interfaces.Repositories;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Application.Implementations.Repositories
{
    public class ItemGalleryRepository : IItemGalleryRepository
    {
        private readonly ApplicationDbContext _context;

        public ItemGalleryRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<List<ItemGallery>> GetProductGallery(int productId)
        {
            var galleryImages = await _context.ItemGalleries
                .Where(g => g.ProductId == productId)
                .ToListAsync();

            return galleryImages;
        }
    }
}
