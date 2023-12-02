using Api.Interfaces.Repositories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly ICartItemRepository _cartItemRepository;

        public CartItemsController(ICartItemRepository cartItemRepository)
        {
            _cartItemRepository = cartItemRepository;
        }

        // GET: api/CartItems/5
        [HttpGet("GetCartItem/{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _cartItemRepository.GetCartItem(id);

            if (cartItem == null)
                return NotFound();

            return cartItem;
        }

        // GET: api/CartItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<CartItem>>> GetCartItems(int id)
        {
            var cartItems = await _cartItemRepository.GetCartItems(id);

            if (cartItems == null)
                return NotFound();

            return cartItems;
        }

        // POST: api/CartItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CartItem cartItem)
        {
            var newItem = await _cartItemRepository.AddItemToCartAsync(cartItem);

            return CreatedAtAction("GetCartItem", new { id = newItem.CartItemId }, newItem);
        }

        // DELETE: api/CartItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            if (await _cartItemRepository.RemoveItemFromCartAsync(id))
                return NoContent();

            return BadRequest();
        }
    }
}
