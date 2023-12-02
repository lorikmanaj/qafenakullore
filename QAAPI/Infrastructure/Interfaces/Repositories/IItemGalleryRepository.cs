using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface IItemGalleryRepository
    {
        Task<List<ItemGallery>> GetProductGallery(int productId);
    }
}
