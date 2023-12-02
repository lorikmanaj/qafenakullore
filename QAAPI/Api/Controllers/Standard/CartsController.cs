using Api.Interfaces.Repositories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartsController(ICartRepository cartRepository)
        {
            this._cartRepository = cartRepository;
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetCartId(string id)
        {
            var cart = await _cartRepository.GetCartByUserIdAsync(id);

            if (cart == null)
                return NotFound();

            return cart.CartId;
        }
    }
}
