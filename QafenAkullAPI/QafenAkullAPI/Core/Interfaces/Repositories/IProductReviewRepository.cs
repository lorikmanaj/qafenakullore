using QafenAkullAPI.Core.DTO.ProductReview;
using QafenAkullAPI.Domain.Entities;

namespace QafenAkullAPI.Core.Interfaces.Repositories
{
    public interface IProductReviewRepository
    {
        Task<List<ProductReviewDTO>> GetProductReviews();
    }
}
