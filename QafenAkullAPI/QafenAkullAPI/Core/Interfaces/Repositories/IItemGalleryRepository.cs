using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IItemGalleryRepository
    {
        Task<List<ItemGallery>> GetProductGallery(int productId);
    }
}
