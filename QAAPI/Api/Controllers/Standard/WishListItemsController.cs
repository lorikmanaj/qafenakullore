using Api.Interfaces.Repositories;
using Domain.Dtos.Product.WishList;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListItemsController : ControllerBase
    {
        private readonly IWishListItemRepository _wishListItemRepository;

        public WishListItemsController(IWishListItemRepository wishListItemRepository)
        {
            this._wishListItemRepository = wishListItemRepository;
        }

        // GET: api/WishListItems
        [HttpGet("GetWishListItems/{id}")]
        public async Task<ActionResult<IEnumerable<WishListItem>>> GetWishListItems(int id)
        {
            var wishListItems = await _wishListItemRepository.GetWishListItems(id);

            if (wishListItems == null)
                return Ok("No Items for this wish list.");

            return wishListItems;
        }

        //GET: api/WishListItems/5
        [HttpGet("GetWishListItem/{id}")]
        public async Task<ActionResult<WishListItem>> GetWishListItem(int id)
        {
            var wishListItem = await _wishListItemRepository.GetWishListItem(id);

            if (wishListItem == null)
                return NotFound();

            return wishListItem;
        }

        // PUT: api/WishListItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutWishListItem(int id, WishListItem wishListItem)
        //{
        //    if (id != wishListItem.WishListItemId)
        //        return BadRequest();

        //    _context.Entry(wishListItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!WishListItemExists(id))
        //            return NotFound();
        //        else
        //            throw;
        //    }

        //    return NoContent();
        //}
        
        // POST: api/WishListItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WishListItem>> PostWishListItem([FromBody] AddToWishListRequest request)
        {
            var wli = await _wishListItemRepository.AddItemToWishListAsync(request.ProductId, request.WishListId);

            if (wli == null) return BadRequest(null);
            
            return CreatedAtAction("GetWishListItem", new { id = wli.WishListItemId }, wli);
        }

        // DELETE: api/WishListItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListItem(int id)
        {
            if (await _wishListItemRepository.RemoveItemFromWishListAsync(id))
                return NoContent();

            return BadRequest();
        }

        //private bool WishListItemExists(int id)
        //{
        //    return _context.WishListItems.Any(e => e.WishListItemId == id);
        //}
    }
}
