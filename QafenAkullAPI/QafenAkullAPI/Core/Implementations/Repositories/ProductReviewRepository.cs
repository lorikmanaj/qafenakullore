using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.DTO.ProductReview;
using QafenAkullAPI.Core.DTO.User;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Core.Implementations.Repositories
{
    public class ProductReviewRepository : IProductReviewRepository
    {
        private readonly QafenAkullDbContext _context;

        public ProductReviewRepository(QafenAkullDbContext context)
        {
            this._context = context;
        }

        public async Task<List<ProductReviewDTO>> GetProductReviews()
        {
            var reviews = await _context.ProductReviews
                .Include(_ => _.User)
                .Select(review => new ProductReviewDTO
                {
                    ProdRevId = review.ProdRevId,
                    ProductId = review.ProductId,
                    UserId = review.UserId,
                    Comment = review.Comment,
                    Rating = review.Rating,
                    DateReviewed = review.DateReviewed,
                    User = new UserDTO
                    {
                        FirstName = review.User.FirstName,
                        LastName = review.User.LastName
                    }
                })
                .ToListAsync();

            return reviews;
        }

    }
}
