using Api.Interfaces.Repositories;
using Domain.Dtos.Product;
using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.Administrator)]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository)
        {
            this._productRepository = productRepository;
        }

        // GET: api/Products
        [HttpGet("ProductsType/{type}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByType(string type)
        {
            return await _productRepository.GetProductsByType(type);
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _productRepository.GetProducts();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductById(id);

            if (product == null)
                return NotFound();

            return product;
        }

        [HttpGet("{id}/stock")]
        public async Task<ActionResult<int>> GetProductStock(int id)
        {
            try
            {
                var product = await _productRepository.GetProductById(id);

                if (product == null)
                    return NotFound();

                return Ok(product.Stock);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Internal Server Error." });
            }
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [RequestSizeLimit(long.MaxValue)]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.Administrator)]
        public async Task<ActionResult<Product>> PostProduct(CreateProductDTO prod)
        {
            var createdProduct = await _productRepository.AddProduct(prod);
            return CreatedAtAction("GetProduct", "Products", new { id = createdProduct.ProductId }, createdProduct);
        }
    }
}