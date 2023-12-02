using Api.Interfaces.Repositories;
using Domain.Dtos.ProductReview;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewsController : ControllerBase
    {
        private readonly IProductReviewRepository _productReviewRepository;

        public ProductReviewsController(IProductReviewRepository productReviewRepository)
        {
            this._productReviewRepository = productReviewRepository;
        }

        // GET: api/ProductReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReviewDTO>>> GetProductReviews()
        {
            return await _productReviewRepository.GetProductReviews();
        }

        [HttpGet("{productId}/Details")]
        public async Task<ActionResult<ReviewDetailsDTO>> GetProdReviewDetails(int productId)
        {
            var productDetails = await _productReviewRepository.GetProdRevDetails(productId);

            if (productDetails == null)
                return NotFound();

            return Ok(productDetails);
        }
    }
}
