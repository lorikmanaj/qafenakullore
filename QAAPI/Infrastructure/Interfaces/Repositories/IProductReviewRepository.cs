using Domain.Dtos.ProductReview;

namespace Api.Interfaces.Repositories
{
    public interface IProductReviewRepository
    {
        Task<List<ProductReviewDTO>> GetProductReviews();
        Task<ReviewDetailsDTO> GetProdRevDetails(int productId);
    }
}
