using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.DTO.ProductReview;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewsController : ControllerBase
    {
        private readonly QafenAkullDbContext _context;
        private readonly IProductReviewRepository _productReviewRepository;

        public ProductReviewsController(QafenAkullDbContext context,
            IProductReviewRepository productReviewRepository)
        {
            this._context = context;
            this._productReviewRepository = productReviewRepository;
        }

        // GET: api/ProductReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReviewDTO>>> GetProductReviews()
        {
            return await _productReviewRepository.GetProductReviews();
        }

        // GET: api/ProductReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReview>> GetProductReview(int id)
        {
            var productReview = await _context.ProductReviews.FindAsync(id);

            if (productReview == null)
                return NotFound();

            return productReview;
        }

        // GET: api/ProductReviews/prod/5
        [HttpGet("prod/{id}")]
        public async Task<ActionResult<List<ProductReview>>> GetProductReviews(int id)
        {
            var productReviews = await _context.ProductReviews.Where(_ => _.ProductId == id).ToListAsync();

            if (productReviews == null)
                return NotFound();

            return productReviews;
        }

        // PUT: api/ProductReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductReview(int id, ProductReview productReview)
        {
            if (id != productReview.ProdRevId)
                return BadRequest();

            _context.Entry(productReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductReviewExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/ProductReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductReview>> PostProductReview(ProductReview productReview)
        {
            _context.ProductReviews.Add(productReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductReview", new { id = productReview.ProdRevId }, productReview);
        }

        // DELETE: api/ProductReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductReview(int id)
        {
            var productReview = await _context.ProductReviews.FindAsync(id);
            if (productReview == null)
            {
                return NotFound();
            }

            _context.ProductReviews.Remove(productReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductReviewExists(int id)
        {
            return _context.ProductReviews.Any(e => e.ProdRevId == id);
        }
    }
}
