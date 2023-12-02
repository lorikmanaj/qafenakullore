using Api.Interfaces.Repositories;
using Domain.Dtos.ProductReview;
using Domain.Dtos.User;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Application.Implementations.Repositories
{
    public class ProductReviewRepository : IProductReviewRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductReviewRepository(ApplicationDbContext context)
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
                        FirstName = review.User.UserName,
                        LastName = review.User.UserName
                    }
                })
                .ToListAsync();

            return reviews;
        }

        public async Task<ReviewDetailsDTO> GetProdRevDetails(int productId)
        {
            var reviews = await _context.ProductReviews
                .Where(review => review.ProductId == productId)
                .ToListAsync();

            if (reviews == null || !reviews.Any())
                return null;

            int totalReviews = reviews.Count;
            double averageRating = reviews.Average(review => review.Rating);

            var reviewDetails = new ReviewDetailsDTO
            {
                ProductId = productId,
                TotalReviews = totalReviews,
                AverageRating = (int)averageRating
            };

            return reviewDetails;
        }

    }
}
