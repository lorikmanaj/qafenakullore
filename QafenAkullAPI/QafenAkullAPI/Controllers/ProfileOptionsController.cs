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
    public class ProfileOptionsController : ControllerBase
    {
        private readonly QafenAkullDbContext _context;

        public ProfileOptionsController(QafenAkullDbContext context)
        {
            _context = context;
        }

        // GET: api/ProfileOptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfileOption>>> GetProfileOptions()
        {
            return await _context.ProfileOptions.ToListAsync();
        }

        // GET: api/ProfileOptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfileOption>> GetProfileOption(int id)
        {
            var profileOption = await _context.ProfileOptions.FindAsync(id);

            if (profileOption == null)
            {
                return NotFound();
            }

            return profileOption;
        }

        // PUT: api/ProfileOptions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfileOption(int id, ProfileOption profileOption)
        {
            if (id != profileOption.OptionId)
            {
                return BadRequest();
            }

            _context.Entry(profileOption).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileOptionExists(id))
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

        // POST: api/ProfileOptions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProfileOption>> PostProfileOption(ProfileOption profileOption)
        {
            _context.ProfileOptions.Add(profileOption);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfileOption", new { id = profileOption.OptionId }, profileOption);
        }

        // DELETE: api/ProfileOptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfileOption(int id)
        {
            var profileOption = await _context.ProfileOptions.FindAsync(id);
            if (profileOption == null)
            {
                return NotFound();
            }

            _context.ProfileOptions.Remove(profileOption);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfileOptionExists(int id)
        {
            return _context.ProfileOptions.Any(e => e.OptionId == id);
        }
    }
}
