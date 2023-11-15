using QafenAkullAPI.Core.DTO.Product;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<Product> AddProduct(CreateProductDTO prod);
        Task<List<Product>> GetProductsByType(string type);
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetProducts();
    }
}
