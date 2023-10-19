using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QafenAkullAPI.Domain.Entities;
using QafenAkullAPI.Infrastructure.Persistence;

namespace QafenAkullAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTagsController : ControllerBase
    {
        private readonly QafenAkullDbContext _context;

        public ProductTagsController(QafenAkullDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductTag>>> GetProductTags()
        {
            return await _context.ProductTags.ToListAsync();
        }

        // GET: api/ProductTags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTag>> GetProductTag(int id)
        {
            var productTag = await _context.ProductTags.FindAsync(id);

            if (productTag == null)
            {
                return NotFound();
            }

            return productTag;
        }

        // PUT: api/ProductTags/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductTag(int id, ProductTag productTag)
        {
            if (id != productTag.TagId)
            {
                return BadRequest();
            }

            _context.Entry(productTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTagExists(id))
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

        // POST: api/ProductTags
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductTag>> PostProductTag(ProductTag productTag)
        {
            _context.ProductTags.Add(productTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductTag", new { id = productTag.TagId }, productTag);
        }

        // DELETE: api/ProductTags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductTag(int id)
        {
            var productTag = await _context.ProductTags.FindAsync(id);
            if (productTag == null)
            {
                return NotFound();
            }

            _context.ProductTags.Remove(productTag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductTagExists(int id)
        {
            return _context.ProductTags.Any(e => e.TagId == id);
        }
    }
}
