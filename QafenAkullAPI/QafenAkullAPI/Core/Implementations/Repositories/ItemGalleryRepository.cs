using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class ItemGalleryRepository : IItemGalleryRepository
    {
        private readonly QafenAkullDbContext _context;

        public ItemGalleryRepository(QafenAkullDbContext context)
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
