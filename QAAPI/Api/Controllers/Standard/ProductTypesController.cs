using Domain.Models;
using Infrastructure.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = PolicyType.Standard)]
    public class ProductTypesController : ControllerBase
    {
        //private readonly ApplicationDbContext _dbContext;
        private readonly IProductTypesRepository _productTypesRepository;
        public ProductTypesController(IProductTypesRepository productTypesRepository)
        {
            _productTypesRepository = productTypesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductTypes()
        {
            return await _productTypesRepository.GetProductTypes();
        }

        //[HttpGet("[action]")]
        //public async Task<IActionResult> Get(Guid id)
        //{
        //    //var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
        //    //if (product is null)
        //    //return BadRequest(
        //    //new { Message = $"There is no product for the given id {id}" });

        //    return Ok();
        //}
    }
}
