using Domain.Models;

namespace Infrastructure.Interfaces.Repositories
{
    public interface IProductTypesRepository
    {
        Task<List<ProductType>> GetProductTypes();
    }
}
