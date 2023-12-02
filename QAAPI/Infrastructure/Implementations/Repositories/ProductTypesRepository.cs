using Domain.Models;
using Infrastructure.Database;
using Infrastructure.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations.Repositories
{
    public class ProductTypesRepository : IProductTypesRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductTypesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<ProductType>> GetProductTypes()
        {
            return _context.ProductTypes.ToListAsync();
        }
    }
}
