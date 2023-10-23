using QafenAkullAPI.Core.DTO.Product;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly QafenAkullDbContext _context;

        public ProductRepository(QafenAkullDbContext context)
        {
            this._context = context;
        }

        public async Task<Product> AddProduct(CreateProductDTO prod)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Step 1: Insert product data (except for StockId)
                    var newProduct = new Product
                    {
                        TypeId = prod.TypeId,
                        Name = prod.Name,
                        Description = prod.Description,
                        Price = prod.Price,
                        Image = prod.MainImage,
                        Background = prod.BackgroundImage
                    };

                    _context.Products.Add(newProduct);
                    await _context.SaveChangesAsync();

                    // Step 2: Retrieve the ProductId
                    var productId = newProduct.ProductId;

                    // Step 3: Insert stock data with the retrieved productId
                    var newStock = new Stock
                    {
                        ProductId = productId,
                        Quantity = prod.Stock
                    };

                    _context.Stocks.Add(newStock);
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return newProduct;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    // Handle and log exceptions
                    throw new Exception("Error adding the product.", ex);
                }
            }
        }
    }
}
