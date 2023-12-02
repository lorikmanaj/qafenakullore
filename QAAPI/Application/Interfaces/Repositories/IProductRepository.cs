using Domain.Dtos.Product;
using Domain.Models;

namespace Api.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<Product> AddProduct(CreateProductDTO prod);
        Task<List<Product>> GetProductsByType(string type);
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetProducts();
    }
}
