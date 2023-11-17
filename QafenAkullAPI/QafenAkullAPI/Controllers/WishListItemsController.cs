using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Core.Interfaces.Repositories;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListItemsController : ControllerBase
    {
        private readonly QafenAkullDbContext _context;
        private readonly IWishListItemRepository _wishListItemRepository;

        public WishListItemsController(QafenAkullDbContext context,
            IWishListItemRepository wishListItemRepository)
        {
            _context = context;
            this._wishListItemRepository = wishListItemRepository;
        }

        // GET: api/WishListItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListItem>>> GetWishListItems()
        {
            return await _context.WishListItems.ToListAsync();
        }

        // GET: api/WishListItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WishListItem>> GetWishListItem(int id)
        {
            var wishListItem = await _context.WishListItems.FindAsync(id);

            if (wishListItem == null)
                return NotFound();

            return wishListItem;
        }

        // PUT: api/WishListItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishListItem(int id, WishListItem wishListItem)
        {
            if (id != wishListItem.WishListItemId)
                return BadRequest();

            _context.Entry(wishListItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListItemExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/WishListItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WishListItem>> PostWishListItem(WishListItem wishListItem)
        {
            var wli = await _wishListItemRepository.AddItemToWishListAsync(wishListItem);
            //_context.WishListItems.Add(wishListItem);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishListItem", new { id = wishListItem.WishListItemId }, wishListItem);
        }

        // DELETE: api/WishListItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListItem(int id)
        {
            if (await _wishListItemRepository.RemoveItemFromWishListAsync(id))
                return NoContent();
            
            return BadRequest();
        }

        private bool WishListItemExists(int id)
        {
            return _context.WishListItems.Any(e => e.WishListItemId == id);
        }
    }
}
