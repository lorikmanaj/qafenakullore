using Api.Interfaces.Repositories;
using Domain.Models;
using Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.Standard
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWishListRepository _wishListRepository;

        public WishListsController(ApplicationDbContext context,
            IWishListRepository wishListRepository)
        {
            _context = context;
            this._wishListRepository = wishListRepository;
        }

        // GET: api/WishLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishLists()
        {
            return await _context.WishLists.ToListAsync();
        }

        // GET: api/WishLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetWishListId(string id)
        {
            var wishList = await _wishListRepository.GetWishListByUserIdAsync(id);

            if (wishList == null)
                return NotFound();

            return wishList.WishListId;
        }

        // PUT: api/WishLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishList(int id, WishList wishList)
        {
            if (id != wishList.WishListId)
            {
                return BadRequest();
            }

            _context.Entry(wishList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WishLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WishList>> PostWishList(WishList wishList)
        {
            _context.WishLists.Add(wishList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishList", new { id = wishList.WishListId }, wishList);
        }

        // DELETE: api/WishLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            var wishList = await _context.WishLists.FindAsync(id);
            if (wishList == null)
            {
                return NotFound();
            }

            _context.WishLists.Remove(wishList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishListExists(int id)
        {
            return _context.WishLists.Any(e => e.WishListId == id);
        }
    }
}
