using Api.Interfaces.Repositories;
using Domain.Dtos.Product.Cart;
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
        public async Task<ActionResult<CartItem>> PostCartItem([FromBody] AddToCartRequest request)
        {
            var newItem = await _cartItemRepository.AddItemToCartAsync(request);

            return CreatedAtAction("GetCartItem", new { id = newItem.CartItemId }, newItem);
        }

        [HttpPut("{cartItemId}/updateQuantity/{newQuantity}")]
        public async Task<IActionResult> UpdateCartItemQuantity(int cartItemId, int newQuantity)
        {
            try
            {
                if (newQuantity == 0)
                {
                    // If the new quantity is 0, delete the cart item
                    await _cartItemRepository.RemoveItemFromCartAsync(cartItemId);
                    return NoContent();
                }

                var result = await _cartItemRepository.UpdateCartItemQuantityAsync(cartItemId, newQuantity);

                if (result)
                    return Ok(new { Message = "Quantity updated successfully." });

                return NotFound(new { Message = "CartItem not found." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Internal Server Error." });
            }
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
