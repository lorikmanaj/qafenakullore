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
    public class ItemGalleriesController : ControllerBase
    {
        private readonly QafenAkullDbContext _context;
        private readonly IItemGalleryRepository _itemGalleryRepository;

        public ItemGalleriesController(QafenAkullDbContext context,
            IItemGalleryRepository itemGalleryRepository)
        {
            _context = context;
            _itemGalleryRepository = itemGalleryRepository;
        }

        // GET: api/ItemGalleries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemGallery>>> GetItemGalleries()
        {
            return await _context.ItemGalleries.ToListAsync();
        }

        // GET: api/ItemGalleries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ItemGallery>>> GetItemGallery(int id)
        {
            //var itemGallery = await _context.ItemGalleries.FindAsync(id);
            var itemGallery = await _itemGalleryRepository.GetProductGallery(id);

            if (itemGallery == null)
                return NotFound();
            
            return itemGallery;
        }

        // PUT: api/ItemGalleries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemGallery(int id, ItemGallery itemGallery)
        {
            if (id != itemGallery.ItemGalleryId)
            {
                return BadRequest();
            }

            _context.Entry(itemGallery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemGalleryExists(id))
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

        // POST: api/ItemGalleries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemGallery>> PostItemGallery(ItemGallery itemGallery)
        {
            _context.ItemGalleries.Add(itemGallery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemGallery", new { id = itemGallery.ItemGalleryId }, itemGallery);
        }

        // DELETE: api/ItemGalleries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemGallery(int id)
        {
            var itemGallery = await _context.ItemGalleries.FindAsync(id);
            if (itemGallery == null)
            {
                return NotFound();
            }

            _context.ItemGalleries.Remove(itemGallery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemGalleryExists(int id)
        {
            return _context.ItemGalleries.Any(e => e.ItemGalleryId == id);
        }
    }
}
